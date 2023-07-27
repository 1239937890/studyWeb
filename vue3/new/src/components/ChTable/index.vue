<!--
二次封装el-table，兼容el-table所有参数
带分页，兼容el-pagination所有参数

@author libaogang
@date 2021-12-25
-->
<template>
  <div class="ch-table">
    <div class="ch-table-header" v-if="$slots.headerLeft || toolbar">
      <div class="ch-table-header-left">
        <slot name="headerLeft"></slot>
      </div>
      <div class="ch-table-header-right">
        <slot name="headerRight"></slot>
        <ch-table-toolbar
          v-if="toolbar"
          :toolbar="toolbar"
          :columns="filterColumns"
          :exportColumns="exportColumns"
          :exportLoading="exportLoading"
          :exportColumnCahcheKey="exportColumnCahcheKey"
          @refresh="load"
          @expotData="exportData"
          @columnChange="columnChange"
        ></ch-table-toolbar>
        <slot name="toolbarRight"></slot>
      </div>
    </div>

    <el-table
      ref="tableRef"
      v-bind="$attrs"
      v-loading="loading"
      :data="localData"
      :size="size"
      :border="border"
      :row-key="rowKey"
      :defaultSort="defaultSort"
      :height="localHeight"
      :highlight-current-row="highlightCurrentRow"
      :emptyText="emptyText"
      @sort-change="sortChange"
      @selection-change="handleSelectionChange"
      :rowClassName="getRowClassName"
    >
      <!-- 列配置通过插槽传入 -->
      <column-render v-if="columnConfigBySlots" :key="key" />

      <!-- 列配置通过columns参数传入 -->
      <template v-for="(column, index) in localColums" v-else>
        <el-table-column
          v-if="showIndexNum && column.type !== 'selection' && index === 0"
          type="index"
          align="center"
          showOverflowTooltip
          label="序号"
          width="60"
          :index="getIndex"
        />
        <el-table-column v-bind="column">
          <template #default="slotProps" v-if="column.slot">
            <slot v-bind="slotProps" :name="column.slot"></slot>
          </template>
        </el-table-column>
        <el-table-column
          v-if="showIndexNum && column.type === 'selection' && index === 0"
          type="index"
          align="center"
          showOverflowTooltip
          label="序号"
          width="60"
          :index="getIndex"
        />
      </template>
      <slot name="append"></slot>
    </el-table>

    <div class="ch-table-pagination" v-if="page">
      <el-pagination
        v-bind="localPage"
        v-model:page-size="localPage.pageSize"
        v-model:current-page="localPage.currentPage"
        :total="localPage.total"
      ></el-pagination>
    </div>
  </div>
</template>

<script setup name="ChTable">
import {
  reactive,
  ref,
  watch,
  nextTick,
  useSlots,
  computed,
  onActivated,
  createVNode,
} from 'vue';
import { ElMessageBox, ElMessage, ElTableColumn } from 'element-plus';
import {
  isElTableColumn,
  exportSheet,
  getPageData,
  checkResData,
  isDataColumn,
  isFunction,
  download,
} from './util';
import ChTableToolbar from './component/ch-table-toolbar';
import { useWindowSize } from '@vueuse/core';

const props = defineProps({
  // 查询参数
  queryParams: { type: Object, default: {} },
  // 数据源
  data: { type: [Array, Function] },
  // 列配置
  columns: { type: Array, default: [] },
  // el-pagination组件参数
  page: { type: [Object, Boolean], default: {} },
  // 后端数据加载完成时回调
  loadComplete: { type: Function },
  // 是否带边框
  border: { type: Boolean, default: true },
  // 表格大小
  size: { type: String, default: 'default' },
  // 右上角工具条，可选 column, focus, export
  toolbar: { type: [Boolean, Array], default: ['column'] },
  // 高度，为full-100时，表格高度为浏览器窗口高度-100px
  height: { type: String },
  // 高亮当前行
  highlightCurrentRow: { type: Boolean, default: true },
  // 高亮选中行
  highlightCheckedRow: { type: Boolean, default: true },
  rowClassName: { type: String, Function },
  // 初始化时是否加载数据
  initLoad: { type: Boolean, default: true },
  // keepAlive 读取后是否加载数据
  keepAliveReLoad: { type: Boolean, default: true },
  // 默认排序
  defaultSort: { type: Object, default: {} },
  // rowKey
  rowKey: { type: String, default: null },
  // 跨页多选 todo
  crossPageSelection: { type: Boolean, default: true },
  // 展示序号
  showIndexNum: { type: Boolean, default: true },
  // 前端或后端导出，前端暂未实现
  exportType: {
    type: String,
    default: 'back',
    validator(value) {
      return ['back', 'front'].includes(value);
    },
  },
  // 导出数据源，后端导出时给定url字符串，前端导出不需要配置
  exportUrl: { type: String },
  // 后端导出请求参数配置
  exportProps: {
    type: Object,
    default: {
      paramKey: 'excelList',
      value: 'value',
      name: 'name',
      method: 'POST',
    },
  },
  // 导出列配置
  exportColumns: { type: Array, default: [] },
});
const emit = defineEmits(['done', 'sortChange', 'export', 'selectionChange']);
const slots = useSlots();

// 列配置是否通过插槽传入
const columnConfigBySlots = !props.columns || props.columns.length === 0;
// 是否后端数据源
const isBack = !Array.isArray(props.data);

// 列配置通过插槽传入
let originColumnVnodes = []; // 原始列vnode
const columnVnodes = ref([]); // 渲染函数返回的vnode
const key = ref(0);

// 列配置通过columns传入
let originColumns = []; // 原始列配置
const localColums = ref([]);

// 参与筛选的列配置
const filterColumns = ref([]);

// 表格相关
const tableRef = ref(); // 表格组件实例
const localData = ref([]); // 表格数据
const loading = ref(false);
const emptyText = ref('暂无数据');
const localPage = reactive({
  background: true,
  currentPage: 1,
  pageSize: 10,
  total: 0,
  layout: 'total, sizes, prev, pager, next, jumper',
  pageSizes: [10, 20, 30, 40, 50, 100],
}); // 分页配置
const localHeight = ref(props.height); // 高度
const exportLoading = ref(false);

// 后端排序
let localField = null; // 排序字段
let localOrder = null; // 排序方式

// 列缓存key
const columnCacheKey = `columnCache-${location.hash}-${props?.data?.name}`;
// 每页数量缓存key
const pageSizeCacheKey = `pageSizeCache-${location.hash}-${props?.data?.name}`;
// 导出列缓存key
const exportColumnCahcheKey = `exportColumnCache-${location.hash}-${props?.data?.name}`;

initPage();
initColumn();
initData();
initHeight();

/**
 * 合并默认分页配置，监听分页变化
 */
function initPage() {
  if (props.page) {
    Object.assign(localPage, props.page);
    const pageSizeCache = localStorage.getItem(pageSizeCacheKey);
    if (pageSizeCache) {
      localPage.pageSize = parseInt(pageSizeCache);
    }

    watch([() => localPage.pageSize, () => localPage.currentPage], () => {
      localStorage.setItem(pageSizeCacheKey, localPage.pageSize + '');
      if (localPage.total !== 0) {
        isBack ? load() : getFrontPageData();
      }
    });
  }
}

/**
 * 处理列配置
 */
function initColumn() {
  // 读取筛选列缓存
  let visibleColumnsCache = [];
  let invisibleColumnsCache = [];
  const columnCacheStr = localStorage.getItem(columnCacheKey);
  if (columnCacheStr) {
    const columnCache = JSON.parse(columnCacheStr);
    visibleColumnsCache = columnCache?.visible;
    invisibleColumnsCache = columnCache?.invisible;
  }

  if (columnConfigBySlots) {
    watch(
      slots.default,
      (value) => {
        originColumnVnodes.splice(0);
        columnVnodes.value.splice(0);
        filterColumns.value.splice(0);

        let vnodes = slots.default?.();
        if (!vnodes || vnodes.length === 0) {
          return;
        }
        if (vnodes[0].key === '_default') {
          vnodes = vnodes[0].children || [];
        }

        if (props.showIndexNum) {
          const indexVnodeProp = {
            type: 'index',
            showOverflowTooltip: true,
            label: '序号',
            width: '60',
            index: getIndex,
          };
          const indexVnode = createVNode(ElTableColumn, indexVnodeProp);
          if (vnodes[0].props?.type === 'selection') {
            vnodes.splice(1, 0, indexVnode);
          } else {
            vnodes.unshift(indexVnode);
          }
        }

        vnodes.forEach((vnode) => {
          const props = vnode.props;
          if (props && isElTableColumn(vnode)) {
            originColumnVnodes.push(vnode);
            if (visibleColumnsCache.includes(props.prop)) {
              props.invisible = false;
            }
            if (invisibleColumnsCache.includes(props.prop)) {
              props.invisible = true;
            }
            props.invisible = props.invisible === '' || !!props.invisible;

            // 默认居中对齐
            vnode.props.align = vnode.props.align || 'center';
            // 后端接口排序自动填充sortable='custom'
            if (vnode.props.sortable === '' || vnode.props.sortable) {
              // vnode.props.sortOrders = ['ascending', 'descending'];

              if (isBack) {
                vnode.props.sortable = 'custom';
              }
            }
            // 过滤出可见列
            if (!props.invisible) {
              columnVnodes.value.push(vnode);
            }

            // 过滤出参与筛选的列
            if (isDataColumn(props)) {
              filterColumns.value.push({
                prop: props.prop,
                label: props.label,
                invisible: props.invisible,
              });
            }
          }
        });
      },
      { immediate: true }
    );
  } else {
    watch(
      () => props.columns,
      (value) => {
        originColumns.splice(0);
        localColums.value.splice(0);
        filterColumns.value.splice(0);

        props.columns.forEach((item) => {
          originColumns.push(item);
          if (visibleColumnsCache.includes(item.prop)) {
            item.invisible = false;
          }
          if (invisibleColumnsCache.includes(item.prop)) {
            item.invisible = true;
          }
          item.invisible = item.invisible === '' || !!item.invisible;

          // 默认居中对齐
          item.align = item.align || 'center';
          // 后端接口排序自动填充sortable='custom'
          if (item.sortable === '' || item.sortable) {
            // item.sortOrders = ['ascending', 'descending'];

            if (isBack) {
              item.sortable = 'custom';
            }
          }

          // 过滤出可见列
          if (!item.invisible) {
            localColums.value.push(item);
          }

          // 过滤出参与筛选的列
          if (isDataColumn(item)) {
            filterColumns.value.push({
              prop: item.prop,
              label: item.label,
              invisible: item.invisible,
            });
          }
        });
      },
      { immediate: true }
    );
  }
}

/**
 * 初始化数据
 */
function initData() {
  localOrder = props.defaultSort.order;
  localField = props.defaultSort.prop;

  if (isBack) {
    if (props.initLoad) {
      load();
    }
  } else {
    getFrontPageData();
  }
}

//是否开启 keepAlive
let keepAlive = false;
onActivated(() => {
  // 调用时机为首次挂载
  // 以及每次从缓存中被重新插入时
  //首次挂载不执行
  if (keepAlive && props.keepAliveReLoad) {
    initData();
  }
  keepAlive = true;
});

/**
 * height参数为full-100类型时，动态计算高度
 */
function initHeight() {
  if (props.height && props.height.startsWith('full-')) {
    const subHeight = parseInt(props.height.split('-')[1]);
    const { height } = useWindowSize();

    localHeight.value = height.value - subHeight;
    watch(height, (value) => {
      localHeight.value = value - subHeight;
    });
  }
}

/**
 * 筛选列改变
 */
function columnChange(visibleColumns, invisibleColumns) {
  if (columnConfigBySlots) {
    columnVnodes.value = originColumnVnodes.filter(
      (item) => !item.props.prop || visibleColumns.includes(item.props.prop)
    );
  } else {
    localColums.value = originColumns.filter(
      (item) => !item.prop || visibleColumns.includes(item.prop)
    );
  }

  // 持久化列筛选，以当前url和数据加载函数名作为key
  if (isBack) {
    localStorage.setItem(
      columnCacheKey,
      JSON.stringify({
        visible: visibleColumns,
        invisible: invisibleColumns,
      })
    );
  }

  // 对 Table 进行重新布局
  nextTick(tableRef.value.doLayout);
}

/**
 * 列渲染函数，返回vnode数组，
 * 当渲染函数依赖的变量改变时则自动执行渲染函数
 */
const ColumnRender = () => columnVnodes.value;

/**
 * el-table-column 是通过 onMounted 与 onUnmounted 两个生命周期将列数据同步给 el-table 的。
 * 但 Vue 会尽可能利用旧的实例，只会更新实例上的数据，而不是销毁重新创建。这就导致 onMounted 与 onUmmounted 无法运行
 * 从而会产生 el-table 中的列数据与 el-table-column 不一致
 * 故此处通过更新 key 来强制重新创建 el-table-column。
 *
 * 如果没有这段代码，筛选列后会丢失el-table-column的插槽数据
 */
if (columnConfigBySlots) {
  watch(columnVnodes, () => (key.value += 1));
}

/**
 * 后端加载数据
 */
function load() {
  if (!isBack) return;
  loading.value = true;
  if (props.page) {
    props.queryParams.pageNum = localPage.currentPage;
    props.queryParams.pageSize = localPage.pageSize;
  }
  props.queryParams.orderByColumn = localField;
  props.queryParams.isAsc = localOrder;

  props
    .data(props.queryParams)
    .then((res) => {
      loading.value = false;
      if (props.loadComplete) {
        props.loadComplete(res);
      }

      const errorText = checkResData(res);
      if (errorText) {
        emptyText.value = errorText;
        return;
      }

      if (res.code === 0 || res.code === 200) {
        localData.value = res.data || res.list || res.rows;
        localPage.total = res.total;

        renderDone({
          data: res.data,
          pageNum: localPage.currentPage,
          pageSize: localPage.pageSize,
          total: localPage.total,
        });
      }
    })
    .catch((err) => {
      loading.value = false;
    });
}

/**
 * 后端排序
 */
function sortChange({ column, prop, order }) {
  emit('sortChange', { column, prop, order });
  if (!isBack) {
    return;
  }
  localField = prop;
  localOrder = order;
  load();
}

const selectedRow = ref([]);

function handleSelectionChange(selection) {
  emit('selectionChange', selection);
  selectedRow.value = selection;
}

function getRowClassName({ row, rowIndex }) {
  const classes = [];
  if (
    props.highlightCheckedRow &&
    selectedRow.value.findIndex((item) => {
      return row == item;
    }) >= 0
  ) {
    classes.push('selected-row');
  }
  const rowClassName = props.rowClassName;
  if (typeof rowClassName === 'string') {
    classes.push(rowClassName);
  } else if (typeof rowClassName === 'function') {
    classes.push(
      rowClassName.call(null, {
        row,
        rowIndex,
      })
    );
  }
  return classes;
}

function getIndex(index) {
  if (props.page) {
    return (localPage.currentPage - 1) * localPage.pageSize + (index + 1);
  } else {
    return index + 1;
  }
}

/**
 * 获取前端分页数据
 */
function getFrontPageData() {
  if (props.page) {
    localPage.total = props.data?.length || 0;
    localData.value = getPageData(
      props.data,
      localPage.currentPage,
      localPage.pageSize
    );
  } else {
    localData.value = props.data || [];
  }

  renderDone({
    data: localData.value,
    pageNum: localPage.currentPage,
    pageSize: localPage.pageSize,
    total: localPage.total,
  });
}

/**
 * 监听前端数据
 */
if (!isBack) {
  watch([() => props.data.length, () => props.data], () => {
    getFrontPageData();
  });
}

/**
 * 表格渲染完成
 */
function renderDone(param) {
  nextTick(() => {
    emit('done', param);
  });
}

/**
 * 重新加载数据
 * 外部将props.queryParams设置为{}后调用load，props.queryParams并没有立即变为{}，暂时不知道为什么
 * 所以这里用nextTick
 */
function reload() {
  nextTick(load);
}

/**
 * 导出
 */
function exportData(columns, fileName) {
  exportLoading.value = true;
  if (props.exportType === 'back') {
    if (!props.exportUrl) {
      console.error('后端导出缺少exportUrl参数');
      return;
    }

    const params = { ...props.queryParams };
    params[props.exportProps.paramKey] = columns.map((item) => {
      const temp = {};
      temp[props.exportProps.name] = item.label;
      temp[props.exportProps.value] = item.prop;
      return temp;
    });
    delete params.pageNum;
    delete params.pageSize;
    console.log('exportData params', params);

    download({
      url: props.exportUrl,
      name: fileName + '.xlsx',
      params,
      complete: () => {
        exportLoading.value = false;
      },
    });
  }
  //   if (!props.exportData) {
  //     return;
  //   }
  //
  //   if (props.exportFront) {
  //     if (filterColumns.value.length === 0) {
  //       return;
  //     }
  //
  //     let columns = [];
  //     if (columnConfigBySlots) {
  //       columns = columnVnodes.value
  //         .filter((item) => isDataColumn(item.props))
  //         .map((item) => {
  //           return { label: item.props.label, prop: item.props.prop };
  //         });
  //     } else {
  //       columns = originColumns.value
  //         .filter((item) => isDataColumn(item))
  //         .map((item) => {
  //           return { label: item.label, prop: item.prop };
  //         });
  //     }
  //
  //     const data = [];
  //     const titles = columns.map((item) => item.label);
  //     data.push(titles);
  //
  //     props
  //       .exportData(props.queryParams)
  //       .then((res) => {
  //         if (res.code === 200 || res.code === 0) {
  //           const resData = res.data || res.list || res.rows;
  //           resData.forEach((item) => {
  //             const arr = [];
  //             columns.forEach((column) => {
  //               arr.push(item[column.prop]);
  //             });
  //             data.push(arr);
  //           });
  //           exportSheet(data);
  //           // ElMessage.success('导出成功')
  //         }
  //       })
  //       .catch((err) => {
  //         ElMessage.error('导出失败');
  //       });
  //   } else {
  //     // ajax下载 todo
  //   }
}

defineExpose({
  reload,
  // 手动清除表格数据
  clearData: () => {
    localData.value = [];
    localPage.total = 0;
  },
  clearSelection: () => tableRef.value.clearSelection(),
  getSelectionRows: () => tableRef.value.getSelectionRows(),
  toggleRowSelection: (row, selected) =>
    tableRef.value.toggleRowSelection(row, selected),
  toggleAllSelection: () => tableRef.value.toggleAllSelection(),
  toggleRowExpansion: (row, expanded) =>
    tableRef.value.toggleRowExpansion(row, expanded),
  setCurrentRow: (row) => tableRef.value.setCurrentRow(row),
  clearSort: () => tableRef.value.clearSort(),
  clearFilter: (columnKeys) => tableRef.value.clearFilter(columnKeys),
  doLayout: () => tableRef.value.doLayout(),
  sort: (prop, order) => tableRef.value.sort(prop, order),
});
</script>

<style lang="scss">
.ch-table {
  .el-table thead th {
    //background-color: #eef2f9 !important;
    //background-color: var(--el-color-primary-light-9) !important;
  }

  .ch-table-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    //padding: 5px 0;
    margin-bottom: 8px;
  }

  .ch-table-header-right {
    display: flex;
    align-items: center;
  }

  .ch-table-pagination {
    margin-top: 12px;
    display: flex;
    flex-direction: row;
    justify-content: right;
  }

  //.el-table__body tr.current-row>td.el-table__cell{
  //  border-top: 1px solid var(--el-color-primary);
  //  border-bottom: 1px solid var(--el-color-primary);
  //}
  //
  //.el-table__body tr.current-row>td.el-table__cell:first-child{
  //  border-left: 1px solid var(--el-color-primary);
  //}
  //
  //.el-table__body tr.current-row>td.el-table__cell:last-child{
  //  border-right: 1px solid var(--el-color-primary);
  //}
  //
  //.el-table--enable-row-hover .el-table__body tr.current-row:hover>td.el-table__cell {
  //  background-color: var(--el-table-current-row-bg-color);
  //}

  .el-table__body tr.current-row > td.el-table__cell {
    background-color: var(--el-color-primary-light-8);
    //background-color: var(--el-table-current-row-bg-color);
  }

  .el-table__body tr.selected-row > td.el-table__cell {
    background-color: var(--el-color-success-light-7);
    //background-color: var(--el-table-current-row-bg-color);
  }
}
</style>

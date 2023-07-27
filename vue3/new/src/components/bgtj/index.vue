<template>
  <ch-card>
    <ch-table
      ref="tableRef"
      v-loading="loading"
      :data="dataList"
      :toolbar="['column']"
      :loadComplete="(res) => emit('loadComplete', { ...res })"
    >
      <template #headerRight>
        <el-button v-show="fhcs.length > 1" icon="arrow-left" class="pan-back-btn" @click="getLastSlkhyjData">
          返回
        </el-button>
        <ch-xfjsx-tip></ch-xfjsx-tip>
      </template>
      <el-table-column align="center" prop="jgmc" label="统计项目">
        <template #default="scope">
          <span class="text_1" @click="handleLower(scope.row.jgid, scope.row.jgcj)">{{ scope.row.jgmc }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="jc" label="件次">
        <template #default="scope">
          <span class="text_1" @click="openDialog(scope.row)">{{ scope.row.jc }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="rc" label="人次">
        <template #default="scope">
          <span>{{ scope.row.rc }}</span>
        </template>
      </el-table-column>
    </ch-table>
    <el-dialog
      v-model="reminderVisible"
      v-if="reminderVisible"
      draggable
      title="明细"
      width="80%"
      height="80%"
      append-to-body
    >
      <ch-table
        ref="tableRef"
        :queryParams="queryParams"
        :data="cxjsList"
        exportUrl="/ytzl/case/info/listSearchExport"
        :toolbar="['column', 'export']"
        :exportColumns="exportColumns"
        :loadComplete="(res) => emit('loadComplete', { ...res })"
        @row-dblclick="handleRowDblclick"
        @selectionChange="(rows) => (selection = rows)"
      >
        <template #headerRight>
          <ch-xfjsx-tip></ch-xfjsx-tip>
        </template>

        <el-table-column type="selection"></el-table-column>
        <el-table-column align="center" prop="id" label="纠纷编号" width="120"></el-table-column>
        <el-table-column align="center" prop="disputeProduceTime" width="220" label="申请时间"></el-table-column>
        <el-table-column align="center" prop="applyUser" width="150" label="姓名"></el-table-column>

        <el-table-column align="center" prop="sbr" width="220" label="上报单位">
          <template #default="scope">
            <span v-show="scope.row.sfsb === '1'">{{ scope.row.sbjg + '(' + scope.row.sbr + ')' }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="address" width="180" label="问题属地"></el-table-column>
        <el-table-column align="center" prop="disputeType" width="120" label="纠纷类型">
          <template #default="scope">
            <dict-tag :options="mdtj_jflx" :value="scope.row.disputeType" />
          </template>
        </el-table-column>
        <el-table-column prop="disputeContent" label="纠纷简要情况" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column align="center" width="180" label="纠纷状态">
          <template #default="scope">
            <dict-tag :options="mdtj_jfzt" :value="scope.row.caseStatusCode" />
          </template>
        </el-table-column>
      </ch-table>
    </el-dialog>
  </ch-card>
</template>
<script setup name="bgtj">
import ChTable from '@/components/basic/ChTable';
import { Page } from '@/api/mdtj/common/constant';
import { cxjsList, getCaseDqtjData } from '@/api/mdtj/xfbl';
import useQueryParams from '@/hooks/useQueryParams';
import { getQueryObject } from '@/utils';
import { ElMessage, ElMessageBox } from 'element-plus';
import { watch } from 'vue';
const { proxy } = getCurrentInstance();
const emit = defineEmits(['loadComplete']);
const {
  mdtj_dsrlx,
  base_zjlx,
  sys_user_sex,
  base_mz,
  mdtj_jflx,
  mdtj_jfly,
  mdjt_jfyzcd,
  mdtj_jfzt,
  mdtj_progress,
  mdtj_tsqt,
} = proxy.useDict(
  'mdtj_dsrlx',
  'base_zjlx',
  'sys_user_sex',
  'base_mz',
  'mdtj_jflx',
  'mdtj_jfly',
  'mdjt_jfyzcd',
  'mdtj_jfzt',
  'mdtj_progress',
  'mdtj_tsqt'
);

const disputeProduceTime = ref('');
const fhcs = ref([]); //点击返回时候传递的参数
const dataList = ref([]);
let parentId = 32091;
const loading = ref(true);
const reminderVisible = ref(false);
const params = ref({
  parentId: 32091,
});
watch(
  fhcs.value,
  (val) => {
    console.log('val', val);
  },
  {
    deep: true,
  }
);
const getData = () => {
  loading.value = true;
  getCaseDqtjData({
    parentId: parentId,
  })
    .then((res) => {
      dataList.value = res.data;
      loading.value = false;
    })
    .catch(() => {
      loading.value = false;
    });
};
const init = () => {
  fhcs.value.push(parentId);
  getData();
};
init();

const handleLower = (jgId, jgcj) => {
  if (jgcj >= 5) {
    ElMessage.warning('当前已是最后一层级');
  } else {
    // params.value.parentId = jgId;
    parentId = jgId;
    init();
  }
};
const getLastSlkhyjData = () => {
  fhcs.value = fhcs.value.slice(0, fhcs.value.length - 1);
  parentId = fhcs.value.length ? fhcs.value[fhcs.value.length - 1] : '32091';
  //   params.value = fhcs.value.length ? fhcs.value[fhcs.value.length - 1] : { parentId: 32091 };
  console.log('fhcs>>', fhcs.value);
  getData();
};
// 查询
const { queryParams, resetAndQuery } = useQueryParams(query, {});
console.log('queryParams>>>', queryParams);
const openDialog = (row) => {
  console.log('row', row.jgbm);
  console.log('queryParams', queryParams);
  queryParams.jgbm = row.jgbm;
  query();
  reminderVisible.value = true;
};
const handleRest = () => {
  disputeProduceTime.value = '';
  resetAndQuery();
};
watch(
  () => disputeProduceTime.value,
  (newVal) => {
    console.log('newVal', newVal);
    console.log('queryParams', queryParams);
    if (newVal && newVal.length === 2) {
      queryParams.disputeProduceTimeBegin = newVal[0];
      queryParams.disputeProduceTimeEnd = newVal[1];
    } else {
      queryParams.disputeProduceTimeBegin = undefined;
      queryParams.disputeProduceTimeEnd = undefined;
    }
  },
  { deep: true, immediate: true }
);
// 表格
const tableRef = ref();
const selection = ref([]);
const exportColumns = [
  { prop: 'id', label: '纠纷编号' },
  { prop: 'disputeProduceTime', label: '申请时间' },
  { prop: 'applyUser', label: '姓名' },
  { prop: 'sbr', label: '上报单位' },
  { prop: 'address', label: '问题属地' },
  { prop: 'disputeType', label: '纠纷类型' },
  { prop: 'disputeContent', label: '纠纷简要情况' },
];
const plzjbVisible = ref(false);
const plgzVisible = ref(false);
const ffrDialogVisible = ref(false);

function query() {
  tableRef.value.reload();
}
const handleRowDblclick = () => {};
</script>
<style lang="scss" scoped>
.text_1 {
  color: #1765d2;
  cursor: pointer;
}
</style>

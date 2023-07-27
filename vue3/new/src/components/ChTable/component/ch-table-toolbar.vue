<!--
表格头部右侧操作按钮

@author libaogang
@date 2022-02-23 10:44
-->
<template>
  <div class="ch-table-tool-bar">
    <!--    <el-button-group>-->
    <el-button
      v-if="toolbar.includes('export')"
      type="success"
      :loading="exportLoading"
      :disabled="exportLoading"
      @click="exportVisible = true"
    >
      <el-icon :size="16" v-if="!exportLoading">
        <Download />
      </el-icon>
      {{ exportLoading ? '正在导出' : '导出' }}
    </el-button>

    <el-popover
      v-if="toolbar.includes('column')"
      placement="bottom"
      popper-class="ch-table-tool-bar-column"
      trigger="click"
    >
      <template #reference>
        <el-button type="primary">
          <el-icon :size="16">
            <Operation />
          </el-icon>
          筛选列
        </el-button>
      </template>

      <el-checkbox-group v-model="selectedColumn" @change="columnChange">
        <el-checkbox
          v-for="column in columns"
          :key="column.prop"
          :label="column.prop"
        >
          {{ column.label }}
        </el-checkbox>
      </el-checkbox-group>
    </el-popover>
    <!--    </el-button-group>-->

    <!--  导出弹窗  -->
    <el-dialog
      width="600px"
      title="导出"
      custom-class="ch-table-export-dialog"
      v-model="exportVisible"
      destroy-on-close
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-checkbox-group v-model="checkedExportColumns">
        <el-checkbox
          v-for="column in exportColumns"
          :label="column.prop"
          :key="column.prop"
        >
          {{ column.label }}
        </el-checkbox>
      </el-checkbox-group>

      <div class="ch-table-export-fileinput">
        <el-form
          label-width="70px"
          ref="formRef"
          :model="form"
          :rules="{
            fileName: [
              { required: true, message: '请输入导出文件名' },
              { max: 50, message: '长度不超过50个字' },
            ],
          }"
        >
          <el-row>
            <el-col :span="24">
              <el-form-item label="文件名:" prop="fileName">
                <el-input
                  v-model="form.fileName"
                  placeholder="请输入导出文件名"
                >
                  <template #append>.xlsx</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <template #footer>
        <div style="text-align: center">
          <el-button style="width: 100px" @click="exportVisible = false">
            取 消
          </el-button>
          <el-button style="width: 100px" type="primary" @click="expotData">
            导 出
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';

const props = defineProps({
  // 筛选列配置
  columns: { type: Array, default: () => [] },
  // 导出列配置
  exportColumns: { type: Array, default: () => [] },
  // 导出加载状态
  exportLoading: { type: Boolean, default: false },
  // 导出列缓存key
  exportColumnCahcheKey: { type: String },
  // 按钮配置: column, export
  toolbar: {
    type: [Boolean, Array],
    default: () => ['column'],
  },
});
const emit = defineEmits(['columnChange', 'expotData']);
const exportVisible = ref(false);
const size = ref('20px');
const formRef = ref();
const form = ref({
  fileName: null,
});

// 筛选列选中的列
const selectedColumn = ref(
  props.columns.filter((item) => !item.invisible).map((item) => item.prop)
);

/**
 * 筛选列改变
 */
function columnChange(visibleColumns) {
  const invisibleColumns = props.columns
    .filter((item) => !visibleColumns.includes(item.prop))
    .map((item) => item.prop);
  emit('columnChange', visibleColumns, invisibleColumns);
}

// 导出列选中的列
const checkedExportColumns = ref([]);

// 加载缓存
const exportColumnCacheStr = localStorage.getItem(props.exportColumnCahcheKey);
if (exportColumnCacheStr) {
  const temp = JSON.parse(exportColumnCacheStr);
  checkedExportColumns.value = temp.exportColumns;
  form.value.fileName = temp.fileName;
} else {
  checkedExportColumns.value = props.exportColumns
    .filter((item) => item.check !== false)
    .map((item) => item.prop);
}

// 导出
function expotData() {
  if (checkedExportColumns.value.length === 0) {
    ElMessage.warning('请选择导出列');
    return;
  }

  formRef.value.validate().then((valid) => {
    if (!valid) return;
    const data = props.exportColumns.filter((item) =>
      checkedExportColumns.value.includes(item.prop)
    );
    exportVisible.value = false;

    // 设置缓存
    localStorage.setItem(
      props.exportColumnCahcheKey,
      JSON.stringify({
        fileName: form.value.fileName,
        exportColumns: checkedExportColumns.value,
      })
    );
    emit('expotData', [...data], form.value.fileName);
  });
}
</script>
<style lang="scss">
.ch-table-tool-bar {
  margin-left: 6px;

  & > i {
    margin-left: 10px;
    cursor: pointer;
    color: #515a6e;
  }

  .el-button + .el-button {
    margin-left: 6px;
  }

  .el-checkbox {
    margin-right: 20px;
  }
}

.ch-table-tool-bar-column {
  .el-checkbox {
    height: 28px;
  }

  .el-checkbox__input.is-checked + .el-checkbox__label {
    color: var(--el-checkbox-text-color);
  }
}

.ch-table-export-dialog {
  .el-dialog__body {
    position: relative;
    min-height: 250px;
    max-height: 80vh;
  }

  .ch-table-export-fileinput {
    position: absolute;
    bottom: 10px;
    left: 20px;
    right: 20px;
  }
}
</style>

<!--
个人待办列表
@author
-->
<template>
  <ch-card>
    <el-form label-width="100px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="纠纷编号">
            <el-input v-model="queryParams.id" placeholder="请输入纠纷编号" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="申请时间">
            <el-date-picker
              style="width: 100%"
              v-model="disputeProduceTime"
              range-separator="至"
              type="daterange"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              start-placeholder="请选择开始时间"
              end-placeholder="请选择结束时间"
            ></el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="纠纷来源">
            <ch-dict v-model="queryParams.disputeFrom" :dict="mdtj_jfly" placeholder="请选择纠纷来源" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="纠纷类型">
            <ch-dict v-model="queryParams.disputeType" :dict="mdtj_jflx" placeholder="请选择纠纷类型" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="严重程度">
            <ch-dict
              v-model="queryParams.disputeServerity"
              :dict="mdjt_jfyzcd"
              placeholder="请选择严重程度"
              clearable
            />
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="调解结果">
            <ch-dict
              v-model="queryParams.caseProgressCode"
              :dict="mdtj_progress"
              placeholder="请选择调解结果"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="申请人">
            <el-input v-model="queryParams.userName" placeholder="请输入申请人姓名" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-button icon="Search" type="primary" @click="query">查询</el-button>
            <el-button icon="Refresh" @click="handleRest">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
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
  </ch-card>
</template>
<script setup name="zhyx">
import ChTable from '@/components/basic/ChTable';
import { Page } from '@/api/mdtj/common/constant';
import { cxjsList } from '@/api/mdtj/xfbl';
import useQueryParams from '@/hooks/useQueryParams';
import { getQueryObject } from '@/utils';

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

// 查询
const { queryParams, resetAndQuery } = useQueryParams(query, {});
console.log('queryParams>>>', queryParams);
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

/**
 * xyjddm 下一节点代码就是流程状态
 */
function handleRowDblclick(row) {
  proxy.$tab.openPage(`${Page.MDBL.value}?id=${row.id}&taskId=${row.taskId}&dqjd=${row.dqjd}`);
}

function handleFenfaSubmit({ ffr, ffrid }) {
  const rwid = selection.value[0].rwid;
  const data = {
    qxrid: ffrid,
    qxr: ffr,
    rwid,
  };
}
</script>

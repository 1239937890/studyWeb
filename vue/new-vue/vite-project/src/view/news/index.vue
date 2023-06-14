<template>
  <div>
    <el-button type="primary" @click="zyldDialogShow = true">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-dialog
      :title="`主要领导${ldTitle}`"
      v-model="zyldDialogShow"
      width="780px"
      append-to-body
      draggable
      @open="handlerClose('zyldSpRef')"
      @close="handlerClose('zyldSpRef')"
    >
      <el-form
        ref="zyldSpRef"
        :model="state.operateParams"
        :rules="state.zyldRules"
        label-width="120px"
      >
        <el-form-item label="选择角色" prop="roleId">
          <el-radio-group
            v-model="state.operateParams.roleId"
            @change="changeUserListRadio"
          >
            <el-radio
              v-for="dict in ld_role"
              :key="dict.value"
              :label="dict.value"
            >
              {{ dict.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="审批领导"
          prop="postLdId"
          v-if="state.operateParams.roleId != 106"
        >
          <el-select
            class="item_width"
            filterable
            clearable
            v-model="state.operateParams.postLdId"
            placeholder="选择领导1"
          >
            <el-option
              v-for="item in ldPerList"
              :key="item.userId"
              :label="item.nickName"
              :value="item.userId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="审批领导" prop="postLdIds" v-else>
          <el-select
            class="item_width"
            filterable
            multiple
            collapse-tags
            collapse-tags-tooltip
            :max-collapse-tags="3"
            clearable
            v-model="state.operateParams.postLdIds"
            placeholder="选择领导1"
            @change="handleChange($event, 'tempLdPerList')"
          >
            <el-option
              v-for="item in ldPerList"
              :key="item.userId"
              :label="item.nickName"
              :value="item.userId"
              :disabled="item.check"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="审阅领导" v-if="state.operateParams.roleId == 106">
          <el-select
            class="item_width"
            filterable
            multiple
            collapse-tags
            collapse-tags-tooltip
            :max-collapse-tags="3"
            clearable
            v-model="state.operateParams.shenyueUserIdArr"
            placeholder="选择领导"
            @change="handleChange($event, 'ldPerList')"
          >
            <el-option
              v-for="item in tempLdPerList"
              :key="item.userId"
              :label="item.nickName"
              :value="item.userId"
              :disabled="item.check"
            />
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="分管审批领导" prop="postLdId">
          <el-select
            class="item_width"
            filterable
            multiple
            collapse-tags
            collapse-tags-tooltip
            :max-collapse-tags="3"
            clearable
            v-model="state.operateParams.postLdId"
            placeholder="选择分管审批领导"
          >
            <el-option
              v-for="item in ldPerList"
              :key="item.userId"
              :label="item.nickName"
              :value="item.userId"
              :disabled="item.check"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="分管审阅领导" prop="shenyueUserIdArr">
          <el-select
            class="item_width"
            filterable
            multiple
            collapse-tags
            collapse-tags-tooltip
            :max-collapse-tags="3"
            clearable
            v-model="state.operateParams.shenyueUserIdArr"
            placeholder="选择分管审阅领导"
          >
            <el-option
              v-for="item in ldPerList"
              :key="item.userId"
              :label="item.nickName"
              :value="item.userId"
              :disabled="item.check"
            />
          </el-select>
        </el-form-item> -->
        <el-form-item :label="`${ldTitle}意见`" prop="remark">
          <el-input
            v-model="state.operateParams.remark"
            :placeholder="`请输入${ldTitle}意见`"
            :autosize="{ minRows: 5, maxRows: 10 }"
            maxlength="800"
            type="textarea"
            clearable
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitZyldSp('zyldSpRef')"
            >确 定</el-button
          >
          <el-button @click="zyldDialogShow = false">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script name="Index" setup>
import { ref, reactive, getCurrentInstance } from "vue";
const currentInstance = getCurrentInstance();
console.log("vue实例>>>", currentInstance);
const ldTitle = ref("审批");
const zyldDialogShow = ref(false);
const ld_role = ref([
  {
    value: 105,
    label: "主要领导",
  },
  {
    value: 106,
    label: "分管领导",
  },
]);
const state = reactive({
  operateParams: {
    roleId: null,
    postLdId: null,
    postLdIds: null,
    shenyueUserIdArr: null,
    remark: null,
  },
  zyldRules: {
    roleId: [
      {
        required: true,
        message: "角色不能为空",
        trigger: "change",
      },
    ],
    postLdId: [
      {
        required: true,
        message: "分管审批领导不能为空",
        trigger: "change",
      },
    ],
    postLdIds: [
      {
        required: true,
        message: "分管审批领导不能为空",
        trigger: "change",
      },
    ],
    shenyueUserIdArr: [
      {
        required: true,
        message: "分管审阅领导不能为空",
        trigger: "change",
      },
    ],
    remark: [
      {
        required: true,
        message: "意见不能为空",
        trigger: "blur",
      },
    ],
  },
  ldPerList: [
    {
      userId: 1,
      nickName: "领导1",
    },
    {
      userId: 2,
      nickName: "领导2",
    },
    {
      userId: 3,
      nickName: "领导3",
    },
    {
      userId: 4,
      nickName: "领导4",
    },
    {
      userId: 5,
      nickName: "领导5",
    },
    {
      userId: 6,
      nickName: "领导6",
    },
  ],
});
const ldPerList = ref([
  {
    userId: 1,
    nickName: "领导1",
  },
  {
    userId: 2,
    nickName: "领导2",
  },
  {
    userId: 3,
    nickName: "领导3",
  },
  {
    userId: 4,
    nickName: "领导4",
  },
  {
    userId: 5,
    nickName: "领导5",
  },
  {
    userId: 6,
    nickName: "领导6",
  },
]);
const tempLdPerList = ref([
  {
    userId: 1,
    nickName: "领导1",
  },
  {
    userId: 2,
    nickName: "领导2",
  },
  {
    userId: 3,
    nickName: "领导3",
  },
  {
    userId: 4,
    nickName: "领导4",
  },
  {
    userId: 5,
    nickName: "领导5",
  },
  {
    userId: 6,
    nickName: "领导6",
  },
]);
const handlerClose = (val) => {
  currentInstance.refs[val].resetFields();
};
// ldPerList.value.forEach((item) => {
//   item.check = false;
// });
// tempLdPerList.value = state.ldPerList.map((item) => {
//   // item.check = false;
//   return item;
// });
//主要领导审批/审阅
const submitZyldSp = (val) => {
  currentInstance.refs[val].validate((valid) => {
    if (!valid) return;
    console.log(state.operateParams);
  });
};
const changeUserListRadio = (val) => {
  state.operateParams.shenyueUserIdArr = null;
  state.operateParams.postLdId = null;
  state.operateParams.postLdIds = null;
  if (val == 106) {
    currentInstance.refs["zyldSpRef"].clearValidate("postLdIds");
  }
};
const handleChange = (e, val) => {
  const arr = val == "ldPerList" ? ldPerList.value : tempLdPerList.value;
  arr.forEach((item) => {
    item.check = false;
  });
  e.forEach((value) => {
    arr.forEach((item) => {
      if (value == item.userId) {
        item.check = true;
      }
    });
  });
};
</script>
<style lang="scss" scoped>
.item_width {
  width: 100% !important;
}
</style>

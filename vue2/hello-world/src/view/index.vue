<template>
  <div class="container">
    <div class="left">
      <div class="add_btn">
        <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">录入</el-button>
      </div>
      <div class="have_list">
        <div class="item" v-for="{ id, title, url, width, height } in dataList" :key="id" @click="handleSelect(url, width, height)">
          <div>{{ title }}</div>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="item" v-for="{ id, url, width, height } in iframeList" :key="id">
        <vue-iframe :src="url" allow="camera *; geolocation *; microphone *; autoplay *" :style="{ width: `${width}px`, height: `${height}px` }" />
      </div>
    </div>
    <el-dialog title="录入" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="组件名称" :label-width="formLabelWidth">
          <el-input v-model="form.title" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="组件地址" :label-width="formLabelWidth">
          <el-input v-model="form.url" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="组件宽度" :label-width="formLabelWidth">
          <el-input v-model="form.width" placeholder="单位px"></el-input>
        </el-form-item>
        <el-form-item label="组件高度" :label-width="formLabelWidth">
          <el-input v-model="form.height" placeholder="单位px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'Index',
  data() {
    return {
      iframeShow: false,
      myIframe: null,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      dataList: [
        {
          id: 1,
          title: '落霞',
          logo: 'https://cdn.pixabay.com/photo/2023/03/27/14/24/british-shorthair-7880908__340.jpg',
          url: 'https://blog.51cto.com/topic/vueqianruwangye.html',
          width: '500',
          height: '500',
        },
        {
          id: 2,
          title: '刹那芳华',
          logo: 'https://cdn.pixabay.com/photo/2023/05/05/11/07/sweet-7972193_640.jpg',
          url: 'https://pro.jd.com/mall/active/3ZYfZKGRAhbHzJySpRriJoGWo8v6/index.html?innerAnchor=100052614865&focus=3',
          width: '500',
          height: '500',
        },
        {
          id: 3,
          title: '惊鸿',
          logo: 'https://cdn.pixabay.com/photo/2023/05/29/12/52/hands-8025984_640.jpg',
          url: 'https://v2.cn.vuejs.org/v2/guide/installation.html',
          width: '500',
          height: '500',
        },
      ],
      form: {
        id: '',
        title: '',
        url: 'https://blog.51cto.com/topic/vueqianruwangye.html',
        width: '500',
        height: '500',
      },
      iframeList: [],
    };
  },
  mounted() {},
  methods: {
    handleSelect(url, width, height) {
      this.iframeList.push({
        id: this.iframeList.length + 1,
        url,
        width,
        height,
      });
    },
    onLoad(frame) {
      console.log('frameframeframe>>>', frame);
      console.log('contentWindow>>>', frame.contentWindow);
      this.myIframe = frame.contentWindow;
    },
    handleConfirm() {
      this.form.id = this.dataList.length + 1;
      this.dataList.push(this.form);
      this.form = {
        id: '',
        title: '',
        url: '',
        width: '200',
        height: '200',
      };
      this.dialogFormVisible = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  height: 100vh;

  .left {
    width: 300px;
    box-shadow: rgba(0, 0, 0, 0.1) 2px 0px 10px;
    background-color: #ffffff;

    .add_btn {
      display: flex;
      justify-content: center;
      padding: 20px 0;
      box-shadow: 0 0 1px rgba(0, 0, 0, 0.25);
    }

    .have_list {
      display: flex;
      flex-wrap: wrap;
      padding: 5px;
      .item {
        margin: 5px;
        font-size: 14px;
        color: #fff;
        padding: 14px 36px;
        border-radius: 8px;
        border: none;
        outline: none;
        -webkit-transition: all 0.6s ease;
        transition: all 0.6s ease;
        position: relative;
        display: inline-block;
        background-color: #fec171;
        cursor: pointer;
      }
    }
  }

  .right {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
  }
}
</style>

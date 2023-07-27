<template>
  <div class="container">
    <div class="left">
      <div class="add_btn">
        <el-button type="primary" icon="el-icon-plus">首页</el-button>
      </div>
      <div class="have_list">
        <div class="item" v-for="{ id, title, url, width, height } in dataList" :key="id">
          <div>{{ title }}</div>
        </div>
      </div>
    </div>
    <div class="right">
      <router-view />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dataList: [],
    };
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
}
</style>

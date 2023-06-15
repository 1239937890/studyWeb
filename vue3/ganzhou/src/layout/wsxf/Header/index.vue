<template>
  <div class="header">
    <div class="left">
      <img src="" alt="" />
      <div class="text_container">
        <div class="row_1">赣州“一网通”网上信访服务平台</div>
        <div class="row_2">GAN ZHOU “ YI WANG TONG ” WANG SHANG XIN FANG FU WU PING TAI</div>
      </div>
    </div>
    <div class="right">
      <img src="" alt="" />
      <span>注册</span>
      <span class="line"></span>
      <span>登录</span>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  $padding-zy12: 0 12%;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: $padding-zy12;
    height: 134px;
    background-color: #0083de;

    .left {
      display: flex;
      align-items: center;

      img {
        margin-right: 20px;
        width: 80px;
        height: 80px;
      }

      .text_container {
        color: #ffffff;

        .row_1 {
          margin-bottom: 6px;
          font-size: 40px;
          font-family: Source Han Sans CN, Source Han Sans CN-Bold;
          font-weight: 700;
        }

        .row_2 {
          font-size: 16px;
          font-family: Arial, Arial-Bold;
          font-weight: 700;
          letter-spacing: .6px;
        }
      }
    }

    .right {
      display: flex;
      align-items: center;
      padding: 5px 10px;
      font-size: 18px;
      color: #ffffff;
      background-color: #0973C2;
      border-radius: 16px;
      cursor: pointer;

      img {
        margin-right: 20px;
        width: 20px;
        height: 20px;
      }

      .line {
        margin: 0 20px;
        width: 2px;
        height: 18px;
        background-color: #ffffff;
      }
    }
  }
</style>
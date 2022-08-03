<template>
    <div class="page">
        <img class="bg-ring" src="@/assets/images/bg-ring.png" />
        <div class="header-title">民福康{{isLogin}}</div>
        <div class="no-login">
            <img v-if="isLogin" class="head-no-login" :src="userInfo.avatar" />
            <img v-else class="head-no-login" :src="headDefault" />
            <div class="head-right">
                <span v-if="isLogin" class="txt-login">{{userInfo.username}}</span>
                <span v-else class="txt-login" @click="hanlderLogin">立即登录</span>
                <span v-if="!isLogin" class="iconfont">&#xe612;</span>
            </div>
        </div>
        <div class="user-total">
            <span>点赞</span>
            <span class="total-num">{{userInfo.liked}}</span>
            <span class="divider_line">|</span>
            <span>收藏</span>
            <span class="total-num">{{userInfo.hide}}</span>
        </div>
        <div class="top">
            <div class="item" v-for="item in centerTopList" :key="item.id">
                <img :src="item.logo" />
                <span>{{item.title}}</span>
            </div>
        </div>
        <div class="center">
            <span class="center-title">我的服务</span>
            <div class="service">
                <div class="item" v-for="item in centerServiceList" :key="item.id">
                    <div>
                        <div class="service-title">{{item.title}}</div>
                        <div class="service-info">{{item.info}}</div>
                    </div>
                    <img :src="item.logo" />
                </div>
            </div>
        </div>
        <div class="bottom">
            <span>使用【民福康】即代表你完全接受我们的</span>
            <span class="agreement">用户协议</span>
        </div>
        <End class="end" />
    </div>
    <BottomNavBar />
</template>
<script setup>
    import BottomNavBar from "@/components/bottomNavBar.vue";
    import End from '@/components/loading/end.vue';
    import {useLogin} from "@/hooks/newLogins";
    import {
        useAllStore
    } from '@/store/index';
    import {
        reactive
    } from 'vue';
    import {
        storeToRefs
    } from 'pinia';
    import {
        getUserUrl
    } from "@/utils/index";
    import {
        headDefault
    } from "@/utils/pic";
    import {
        centerTopList,
        centerServiceList
    } from '@/utils/centerlist.js';
    import {
        userInfo
    } from "@/api/center";
    const allStore = useAllStore()
    console.log('allStore1>>>', allStore)
    console.log('useLogin',useLogin())
    const {hanlderLogin,isLogin} = useLogin()
    console.log('isLogin>>>',isLogin)
    // const {data} = await userInfo()
</script>
<style lang="scss" scoped>
    .page {
        padding-bottom: 98px;
        background: linear-gradient(0deg, #FAFBFC 55%, #C2D8FF 100%);
    }

    .header-title {
        padding-top: 33px;
        padding-left: 34px;
        font-size: 38px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #000000;
    }

    .bg-ring {
        position: absolute;
        top: 0px;
        right: 0px;
        @include w-h(287px, 230px);
    }

    .top {
        height: 178px;
        background: #FFFFFF;
        box-shadow: 3px 5px 24px 0px rgba(213, 214, 218, 0.54);
        border-radius: 30px;
        display: flex;
        margin-left: 30px;
        margin-right: 30px;
        margin-top: 72px;

        .item {
            @include flex(center, center);
            flex-direction: column;
            @include w-h(230px, 178px);
            font-size: 24px;
            font-family: PingFang SC;
            font-weight: 500;
            color: #333333;

            img {
                margin-bottom: 17px;
                @include w-h(54px, 54px);
            }
        }
    }

    .center {
        margin-top: 74px;
    }

    .head-right {
        @include flex(center, center);

        .iconfont {
            margin-left: 5px;
        }
    }

    .center-title {
        margin-left: 30px;
        margin-top: 74px;
        font-size: 34px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #666666;
        line-height: 28px;

    }

    .bottom {
        @include flex(center, center);
        flex-direction: row;
        font-size: 22px;
        margin: 80px 0 40px 0;
        font-family: PingFang SC;
        font-weight: 400;
        color: #C9C9C9;
        line-height: 36px;

        .agreement {
            color: #3578F2;
            font-weight: bold;
            margin-left: 10px;
        }
    }

    .service {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        margin-top: 24px;
        margin-left: 30px;
        margin-right: 30px;

        .item {
            @include flex(flex-start, center);
            @include w-h(336px, 142px);
            margin-bottom: 18px;
            padding-left: 18px;
            background-color: #FFFFFF;
            border-radius: 20px;
            box-sizing: border-box;

            img {
                margin-left: 34px;

                @include w-h(56px, 56px);
            }
        }
    }

    .service-title {
        font-size: 30px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #333333;
        line-height: 28px;
        width: 205px;
    }

    .service-info {
        margin-top: 18px;
        font-size: 22px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #999999;
        line-height: 28px;
        width: 205px;
    }

    .no-login {
        display: flex;
        align-items: center;
        padding-top: 88px;
    }

    .head-no-login {
        margin-left: 35px;
        margin-right: 26px;
        @include w-h(118px, 118px);
        border-radius: 50%;
    }

    .user-total {
        font-size: 28px;
        font-family: PingFang SC;
        font-weight: 400;
        margin-left: 180px;
        color: #999999;
    }

    .total-num {
        font-size: 28px;
        font-family: PingFang SC;
        font-weight: 400;
        margin-left: 10px;
        color: #333333;
    }

    .divider_line {
        margin-left: 44px;
        margin-right: 44px;
    }

    .txt-login {
        font-size: 48px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #333333;
    }

    .end ::v-deep .end {
        margin-top: 50px;
        padding-bottom: 50px;
        background-color: #FAFBFC;
    }
</style>
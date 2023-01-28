<template>
    <div class="header">
        <div class="logo">
            <img src="@/assets/images/index/logo.png" />
        </div>
        <div class="search_container" @click="goSearch">
            <div class="search">
                <span>搜索疾病、医生、医院</span>
                <img :src="search" />
            </div>
        </div>
        <div class="temp_nav"></div>
    </div>
    <main>
        <ul class="nav">
            <li class="item" v-for="item in navList" :key="item.id" @click="handlerLook(item.path)">
                <img :src="item.logo" />
                <span>{{ item.title }}</span>
            </li>
        </ul>
        <van-swipe class="special_container" lazy-render :autoplay="2000" :duration="500" :show-indicators="false">
            <van-swipe-item class="item" v-for="item in state.bannerList" :key="item.banner_id" @click="goPractical(item.position)">
                <img :src="item.pic" />
            </van-swipe-item>
        </van-swipe>
        <div v-if="state.testList.length != 0">
            <div class="title_container">
                <span>健康自检</span>
                <div class="right"></div>
            </div>
            <div class="banner">
                <div class="banner_container">
                    <div class="item" @click="goTesting(state.testList[randomIndex].id)">
                        <img class="logo" :src="lookup" />
                        <div>
                            <span class="title">{{ state.testList[randomIndex].title }}</span>
                            <div class="btn">{{ state.testList[randomIndex].aboutTime }}分钟简单一测</div>
                        </div>
                        <img class="bg" :src="bannerBg" />
                    </div>
                </div>
            </div>
        </div>
    </main>
    <BottomNavBar />
</template>
<script setup lang="ts">
    import { ref, reactive, toRefs, onMounted, onActivated } from 'vue'
    import { getRecommendTests, articleRecommend, getBanner } from '@/api/index'
    import { banner, lookup, search } from '../utils/pic'
    import { navList, knowledgeList } from '@/utils/list.js'
    import { useRouter, useRoute } from 'vue-router'
    import BottomNavBar from '@/components/bottomNavBar.vue'
    interface BannerList {
        banner_id: string | number
        position: string
        pic: string
    }
    interface TestList {
        id: string | number
        title: string
        aboutTime: string
    }
    const router = useRouter()
    const route = useRoute()
    // console.log('router', router)
    // console.log('route', route)
    const bannerBg = banner
    const state: { bannerList: BannerList[]; testList: TestList[] } = reactive({
        bannerList: [],
        testList: [],
    })
    const randomIndex = ref(0)
    const init = async () => {
        const { code: bannerCode, data: bannerData } = (await getBanner()) as any
        if (bannerCode == 200) {
            state.bannerList = bannerData
        }
        const { code: textCode, data: textData } = (await getRecommendTests()) as any
        if (textCode == 200) {
            state.testList = textData
            if (textData.length) {
                const num = textData.length - 1
                randomIndex.value = Math.round(Math.random() * num)
            }
        }
    }
    onActivated(() => {
        console.log('onActivated')
    })
    onMounted(() => {
        console.log('onMounted')
        init()
    })
    const goSearch = () => {
        router.push({
            path: '/search',
            query: {
                id: 9,
            },
        })
    }
    const handlerLook = (path: string) => {}
    const goPractical = (val: string) => {}
    const goTesting = (val: string | number) => {}
</script>
<style lang="scss" scoped>
    .header {
        position: relative;
        height: 350px;
        background: linear-gradient(0deg, #9ab3f5 0%, #3578f2 100%);
    }

    .logo {
        display: flex;

        img {
            margin-right: 8px;
            @include w-h(300px, 134px);
        }
    }

    .search_container {
        padding: 4px 30px 0 30px;

        .search {
            @include flex(space-between, center);
            padding: 0 25px;
            height: 84px;
            font-size: 30px;
            font-family: PingFang SC;
            font-weight: 500;
            color: #999999;
            background-color: #ffffff;
            box-shadow: 0px 6px 10px 0px rgba(108, 142, 220, 0.3);
            border-radius: 12px;

            img {
                @include w-h(48px, 48px);
            }
        }
    }

    .temp_nav {
        position: absolute;
        bottom: -4px;
        left: 0;
        right: 0;
        height: 28px;
        background-color: #fafbfc;
        border-radius: 24px 24px 0px 0px;
    }

    main {
        padding: 20px 30px 134px 30px;
        background-color: #fafbfc;
    }

    .nav {
        display: flex;
        justify-content: space-between;

        .item {
            @include flex(center, center);
            flex-direction: column;
            @include w-h(216px, 216px);
            font-size: 32px;
            font-family: PingFang SC;
            font-weight: bold;
            color: #333333;
            background: #ffffff;
            box-shadow: 0px 8px 35px 0px rgba(186, 198, 217, 0.46);
            border-radius: 16px;

            img {
                margin-bottom: 17px;
                @include w-h(72px, 72px);
            }
        }
    }

    .special_container {
        margin-top: 48px;
        @include w-h(100%, 240px);
        border-radius: 16px;

        .item {
            display: flex;
            @include w-h(100%, 100%);

            img {
                @include w-h(100%, 100%);
            }
        }
    }

    .title_container {
        @include flex(space-between, center);
        margin-top: 48px;
        font-size: 30px;
        color: #666666;

        .right {
            font-size: 24px;

            .iconfont {
                font-size: 24px;
                color: #666666;
            }
        }
    }

    .banner {
        position: relative;

        .dots {
            position: absolute;
            right: 26px;
            bottom: 10px;
            display: flex;

            .dots_item {
                margin-right: 6px;
                @include w-h(10px, 10px);
                background-color: #e8e8e8;
                border-radius: 50%;
            }

            .dots_activity {
                background-color: #cccccc;
            }
        }
    }

    .banner_container {
        margin: 24px 0 0 0;
        @include w-h(100%, 140px);
        border: 1px solid #eeeeee;
        border-radius: 16px;
        background-color: #ffffff;

        .item {
            position: relative;
            @include flex(flex-start, center);
            height: 100%;

            .logo {
                margin: 0 33px;
                @include w-h(62px, 66px);
            }

            .title {
                font-size: 30px;
                font-family: PingFang SC;
                font-weight: 500;
                color: #333333;
            }

            .btn {
                @include flex(center, center);
                @include w-h(186px, 36px);
                margin-top: 16px;
                font-size: 22px;
                font-family: PingFang SC;
                font-weight: 500;
                color: #999999;
                border: 1px solid #999999;
                border-radius: 19px;
            }

            .bg {
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                @include w-h(284px, 100%);
            }
        }
    }

    .title_text {
        margin-top: 48px;
        font-size: 30px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #666666;
    }

    .knowledge {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        margin-top: 24px;

        .item {
            @include flex(flex-start, center);
            @include w-h(336px, 128px);
            margin-bottom: 18px;
            padding-left: 24px;
            background-color: #ffffff;
            border-radius: 12px;
            box-sizing: border-box;

            img {
                margin-right: 15px;
                @include w-h(80px, 80px);
            }
        }
    }

    .knowledge_text .title {
        font-size: 30px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #333333;
    }

    .knowledge_text .info {
        font-size: 24px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #999999;
    }

    .article {
        margin: 24px 0 36px 0;
        padding: 0 15px;
        background-color: #ffffff;
        border-radius: 12px;

        .item {
            position: relative;
            @include flex(flex-start, center);
            padding: 0 17px;
            height: 100px;
            font-family: PingFang SC;
            font-size: 30px;
            font-weight: 500;
            color: #333333;

            span {
                font-family: PingFang SC;
                font-size: 30px;
                font-weight: 500;
            }
        }

        .more {
            @include flex(center, center);
            height: 94px;
            font-size: 24px;
            font-weight: 500;
            color: #666666;

            img {
                margin-left: 10px;
                @include w-h(10px, 18px);
            }
        }
    }
</style>

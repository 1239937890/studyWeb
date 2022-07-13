<template>
    <Pageload :isLoading="loadingShow" />
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
    <div class="main">
        <ul class="nav">
            <li class="item" v-for="item in navList" :key="item.id" @click="handlerLook(item.path)">
                <img :src="item.logo" />
                <span>{{item.title}}</span>
            </li>
        </ul>
        <van-swipe class="special_container" lazy-render :autoplay="2000" :duration="500" :show-indicators="false">
            <van-swipe-item class="item" v-for="item in bannerList" :key="item.banner_id"
                @click="goPractical(item.position)">
                <img :src="item.pic" />
            </van-swipe-item>
        </van-swipe>
        <div v-if="testList.length!=0">
            <div class="title_container">
                <span>健康自检</span>
                <div class="right"></div>
            </div>
            <div class="banner">
                <div class="banner_container">
                    <div class="item" @click="goTesting(testList[randomIndex].id)">
                        <img class="logo" :src="lookup" />
                        <div>
                            <span class="title">{{testList[randomIndex].title}}</span>
                            <div class="btn">{{testList[randomIndex].aboutTime}}分钟简单一测</div>
                        </div>
                        <img class="bg" :src="bannerBg" />
                    </div>
                </div>
            </div>
        </div>
        <div class="title_text">科普知识</div>
        <div class="knowledge">
            <div class="item" v-for="item in knowledgeList" :key="item.id" @click="jumpPage(item.url)">
                <img :src="item.logo" />
                <div class="knowledge_text">
                    <div class="title">{{item.title}}</div>
                    <div class="info">{{item.info}}</div>
                </div>
            </div>
        </div>
        <div v-if="articleList.length&&shield.recommend">
            <div class="title_text">精选推荐</div>
            <div class="article">
                <div class="item" v-for="item in articleList" :key="item.article_id"
                    @click="goArticleDetails(item.article_id)">
                    <span class="row_ellipse">{{item.title}}</span>
                    <div class="half_line"></div>
                </div>
                <div class="more" @click="goArticle">
                    <span>查看更多</span>
                    <img src="@/assets/images/logo-right.png" />
                </div>
            </div>
            <Pageend class="pageend" />
        </div>
    </div>
    <BottomNavBar />
</template>
<script>
    import {
        ref,
        toRefs,
        onMounted,
        reactive
    } from 'vue';
    import {
        useRouter
    } from "vue-router";
    import Pageload from '@/components/loading/pageLoading.vue';
    import BottomNavBar from "@/components/bottomNavBar.vue";
    import Pageend from '@/components/loading/end.vue';
    import {
        banner,
        lookup,
        search
    } from "@/utils/pic";
    import {
        navList,
        knowledgeList
    } from '@/utils/list.js';
    import {
        getRecommendTests,
        articleRecommend,
        getBanner
    } from '@/api/index';
    export default {
        name: 'Home',
        components: {
            Pageload,
            BottomNavBar,
            Pageend
        },
        setup() {
            const router = useRouter()
            const randomIndex = ref(0)
            const loadingShow = ref(true)
            const state = reactive({
                bannerList: [],
                testList: [],
                articleList: []
            })
            const init = async () => {
                const {
                    data: bannerList
                } = await getBanner()
                const {
                    data: testList
                } = await getRecommendTests()
                if (testList.length) {
                    const num = testList.length - 1
                    randomIndex.value = Math.round(Math.random() * num)
                }
                const {
                    data: articleList
                } = await articleRecommend()
                loadingShow.value = false
                state.bannerList = bannerList
                state.testList = testList
                state.articleList = articleList
            }
            onMounted(() => {
                init()
            })
            const goPractical = () => {
                console.log(router)
            }
            return {
                bannerBg: banner,
                lookup,
                search,
                navList,
                knowledgeList,
                randomIndex,
                loadingShow,
                ...toRefs(state),
                goPractical,
                shield: {
                    recommend: true
                }
            }
        },
        mounted() {
            setTimeout(() => {
                console.log('randomIndex', this.randomIndex)
            }, 200)
        },
        methods: {
            handlerLook() {},
            goTesting() {},
            jumpPage() {},
            goArticleDetails() {},
            goArticle() {}
        }
    }
</script>
<style lang="scss" scoped>
    .header {
        position: relative;
        height: 350px;
        background: linear-gradient(0deg, #9AB3F5 0%, #3578F2 100%);
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
            background-color: #FFFFFF;
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
        background-color: #FAFBFC;
        border-radius: 24px 24px 0px 0px;
    }

    .main {
        padding: 20px 30px 134px 30px;
        background-color: #FAFBFC;
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
            background: #FFFFFF;
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
                background-color: #E8E8E8;
                border-radius: 50%;
            }

            .dots_activity {
                background-color: #CCCCCC;
            }
        }
    }

    .banner_container {
        margin: 24px 0 0 0;
        @include w-h(100%, 140px);
        border: 1px solid #EEEEEE;
        border-radius: 16px;
        background-color: #FFFFFF;

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
            background-color: #FFFFFF;
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
        background-color: #FFFFFF;
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
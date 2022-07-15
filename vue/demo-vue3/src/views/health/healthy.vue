<template>
    <Header id="header" ref="headerRef" :leftShow="false" :title="tabTitle" />
    <div class="search" ref="searchRef">
        <Search :type="health" :lookType="health" />
    </div>
    <div class="main">
        <div class="bg">
            <img src="@/assets/images/zhangai.png" />
        </div>
        <div class="is_sticky" :style="{top:`${tabStickyTop}px`}">
            <div class="dep_tabs" id="sticky">
                <van-tabs class="van_tabs" v-model:active="currentIndex" color="#3578F2" title-active-color="#3578F2"
                    title-inactive-color="#999999" line-width="13" line-height="2" @change="tapDep">
                    <van-tab v-for="item in categoryLists" :key="item.id" :title="item.name"></van-tab>
                </van-tabs>
                <div class="right">
                    <div class="transparent"></div>
                </div>
            </div>
            <div class="half_line_box">
                <div class="half_line"></div>
            </div>
        </div>
        <div class="swiper_container">
            <van-swipe ref="swipeRef" :height="swipeHeight" :loop="false" :show-indicators="false" @change="swiperChange">
                <van-swipe-item v-for="item in dataList" :key="item.id">
                    <div v-show="item.isInit" class="skeleton">
                        <div class="row">
                            <van-skeleton avatar :row="3" />
                        </div>
                        <div class="row">
                            <van-skeleton avatar :row="3" />
                        </div>
                        <div class="row">
                            <van-skeleton avatar :row="3" />
                        </div>
                    </div>
                    <List v-show="!item.isInit" :ref="item.ref" :isInit="false" :page="item.page" :limit="limit"
                        :categoryId="item.id" @load="handlerLoad" @getHeight="getHeight" />
                </van-swipe-item>
            </van-swipe>
            <Loading v-show="dataList[currentIndex]&&dataList[currentIndex].isLoading" />
            <End v-show="dataList[currentIndex]&&dataList[currentIndex].isEnd" />
        </div>
    </div>
    <BottomNavBar />
</template>
<script>
    import {
        ref,
        reactive,
        toRefs,
        onMounted,
        onUnmounted
    } from 'vue';
    import healths from './healths';
    import BottomNavBar from "@/components/bottomNavBar.vue";
    import Header from '@/components/navbar/header.vue';
    import Search from '@/components/lookUp/search.vue';
    import List from './components/list.vue';
    import Loading from '@/components/loading/loading.vue';
    import End from '@/components/loading/end.vue';
    import {
        health
    } from '@/utils/scrollType';
    import {
        categoryList
    } from '@/api/index';
    export default {
        name: 'Healthy',
        components: {
            Header,
            Search,
            BottomNavBar,
            List,
            Loading,
            End
        },
        setup() {
            const headerRef = ref(null)
            const searchRef = ref(null)
            const swipeRef = ref(null)
            const {
                handlerDep,
                handlerLoad,
                scrollBottom,
                swiperChange,
                getHeight,
                state: source
            } = healths.setup()
            const state = reactive({
                swipeHeight: 'auto',
                currentIndex: 0,
                categoryLists: [],
                ...source
            })
            const init = async () => {
                const {
                    data
                } = await categoryList()
                handlerDep(0, data)
                state.categoryLists = data
                state.tabStickyTop = headerRef.value.$el.clientHeight + searchRef.value.clientHeight - 1
            }
            const tapDep = () => {
                handlerDep(state.currentIndex)
            }
            window.addEventListener('scroll', scrollBottom); //页面加载时监听滚动事件
            onMounted(() => {
                init()
            })
            onUnmounted(() => {
                console.log('销毁')
                window.removeEventListener('scroll', scrollBottom) //页面离开后销毁监听事件
            })
            return {
                ...toRefs(state),
                tabTitle:'健康自检',
                limit: 10,
                health,
                tapDep,
                handlerDep,
                handlerLoad,
                swiperChange,
                getHeight,
                searchRef,
                headerRef,
                swipeRef
            }
        },
        created() {
            setTimeout(() => {
                console.log(this.dataList)
            }, 200)
        }
    }
</script>
<style lang="scss" scoped>
    .search {
        position: fixed;
        left: 0;
        right: 0;
        z-index: 10;
    }

    .main {
        padding: 144px 0 98px 0;
        background-color: #FFFFFF;
    }

    .half_line_box {
        position: relative;
    }

    .bg {
        display: flex;
        padding: 12px 30px 30px 30px;

        img {
            @include w-h(100%, 200px);
        }
    }

    .is_sticky {
        position: sticky;
        // top: 220px;
        background-color: #FFFFFF;
        z-index: 3;
    }

    .is_fixed {
        position: fixed !important;
        left: 0;
        right: 0;
        left: 0;
        z-index: 10 !important;
    }

    .dep_tabs {
        display: flex;

        .right {
            position: relative;

            .transparent {
                position: absolute;
                top: 20px;
                width: 40px;
                right: 0;
                height: 40px;
                background: linear-gradient(to right, rgba(255, 255, 255, 0.1) 0%, rgb(255, 255, 255) 70%);
            }
        }
    }

    .van_tabs::v-deep(.van-tab--active) {
        font-weight: bold;
    }

    .scroll_x {
        display: flex;
        height: 76px;
        line-height: 76px;
        white-space: nowrap;
        padding: 0 30px;
        font-size: 32px;
        color: #999999;
        background-color: #FFFFFF;
        box-sizing: border-box;

        .item {
            position: relative;
            display: inline-block;
            margin-right: 34px;
            padding: 0 20px;
            font-family: PingFang SC;
            font-weight: 500;
            border-radius: 26px;

            .line {
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                bottom: 0;
                @include w-h(26px, 4px);
                background-color: #4F90F7;
                border-radius: 2px;
            }
        }

        .activity {
            font-weight: bold;
            color: #3578F2;
        }

        .last_item {
            margin-right: 0;
        }
    }

    .swiper_container {
        padding-top: 42px;
    }


    .skeleton {
        padding: 0 30px;

        .row {
            margin-bottom: 48px;
        }
    }

    .warp {
        width: 100%;
        background-color: #FFFFFF;
    }

    .rect {
        display: flex;
        height: 660px;

        .right {
            flex: 1;
            padding: 21px 0;
            background-color: #FFFFFF;

            .item {
                @include flex(space-between, center);
                height: 69px;
                padding: 0 30px;
                font-size: 30px;
                font-family: PingFang SC;
                font-weight: 500;
                color: #333333;
            }

            .icon-xuanze {
                font-size: 44px;
                color: #FFFFFF;
            }

            .activity_item {
                color: #3578F2;
                background-color: #F5F6F7;
            }

            .activity_icon {
                color: #3578F2;
            }
        }
    }

    @import '../../common/style/leftMenu.scss';
</style>
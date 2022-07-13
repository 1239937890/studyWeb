<template>
    <div>
        <div class="list">
            <div ref="item" :class="['item',dataList.length-1==index?'last':'']" v-for="(item,index) in dataList" :key="item.id"
                @click="jumpPage(item.id,item.illnessId)">
                <div class="content">
                    <img class="logo" :src="item.coverImg" />
                    <div class="row_2">
                        <div>
                            <div class="title ellipse">{{item.title}}</div>
                            <div class="row_1">
                                <text>共{{item.questionCount}}题</text>
                                <div class="line"></div>
                                <text>约{{item.aboutTime}}分钟</text>
                            </div>
                        </div>
                        <div class="btn">测一测</div>
                    </div>
                    <img class="item_bg" :src="banner" />
                </div>
            </div>
        </div>
        <div :class="['nothing',isPaddingTop?'nothing_temp':'']" v-if="isNothing">
            <img class="image" :src="nothing1" />
            <text class="text">抱歉, 没找到您想要的内容~</text>
        </div>
    </div>
</template>
<script>
    import {
        getTestsByIll
    } from '@/api/index';
    import handleCdMixin from '@/mixin/handleCdMixin';
    import {
        banner,
        nothing1
    } from "@/utils/pic";
    export default {
        props: {
            isPaddingTop: {
                type: Boolean,
                default: true
            },
            page: {
                type: Number,
                default: 1
            },
            limit: {
                type: Number,
                default: 10
            },
            illnessId: {
                type: String,
                default: ''
            },
            categoryId: {
                type: [String, Number],
                default: ''
            },
            keyword: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                banner,
                nothing1
            }
        },
        mixins: [handleCdMixin],
        methods: {
            getDataList(isLoading) {
                const data = {
                    page: this.page,
                    limit: this.limit,
                    illnessId: this.illnessId,
                    categoryId: this.categoryId,
                    title: this.keyword
                };
                const requestHttp = getTestsByIll;
                this.handlerCommon({
                    isLoading,
                    data,
                    requestHttp,
                    dataType: 'test'
                });
            },
            jumpPage(id, illnessId) {
                uni.navigateTo({
                    url: `/pages/sub/testing/testing?id=${id}&illnessId=${illnessId}`
                });
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import '../../../common/style/nothing.scss';

    .nothing_temp {
        padding-top: 70px;
    }

    .row_2 {
        @include flex(space-between, center);

        .btn {
            @include flex(center, center);
            @include w-h(130px, 56px);
            font-size: 28px;
            font-family: PingFang SC;
            font-weight: bold;
            color: #4E88F1;
            background-color: #E1EEFF;
            border-radius: 28px;
        }
    }

    .list {
        padding: 0 30px;

        .item {
            height: 186px;

            .content {
                position: relative;
                @include flex(flex-start, center);
                margin-bottom: 24px;
                padding: 24px;
                background-color: #FFFFFF;
                border: 1px solid #EEEEEE;
                box-shadow: 2px 3px 24px 0px rgba(213, 214, 218, 0.54);
                border-radius: 10px;
            }

            .logo {
                margin-right: 24px;
                @include w-h(110px, 110px);
                border-radius: 10px;
            }

            .title {
                margin-bottom: 23px;
                width: 372px;
                font-size: 34px;
                font-family: PingFang SC;
                font-weight: 500;
                color: #333333;
            }

            .row_1 {
                @include flex(flex-start, center);
                font-size: 24px;
                color: #999999;

                .line {
                    margin: 0 10px;
                    @include w-h(2px, 20px);
                    background-color: #999999;
                }
            }

            .item_bg {
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                @include w-h(208px, 100%);
            }
        }

        .last {
            margin-bottom: 0;
        }
    }
</style>
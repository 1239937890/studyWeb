<!--
 * @Author: zcj
 * @Autor: Seven
 * @Date: 2022-05-17 10:14:25
 * @LastEditors: Seven
 * @LastEditTime: 2022-06-21 15:33:19
 * @FilePath: \uniDemod:\MFK\mfk-project\mfk-more\src\pages\health\testList.vue
 * @Description: 
 * @Version: 2.0
-->
<template>
    <view class="page">
        <PageLoad :isLoading="loadingShow" />
        <List v-if="flag" ref="list" :isPaddingTop="false" :page="page" :limit="limit" :illnessId="illnessId"
            @load="handlerLoad" />
        <Loading v-show="isLoading" />
        <End v-show="isEnd" />
    </view>
</template>
<script>
    import PageLoad from '@/components/loading/pageLoading';
    import List from './components/list.vue';
    import Loading from '@/components/loading/loading';
    import End from '@/components/loading/end';
    export default {
        data() {
            return {
                page: 1,
                limit: 10,
                illnessId: '',
                isLoading: false,
                isEnd: false,
                lock: false,
                flag: true,
                loadingShow: true
            }
        },
        components: {
            List,
            Loading,
            End,
            PageLoad
        },
        onLoad(options) {
            this.flag = false
            this.illnessId = +options.illnessId
            // uni.setNavigationBarTitle({
            //     title: `${title}测评列表`
            // });
            uni.setNavigationBarTitle({
                title: `测评列表`
            });
            this.flag = true
            this.$nextTick(() => {
                this.$refs['list'].getDataList()
            })
        },
        onReachBottom() {
            this.lower()
        },
        methods: {
            lower() {
                if (!this.isEnd && !this.lock) {
                    this.lock = true
                    this.isLoading = true
                        ++this.page
                    setTimeout(() => {
                        this.$refs['list'].getDataList(true)
                    }, 500)
                }
            },
            handlerLoad(params) {
                if (!params) {
                    return false
                }
                this.isLoading = false
                this.isEnd = params.isMore
                this.lock = params.isMore
                this.loadingShow = false
            }
        }
    }
</script>
<style lang="scss" scoped>
    .page {
        padding-top: 24rpx;
    }
</style>
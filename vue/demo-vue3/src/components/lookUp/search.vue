<!--
 * @Author: zcj
 * @Autor: Seven
 * @Date: 2022-05-12 17:33:24
 * @LastEditors: Seven
 * @LastEditTime: 2022-07-05 14:49:30
 * @FilePath: \uniDemod:\study\vue3\demo-vue3\src\components\lookUp\search.vue
 * @Description: 
 * @Version: 2.0
-->
<template>
    <div class="search_container" @click="jumpPage">
        <div class="search">
            <span>{{searchVal}}</span>
            <img class="image" :src="logo8" />
        </div>
    </div>
</template>
<script>
    import {
        getSearchVal
    } from "@/utils/index";
    import {
        logo8
    } from "@/utils/pic";
    export default {
        props: {
            type: {
                type: String,
                default: ''
            },
            lookType: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                logo8
            }
        },
        computed: {
            searchVal(){
                const searchVal = getSearchVal(this.type)
                return searchVal;
            }
        },
        methods: {
            jumpPage() {
                uni.navigateTo({
                    url: `/pages/search/elseSearch?type=${this.type}&lookType=${this.lookType}`
                });
            }
        }
    }
</script>
<style lang="scss" scoped>
    .search_container {
        padding: 30px;
        background-color: #FFFFFF;

        .search {
            @include flex(space-between, center);
            padding: 0 25px;
            height: 84px;
            font-size: 30px;
            color: #999999;
            border: 1px solid #EEEEEE;
            border-radius: 12px;
            box-sizing: border-box;

            .image {
                @include w-h(48px, 48px);
            }
        }
    }
</style>
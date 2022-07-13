<!--
 * @Author: zcj
 * @Autor: Seven
 * @Date: 2022-05-17 10:14:25
 * @LastEditors: Seven
 * @LastEditTime: 2022-07-05 13:58:17
 * @FilePath: \uniDemod:\study\vue3\demo-vue3\src\components\btn\btn.vue
 * @Description: 
 * @Version: 2.0
-->
<template>
    <div v-if="isShare">
        <button class="share_btn" open-type="share">
            <img class="image" :src="logo4" />
            <span class="text">分享</span>
        </button>
    </div>
</template>
<script>
    import {
        logo4
    } from "@/utils/pic";
    import {
        shield
    } from '@/api/index';
    export default {
        data() {
            return {
                logo4,
                isShare: false
            }
        },
        mounted() {
            this.getShields()
        },
        methods: {
            getShields() {
                shield()
                    .then(res => {
                        if (res.code == 200) {
                            this.isShare = res.data.share;
                        }
                    })
            },
        }
    }
</script>
<style lang="scss" scoped>
    .share_btn {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        @include flex(center, center);
        @include w-h(100%, 130px);
        flex-direction: column;
        padding: 10px 0;
        background-color: #FFFFFF;
        border-top: 1px solid #EEEEEE;
        z-index: 8;
        box-sizing: border-box;

        &::after {
            border: none;
        }

        .text {
            line-height: 35px;
            font-size: 22px;
            color: #333333;
        }

        .image {
            @include w-h(48px, 48px);
        }
    }
</style>
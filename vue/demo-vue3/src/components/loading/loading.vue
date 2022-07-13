<template>
    <div class="loading">
        <div class="move">
            <div class="image_box">
                <img class="image" :src="logo17" />
            </div>
            <div class="g-circle"></div>
        </div>
        <span class="text_1">内容排队加载中...</span>
    </div>
</template>
<script>
    import {
        logo17
    } from "@/utils/pic";
    export default {
        data() {
            return {
                logo17
            }
        }
    }
</script>
<style lang="scss" scoped>
    @keyframes rotate {
        0% {
            transform: rotate(0);
        }

        50% {
            transform: rotate(180deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }

    .loading {
        @include flex(center, center);
        flex-direction: column;

        .move {
            position: relative;
            @include w-h(78px, 78px);
            border-radius: 50%;
            box-sizing: border-box;

            .image_box {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                display: flex;
                @include w-h(58px, 58px);
                border-radius: 50%;
                z-index: 3;
                background-color: #FFFFFF;

                .image {
                    @include w-h(58px, 58px);
                }
            }

            &::before {
                content: "";
                position: absolute;
                top: 4px;
                left: 4px;
                bottom: 4px;
                right: 4px;
                border-radius: 50%;
                background-color: #FFFFFF;
                z-index: 2;
            }

            .g-circle {
                position: absolute;
                top: 0px;
                left: 0px;
                bottom: 0px;
                right: 0px;
                border-radius: 50%;
                background: conic-gradient(transparent 0%, transparent 50%, #4F90F7 100%);
                animation: rotate 1.5s infinite linear;
                z-index: 1;
            }
        }

        .text_1 {
            margin-top: 12px;
            margin-bottom: 41px;
            font-size: 22px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #4F90F7;
        }
    }
</style>
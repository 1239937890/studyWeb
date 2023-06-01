<template>
    <div>
        <div class="main_bg">
            <div class="row_1">
                <img src="" alt="" />
                <span>2022年2月25日中共中央、国务院发布的《信访工作条例》自2022年5月1日起正式实施。</span>
            </div>
        </div>
        <div class="middle_bg">
            <img src="" alt="" />
            <span>网上信访流程</span>
            <img src="" alt="" />
        </div>
    </div>
</template>
<script setup name="Home">
    import {
        ref
    } from 'vue'
    const name = ref('首页33')
</script>
<style lang="scss" scoped>
    $padding-zy12: 0 12%;

    .main_bg {
        padding: $padding-zy12;
        height: 760px;
        // height: 900px;
        background: url(@/assets/images/config/default-homeBg.jpg) no-repeat;
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }

    .row_1 {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px 0;

        img {
            margin-right: 20px;
            width: 31px;
            height: 27px;
        }

        span {
            font-size: 20px;
            font-family: Microsoft YaHei, Microsoft YaHei-Regular;
            font-weight: 400;
            color: #ffffff;
        }
    }

    .middle_bg {
        padding: $padding-zy12;
        height: 356px;
        background: url(@/assets/images/config/default-middleBg.png) no-repeat;
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }
</style>
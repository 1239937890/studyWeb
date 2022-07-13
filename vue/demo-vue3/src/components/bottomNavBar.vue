<template>
    <div class="nav_bar">
        <ul class="nav_list">
            <router-link class="mav_item" to="home">
                <img v-if="name==='Home'" src="@/assets/activity-home.png"/>
                <img v-else src="@/assets/home.png"/>
                <span>首页</span>
            </router-link>
            <router-link class="mav_item" to="healthy">
                <img v-if="name==='Healthy'" src="@/assets/activity-healthy.png"/>
                <img v-else src="@/assets/healthy.png"/>
                <span>健康中心</span>
            </router-link>
            <router-link class="mav_item" to="center">
                <img v-if="name==='Center'" src="@/assets/activity-center.png"/>
                <img v-else src="@/assets/center.png"/>
                <span>个人中心</span>
            </router-link>
        </ul>
    </div>
</template>
<script>
    import {
        useRoute
    } from "vue-router";
    export default {
        setup() {
            const name = useRoute().name;
            return{
                name
            }
        }
    }
</script>
<style lang="scss" scoped>
    .nav_bar {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #FFFFFF;
        z-index: 3;
    }

    .nav_list {
        @include flex(space-around, center);
        height: 98px;

        .mav_item {
            display: flex;
            flex-direction: column;
            align-items: center;
            font-size: 22px;
            color: #999999;

            img {
                @include w-h(48px, 48px);
            }

            span {
                margin-top: 10px;
            }

            &.router-link-active {
                color: $primary;
            }
        }
    }
</style>
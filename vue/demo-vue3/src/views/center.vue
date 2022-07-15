<template>
    <div>个人中心</div>
    <CommonTitle>
        <template v-slot:params="scoped">
            <div>{{scoped.data}}</div>
            <div>加油</div>
        </template>
    </CommonTitle>
    <BottomNavBar />
</template>
<script>
import BottomNavBar from "@/components/bottomNavBar.vue";
import CommonTitle from '@/components/slot/title.vue';
export default {
    name:'Center',
    components:{
        BottomNavBar,
        CommonTitle
    }
}
</script>
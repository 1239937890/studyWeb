<template>
    <div @click="goBack">返回</div>
    <div>{{ title }}</div>
</template>
<script lang="ts" setup>
    import { ref } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    const title = ref<string>('搜索')
    const router = useRouter()
    const route = useRoute()
    console.log('route', route.query)
    const goBack = () => {
        router.go(-1)
    }
</script>

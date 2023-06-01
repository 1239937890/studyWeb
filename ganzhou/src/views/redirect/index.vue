<template>
  <div>重定向</div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const { params, query } = route;
const { path } = params;
console.log('re' + path);
router.replace({ path: '/' + path, query });
</script>

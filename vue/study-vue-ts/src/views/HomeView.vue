<script setup lang="ts">
  // import TheWelcome from '../components/TheWelcome.vue'
  import {
    showToast
  } from 'vant';
  showToast('提示内容');
</script>

<template>
  <main>
    <!-- <TheWelcome /> -->
    <div class="demo">你好</div>
  </main>
</template>
<style>
  .demo {
    width: 413px;
    height: 72px;
    border-radius: 36px;
    background-color: red;
  }
</style>
<template>
	<div class="page">
		<Header />
		<Main />
		<Footer />
	</div>
</template>
<script setup>
import Header from './components/Header/index.vue';
import Main from './components/Main/index.vue';
import Footer from './components/Footer/index.vue';
</script>
<style lang="scss" scoped>
.page {
	display: flex;
	flex-direction: column;
	height: 100%;
}
</style>

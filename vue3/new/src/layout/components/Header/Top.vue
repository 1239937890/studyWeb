<template>
	<div class="header">
		<div class="header_left">您好，欢迎进入{{ label }}{{ zh_cn }}</div>
		<div v-if="isHome" class="header_right" title="盲人朋友在线浏览按住Alt+g键" @click="showDetail()">无障碍阅读</div>
		<div class="header_right" v-else>
			<span @click="goHome">首页</span>
			<el-divider direction="vertical"></el-divider>
			<span @click="goBack" style="color: #ffffff">返回</span>
			<el-divider direction="vertical"></el-divider>
			<span title="盲人朋友在线浏览按住Alt+g键" @click="showDetail()"> 无障碍阅读 </span>
		</div>
	</div>
</template>
<script setup>
import useSystem from '@/store/modules/system';
const router = useRouter();
const { zh_cn, orgId, label } = storeToRefs(useSystem());
const route = useRoute();
const isHome = computed(() => {
	return route.name === 'Home';
});
const homePath = '/';
const showDetail = () => {
	if (window.top.document.getElementById('accessible-reading')) return;
	window.scrollTo(0, 0);
	window.location.href = `/reading/defaultBluer.html?url=${document.location.href}`;
};
const goHome = () => {
	router.push({
		path: homePath,
		query: {
			type: orgId || '',
			orgId,
		},
	});
};
const goBack = () => {
	router.go(-1);
};
</script>
<style lang="scss" scoped>
.header {
	@include flex(space-between, center);
	padding: $paddingZy;
	height: 40px;
	font-size: 24px;
	color: #fefefe;
	background-color: rgba(0, 77, 173, 0.8);

	.header_right {
		cursor: pointer;
	}
}
</style>

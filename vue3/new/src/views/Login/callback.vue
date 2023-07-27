<template></template>
<script setup>
import { ElLoading, ElMessage } from 'element-plus';
import useUser from '@/store/modules/system';
const userStore = useUser();
const route = useRoute();
const router = useRouter();
const { query } = route;
const { token, redirect } = query;
const loading = ElLoading.service({
	lock: true,
	text: '正在登陆...',
	background: 'rgba(0, 0, 0, 0.5)',
});
if (token && token.length > 0) {
	userStore.callBackLogin(token).then(() => {
		router.replace({
			path: redirect || '/',
			query: { ...query },
		});
	});
} else {
	ElMessage.error('登陆失败!');
	loading.close();
	router.replace('/');
}
</script>

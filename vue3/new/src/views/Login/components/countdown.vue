<template>
	<el-button class="btn" type="primary" :disabled="countDownTime != 0" @click="handleSendSmsCode">
		<span>{{ btnText }}</span>
		<span v-if="countDownTime">({{ countDownTime }})</span>
	</el-button>
</template>
<script setup>
const props = defineProps({
	btnText: {
		type: String,
		default: '发送验证码',
	},
});
const emit = defineEmits(['handleSendSmsCode']);
const countDownTime = ref(0);
const defaultTime = ref(60);
const handleSendSmsCode = () => {
	emit('handleSendSmsCode');
};
const handleStart = () => {
	countDownTime.value = defaultTime.value;
	const countdownTimer = setInterval(() => {
		countDownTime.value ? countDownTime.value-- : clearInterval(countdownTimer);
	}, 1000);
};
defineExpose({
	handleStart,
});
</script>
<style lang="scss" scoped>
.btn {
	@include flex;
	@include w-h(143px, 54px);
	min-width: 143px;
	color: #ffffff;
	border: 1px solid #027aff;
	border-left: none;
	border-radius: 0 25px 25px 0;
	background-color: #027aff;
	cursor: pointer;
}
</style>

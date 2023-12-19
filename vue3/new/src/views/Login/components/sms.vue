<template>
	<el-form ref="smsForm" :model="smsParams" :rules="formRules" class="login_form">
		<el-form-item prop="sjh">
			<el-input v-model="smsParams.sjh" placeholder="请输入手机号码"></el-input>
		</el-form-item>
		<el-form-item prop="captcha">
			<div class="captcha">
				<el-input v-model="smsParams.captcha" auto-complete="off" placeholder="请输入验证码" @keyup.enter.native="handleLogin"></el-input>
				<div class="code">
					<img :src="codeUrl" @click="getCode" />
				</div>
			</div>
		</el-form-item>
		<el-form-item prop="smsCode">
			<div class="captcha">
				<el-input
					v-model="smsParams.smsCode"
					auto-complete="off"
					placeholder="请输入短信验证码"
					@keyup.enter.native="handleLogin"
				></el-input>
				<CountDown ref="countDownRef" @handleSendSmsCode="handleSendSmsCode" />
			</div>
		</el-form-item>
	</el-form>
</template>
<script setup>
import { ElMessage } from 'element-plus';
import { getSmsCode } from '@/api/login';
import CountDown from './countDown.vue';
import useLogin from './hooks';
import useUser from '@/store/modules/user';
const userStore = useUser();
const emit = defineEmits(['end', 'jump']);
const { key, codeUrl, formRules, getCode } = useLogin();
const smsParams = ref({
	sjh: '',
	smsCode: '',
	captcha: '',
	captchaKey: '',
});
watch(
	key,
	(value) => {
		smsParams.value.captchaKey = value;
	},
	{
		deep: true,
	}
);
getCode();
const countDownRef = ref(null);
const handleSendSmsCode = () => {
	if (!smsParams.value.sjh) {
		ElMessage.error('请输入手机号码!');
		return false;
	}
	if (!smsParams.value.captcha) {
		ElMessage.error('请输入写验证码!');
		return false;
	}
	getSmsCode(smsParams.value)
		.then(() => {
			ElMessage.success('验证码发送成功!');
			countDownRef.value.handleStart();
		})
		.catch(() => {
			getCode();
		});
};
const smsForm = ref(null);
const handleLogin = () => {
	smsForm.value.validate((valid) => {
		if (valid) {
			userStore
				.sjLogin(smsParams.value)
				.then(() => {
					emit('jump');
				})
				.catch(() => {
					smsParams.value.captcha = '';
					getCode();
				})
				.finally(() => {
					emit('end');
				});
		} else {
			emit('end');
		}
	});
};
defineExpose({
	handleLogin,
});
</script>
<style lang="scss" scoped>
@import './login.scss';
</style>

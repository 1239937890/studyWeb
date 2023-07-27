<template>
	<el-form ref="smsForm" :model="smsParams" :rules="smsRules" class="login_form">
		<el-form-item prop="username">
			<el-input v-model="smsParams.username" placeholder="请输入手机号码"></el-input>
		</el-form-item>
		<el-form-item prop="captcha">
			<div class="captcha">
				<el-input v-model="smsParams.captcha" auto-complete="off" placeholder="请输入验证码" @keyup.enter.native="handleLogin"></el-input>
				<div class="code">
					<img :src="codeUrl" @click="getCode" />
				</div>
			</div>
		</el-form-item>
		<el-form-item prop="password">
			<div class="captcha">
				<el-input
					v-model="smsParams.captcha"
					auto-complete="off"
					placeholder="请输入短信验证码"
					@keyup.enter.native="handleLogin"
				></el-input>
				<div class="code">发送验证码</div>
			</div>
		</el-form-item>
	</el-form>
</template>
<script setup>
import { getCodeImg, getSmsCode } from '@/api/login';
const loginForm = ref(null);
const smsRules = {
	username: [{ required: true, trigger: 'blur', message: '请输入您的账号' }],
	password: [{ required: true, trigger: 'blur', message: '请输入您的密码' }],
	captcha: [{ required: true, trigger: 'blur', message: '请输入验证码' }],
};
const smsParams = ref({
	username: '',
	password: '',
	captcha: '',
	captchaKey: '',
});
const codeUrl = ref('');
const getCode = () => {
	getCodeImg().then((res) => {
		const { captchaKey, img } = res.data;
		smsParams.value.captchaKey = captchaKey;
		codeUrl.value = img;
	});
};
getCode();
const handleLogin = () => {};
</script>
<style lang="scss" scoped>
@import './login.scss';
</style>

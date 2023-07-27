<template>
	<el-form ref="loginForm" :model="loginParams" :rules="formRules" class="login_form">
		<el-form-item prop="username">
			<el-input v-model="loginParams.username" placeholder="请输入手机号或证件号码"> </el-input>
		</el-form-item>
		<el-form-item prop="password">
			<el-input
				v-model="loginParams.password"
				type="password"
				auto-complete="off"
				placeholder="请输入密码"
				@keyup.enter.native="handleLogin"
			>
			</el-input>
		</el-form-item>
		<el-form-item prop="captcha">
			<div class="captcha">
				<el-input v-model="loginParams.captcha" auto-complete="off" placeholder="请输入验证码" @keyup.enter.native="handleLogin"></el-input>
				<div class="code">
					<img :src="codeUrl" @click="getCode" />
				</div>
			</div>
		</el-form-item>
	</el-form>
</template>
<script setup>
import useLogin from './hooks';
const { key, codeUrl, formRules, getCode } = useLogin();
const loginForm = ref(null);
const loginParams = ref({
	username: '',
	password: '',
	captcha: '',
	captchaKey: '',
});
const handleLogin = () => {
	console.log('loginParams', loginParams);
};
</script>
<style lang="scss" scoped>
@import './login.scss';
</style>

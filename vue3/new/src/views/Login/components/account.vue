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
import useUser from '@/store/modules/user';
const userStore = useUser();
const emit = defineEmits(['end']);
const { key, codeUrl, formRules, getCode } = useLogin();
const loginForm = ref(null);
const loginParams = ref({
	username: '',
	password: '',
	captcha: '',
	captchaKey: '',
});
watch(
	key,
	(value) => {
		loginParams.value.captchaKey = value;
	},
	{
		deep: true,
	}
);
const handleLogin = () => {
	loginForm.value.validate((valid) => {
		if (valid) {
			userStore
				.Login(loginParams.value)
				.then(() => {
					console.log('登录成功回调');
				})
				.catch(() => {
					loginParams.value.captcha = '';
					getCode();
				});
		}
		emit('end');
	});
};
defineExpose({
	handleLogin,
});
// this.$refs.loginForm.validate((valid) => {
//           if (valid) {
//             this.loading = true;
//             this.$store
//               .dispatch('Login', this.loginForm)
//               .then(() => {
//                 console.log(this.redirect);
//                 this.$router
//                   .push({
//                     path: this.redirect || '/',
//                     query: this.query,
//                   })
//                   .catch(() => {});
//               })
//               .catch(() => {
//                 this.loading = false;
//                 this.getCode();
//               });
//           }
//         });
</script>
<style lang="scss" scoped>
@import './login.scss';
</style>

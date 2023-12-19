import { defineStore } from 'pinia';
import router from '@/router';
import { getToken, setToken, removeToken } from '@/utils/auth';
import useSystem from './system';
import { encrypt_login } from '@/utils/jsencrypt';
import { login, logout, getInfo, loginSjh } from '@/api/login';
const useUser = defineStore('user', {
	state: () => ({
		userName: '',
		token: getToken(),
	}),
	actions: {
		// 账号登录
		Login(userInfo) {
			const { username, password, captcha, captchaKey } = userInfo;
			const params = {
				username: username.trim(),
				password: encrypt_login(password),
				captcha,
				captchaKey,
			};
			return new Promise((resolve, reject) => {
				login(params)
					.then((res) => {
						this.token = res.data.access_token;
						setToken(res.data.access_token);
						resolve();
					})
					.catch((error) => {
						reject(error);
					});
			});
		},
		// 手机登录
		sjLogin(userInfo) {
			const sjh = userInfo.sjh.trim();
			const smsCode = userInfo.smsCode;
			return new Promise((resolve, reject) => {
				loginSjh({ sjh, smsCode })
					.then((res) => {
						setToken(res.data.access_token);
						this.token = res.data.access_token;
						resolve();
					})
					.catch((error) => {
						reject(error);
					});
			});
		},
		//跳转登录/注册
		jumpLogin(isLogin) {
			const KEY = isLogin ? 'LOGIN' : 'REGISTER';
			const systemStore = useSystem();
			const { orgId } = systemStore;
			if (import.meta.env.VITE_APP_ENV === 'production') {
				location.href = `${import.meta.env[`VITE_APP_${KEY}_URL`]}?orgId=${orgId}`; //跳转江苏省登录/注册
			} else {
				console.log('router>>>', router);
				console.log(import.meta.env[`VITE_APP_${KEY}_URL`]);
				router.push({
					path: import.meta.env[`VITE_APP_${KEY}_URL`],
					query: {
						orgId,
					},
				});
			}
		},
		// 江苏省登录平台回调登录
		callBackLogin(token) {
			return new Promise((resolve) => {
				setToken(token);
				this.token = token;
				resolve();
			});
		},
		//前端登出 删除本地token
		delToken() {
			removeToken();
			this.token = '';
		},
		//登出
		// LogOut({ commit, state }) {
		// 	return new Promise((resolve, reject) => {
		// 	  logout(state.token)
		// 		.then(() => {
		// 		  commit('SET_TOKEN', '');
		// 		  commit('SET_USERINFO', {});
		// 		  removeToken();
		// 		  resolve();
		// 		})
		// 		.catch((error) => {
		// 		  reject(error);
		// 		});
		// 	});
		//   },
	},
});
export default useUser;

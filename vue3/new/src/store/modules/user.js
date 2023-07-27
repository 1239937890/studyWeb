import { defineStore } from 'pinia';
import router from '@/router';
import { getToken, setToken, removeToken } from '@/utils/auth';
import useSystem from './system';
const useUser = defineStore('user', {
	state: () => ({
		userName: '',
		token: getToken(),
	}),
	actions: {
		//跳转登录/注册
		jumpLogin(isLogin) {
			// const getKey = () => {};
			// const KEY = getKey();
			const KEY = isLogin ? 'LOGIN' : 'REGISTER';
			const systemStore = useSystem();
			const { orgId } = systemStore;
			if (import.meta.env.VITE_APP_ENV === 'production') {
				location.href = `${import.meta.env[`VITE_APP_${KEY}_URL`]}?orgid=${orgId}`; //跳转江苏省登录/注册
			} else {
				console.log('router>>>', router);
				console.log(import.meta.env[`VITE_APP_${KEY}_URL`]);
				router.push({
					path: import.meta.env[`VITE_APP_${KEY}_URL`],
					query: {
						orgid: orgId,
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

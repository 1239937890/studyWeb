// /*
//  * @Author: zcj
//  * @Autor: Seven
//  * @Date: 2022-05-17 10:14:26
//  * @LastEditors: Seven
//  * @LastEditTime: 2022-06-14 11:47:35
//  * @FilePath: \uniDemod:\MFK\mfk-project\mfk-more\src\utils\request.js
//  * @Description: 
//  * @Version: 2.0
//  */
// import store from '../store/index'
// import md5 from '@/js_sdk/js-md5/src/md5.js';
import axios from 'axios';
import {
    Toast
} from 'vant';
import router from '../router';
const AppID = "RNYmku69hY6LOpC0s60aA";
axios.defaults.baseURL = `/v2/${AppID}`
axios.defaults.withCredentials = true
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest' 
// axios.defaults.headers['token'] = localStorage.getItem('token') || '' 
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded'
axios.interceptors.response.use(res => {
    if (typeof res.data !== 'object') {
        Toast.fail('服务端异常！')
        return Promise.reject(res)
    }
    if (res.data.code != 200) {
        if (res.data.message) Toast.fail(res.data.message)
        if (res.data.code == 416) {
            router.push({
                path: '/login'
            })
        }
        if (res.data.data && window.location.hash == '#/login') {
            setLocal('token', res.data.data)
            axios.defaults.headers['token'] = res.data.data
        }
        return Promise.reject(res.data)
    }
    return res.data
}, err => {
    Toast.fail(err.message)
    return Promise.reject(err);
})

export default axios
// export function request(method, url, val) {
// 	return new Promise((resolve, reject) => {
// 		function handlerEvent() {
// 			const time = new Date().getTime();
// 			const signStr = md5(`mp_mfk_com_secret${time}`);
// 			const contentType = method === 'GET' ? 'application/x-www-form-urlencoded' : 'application/json';
// 			const appToken = store.state.userInfo && store.state.userInfo.app_token ? store.state.userInfo.app_token : '';
// 			const num = store.state.source.num;
// 			uni.request({
// 				timeout: 20 * 1000,
// 				url: store.state.baseUrl + url,
// 				method,
// 				data: val,
// 				header: {
// 					'content-type': contentType,
// 					'appToken': appToken,
// 					'source': num,
// 					'signStr': signStr,
// 					'timeStamp': time
// 				},
// 				success: res => {
// 					if (res.data.code != 200) {
// 						uni.showToast({
// 							title: res.data.message,
// 							icon: 'none'
// 						})
// 					}
// 					resolve(res.data)
// 				},
// 				fail: err => {
// 					console.log(`请求失败`, err)
// 					// if(err.errMsg=='request:fail timeout'||err.erron==600001){
// 					// 	handlerEvent()
// 					// }
// 					// uni.showToast({
// 					// 	title: '当前网络繁忙，请点击右上角重新进入小程序',
// 					// 	icon: 'none'
// 					// })
// 					// request:fail timeout
// 					// uni.showModal({
// 					// 	title: '当前网络不稳定，请重试',
// 					// 	success: res => {
// 					// 		if (res.confirm) {
// 					// 			uni.redirectTo({
// 					// 				url: tempUrl
// 					// 			})
// 					// 		} else if (res.cancel) {
// 					// 			console.log('用户点击取消');
// 					// 		}
// 					// 	}
// 					// })
// 					reject(err)
// 				}
// 			})
// 		}
// 		if (store.state.isWork) {
// 			handlerEvent()
// 		} else {
// 			uni.getNetworkType({
// 				success: res => {
// 					const isWork = res.networkType == 'none' || res.networkType == 'offline' ? false : true
// 					store.commit('updateWork', {
// 						isWork
// 					})
// 					if (!isWork) {
// 						uni.showToast({
// 							title: '当前网络不可用',
// 							icon: 'none'
// 						});
// 						resolve({
// 							code: 422,
// 							data: {}
// 						})
// 					} else {
// 						handlerEvent()
// 					}
// 				},
// 				fail: err => {
// 					console.log('NetworkErr', err)
// 					reject(err)
// 				}
// 			});
// 		}
// 	})
// }
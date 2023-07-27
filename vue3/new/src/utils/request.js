import axios from 'axios';
import { ElNotification, ElMessageBox, ElMessage, ElLoading } from 'element-plus';
import useSystem from '@/store/modules/system';
import { getToken } from '@/utils/auth';
import errorCode from '@/utils/errorCode';
import { tansParams, blobValidate, parameterProcessing } from '@/utils/ruoyi';
import cache from '@/plugins/cache';
import { saveAs } from 'file-saver';
import md5 from 'js-md5';
import { v4 as uuidV4 } from 'uuid';
let downloadLoadingInstance;
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8';
const service = axios.create({
	baseURL: import.meta.env.VITE_APP_BASE_API,
	timeout: 30000,
});
const MD5SECRET = import.meta.env.VITE_MD5SECRET;
service.interceptors.request.use(
	(config) => {
		// 是否需要设置 token
		const isToken = (config.headers || {}).isToken === false;
		const timestamp = new Date().getTime();
		const nonceStr = uuidV4();
		const tempSignStr = `timestamp=${timestamp}&nonceStr=${nonceStr}&key=${MD5SECRET}`;
		let signStr = '';
		config.headers['timestamp'] = timestamp;
		config.headers['nonceStr'] = nonceStr;
		if (getToken() && !isToken) {
			config.headers['Authorization'] = 'Bearer ' + getToken(); // 让每个请求携带自定义token 请根据实际情况自行修改
		}
		// get请求映射params参数
		if (config.method === 'get') {
			if (config.params) {
				let parmsstr = tansParams(config.params);
				let url = `${config.url}?${parmsstr}`;
				url = url.slice(0, -1);
				config.url = url;
				signStr = `${parameterProcessing(config.params)}${tempSignStr}`;
				config.params = {};
			} else {
				signStr = tempSignStr;
			}
			config.headers['signature'] = md5(signStr);
		}
		if (config.method === 'post') {
			const requestParams = typeof config.data === 'object' ? JSON.stringify(config.data) : config.data;
			signStr = `${requestParams}&${tempSignStr}`;
			config.headers['signature'] = md5(signStr);
		}
		return config;
	},
	(error) => {
		console.error(error);
		Promise.reject(error);
	}
);

// 响应拦截器
service.interceptors.response.use(
	(res) => {
		// 未设置状态码则默认成功状态
		const code = res.data.code || 200;
		// 获取错误信息
		const msg = errorCode[code] || res.data.msg || errorCode['default'];
		// 二进制数据则直接返回
		if (res.request.responseType === 'blob' || res.request.responseType === 'arraybuffer') {
			return res.data;
		}
		if (code === 401) {
			ElMessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', {
				confirmButtonText: '重新登录',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					const systemStore = useSystem();
					const { orgId } = systemStore;
					location.href = `${process.env.VITE_APP_LOGIN_URL}?orgid=${orgId}`;
				})
				.catch(() => {});
			return Promise.reject('无效的会话，或者会话已过期，请重新登录。');
		} else if (code === 500) {
			ElMessage({
				message: msg,
				type: 'error',
			});
			return Promise.reject(new Error(msg));
		} else if (code !== 200) {
			ElNotification.error({
				title: msg,
			});
			return Promise.reject('error');
		} else {
			return Promise.resolve(res.data);
		}
	},
	(error) => {
		console.log('err' + error);
		let { message } = error;
		if (message == 'Network Error') {
			message = '后端接口连接异常';
		} else if (message.includes('timeout')) {
			message = '系统接口请求超时';
		} else if (message.includes('Request failed with status code')) {
			message = '系统接口' + message.substr(message.length - 3) + '异常';
		}
		ElMessage({
			message: message,
			type: 'error',
			duration: 5 * 1000,
		});
		return Promise.reject(error);
	}
);

// 通用下载方法
export function download(url, params, filename) {
	downloadLoadingInstance = ElLoading.service({
		text: '正在下载数据，请稍候',
		background: 'rgba(0, 0, 0, 0.7)',
	});
	return service
		.post(url, params, {
			transformRequest: [
				(params) => {
					return tansParams(params);
				},
			],
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			responseType: 'blob',
		})
		.then(async (data) => {
			const isLogin = await blobValidate(data);
			if (isLogin) {
				const blob = new Blob([data]);
				saveAs(blob, filename);
			} else {
				const resText = await data.text();
				const rspObj = JSON.parse(resText);
				const errMsg = errorCode[rspObj.code] || rspObj.msg || errorCode['default'];
				ElMessage.error(errMsg);
			}
			downloadLoadingInstance.close();
		})
		.catch((r) => {
			console.error(r);
			ElMessage.error('下载文件出现错误，请联系管理员！');
			downloadLoadingInstance.close();
		});
}
export function downloadBlob(url, params, callback) {
	downloadLoadingInstance = ElLoading.service({
		text: '正在下载数据，请稍候',
		spinner: 'el-icon-loading',
		background: 'rgba(0, 0, 0, 0.7)',
	});
	return service
		.post(url, params, {
			transformRequest: [
				(params) => {
					return tansParams(params);
				},
			],
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			responseType: 'blob',
		})
		.then(async (data) => {
			const isLogin = await blobValidate(data);
			if (isLogin) {
				const blob = new Blob([data]);
				if (callback) {
					callback({ data: data, blob: blob });
				}
			} else {
				ElMessage.error('无效的会话，或者会话已过期，请重新登录。');
			}
			downloadLoadingInstance.close();
		})
		.catch((r) => {
			console.error(r);
			ElMessage.error('下载文件出现错误，请联系管理员！');
			downloadLoadingInstance.close();
		});
}
export default service;

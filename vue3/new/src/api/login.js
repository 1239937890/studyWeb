import request from '@/utils/request';

// 登录方法
export function login(username, password, captcha, captchaKey) {
	const data = {
		username,
		password,
		captcha,
		captchaKey,
	};
	return request({
		url: '/auth/wsxf/pcLogin',

		method: 'post',
		data: data,
	});
}
// 老用户登录方法
export function oldLogin(username, password, captcha, captchaKey) {
	const data = {
		username,
		password,
		captcha,
		captchaKey,
	};
	return request({
		url: '/auth/wsxf/pcOldLogin',
		method: 'post',
		data: data,
	});
}
// 手机号登录方法
export function loginSjh(sjh, smsCode) {
	const data = {
		sjh,
		smsCode,
	};
	return request({
		url: '/auth/wsxf/pcSjLogin',

		method: 'post',
		data: data,
	});
}

// 获取验证码
export function getCodeImg() {
	return request({
		url: '/auth/wsxf/genCaptcha',
		method: 'get',
		timeout: 20000,
	});
}

// 获取验证码
export function getLoginCodeImg() {
	return request({
		url: '/auth/wsxf/loginCaptcha',

		method: 'get',
		timeout: 20000,
	});
}

// 发送短信验证码
export function getSmsCode(sjh, captcha, captchaKey) {
	const data = {
		sjh,
		captcha,
		captchaKey,
	};
	return request({
		url: '/wsxf/sms/login',

		method: 'post',
		data: data,
	});
}

// 发送注册短信验证码
export function registerCode(sjh, captcha, captchaKey) {
	const data = {
		sjh,
		captcha,
		captchaKey,
	};
	return request({
		url: '/wsxf/sms/register',

		method: 'post',
		data: data,
	});
}

// 发送注销短信验证码
export function logoutCode(sjh, captcha, captchaKey) {
	const data = {
		sjh,
		captcha,
		captchaKey,
	};
	return request({
		url: '/wsxf/sms/logout',
		method: 'post',
		data: data,
	});
}

// 发送手机修改短信验证码
export function updateMobileCode(sjh, captcha, captchaKey) {
	const data = {
		sjh,
		captcha,
		captchaKey,
	};
	return request({
		url: '/wsxf/sms/updateMobile',

		method: 'post',
		data: data,
	});
}

// 获取用户详细信息
export function getInfo() {
	return request({
		url: '/wsxf/user/detail',
		method: 'get',
	});
}

// 退出方法
export function logout() {
	return request({
		url: '/wsxf/user/logout',
		method: 'get',
	});
}

// 证件类型
export function zjlx() {
	return request({
		url: '/wsxf/base/getZjlxList',
		method: 'get',
	});
}

// 注册功能
export function registerlist(query) {
	return request({
		url: '/auth/wsxf/register',
		method: 'post',
		data: query,
	});
}

// 注销功能
export function logcancellist(query) {
	return request({
		url: '/wsxf/user/logcancel',
		method: 'get',
		params: query,
	});
}

// 短信验证码修改密码
export function updateMobilelist(query) {
	return request({
		url: '/wsxf/personal/updateMobile',
		method: 'post',
		data: query,
	});
}

export function getClientConfig() {
	return request({
		url: '/system/client/data/listByUse',
		headers: {
			isToken: false,
		},
		method: 'get',
		timeout: 20000,
	});
}

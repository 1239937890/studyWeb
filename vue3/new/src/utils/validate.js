/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
	return /^(https?:|mailto:|tel:)/.test(path);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
	const valid_map = ['admin', 'editor'];
	return valid_map.indexOf(str.trim()) >= 0;
}

/**
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL(url) {
	const reg =
		/^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
	return reg.test(url);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validLowerCase(str) {
	const reg = /^[a-z]+$/;
	return reg.test(str);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUpperCase(str) {
	const reg = /^[A-Z]+$/;
	return reg.test(str);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validAlphabets(str) {
	const reg = /^[A-Za-z]+$/;
	return reg.test(str);
}

/**
 * @param {string} email
 * @returns {Boolean}
 */
export function validEmail(email) {
	const reg =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return reg.test(email);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isString(str) {
	if (typeof str === 'string' || str instanceof String) {
		return true;
	}
	return false;
}

/**
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray(arg) {
	if (typeof Array.isArray === 'undefined') {
		return Object.prototype.toString.call(arg) === '[object Array]';
	}
	return Array.isArray(arg);
}

/**
 * elementui 表单验证 身份证号格式验证
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
export function validIdCard(rule, num, callback) {
	if (num != '' && num != null) {
		var len, re;
		len = num.length;
		// 判断是否包含空格变量
		var arr = new Array();
		arr = num.split(' ');
		var re =
			/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
		// 如果身份证号码包含空格,提示错误
		if (arr.length != 1 || !re.test(num)) {
			callback(new Error('证件号码格式不正确'));
		} else {
			if (len == 18) {
				re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
				var arrSplit = num.match(re);

				//检查生日日期是否正确
				var dtmBirth = new Date(arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);
				var bGoodDay;
				bGoodDay =
					dtmBirth.getFullYear() == Number(arrSplit[2]) &&
					dtmBirth.getMonth() + 1 == Number(arrSplit[3]) &&
					dtmBirth.getDate() == Number(arrSplit[4]);
				if (!bGoodDay) {
					callback(new Error('证件号码格式不正确'));
				} else {
					//检验18位身份证的校验码是否正确。
					//校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
					var valnum;
					var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
					var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
					var nTemp = 0,
						i;
					for (i = 0; i < 17; i++) {
						nTemp += num.substr(i, 1) * arrInt[i];
					}
					valnum = arrCh[nTemp % 11];
					if (valnum != num.substr(17, 1)) {
						callback(new Error('证件号码格式不正确'));
					}
					callback();
				}
			}
			callback(new Error('证件号码格式不正确'));
		}
	} else {
		callback(new Error('证件号码不能为空'));
	}
}

/**
 * elementui 表单验证 身份证号格式验证
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
export function validIdCardExt(rule, value, callback) {
	if (value != '' && value != null) {
		const reg =
			/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
		if (reg.test(value)) {
			callback();
		} else {
			callback(new Error('证件号码格式不正确'));
		}
	} else {
		callback();
	}
}

/**
 * elementui 表单验证 手机号格式验证
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
export function validMobilePhone(rule, value, callback) {
	if (value != '' && value != null) {
		const reg =
			/^(?:\+?86)?1(?:3\d{3}|5[^4\D]\d{2}|8\d{3}|7(?:[0-35-9]\d{2}|4(?:0\d|1[0-2]|9\d))|9[0-35-9]\d{2}|6[2567]\d{2}|4(?:(?:10|4[01])\d{3}|[68]\d{4}|[579]\d{2}))\d{6}$/;
		if (reg.test(value)) {
			callback();
		} else {
			callback(new Error('手机号码格式不正确'));
		}
	} else {
		callback();
	}
}

/**
 * elementui 表单验证 手机号格式验证
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
export function validPhone(rule, value, callback) {
	if (value != '' && value != null) {
		const reg = /^[0-9-+]{7,}$/;
		if (reg.test(value)) {
			callback();
		} else {
			callback(new Error('手机号码格式不正确'));
		}
	} else {
		callback();
	}
}

/**
 * elementui 表单验证 中文格式验证
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
export function validChinese(rule, value, callback) {
	if (value != '' && value != null) {
		const reg = /^[\u4e00-\u9fa5]*$/;
		if (reg.test(value)) {
			callback();
		} else {
			callback(new Error('请输入中文！'));
		}
	} else {
		callback();
	}
}

/**
 * elementui 表单验证 数字字母汉字格式验证
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
export function validNumAndAbcAndChinese(rule, value, callback) {
	if (value != '' && value != null) {
		const reg = /^[0-9a-zA-Z\u4e00-\u9fa5]*$/;
		if (reg.test(value)) {
			callback();
		} else {
			callback(new Error('请输入中文、字母或者数字！'));
		}
	} else {
		callback();
	}
}

/**
 * elementui 表单验证 数字字母格式验证
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
export function validNumAndAbc(rule, value, callback) {
	if (value != '' && value != null) {
		const reg = /^[0-9a-zA-Z]*$/;
		if (reg.test(value)) {
			callback();
		} else {
			callback(new Error('请输入数字或者字母！'));
		}
	} else {
		callback();
	}
}

/**
 * elementui 表单验证 数字格式验证
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
export function validNum(rule, value, callback) {
	if (value != '' && value != null) {
		const reg = /^[0-9]*$/;
		if (reg.test(value)) {
			callback();
		} else {
			callback(new Error('请输入数字！'));
		}
	} else {
		callback();
	}
}

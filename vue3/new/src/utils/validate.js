export default {
	// 手机号正则表达式
	phone: /^1\d{10}$/,
	phoneMsg: '请正确填写手机号',
	isPhone(value) {
		return this.phone.test(value);
	},
	// 身份证正则表达式
	identity: /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
	identityMsg: '请正确填写身份证号',
	isSfzh(rule, value, callback) {
		if (!value) {
			return callback(new Error('身份证号码不能为空'));
		}
		function validataCredentials(num) {
			var msg, boo; //  msg身份证验证友情提示,boo返回值
			var num = num.toUpperCase(); // 身份证为末尾可能是X
			//   身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，
			//   最后一位是校验位，可能为数字或字符X。
			const arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
			const arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
			var nTemp = 0,
				i;
			if (!/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num)) {
				//  输入的身份证号长度不对，或者号码不符合规定;
				return [(boo = false), (msg = '输入的身份证号长度不对，或者号码不符合规定')];
			}
			//   校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
			//   下面分别分析出生日期和校验位
			var len, re;
			len = num.length;
			if (len == 15) {
				re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
				var arrSplit = num.match(re);
				//   检查生日日期是否正确
				var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);
				var bGoodDay;
				bGoodDay =
					dtmBirth.getYear() == Number(arrSplit[2]) &&
					dtmBirth.getMonth() + 1 == Number(arrSplit[3]) &&
					dtmBirth.getDate() == Number(arrSplit[4]);
				if (!bGoodDay) {
					//   输入的身份证号里出生日期不对！
					return [(boo = false), (msg = '输入的身份证号里出生日期不对！')];
				} else {
					//   将15位身份证转成18位
					//   校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
					num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6);
					for (i = 0; i < 17; i++) {
						nTemp += num.substr(i, 1) * arrInt[i];
					}
					num += arrCh[nTemp % 11];
					return [(boo = true), (msg = num)];
				}
			}
			if (len == 18) {
				re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
				var arrSplit = num.match(re);
				//  检查生日日期是否正确
				var dtmBirth = new Date(arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);
				var bGoodDay;
				bGoodDay =
					dtmBirth.getFullYear() == Number(arrSplit[2]) &&
					dtmBirth.getMonth() + 1 == Number(arrSplit[3]) &&
					dtmBirth.getDate() == Number(arrSplit[4]);
				if (!bGoodDay) {
					//  输入的身份证号里出生日期不对！

					return [(boo = false), (msg = ' 输入的身份证号里出生日期不对')];
				} else {
					//  检验18位身份证的校验码是否正确。
					//  校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
					var valnum;
					for (i = 0; i < 17; i++) {
						nTemp += num.substr(i, 1) * arrInt[i];
					}
					valnum = arrCh[nTemp % 11];
					if (valnum != num.substr(17, 1)) {
						//  18位身份证的校验码不正确！
						return [(boo = false), (msg = '身份证的校验码不正确！')];
					}
					return [(boo = true), (msg = '验证成功')];
				}
			}
			return [(boo = false), (msg = '身份证的长度不正确！')];
		}
		setTimeout(() => {
			var res = validataCredentials(value);
			if (!res[0]) {
				callback(new Error(res[1]));
			} else {
				callback();
			}
		}, 200);
	},

	isSfzhReturnBoolen(value) {
		if (!value) {
			return false;
		}
		function validataCredentials(num) {
			var msg, boo; //  msg身份证验证友情提示,boo返回值
			var num = num.toUpperCase(); // 身份证为末尾可能是X
			//   身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，
			//   最后一位是校验位，可能为数字或字符X。
			const arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
			const arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
			var nTemp = 0,
				i;
			if (!/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num)) {
				//  输入的身份证号长度不对，或者号码不符合规定;
				return false;
			}
			//   校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
			//   下面分别分析出生日期和校验位
			var len, re;
			len = num.length;
			if (len == 15) {
				re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
				var arrSplit = num.match(re);
				//   检查生日日期是否正确
				var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);
				var bGoodDay;
				bGoodDay =
					dtmBirth.getYear() == Number(arrSplit[2]) &&
					dtmBirth.getMonth() + 1 == Number(arrSplit[3]) &&
					dtmBirth.getDate() == Number(arrSplit[4]);
				if (!bGoodDay) {
					//   输入的身份证号里出生日期不对！
					return false;
				} else {
					//   将15位身份证转成18位
					//   校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
					num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6);
					for (i = 0; i < 17; i++) {
						nTemp += num.substr(i, 1) * arrInt[i];
					}
					num += arrCh[nTemp % 11];
					return true;
				}
			}
			if (len == 18) {
				re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
				var arrSplit = num.match(re);
				//  检查生日日期是否正确
				var dtmBirth = new Date(arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);
				var bGoodDay;
				bGoodDay =
					dtmBirth.getFullYear() == Number(arrSplit[2]) &&
					dtmBirth.getMonth() + 1 == Number(arrSplit[3]) &&
					dtmBirth.getDate() == Number(arrSplit[4]);
				if (!bGoodDay) {
					//  输入的身份证号里出生日期不对！

					return false;
				} else {
					//  检验18位身份证的校验码是否正确。
					//  校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
					var valnum;
					for (i = 0; i < 17; i++) {
						nTemp += num.substr(i, 1) * arrInt[i];
					}
					valnum = arrCh[nTemp % 11];
					if (valnum != num.substr(17, 1)) {
						//  18位身份证的校验码不正确！
						return false;
					}
					return true;
				}
			}
			return false;
		}
		return validataCredentials(value);
	},

	/**
	 * 是否是身份证
	 */
	isIdentity(value) {
		return this.identity.test(value);
	},

	// 包含中文
	containChinese: /^(?=.*?[^\x00-\xff])/,
	containChineseMsg: '必须包含中文',
	isContainChinese(value) {
		return this.containChinese.test(value);
	},

	// 详细地址
	xxzz: /^(?=.*[\u4e00-\u9fa5])[A-Za-z0-9\u4e00-\u9fa5#]{1,50}$/,
	xxzzMsg: '仅可使用中文、大小写字母、数字和#字符 ，必须包含中文，50字以内',
	isXxzz(value) {
		return this.xxzz.test(value);
	},

	// 密码
	password:
		/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[`~!@#$%^&*^()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、])[\dA-Za-z`~!@#$%^&*^()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]{8,16}$/,
	passwordMsg: '密码为大小写字母、特殊字符和数字组合，长度8-16位',

	// 邮箱正则表达式
	email: /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/,
	emailMsg: '邮箱格式不正确',
	isEmail(value) {
		return this.email.test(value);
	},
	//去掉空格
	clearBlank(value) {
		if (value) {
			value = value.replace(/\s/g, '');
		}
		return value;
	},
	/**
	 * 中文
	 */
	chinese: /^[\u4e00-\u9fa5]*$/,
	/**
	 * 包含中文
	 */
	containChinese: /^(?=.*?[\u4E00-\u9FA5])/,
};

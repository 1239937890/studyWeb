/**
 * 常量
 *
 * @author chenzhenhua
 * @date 2022-08-17 09:04
 */
export function getLabelByValue(constant, value) {
	let label = null;
	Object.values(constant).forEach((item) => {
		if (item.value === value) {
			label = item.label;
		}
	});
	return label;
}

export function getPicByValue(constant, key, value, picType = 'png') {
	let defaultBg = `default-${key}.${picType}`;
	let bg;
	Object.values(constant).forEach((item) => {
		if (item.value === value) {
			bg = item[key];
		}
	});
	let newBg = bg || defaultBg;
	console.log('newBg>>>>>>>>>>>>>>>>>>', newBg);
	return newBg;
}

export function getZimuByValue(constant, value) {
	let zimu = null;
	Object.values(constant).forEach((item) => {
		if (item.value === value) {
			zimu = item.zimu;
		}
	});
	return zimu;
}

export function getJgidByValue(constant, value) {
	let jgid = null;
	Object.values(constant).forEach((item) => {
		if (item.value === value) {
			jgid = item.jgid;
		}
	});
	return jgid;
}

//根据orgid获取版权所有
export function getZbdwByValue(constant, value) {
	let zbdw = null;
	Object.values(constant).forEach((item) => {
		if (item.value === value) {
			zbdw = item.zbdw;
		}
	});
	return zbdw;
}

//根据orgid获取地址
export function getDzByValue(constant, value) {
	let dz = null;
	Object.values(constant).forEach((item) => {
		if (item.value === value) {
			dz = item.dz;
		}
	});
	return dz;
}

export function getValueByLabel(constant, label) {
	let value = null;
	Object.values(constant).forEach((item) => {
		if (item.label === label) {
			value = item.value;
		}
	});
	return value;
}

export function judgeOrgidIncloud(canstant, value) {
	let judge = false;
	Object.values(canstant).forEach((item) => {
		if (item.value === value) {
			judge = true;
		}
	});
	return judge;
}

export function getTypeByValue(canstant, value) {
	let type = [];
	Object.values(canstant).forEach((item) => {
		if (item.value === value) {
			type = item.type;
		}
	});
	return type;
}

export function getTypeValueByValue(constant, value) {
	let typeValue = null;
	Object.values(constant).forEach((item) => {
		if (item.value === value) {
			typeValue = item.typeValue;
		}
	});
	return typeValue;
}

/**
 * 页面地区头部
 */
export const SYSTEM = {
	zh_cn: '阳光信访网上服务平台',
	zh_py: 'YANG GUANG XIN FANG WANG SHANG FU WU PING TAI',
	zh_dt: '阳光信访网上服务平台',
};

export const HEADER = {
	//系统默认的地区 （必改）
	//label:登录默认地区（一般为省或市：如江西省只填写江西、苏州市只填写苏州）
	//dqid:省市县区id
	//type:默认的政府信箱类型 详见constant.js MAILBOXTYPE
	//zbdw:底部版权所有
	//dz:底部地址
	//bah:底部备案号
	DEFAULT: {
		label: '淮安市',
		dqid: '32081',
		type: 'sszxx',
		zbdw: '淮安市信访局 ',
		dz: '淮安市生态文旅区景会路9号',
		bah: '苏ICP备05001951号',
	},

	//label:省市县区名称（如：江西省、苏州市）
	//zimu:上面省市区县的字母全拼（PS 注意空格）
	//value:省市县区id
	//jgid:地区信访局id
	//type：政府信箱类型，以数组的形式 （如：[类型1，类型2]）
	//zbdw:底部版权所有
	//dz:底部地址
	HUIAIAN: {
		label: '淮安市',
		zimu: 'HUAI AN ',
		value: '32081',
		jgid: '32083',
		type: ['sszxx', 'ssjxx', 'jzxx'],
		zbdw: '淮安市信访局 ',
		dz: '淮安市生态文旅区景会路9号',
	},
	HUAIAN_X_JINHU: {
		label: '金湖县',
		zimu: 'JIN HU XIAN ',
		value: '320812',
		jgid: '32081298',
		zbdw: '淮安市金湖县信访局 ',
		dz: '淮安市金湖县建设路118号',
	},
	HUAIAN_Q_QJPQ: {
		label: '清江浦区',
		zimu: 'QING JINQG PU QU ',
		value: '320825',
		jgid: '32088223',
		zbdw: '淮安市清江浦区信访局 ',
		dz: '淮海南路268号',
	},
	HUAIAN_Q_HAQ: {
		label: '淮安区',
		zimu: 'HUAI AN QU ',
		value: '320815',
		jgid: '32081296',
		zbdw: '淮安市淮安区信访局 ',
		dz: '淮安市淮安区梁红玉路文府佳苑',
	},
	HUAIAN_Q_JKQ: {
		label: '经济开发区',
		zimu: 'JIN JI KAI FA QU ',
		value: '3208421',
		jgid: '32081300',
		zbdw: '淮安市经济开发区信访局 ',
		dz: '淮安市经济技术开发区宏恒胜路5号',
	},
	HUAIAN_Q_HZQ: {
		label: '洪泽区',
		zimu: 'HONG ZE QU ',
		value: '320844',
		jgid: '32081297',
		zbdw: '淮安市洪泽区信访局 ',
		dz: '淮安市洪泽区洞庭湖路21号',
	},
	HUAIAN_X_XYX: {
		label: '盱眙县',
		zimu: 'XU YI XIAN ',
		value: '320820',
		jgid: '32081299',
		zbdw: '淮安市盱眙县信访局 ',
		dz: '淮安市盱眙县淮河东路18号',
	},
	HUAIAN_Q_GYYQ: {
		label: '工业园区',
		zimu: 'GONG YE YUAN QU ',
		value: '32081303',
		jgid: '32081306',
		zbdw: '淮安市工业园区信访办 ',
		dz: '',
	},
	HUAIAN_Q_STXC: {
		label: '生态新城',
		zimu: 'SHENG TAI XIN CHENG ',
		value: '32081302',
		jgid: '32081305',
		zbdw: '淮安市生态新城信访局 ',
		dz: '',
	},
	HUAIAN_Q_HYQ: {
		label: '淮阴区',
		zimu: 'HUAI YING QU ',
		value: '320843',
		jgid: '32081295',
		zbdw: '淮安市淮阴区信访局 ',
		dz: '淮安市淮阴区长江东路40号',
	},
	HUAIAN_X_LSX: {
		label: '涟水县',
		zimu: 'LIAN SHUI XIAN ',
		value: '320811',
		jgid: '32081293',
		zbdw: '淮安市涟水县信访局 ',
		dz: '淮安市涟水县涟城街道涟州路10号',
	},
};

/**
 * 政府信箱类型
 */
export const MAILBOXTYPE = {
	JZXX: { label: '局长信箱', value: 'jzxx', typeValue: '22' }, //局长信箱
	ZFXX: { label: '政府信箱', value: 'zfxx' },
	SJXX: { label: '省委书记信箱', value: 'sjxx' },
	SZXX: { label: '政府信箱', value: 'szxx', typeValue: '26' }, //省长信箱
	SZFXX: { label: '政府信箱', value: 'szfxx' }, //市级政府信箱
	SSJXX: { label: '市委书记信箱', value: 'ssjxx', typeValue: '23' },
	SSZXX: { label: '市长信箱', value: 'sszxx', typeValue: '17' },
	XZFXX: { label: '政府信箱', value: 'xzfxx' }, //县级政府信箱
	XWSJXX: { label: '县委书记信箱', value: 'xwsjxx', typeValue: '24' },
	XZXX: { label: '县长信箱', value: 'xzxx', typeValue: '25' },
	QZFXX: { label: '政府信箱', value: 'qzfxx' }, //区级政府信箱
	QWSJXX: { label: '区委书记信箱', value: 'qwsjxx', typeValue: '24' },
	QZXX: { label: '区长信箱', value: 'qzxx', typeValue: '25' },
};

/**
 * 省级系统进入判断参数（省级系统进行属地引导时必填，若不填则默认不进行属地引导）
 * PS：最高举办单位为市级的市级系统（如南充系统、苏州系统等市级系统，请务必不要填写此配置）
 */

export const SHENGGRADE = {
	//江西省
	// JIANGXI: { label: '南充', value: '5113145' },
};
/**
 * 从市级系统判断参数（省级市级系统进行属地引导时必填，若不填则默认不进行属地引导）
 * PS：最高举办单位为县级的县级系统（如XXXX县系统，请务必不要填写此配置，县级系统无法进行属地引导）
 */
export const SHIGRADE = {
	//淮安市
	HUAIAN: { label: '淮安市', value: '32081' },
};

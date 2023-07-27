import { HEADER } from './constant/header';
import { MAILBOXTYPE } from './constant/mailbox';
import useSystem from '@/store/modules/system';

const SOURCE = {
	HEADER,
	MAILBOXTYPE,
};
/**
 * source: 获取的数据源 默认'HEADER'
 * key: 对应值的键名
 * value: 比对的值
 */
export const getByValue = (key, source = 'HEADER') => {
	const systemStore = useSystem();
	const { orgId } = systemStore;
	let newVal = null;
	Object.values(SOURCE[source]).forEach((item) => {
		if (item.value === orgId) {
			newVal = item[key];
		}
	});
	return newVal;
};
/**
 * 获取对用的图片
 */
export const getPicByValue = (key, picType = 'png') => {
	const newPic = getByValue(key) || `default-${key}.${picType}`;
	return newPic;
};
/**
 * 更新sys的值
 * value: 比对的值
 */
export const updateSys = (value) => {
	let params = null;
	Object.values(HEADER).forEach((item) => {
		if (item.value === value) {
			params = item;
		}
	});
	if (params) {
		console.log('params', params);
		const systemStore = useSystem();
		systemStore.$patch(params);
		console.log('systemStore', systemStore);
	}
};
/**
 * 判断路由里的orgId是否正确
 * value: 比对的值
 */
export const judgeOrgId = (value) => {
	let judge = false;
	Object.values(HEADER).forEach((item) => {
		if (item.value === value) {
			judge = true;
		}
	});
	return judge;
};

/**
 * 页面地区头部
 */
export const SYSTEM = {
	zh_cn: '阳光信访网上服务平台',
	zh_py: 'YANG GUANG XIN FANG WANG SHANG FU WU PING TAI',
	ICP: '苏ICP备2022006231号-3',
	COMPANY: '江苏楚淮软件科技开发有限公司',
};
/**
 * 省级系统进入判断参数（省级系统进行属地引导时必填，若不填则默认不进行属地引导）
 * PS：最高举办单位为市级的市级系统（如南充系统、苏州系统等市级系统，请务必不要填写此配置）
 */
export const SHENGGRADE = {};
/**
 * 从市级系统判断参数（省级市级系统进行属地引导时必填，若不填则默认不进行属地引导）
 * PS：最高举办单位为县级的县级系统（如XXXX县系统，请务必不要填写此配置，县级系统无法进行属地引导）
 */
export const SHIGRADE = {
	//淮安市
	HUAIAN: { label: '淮安市', value: '32081' },
};

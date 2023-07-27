/**
 * label:省市县区名称（如：江西省、苏州市）
 * zimu:上面省市区县的字母全拼（PS 注意空格）
 * value:省市县区id
 * jgId:机构id
 * type:默认的政府信箱类型
 * zbdw:底部版权所有
 * dz:底部地址
 * bah:底部备案号
 */
export const HEADER = {
	//系统默认的地区 （必改）
	DEFAULT: {
		label: '淮安',
		zimu: 'HUAI AN ',
		value: '32081',
		jgId: '32083',
		type: 'sszxx',
		zbdw: '淮安市信访局 ',
		dz: '淮安市生态文旅区景会路9号',
		tel: '0517-83664828',
	},
	HUAIAN: {
		label: '淮安市',
		zimu: 'HUAI AN ',
		value: '32081',
		jgId: '32083',
		type: ['sszxx', 'ssjxx', 'jzxx'],
		zbdw: '淮安市信访局 ',
		dz: '淮安市生态文旅区景会路9号',
		tel: '0517-83664828',
	},
	HUAIAN_X_JINHU: {
		label: '金湖县',
		zimu: 'JIN HU XIAN ',
		value: '320812',
		jgId: '32081298',
		zbdw: '淮安市金湖县信访局 ',
		dz: '淮安市金湖县建设路118号',
		tel: '0517-83664828',
	},
	HUAIAN_Q_QJPQ: {
		label: '清江浦区',
		zimu: 'QING JINQG PU QU ',
		value: '320825',
		jgId: '32088223',
		zbdw: '淮安市清江浦区信访局 ',
		dz: '淮海南路268号',
		tel: '0517-83664828',
	},
	HUAIAN_Q_HAQ: {
		label: '淮安区',
		zimu: 'HUAI AN QU ',
		value: '320815',
		jgId: '32081296',
		zbdw: '淮安市淮安区信访局 ',
		dz: '淮安市淮安区梁红玉路文府佳苑',
		tel: '0517-83664828',
	},
	HUAIAN_Q_JKQ: {
		label: '经济开发区',
		zimu: 'JIN JI KAI FA QU ',
		value: '3208421',
		jgId: '32081300',
		zbdw: '淮安市经济开发区信访局 ',
		dz: '淮安市经济技术开发区宏恒胜路5号',
		tel: '0517-83664828',
	},
	HUAIAN_Q_HZQ: {
		label: '洪泽区',
		zimu: 'HONG ZE QU ',
		value: '320844',
		jgId: '32081297',
		zbdw: '淮安市洪泽区信访局 ',
		dz: '淮安市洪泽区洞庭湖路21号',
		tel: '0517-83664828',
	},
	HUAIAN_X_XYX: {
		label: '盱眙县',
		zimu: 'XU YI XIAN ',
		value: '320820',
		jgId: '32081299',
		zbdw: '淮安市盱眙县信访局 ',
		dz: '淮安市盱眙县淮河东路18号',
		tel: '0517-83664828',
	},
	HUAIAN_Q_GYYQ: {
		label: '工业园区',
		zimu: 'GONG YE YUAN QU ',
		value: '32081303',
		jgId: '32081306',
		zbdw: '淮安市工业园区信访办 ',
		dz: '',
		tel: '0517-83664828',
	},
	HUAIAN_Q_STXC: {
		label: '生态新城',
		zimu: 'SHENG TAI XIN CHENG ',
		value: '32081302',
		jgId: '32081305',
		zbdw: '淮安市生态新城信访局 ',
		dz: '',
		tel: '0517-83664828',
	},
	HUAIAN_Q_HYQ: {
		label: '淮阴区',
		zimu: 'HUAI YING QU ',
		value: '320843',
		jgId: '32081295',
		zbdw: '淮安市淮阴区信访局 ',
		dz: '淮安市淮阴区长江东路40号',
		tel: '0517-83664828',
	},
	HUAIAN_X_LSX: {
		label: '涟水县',
		zimu: 'LIAN SHUI XIAN ',
		value: '320811',
		jgId: '32081293',
		zbdw: '淮安市涟水县信访局 ',
		dz: '淮安市涟水县涟城街道涟州路10号',
		tel: '0517-83664828',
	},
};

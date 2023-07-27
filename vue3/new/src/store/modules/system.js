import { defineStore } from 'pinia';
const useSystem = defineStore('system', {
	state: () => ({
		orgId: '',
		jgId: '',
		label: '',
		zimu: '',
		zbdw: '',
		dz: '',
		tel: '',
		type: null,
		zh_cn: '阳光信访网上服务平台',
		zh_py: 'YANG GUANG XIN FANG WANG SHANG FU WU PING TAI',
		ICP: '苏ICP备2022006231号-3',
		COMPANY: '江苏楚淮软件科技开发有限公司',
	}),
});
export default useSystem;

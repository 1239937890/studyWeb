import { createStore } from 'vuex';
export default createStore({
	state: {
		// baseUrl: 'https://mpapi.39yst.com/api',
		baseUrl: 'https://mfkmpapi.39yst.com/api',
		// userInfo: null,
		userInfo: uni.getStorageSync('mfkuserinfo') ? JSON.parse(uni.getStorageSync('mfkuserinfo')) : null,
		isWork: false,
		source: {},
		sys: {},
		isReturnIcon: false,
		moreLineHeight: 0,
		statusBarHeight: '25px'
	},
	getters: {},
	mutations: {
		editUserInfo(state, params) {
			state.userInfo = params;
		},
		updateWork(state, params) {
			state.isWork = params.isWork;
		},
		updateSource(state, params) {
			state.source = params;
			// state.moreLineHeight = params.num == 2 ? 46 : 40;
			// state.moreLineHeight = params.num == 2 ? 46 : 58;
			state.moreLineHeight = params.num == 2 ? 62 : 58;
		},
		updateSys(state, params) {
			state.sys = params;
		},
		updateIsReturnIcon(state, params) {
			state.isReturnIcon = params.isReturnIcon;
		},
		updateIsReturnIcon(state, params) {
			state.isReturnIcon = params.isReturnIcon;
		}
	},
	actions: {}
})
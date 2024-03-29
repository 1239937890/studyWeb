import router from './router';
import pinia from './store';
import useSystem from './store/modules/system';
import { ElMessage } from 'element-plus';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { judgeOrgId, updateSys } from './common/handle';
import { HEADER } from './common/constant/header';
// // import { getToken } from '@/utils/auth';
// // import { isHttp } from '@/utils/validate';

NProgress.configure({
	showSpinner: false,
});
const whiteList = ['/login', '/register'];
const isPROD = import.meta.env.PROD; //应用是否运行在生产环境
console.log('pinia>>>>>>>>', pinia);
const setOrgId = (to, from, next) => {
	//判断是否政府信箱
	if (to.path.indexOf('/zhengfuxinxiang') != -1) {
		// next({
		// 	path: '/zhengfuxinxiang',
		// 	query: { orgId: HEADER.DEFAULT.value, type: HEADER.DEFAULT.type },
		// });
	} else if (to.path.indexOf('/jzxx') != -1) {
		// next({
		// 	path: '/jzxx',
		// 	query: { orgId: HEADER.DEFAULT.value, type: 'jzxx' },
		// });
	} else {
		//判断是否网上信访
		// next({
		// 	path: '/',
		// 	query: {
		// 		orgId: HEADER.DEFAULT.value,
		// 	},
		// });
		next({
			path: to.path,
			query: {
				orgId: HEADER.DEFAULT.value,
			},
		});
	}
};
router.beforeEach((to, from, next) => {
	NProgress.start();
	if (!to.query.orgId || !judgeOrgId(to.query.orgId)) {
		setOrgId(to, from, next);
	} else {
		const orgId = to.query.orgId;
		useSystem().orgId = orgId;
		updateSys(orgId);
		next();
	}
	NProgress.done();
});

router.afterEach(() => {
	NProgress.done();
});

import {
	myCollect,
	myFeedback,
	myFollow,
	mySet,
	myarea,
	myTest,
	myZan,
} from "@/utils/pic";
const centerTopList = [{
	id: 1,
	logo: myFollow,
	title: '关注的医生',
	path: '/pages/sub/center/followDoctor'
}, {
	id: 2,
	logo: myCollect,
	title: '我的收藏',
	path: '/pages/sub/center/allCollect'
}, {
	id: 3,
	logo: myZan,
	title: '我的点赞',
	path: '/pages/sub/center/likeList'
}]

const centerServiceList = [{
	id: 1,
	title: '我的测试记录',
	info: '查看我测试过的题',
	logo: myTest,
	url: '/pages/sub/center/health/health'
}, {
	id: 2,
	title: '参与过的专区',
	info: '查看关注的专区',
	logo: myarea,
	url: '/pages/sub/center/topicList'
}, {
	id: 3,
	title: '意见反馈',
	info: '欢迎提出更好的建议',
	logo: myFeedback,
	url: '/pages/sub/center/feedback/feedback'
}, {
	id: 4,
	title: '我的设置',
	info: '管理我的设置',
	logo: mySet,
	url: '/pages/sub/center/setting'
}]
export {
	centerTopList,
	centerServiceList
}
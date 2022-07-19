import axios from '@/utils/request';
// //医生列表
// function followDoctorList(params) {
// 	return request('GET', '/follow_list', params)
// }
// //收藏列表
// function collectList(params) {
// 	return request('GET', '/hide_list', params)
// }
// //收藏列表
// function likeList(params) {
// 	return request('GET', '/liked_list', params)
// }
// //关注专区列表
// function plusList(params) {
// 	return request('GET', '/plus_list', params)
// }
// //用户评论列表
// function userPostsList(params) {
// 	return request('GET', '/user_posts_list', params)
// }

// //用户测评过的疾病
// function myTestIllList(params) {
// 	return request('POST', '/myIllList', params)
// }

// //用户测评过列表
// function myTestList(params) {
// 	return request('POST', '/myTestList', params)
// }

//用户信息
function userInfo() {
	return axios.get('/users')
}

// //意见反馈
// function feedback(params) {
// 	return request('POST', '/feedback', params)
// }
// function died(){
// 	return request('GET', '/died')
// }
export {
	// followDoctorList,
	// collectList,
	// likeList,
	// plusList,
	// userPostsList,
	// myTestList,
	// myTestIllList,
	userInfo,
	// feedback,
	// died
}
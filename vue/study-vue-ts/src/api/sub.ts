import { request } from '@/utils/request';
//专区列表
function circleContent(params) {
  return request('GET', '/circle_content', params);
}
//专区详情
function circleInfo(params) {
  return request('GET', '/circle_info', params);
}
//点赞
function liked(params) {
  return request('POST', '/liked', params);
}
//取消点赞
function likedDel(params) {
  return request('POST', '/liked_del', params);
}
//收藏
function hide(params) {
  return request('POST', '/hide', params);
}
//取消收藏
function hideDel(params) {
  return request('POST', '/hide_del', params);
}
//话题列表
function topicContent(params) {
  return request('GET', '/topic_content', params);
}
//话题详情
function topicInfo(params) {
  return request('GET', '/topic_info', params);
}
//测评题题目详情
function detailQuestion(params) {
  return request('POST', '/detailQuestion', params);
}
//提交测评
function commit(params) {
  return request('POST', '/commit', params);
}
//获取测评结果
function getTestResult(params) {
  return request('POST', '/getTestResult', params);
}
//实用百科分类列表
function categoryList() {
  return request('GET', '/category_list');
}
//实用百科专题内容列表
function specialList(params) {
  return request('POST', '/special_list', params);
}
//专题封面
function specialPic(params) {
  return request('GET', '/special_pic', params);
}
export {
  circleContent,
  circleInfo,
  liked,
  likedDel,
  hide,
  hideDel,
  topicContent,
  topicInfo,
  detailQuestion,
  commit,
  getTestResult,
  categoryList,
  specialList,
  specialPic,
};

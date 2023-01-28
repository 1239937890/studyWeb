import axios from '@/utils/request';
interface Response<T = any> {
  code: number | string;
  message: string;
  data: T;
}
// //平台功能屏蔽
// function shield() {
//     return request('GET', '/shield')
// }
// //相关词条
// function wordItems(params) {
//     return request('POST', '/word_items', params)
// }
// //大家在问
// function searchWords() {
//     return request('GET', '/search_words')
// }
// //搜索结果聚合-推荐
// function searchJuhe(params) {
//     return request('GET', '/search_juhe', params)
// }
// //搜索结果聚合-问答
// function searchAsk(params) {
//     return request('POST', '/search_ask', params)
// }
// //搜索结果聚合-视频
// function searchVideo(params) {
//     return request('POST', '/search_video', params)
// }
// //搜索结果聚合-音频
// function searchMp3(params) {
//     return request('POST', '/search_mp3', params)
// }
// //搜索结果聚合-话题
// function searchTopic(params) {
//     return request('POST', '/search_topic', params)
// }
// //搜索结果聚合-医生
// function searchDoctor(params) {
//     return request('POST', '/search_doctor', params)
// }
// //搜索结果聚合-医院
// function searchHospital(params) {
//     return request('POST', '/search_hospital', params)
// }
// //获取微信手机号
// function wxPhone(params) {
//     return request('POST', '/wx_phone', params)
// }
// //密钥获取微信手机号
// function secretPhone(params) {
//     return request('POST', '/wx_phone_new', params)
// }
// //微信登录
// function wxLogin(params) {
//     return request('POST', '/wx_login', params)
// }
// //获取百度手机号
// function baiduPhone(params) {
//     return request('POST', '/baidu_phone', params)
// }
// //百度登录
// function baiLogin(params) {
//     return request('POST', '/bai_login', params)
// }
// //快应用获取手机号码
// function checkCode(params) {
//     return request('POST', '/check_code', params)
// }
// //快应用-注册登陆
// function radLogin(params) {
//     return request('POST', '/rad_login', params)
// }
// //专区推荐
// function circle(params) {
//     return request('POST', '/circle', params)
// }
// //关注医生
// function follow(params) {
//     return request('POST', '/follow', params)
// }
// //取消关注
// function followDel(params) {
//     return request('POST', '/follow_del', params)
// }

// //加入专区
// function plus(params) {
//     return request('POST', '/plus', params)
// }
// //取消关注
// function plusDel(params) {
//     return request('POST', '/plus_del', params)
// }
// //文章列表
// function articleList(params) {
//     return request('POST', '/article_list', params)
// }
// //文章详情
// function articleInfo(params) {
//     return request('GET', '/article_info', params)
// }
// //文章列表tab栏
// function articleCat(params) {
//     return request('POST', '/mfk_cat_list', params)
// }
// //评论列表
// function postsList(params) {
//     return request('POST', '/posts_list', params)
// }

// //评论
// function posts(params) {
//     return request('POST', '/posts', params)
// }
// //删除评论
// function postsDel(params) {
//     return request('POST', '/posts_del', params)
// }
// //评测-科室-疾病分类
// function cepingIllness(params) {
//     return request('GET', '/ceping_illness', params)
// }
//评测-科室-疾病分类
function categoryList() {
  return axios.post('/categoryList');
}
//根据疾病分页查询测评
// function getTestsByIll(params) {
//     return axios.post('/getTestsByIll', params)
// }
//首页推荐测评
export function getRecommendTests() {
  return axios.post('/getRecommendTests');
}
// //微信文章列表
// function wxArticle(params) {
//     return request('GET', '/wx_article', params)
// }
// //微信文章详情
// function wxArticleInfo() {
//     return request('GET', '/wx_article_info')
// }
//首页推荐文章
export function articleRecommend() {
  return axios.get('/article_recommend');
}
//首页轮播
export function getBanner() {
  return axios.post<Response>('/banner');
}
export {
  // shield,
  // wordItems,
  // wxPhone,
  // wxLogin,
  // circle,
  // follow,
  // followDel,
  // plus,
  // plusDel,
  // articleList,
  // articleInfo,
  // postsList,
  // posts,
  // postsDel,
  // cepingIllness,
  // getTestsByIll,
  // wxArticle,
  // wxArticleInfo,
  // searchWords,
  // searchAsk,
  // searchVideo,
  // searchMp3,
  // searchTopic,
  // searchJuhe,
  // searchDoctor,
  // searchHospital,
  categoryList,
  // secretPhone,
  // articleCat,
  // baiduPhone,
  // baiLogin,
  // checkCode,
  // radLogin
};

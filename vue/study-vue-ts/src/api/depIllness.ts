import { request } from '@/utils/request';
//科室-二级科室-疾病
function depList(params) {
  return request('GET', '/department_illness', params);
}
//页面推荐icon接口
function recommend(params) {
  return request('GET', '/recommend', params);
}
//医生列表
function doctorList(params) {
  return request('POST', '/doctor_list', params);
}
//医生详情
function doctorDetail(params) {
  return request('GET', '/doctor_detail', params);
}
//内容tab栏数据
function tab(params) {
  return request('GET', '/tab', params);
}
//视频列表
function videoList(params) {
  return request('POST', '/video_list', params);
}
//视频详情
function videoInfo(params) {
  return request('GET', '/video_info', params);
}
//音频列表
function audioList(params) {
  return request('POST', '/mp3_list', params);
}
//音频详情
function audioInfo(params) {
  return request('GET', '/mp3_info', params);
}

//医院列表
function hospitalList(params) {
  return request('POST', '/hospital_lists', params);
}
//医院详情
function hospitalDetail(params) {
  return request('GET', '/hospital_detail', params);
}
//医院词条
function hospitalCitiao(params) {
  return request('GET', '/hospital_citiao', params);
}
//问答列表
function askList(params) {
  return request('POST', '/ask_list', params);
}
//问答详情
function askInfo(params) {
  return request('GET', '/ask_info', params);
}
//话题列表
function topicList(params) {
  return request('POST', '/topic_list', params);
}
//详情页相关话题
function topicAbout(params) {
  return request('POST', '/topic_about', params);
}
//类型1级科室查2级科室
function department(params) {
  return request('GET', '/department', params);
}
//疾病列表
function illnessList(params) {
  return request('POST', '/illness_list', params);
}
//疾病详情
function illnessDetail(params) {
  return request('GET', '/illness_detail', params);
}

//.医院查询二级地区列表
function secondArea(params) {
  return request('GET', '/area', params);
}
//根据catId查科室
function catDepartment(params) {
  return request('GET', '/cat_department', params);
}
//疾病医典
function illnessCanon(params) {
  return request('POST', '/illness_canon', params);
}

export {
  depList,
  recommend,
  doctorList,
  doctorDetail,
  tab,
  videoList,
  videoInfo,
  audioList,
  audioInfo,
  hospitalList,
  hospitalDetail,
  hospitalCitiao,
  askList,
  askInfo,
  department,
  illnessDetail,
  topicList,
  illnessList,
  secondArea,
  catDepartment,
  topicAbout,
  illnessCanon,
};

import request from '@/utils/request';
//投诉记录
export function tsjlFile(query) {
  return request({
    url: '/wsxf/xfj/listPage',
    method: 'get',
    params: query,
  });
}

//信访形式字典
export function fxsList() {
  return request({
    url: '/xfjc/base/getXfxsList',
    method: 'get',
  });
}

//留言记录
export function lyjl(query) {
  return request({
    url: '/wsxf/ly/add',
    method: 'post',
    data: query,
  });
}

//信访人发送留言回复
export function lyhfjl(query) {
  return request({
    url: '/wsxf/ly/addReback',
    method: 'post',
    data: query,
  });
}

//留言内容
export function lynr(query) {
  return request({
    url: '/wsxf/ly/list',
    method: 'get',
    params: query,
  });
}

//留言机构列表
export function lylist(query) {
  return request({
    url: '/wsxf/ly/getDeptList',
    method: 'get',
    params: query,
  });
}
//留言删除
export function lyremove(query, params) {
  return request({
    url: '/wsxf/ly/remove/' + query,
    method: 'get',
    params: params,
  });
}

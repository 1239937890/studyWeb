import request from '@/utils/request';

//新增矛盾在线排解接口
export function addMdzxtj(query) {
  return request({
    url: '/mdtj/case/info/add',
    method: 'post',
    data: query,
  });
}

//矛盾在线排解列表
export function draftsList(query) {
  return request({
    url: '/mdtj/drafts/listPage',
    method: 'get',
    params: query,
  });
}

//矛盾在线排解详情
export function mdzxtjDetail(id) {
  return request({
    url: '/mdtj/case/info/detail',
    method: 'get',
    params: { id },
  })
}

//调解情况列表
export function tjqkList(caseId) {
  return request({
    url: '/mdtj/detail/info/tjqkList',
    method: 'get',
    params: { caseId },
  })
}

//律师意见列表
export function lsyjList(caseId) {
  return request({
    url: '/mdtj/detail/info/lsyjList',
    method: 'get',
    params: { caseId },
  })
}

//专家意见列表
export function zjyjList(caseId) {
  return request({
    url: '/mdtj/detail/info/zjyjList',
    method: 'get',
    params: { caseId },
  })
}

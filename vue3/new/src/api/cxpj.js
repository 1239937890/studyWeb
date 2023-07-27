import request from '@/utils/request';

// 根据查询码生成加密信访件编号参数
export function cxpjjm(query) {
  return request({
    url: '/wsxf/xfj/genCode',
    method: 'post',
    data: query,
  });
}

//  获取信访件详情
export function cxpj(query) {
  return request({
    url: '/wsxf/xfj/getDetailByXfjbhAndCodeLocal',
    method: 'get',
    params: query,
  });
}

// 满意度评价接口
export function mydpjLocal(query) {
  return request({
    url: '/wsxf/mydpj/saveMydpjLocal',
    method: 'post',
    data: query,
  });
}

//满意度评价
export function mydpj(query) {
  return request({
    url: '/wsxf/mydpj/saveMydpjByCodeLocal',
    method: 'post',
    data: query,
  });
}

// 下载附件
export function xafj(query) {
  return request({
    url: '/file/download',
    method: 'post',
    data: query,
  });
}

//省长手机查询
export function szsjcx(data) {
  return request({
    url: '/wsxf/sms/szsjh',
    method: 'post',
    data: data,
  });
}

//省长查询记录
export function szsjList(queryParams) {
  return request({
    url: '/wsxf/xfj/getListBySjh',
    method: 'get',
    params: queryParams,
  });
}

import request from '@/utils/request';

// 查询字典数据详细
export function getData(dictCode) {
  return request({
    url: '/system/dict/data/' + dictCode,
    method: 'get',
  });
}

// 根据字典类型查询字典数据信息
export function getDicts(dictType) {
  return request({
    url: '/system/dict/data/type/' + dictType,
    method: 'get',
  });
}

// 获取客户配置
export function getClientConfig() {
  return request({
    url: '/system/client/data/listByUse',
    headers: {
      isToken: false,
    },
    method: 'get',
    params: { code: '' },
    timeout: 20000,
  });
}
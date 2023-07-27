import request from '@/utils/request';

// 获取公开案列
export function getPublicCases(query) {
    return request({
        url: '/wsxf/algk/listPage',
        method: 'get',
        params: query,
    });
}

// 获取公开案列详情
export function getPublicCasesList(query) {
    return request({
        url: '/wsxf/algk/detail',
        method: 'get',
        params: query,
    });
}
import request from '@/utils/request';
// 待评价记录
export function dpjList(query) {
    return request({
        url: '/wsxf/xfj/listPage',
        method: 'get',
        params: query,
    });
}

export function cxpjjm(query) {
    return request({
        url: '/wsxf/ytj/genCode',
        method: "post",
        data: query,
    });
}

import request from '@/utils/request';
// 建议记录
export function jyjl(query) {
    return request({
        url: '/wsxf/xfj/listPage',
        method: 'get',
        params: query,
    });
}
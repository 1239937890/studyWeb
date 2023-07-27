import request from '@/utils/request';
// 短信记录
export function dxjl(query) {
    return request({
        url: '/wsxf/sms/querySmsList',
        method: 'get',
        params: query,
    });
}
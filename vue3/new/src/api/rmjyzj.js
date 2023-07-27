import request from '@/utils/request';

// 获取专题建议
export function hqztjy(query) {
    return request({
        url: '/wsxf/subject/list',
        method: 'get',
        params: query,
    });
}

// 获取专题建议状态-字典
export function hqztjyzt() {
    return request({
        url: '/system/dict/data/type/sys_subject_status',
        method: 'get',
    });
}

// 金点子展示列表
export function jdzzslb(query) {
    return request({
        url: '/wsxf/jdalnw/list',
        method: 'get',
        params: query,
    });
}
// 信息动态
export function xxdt(query) {
    return request({
        url: '/wsxf/notice/list',
        method: 'get',
        params: query,
    });
}

// 专题详情
export function ztxq(query) {
    return request({
        url: '/wsxf/subject/detail/' + query,
        method: 'get',
    });
}

// 金点子详情
export function zdzxq(query) {
    return request({
        url: '/wsxf/jdalnw/detail/' + query,
        method: 'get',
    });
}

// 信息动态详情接口

export function jdzxq(query) {
    return request({
        url: '/wsxf/notice/detail/' + query,
        method: 'get',
    });
}

// 保存人民建议

export function bcrmjy(query) {
    return request({
        url: '/wsxf/xfj/saveYwXfj',
        method: 'post',
        data: query,
    });
}
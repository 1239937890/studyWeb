import request from "@/utils/request";
//我的预约列表
export function wdyyList(query) {
    return request({
        url: "/wsxf/videoXfr/list",

        method: "get",
        params: query,
    });
}
//我的预约部门列表

export function wdyybmlist(query) {
    return request({
        url: "/wsxf/videoRoster/getDeptList",
        method: "get",
        params:query,
    });
}

//获取排班列表

export function hqpblist(query) {
    return request({
        url: "/wsxf/videoRoster/getWeekRoster",
        method: "get",
        params: query,
    });
}

//立即预约
export function ljyyan(query) {
    return request({
        url: "/wsxf/videoXfr/add",
        method: "POST",
        data: query,
    });
}

//弹窗详情
export function tcxq(query) {
    return request({
        url: "/wsxf/videoXfr/detail/" + query,
        method: "get",
    });
}
//取消预约
export function qxyy(query) {
    return request({
        url: "/wsxf/videoXfr/edit",
        method: "POST",
        data: query,
    });
}

//获取预约详情
export function hqyyxq(query) {
    return request({
        url: "/wsxf/videoXfr/getDetail",
        method: "get",
        params: query,
    });
}
// 聊天记录
export function ltjllist(query) {
    return request({
        url: "/wsxf/videoTalk/list",
        method: "get",
        params: query,
    });
}
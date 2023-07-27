import request from "@/utils/request";

//信访件详情
export function xfjxq(query) {
    return request({
        url: "/wsxf/xfj/getDetail",
        method: "get",
        params: query,
    });
}

// 获取答复意见书
export function dfyjs(query) {
    return request({
        url: "/wsxf/xfj/listDfyjs",
        method: "get",
        params: query,
    });
}

// 复查预登记

export function fcydj(query) {
    return request({
        url: "/wsxf/xfj/saveYwFc",
        method: "post",
        data: query,
    });
}

export function updatefcfh(query) {
  return request({
    url: "/wsxf/xfj/fcfhgx",
    method: "post",
    data: query,
  });
}

// 复核预登记

export function fhydj(query) {
    return request({
        url: "/wsxf/xfj/saveYwFh",
        method: "post",
        data: query,
    });
}

// 获取复查列表

export function hqfclb(query) {
    return request({
        url: "/wsxf/xfj/listYwFc",
        method: "get",
        params: query,
    });
}


// 获取已复查列表
export function haveListYwFc(query) {
    return request({
        url: "/wsxf/xfj/haveListYwFc",
        method: "get",
        params: query,
    });
}

//复查机构
export function fcjglist(query) {
    return request({
        url: "/xfjc/fcjg/fcjgList",
        method: "get",
        params: query,
    });
}

// 判断是否可以复查复核
export function checkBlByXfjbh(query) {
    return request({
        url: "/xfjc/fcfh/checkBlByXfjbh",
        method: "get",
        params: query,
    });
}

// 获取复核列表
export function hqfhlb(query) {
    return request({
        url: "/wsxf/xfj/wsfhList",
        method: "get",
        params: query,
    });
}

// 获取已复核列表
export function haveListYwFh(query) {
    return request({
        url: "/wsxf/xfj/haveListYwFh",
        method: "get",
        params: query,
    });
}

// 获取复查结论字典
export function fcjlzd() {
    return request({
        url: "/system/dict/data/type/yw_fcfhjl",
        method: "get",
    });
}

// 获取复查结论字典
export function xfxzxzts() {
    return request({
        url: "/system/dict/data/type/xfxz_xzts",
        method: "get",
    });
}

// 获取意见书签收
export function hqyjsqs(query) {
    return request({
        url: "/wsxf/xfj/listZxqs",
        method: "get",
        params: query,
    });
}

// 上传61位图片
export function sctp(query) {
    return request({
        url: "/file/uploadPictureFile",
        method: "post",
        data: query,
    });
}


// 在线签收
export function zxqs(query) {
    return request({
        url: "/wsxf/zxqs/edit",
        method: "post",
        data: query,
    });
}

// 预送达评价
export function editYsdYj(query) {
    return request({
        url: "/wsxf/zxqs/editYsdYj",
        method: "post",
        data: query,
    });
}

// 签收类型字典
export function qslxzd() {
    return request({
        url: "/system/dict/data/type/wsxf_zxqs_qslx",
        method: "get",
    });
}


// 查询评价
export function cxpj() {
    return request({
        url: "/wsxf/xfj/getDetailByXfjbhAndCodeLocal",
        method: "get",
        params: query,
    });
}

import request from '@/utils/request';

// 获取用户详细信息
export function getWtsdByParentId(query) {
    return request({
        url: '/wsxf/base/getWtsdByParentId',
        method: 'get',
        params: query,
    });
}

// 省
export function province() {
    return request({
        url: '/wsxf/base/getShengList',
        method: 'get',
    });
}

export function dzprovince() {
    return request({
        url: '/wsxf/base/getDzShengList',
        method: 'get',
    });
}

// 市和县
export function city(query) {
    var params = {'parentid':query};
    return request({
        url: '/wsxf/base/getWtsdByParentId',
        method: 'get',
        params:params,
    });
}

export function dzcity(query) {
    var params = {'parentid':query};
    return request({
        url: '/wsxf/base/getDzWtsdByParentId',
        method: 'get',
        params: params,
    });
}

// 投诉提交功能
export function tstjgn(query) {
    return request({
        url: '/wsxf/xfj/saveYwXfj',
        method: 'post',
        data: query,
    });
}

// 智能属地
export function znsd(query) {
    return request({
        url: '/system/show/list',
        method: 'get',
        params: query,
    });
}

// 职能县区下机构
export function znxqxjg(query) {
    return request({
        url: '/system/show/listAll',
        method: 'get',
        params: query,
    });
}

// 重复件引导

export function cfjyd(query) {
    return request({
        url: '/wsxf/xfj/selectWsxfPc',
        method: 'post',
        data: query,
    });
}

// 验证是否当天投件
export function yzsfdttj(query) {
    return request({
        url: '/wsxf/xfj/checkFrequency',
        method: 'get',
        params: query,
    });
}

// 初次登录
export function cidl(query) {
    return request({
        url: '/wsxf/xfj/getJgInfo',
        method: 'get',
        params: query,
    });
}


// 事发地判断是否返回
export function sfdpd(query) {
    return request({
        url: '/wsxf/xfj/getJgInfoByXzqh',
        method: 'get',
        params: query,
    });
}

//
export function dqxzyd(query) {
  return request({
    url: '/system/show/getDeptShowInfoList',
    method: 'get',
    params: query,
  });
}


// 查询用户绑定微信号（加密后的身份证号）
export function getWechatUserInfo(idNo) {
  return request({
    url: '/system/wechatUser/getInfoByIdNo/' + idNo,
    method: 'get',
  });
}

// 动态生成关注公众号二维码
export function getWechatQrCode(idNo) {
  return request({
    url: '/message/message/wxQRIdCode',
    method: 'get',
    params: {
      idNo: idNo
    },
  });
}

// 取消绑定微信账号
export function unBindWechatUser(openId) {
  return request({
    url: '/system/wechatUser/removeWsxf/' + openId,
    method: 'get',
  });
}
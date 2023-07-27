import request from "@/utils/request";
// 投诉提交功能
export function checkUsername(query) {
    return request({
        url: "/wsxf/forget/checkUsername",
        method: "post",
        data: query,
    });
}

// 修改密码发送短信验证码
export function xgmmdxCode(captcha, captchaKey, checkUserNameToken) {
    const data = {
        captcha,
        captchaKey,
        checkUserNameToken,
    };
    return request({
        url: "/wsxf/sms/setPasswordMutiStep",

        method: "post",
        data: data,
    });
}
// 验证提交功能
export function yzsf(query) {
    return request({
        url: "/wsxf/forget/yzsf",
        method: "post",
        data: query,
    });
}
// 设置新密码
export function psaaworder(query) {
    return request({
        url: "/wsxf/forget/setNewPassword",
        method: "post",
        data: query,
    });
}
import request from "@/utils/request";
//完善资料
export function wszlFile() {
    return request({
        url: "/wsxf/user/detail",
        method: "get",
    });
}

//修改个人信息
export function personalFile(query) {
    return request({
        url: "/wsxf/personal/update",
        method: "post",
        data: query,
    });
}

// 发送手机修改短信验证码
export function updatePasswordCode(captcha, captchaKey) {
    const data = {
        captcha,
        captchaKey,
    };
    return request({
        url: "/wsxf/sms/updatePassword",

        method: "post",
        data: data,
    });
}

//手机短信修改
export function sjdxFile(query) {
    return request({
        url: "/wsxf/personal/updatePasswordBySms",
        method: "post",
        data: query,
    });
}
//原密码修改
export function ymmFile(query) {
    return request({
        url: "/wsxf/personal/updatePasswordByOldPassword",
        method: "post",
        data: query,
    });
}
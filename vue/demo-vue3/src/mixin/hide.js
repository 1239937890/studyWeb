import {
    hide,
    hideDel,
} from "@/api/sub";
export default {
    data() {
        return {
            isHide: 0
        }
    },
    methods: {
        hide() {
            uni.showLoading({
                title: '加载中',
                mask: true
            })
            const hideHttp = this.isHide == 0 ? hide : hideDel;
            const toast = this.isHide == 0 ? '已收藏' : '已取消收藏';
            hideHttp({
                id: this.id,
                type: this.dataType
            }).then(res => {
                if (res.code == 200) {
                    this.isHide = this.isHide == 0 ? 1 : 0;
                    setTimeout(() => {
                        uni.hideLoading();
                        uni.showToast({
                            title: toast,
                            icon: 'none'
                        })
                    }, 200)
                } else {
                    uni.hideLoading();
                }
            }).catch(err => {
                uni.hideLoading();
                console.log(err)
            })
        }
    }
}
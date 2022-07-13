import {
    plus,
    plusDel
} from "@/api/index";
export default {
    data() {
        return {
            followText: '',
        }
    },
    methods: {
        follow() {
            uni.showLoading({
                title: '加载中',
                mask: true
            })
            const followHttp = this.followText == '关注' ? plus : plusDel;
            const toast = this.followText == '关注' ? '已关注' : '已取消关注';
            followHttp({
                circle_id: this.circleId
            }).then(res => {
                if (res.code == 200) {
                    this.followText = this.followText == '关注' ? '已关注' : '关注';
                    const pages = getCurrentPages();
                    const page = pages[pages.length - 2];
                    if (page && page.$vm && page.$vm.$refs && page.$vm.$refs.area) {
                        page.$vm.$refs.area.followText = this.followText
                    } else if (page && page.$vm && page.$vm.$refs && page.$vm.$refs['common-details']) {
                        page.$vm.$refs['common-details'].$refs.area.followText = this.followText
                    }
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
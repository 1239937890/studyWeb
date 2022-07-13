/*
 * @Author: zcj
 * @Autor: Seven
 * @Date: 2022-05-17 10:14:25
 * @LastEditors: Seven
 * @LastEditTime: 2022-05-30 15:30:51
 * @FilePath: \uniDemod:\MFK\mfk-project\mfk-more\src\mixin\logins.js
 * @Description: 
 * @Version: 2.0
 */
export default {
    data() {
        return {
            show: false,
            mobileShow: false,
            isLogin: false
        }
    },
    onLoad(){
        if (this.$store.state.userInfo && this.$store.state.userInfo.app_token) {
            this.isLogin = true
        }
    },
    methods: {
        open() {
            this.show = true
        },
        close() {
            this.show = false
        },
        mobileOpen() {
            this.mobileShow = true
        },
        mobileClose() {
            this.mobileShow = false
        },
        hanlderLogin() {
            if (this.$store.state.userInfo && this.$store.state.userInfo.username) {
                this.mobileOpen()
            } else {
                this.open()
            }
        }
    }
}
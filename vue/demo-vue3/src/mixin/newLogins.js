/*
 * @Author: zcj
 * @Autor: Seven
 * @Date: 2022-05-17 10:14:25
 * @LastEditors: Seven
 * @LastEditTime: 2022-06-01 10:32:28
 * @FilePath: \uniDemod:\MFK\mfk-project\mfk-more\src\mixin\newLogins.js
 * @Description: 
 * @Version: 2.0
 */
import {
    mapState
} from 'vuex';
export default {
    data() {
        return {
            isLogin: false
        }
    },
    computed: {
        ...mapState({
            userInfo(state) {
                this.isLogin = state.userInfo && state.userInfo.app_token ? true : false
                return state.userInfo
            },
            source(state){
                return state.source
            }
        })
    },
    watch: {
        userInfo: {
            handler: function () {
                // console.log('val', val)
                // console.log('old', old)
                if (this.isLogin && this.loginCd) {
                    this.loginCd()
                }
            },
            deep: true
        }
    },
    onLoad() {
        // console.log('this.userInfo', this.userInfo)
        // this.isLogin = this.userInfo && this.userInfo.app_token ? true : false
    },
    methods: {
        hanlderLogin() {
            const url = this.source.num == 4 || this.source.num == 5?'/pages/login/radLogin':'/pages/login/login';
            uni.navigateTo({
                url
            })
        }
    }
}
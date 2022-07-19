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
            source(state) {
                return state.source
            }
        })
    },
    watch: {
        userInfo: {
            handler: function () {
                if (this.isLogin && this.loginCd) {
                    this.loginCd()
                }
            },
            deep: true
        }
    },
    methods: {
        hanlderLogin() {
            const url = this.source.num == 4 || this.source.num == 5 ? '/pages/login/radLogin' : '/pages/login/login';
            uni.navigateTo({
                url
            })
        }
    }
}
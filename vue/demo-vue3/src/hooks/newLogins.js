import {
    useAllStore
} from '@/store/index';
import {
    storeToRefs
} from 'pinia';
import {
    ref
} from 'vue';
export function useLogin() {
    const isLogin = ref(false)
    const allStore = useAllStore()
    const {
        userInfo,
        source
    } = storeToRefs(allStore)
    console.log('userInfo', userInfo)
    console.log('source', source)
    const hanlderLogin = () => {
        console.log('跳转登录页面')
    }
    return {
        isLogin,
        hanlderLogin
    }
}
// import {
//     mapState
// } from 'vuex';
// export default {
//     data() {
//         return {
//             isLogin: false
//         }
//     },
//     computed: {
//         ...mapState({
//             userInfo(state) {
//                 this.isLogin = state.userInfo && state.userInfo.app_token ? true : false
//                 return state.userInfo
//             },
//             source(state) {
//                 return state.source
//             }
//         })
//     },
//     watch: {
//         userInfo: {
//             handler: function () {
//                 if (this.isLogin && this.loginCd) {
//                     this.loginCd()
//                 }
//             },
//             deep: true
//         }
//     },
//     methods: {
//         hanlderLogin() {
//             const url = this.source.num == 4 || this.source.num == 5 ? '/pages/login/radLogin' : '/pages/login/login';
//             uni.navigateTo({
//                 url
//             })
//         }
//     }
// }
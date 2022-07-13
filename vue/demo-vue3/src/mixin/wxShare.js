/*
 * @Author: zcj
 * @Autor: Seven
 * @Date: 2022-05-17 10:14:25
 * @LastEditors: Seven
 * @LastEditTime: 2022-05-27 10:04:58
 * @FilePath: \uniDemod:\MFK\mfk-project\mfk-more\src\mixin\wxShare.js
 * @Description: 
 * @Version: 2.0
 */
export default {
    data() {
        return {
            share: {
                title: '',
                path: '',
                imageUrl: ''
            }
        }
    },
    // 发送给朋友
    onShareAppMessage() {
        console.log('onShareAppMessage')
        let currPage = null
        let pages = getCurrentPages();
        currPage = pages[pages.length - 1];
        const arr = Object.entries(currPage.options)
        let url = ''
        arr.map((item, index) => {
            const temp = index == arr.length - 1 ? '' : '&'
            url = `${url+item[0]}=${item[1]+temp}`
        })
        const log = url ? '?' : ''
        const tempUrl = `/${currPage.route+log+url}`
        // console.log('tempUrl', tempUrl)
        return {
            title: '民福康小程序',
            path: tempUrl
        }
    },
    //分享到朋友圈
    onShareTimeline() {}
}
export default {
    data() {
        return {
            tabType: '',
            // isMore: false,
            // isMoreVideo: false,
            // isMoreAsk: false,
            // isMoreAsk: false,
            // isMoreTalk: false,
            // isMoreArticle: false
        }
    },
    methods: {
        handlerInit(list) {
            if (list.length != 0) {
                this.tabType = list[0].type
                list.map(item => {
                    this.$refs[item.type].getDataList()
                })
            }
            this.isTabsShow = true
        },
        tabChange(val) {
            this.tabType = val
        }
        // moreVideo(val) {
        //     this.isMoreVideo = val
        // },
        // moreAsk(val) {
        //     this.isMoreAsk = val
        // },
        // moreVoice(val) {
        //     this.isMoreVoice = val
        // },
        // moreTalk(val) {
        //     this.isMoreTalk = val
        // },
        // moreArticle(val) {
        //     this.isMoreArticle = val
        // }
    }
}
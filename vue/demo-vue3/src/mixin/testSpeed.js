export default {
    data() {
        return {
            testCurrentTime: 0
        }
    },
    created() {
        this.testCurrentTime = new Date().getTime();
    },
    // onReady() {
    //     console.log('渲染完成')
    //     this.$nextTick(() => {
    //         if (this.testCurrentTime == 0) {
    //             return false
    //         };
    //         const testNewTime = new Date().getTime() - this.testCurrentTime;
    //         console.log(testNewTime)
    //         console.log('wx', wx.reportPerformance)
    //         if (this.source.num == 1 && uni.canIUse('reportPerformance')) {
    //             console.log('testId', this.testId)
    //             wx.reportPerformance(this.testId, testNewTime);
    //         } else {
    //             console.log('当前版本不支持')
    //         }
    //     })
    // }
    methods: {
        handlerReady() {
            this.$nextTick(() => {
                // console.log('testCurrentTime',this.testCurrentTime)
                if (this.testCurrentTime == 0) {
                    return false
                };
                const testNewTime = new Date().getTime() - this.testCurrentTime;
                console.log(testNewTime)
                // console.log('wx', wx.reportPerformance)
                if (this.source.num == 1 && uni.canIUse('reportPerformance')) {
                    wx.reportPerformance(this.testId, testNewTime);
                } else {
                    console.log('当前版本不支持')
                }
            })
        }
    }
}
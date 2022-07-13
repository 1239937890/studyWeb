// import {
//     areaHospital,
// } from '@/utils/recommendType';
export default {
    data() {
        return {
            swiperHeight: 285,
            currentIndex: 0,
            dataList: [],
            itemHeight: 0,
            scrollTop: 0,
            stickyTop: 0,
            // overlayTop: 0,
        }
    },
    onReachBottom() {
        if (!this.dataList[this.currentIndex].isInit) {
            this.lower()
        }
    },
    // onPageScroll(e) {
    //     this.scrollTop = e.scrollTop
    //     console.log('this.scrollTop',this.scrollTop)
    // },
    methods: {
        swiperChange(e) {
            if (e.detail.source == "touch") {
                this.currentIndex = e.detail.current;
                // if ((this.depId || this.areaId) && this.$refs['tabView']) {
                //     this.$refs['tabView'].intoView = this.dataList[this.currentIndex].viewId;
                // }
                if (this.$refs['tabView']) {
                    this.$refs['tabView'].intoView = this.dataList[this.currentIndex].viewId;
                }
                this.getChildrenData(e.detail.current);
            } else if (this.currentIndex == e.detail.current) {
                this.getChildrenData(this.currentIndex);
            }
        },
        lower() {
            if (!this.dataList[this.currentIndex].isEnd && !this.dataList[this.currentIndex].lock) {
                this.dataList[this.currentIndex].lock = true
                this.dataList[this.currentIndex].isLoading = true
                    ++this.dataList[this.currentIndex].page
                setTimeout(() => {
                    this.$refs[this.dataList[this.currentIndex].ref][0].getDataList(true)
                }, 200)
            }
        },
        handlerLoad(params) {
            if (!params) {
                return false
            }
            if (params.dataNum) {
                this.swiperHeight = params.dataNum * this.itemHeight
            }
            this.dataList[this.currentIndex].num = params.dataNum
            this.dataList[this.currentIndex].isInit = false
            this.dataList[this.currentIndex].isLoading = false
            this.dataList[this.currentIndex].isEnd = params.isMore
            this.dataList[this.currentIndex].lock = params.dataNum ? params.isMore : true
            if (this.loadingShow) {
                this.loadingShow = false
            }
        },
        getDataList(val) {
            this.dataList = val.map(item => {
                return {
                    // id: type == areaHospital ? '' : item.id,
                    // areaId: type == areaHospital ? item.areaId : '',
                    // catId: item.catId ? item.catId : '',
                    // ref: type == areaHospital ? `ref-${item.areaId}` : `ref-${item.id}`,
                    id: item.id,
                    depId: item.depId ? item.depId : '',
                    areaId: item.areaId ? item.areaId : '',
                    catId: item.catId ? item.catId : '',
                    ref: `ref-${item.id}`,
                    viewId: item.viewId?item.viewId:'',
                    page: 1,
                    flag: false,
                    isEnd: false,
                    lock: false,
                    isLoading: false,
                    num: 0,
                    isInit: true
                }
            })
        },
        handlerDep(index, list) {
            const type = this.$store.state.source.num;
            if (list) {
                this.getDataList(list);
            };
            this.dataList[index].page = 1;
            this.dataList[index].flag = true;
            if (this.currentIndex != index) {
                this.$nextTick(()=>{
                    if (type == 5) {
                        this.getChildrenData(index);
                    }
                    this.currentIndex = index;
                })
            } else {
                this.getChildrenData(index);
            };
        },
        getHeight(val) {
            this.itemHeight = val
            const num = this.dataList[this.currentIndex].num
            this.swiperHeight = num ? val * num : val
        },
        getChildrenData(index) {
            this.dataList[index].page = 1;
            this.dataList[index].flag = true;
            this.$nextTick(() => {
                if (this.$refs[this.dataList[index].ref] && this.$refs[this.dataList[index].ref][0]) {
                    this.$refs[this.dataList[index].ref][0].getDataList()
                } else {
                    setTimeout(() => {
                        if (this.$refs[this.dataList[index].ref] && this.$refs[this.dataList[index].ref][0]) {
                            this.$refs[this.dataList[index].ref][0].getDataList()
                        } else {
                            setTimeout(() => {
                                if (this.$refs[this.dataList[index].ref] && this.$refs[this.dataList[index].ref][0]) {
                                    this.$refs[this.dataList[index].ref][0].getDataList()
                                }
                            }, 2000)
                        }
                    }, 1000)
                }
            })
            this.handlerScroll(0)
            if (this.scrollTop > this.stickyTop) {
                this.handlerScroll(0)
            }
        },
        handlerScroll(num) {
            uni.pageScrollTo({
                scrollTop: this.stickyTop,
                duration: num
            });
        }
    }
}
import {
    getColumnType
} from '@/utils/index';
export default {
    data() {
        return {
            loadingShow: true,
            show: false,
            isSticky: true,
            dataList: [],
            isLoading: false,
            isEnd: false,
            flag: false,
            lock: false,
            page: 1,
            limit: 10,
            columnStickyTop: 0,
            swiperHeight: 285,
            currentIndex: 0,
            scrollTop: 0,
            stickyTop: 0,
            overlayTop: 0,
            itemHeight: 0,
            statusBarHeight: 0,
            searchTop: 0,
            searchHeight: 0,
            offsetTop: 0,
            defaultSwiperHeight: 0,
            newTitle: ''
        }
    },
    options: {
        styleIsolation: 'shared'
    },
    mounted() {},
    onLoad(options) {
        this.pageTitle = options.type ? getColumnType(options.type) : this.pageTitle;
        this.newTitle = this.pageTitle;
        const headerHeight = getApp().globalData.headerHeight;
        this.statusBarHeight = getApp().globalData.sys.statusBarHeight;
        this.columnStickyTop = `${headerHeight}px`;
        this.offsetTop = `${uni.upx2px(142) + headerHeight}px`;
        this.searchTop = headerHeight;
        this.$nextTick(() => {
            setTimeout(() => {
                const query = uni.createSelectorQuery().in(this);
                query.select('#search').boundingClientRect();
                query.select('#sticky').boundingClientRect();
                query.exec(res => {
                    this.searchHeight = res[0] ? res[0].height : 0;
                    const stickyHeight = uni.upx2px(62);
                    const stickyTop = res[1] ? res[1].top : 0;
                    this.overlayTop = this.searchHeight + stickyHeight + headerHeight;
                    this.stickyTop = stickyTop - this.searchHeight - headerHeight;
                    this.loadingShow = false;
                });
            }, 500)
        })
    },
    onReachBottom() {
        if (!this.dataList[this.currentIndex].isInit) {
            this.lower()
        }
    },
    onPageScroll(e) {
        this.scrollTop = e.scrollTop
    },
    watch: {
        scrollTop(val) {
            this.newTitle = val >= this.stickyTop ? this.tempTitle : this.pageTitle;
        }
    },
    methods: {
        moveHandle() {
            return false
        },
        overlayClose() {
            this.isSticky = true
            this.show = false
        },
        getHeight(val) {
            this.itemHeight = val
            const num = this.dataList[this.currentIndex].num
            this.swiperHeight = num ? val * num : val
        },
        handlerOverlay(index) {
            this.currentIndex = index;
            const type = this.$store.state.source.num;
            if (type == 5) {
                this.getChildrenData(index);
                this.$refs['dep-tabs'].intoView = this.dataList[index].viewId;
                this.$refs['dep-tabs'].currentIndex = index;
            };
            this.isSticky = true;
            this.show = false;
            this.$refs['my-popup'].close();
        },
        swiperChange(e) {
            this.currentIndex = e.detail.current;
            this.getChildrenData(e.detail.current);
            this.$refs['dep-tabs'].intoView = this.dataList[e.detail.current].viewId;
            this.$refs['dep-tabs'].currentIndex = e.detail.current;
        },
        getDataList(val) {
            this.dataList = val.map(item => {
                return {
                    id: `${item.id}`,
                    viewId: `view${item.id}`,
                    name: item.name,
                    ref: `ref-${item.id}`,
                    page: 1,
                    flag: false,
                    isEnd: false,
                    lock: false,
                    isLoading: false,
                    num: 0,
                    isInit: true,
                    data: []
                }
            })
        },
        lower() {
            this.loadingShow = false
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
        },
        handlerDep(index, list) {
            const type = this.$store.state.source.num;
            if (list) {
                this.getDataList(list)
                this.$nextTick(() => {
                    this.getChildrenData(index)
                })
            } else if (type == 5) {
                this.getChildrenData(index);
                this.$refs['dep-tabs'].intoView = this.dataList[index].viewId;
                this.$refs['dep-tabs'].currentIndex = index;
            }
            this.currentIndex = index
        },
        getChildrenData(index) {
            this.dataList[index].page = 1;
            this.dataList[index].flag = true;
            this.$nextTick(() => {
                if (this.$refs[this.dataList[index].ref] && this.$refs[this.dataList[index].ref][0]) {
                    this.$refs[this.dataList[index].ref][0].getDataList();
                } else {
                    setTimeout(() => {
                        if (this.$refs[this.dataList[index].ref] && this.$refs[this.dataList[index].ref][0]) {
                            this.$refs[this.dataList[index].ref][0].getDataList();
                        } else {
                            setTimeout(() => {
                                if (this.$refs[this.dataList[index].ref] && this.$refs[this.dataList[index].ref][0]) {
                                    this.$refs[this.dataList[index].ref][0].getDataList();
                                } else {
                                    setTimeout(() => {
                                        if (this.$refs[this.dataList[index].ref] && this.$refs[this.dataList[index].ref][0]) {
                                            this.$refs[this.dataList[index].ref][0].getDataList();
                                        }
                                    }, 5000)
                                }
                            }, 2000)
                        };
                    }, 1000)
                };
            })
            if (this.scrollTop > this.stickyTop) {
                this.handlerScroll(0);
            };
        },
        openMenu() {
            if (!this.show && this.scrollTop < this.stickyTop) {
                this.handlerScroll(300)
            }
            this.isSticky = !this.isSticky
            this.show ? this.$refs['my-popup'].close() : this.$refs['my-popup'].open()
            this.show = !this.show
        },
        handlerScroll(num) {
            uni.pageScrollTo({
                scrollTop: this.stickyTop,
                duration: num
            });
        }
    }
}
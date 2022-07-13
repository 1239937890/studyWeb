import {
    getCurrentInstance
} from 'vue'
export default {
    setup() {
        const {
            proxy
        } = getCurrentInstance()
        const state = {
            dataList: [],
            scrollTop: 0,
            tabStickyTop: 0,
            itemHeight: 0
        }
        const handlerScrollTo = () => {
            document.documentElement.scrollTo(0, proxy.tabStickyTop)
        }
        const scrollBottom = () => {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop; //距离顶部的高度
            const clientHeight = document.documentElement.clientHeight; //元素可视化的高度
            const scrollHeight = document.documentElement.scrollHeight; //元素整体高度包含滚动条隐藏的部分
            proxy.scrollTop = scrollTop;
            if (scrollTop + clientHeight >= scrollHeight) {
                if (!proxy.dataList[proxy.currentIndex].isInit) {
                    lower()
                }
            }
        }
        const getHeight = val => {
            proxy.itemHeight = val;
            const num = proxy.dataList[proxy.currentIndex].num;
            proxy.swipeHeight = num ? val * num : val;
        }
        const handlerDep = (index, list) => {
            list ? getDataList(list) : proxy.$refs['my-swipe'].swipeTo(index)
            getChildrenData(index)
        }
        const getDataList = val => {
            proxy.dataList = val.map(item => {
                return {
                    id: item.id,
                    ref: `ref-${item.id}`,
                    page: 1,
                    flag: false,
                    isEnd: false,
                    lock: false,
                    isLoading: false,
                    num: 0,
                    isInit: true
                }
            })
        }
        const getChildrenData = index => {
            proxy.dataList[index].page = 1
            proxy.dataList[index].flag = true
            proxy.$nextTick(() => {
                if (proxy.$refs[proxy.dataList[index].ref] && proxy.$refs[proxy.dataList[index].ref][0]) {
                    proxy.$refs[proxy.dataList[index].ref][0].getDataList();
                }
            })
            if (proxy.scrollTop > proxy.tabStickyTop) {
                handlerScrollTo();
            };
        }
        const swiperChange = e => {
            proxy.currentIndex = e
            getChildrenData(e)
        }
        const handlerLoad = params => {
            const {
                dataNum,
                isMore
            } = params
            if (dataNum) {
                proxy.swipeHeight = dataNum * proxy.itemHeight
            }
            proxy.dataList[proxy.currentIndex].num = dataNum
            proxy.dataList[proxy.currentIndex].isInit = false
            proxy.dataList[proxy.currentIndex].isLoading = false
            proxy.dataList[proxy.currentIndex].isEnd = isMore
            proxy.dataList[proxy.currentIndex].lock = dataNum ? isMore : true
        }
        const lower = () => {
            if (!proxy.dataList[proxy.currentIndex].isEnd && !proxy.dataList[proxy.currentIndex].lock) {
                proxy.dataList[proxy.currentIndex].lock = true
                proxy.dataList[proxy.currentIndex].isLoading = true
                    ++proxy.dataList[proxy.currentIndex].page
                setTimeout(() => {
                    proxy.$refs[proxy.dataList[proxy.currentIndex].ref][0].getDataList(true)
                }, 200)
            }
        }
        return {
            state,
            handlerDep,
            handlerLoad,
            scrollBottom,
            swiperChange,
            getHeight
        }
    }
}
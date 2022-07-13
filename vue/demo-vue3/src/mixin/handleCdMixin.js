/*
 * @Author: zcj
 * @Autor: Seven
 * @Date: 2022-05-17 10:14:25
 * @LastEditors: Seven
 * @LastEditTime: 2022-07-12 17:26:26
 * @FilePath: \uniDemod:\study\vue3\demo-vue3\src\mixin\handleCdMixin.js
 * @Description: 
 * @Version: 2.0
 */
export default {
    data() {
        return {
            dataList: [],
            isNothing: false,
        }
    },
    methods: {
        handlerCommon(allParams) {
            const {
                isLoading,
                data,
                requestHttp,
                dataType
            } = allParams;
            requestHttp(data)
                .then(res => {
                    if (res.code == 200) {
                        const dataList = dataType && dataType == 'test' ? res.data.records : res.data;
                        if (isLoading) {
                            this.handlerLoading(dataList)
                        } else {
                            this.dataList = [...dataList];
                            const isMore = dataList.length < 10 || dataList.length == this.limit ? false : true;
                            const params = {
                                isMore,
                                dataNum: dataList.length,
                                isTop: true
                            }
                            this.$emit('load', params);
                            this.isNothing = dataList.length == 0 ? true : false;
                            const getHeight = function () {
                                if(!this.isNothing){
                                    this.$nextTick(()=>{
                                        const height = this.$refs.item[0].clientHeight;
                                        this.$emit('getHeight', height);
                                    })
                                }
                            }.bind(this);
                            getHeight();
                        }
                    }
                    if (this.page == 1) {
                        this.$emit('loadComplete', true)
                    }
                })
        },
        handlerLoading(data) {
            const isMore = data.length == this.limit ? false : true
            this.dataList = this.dataList.concat(data)
            const params = {
                isMore,
                dataNum: this.dataList.length,
                isTop: false
            }
            this.$emit('load', params)
        },
    }
}
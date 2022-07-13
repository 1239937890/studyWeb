<template>
    <view class="dep_icon">
        <view class="item" v-for="item in dataList" :key="item.id" @click="jumpPage(item.id,item.name)">
            <image class="image" :src="item.icon"></image>
            <text>{{item.name}}</text>
        </view>
    </view>
</template>
<script>
    import {
        recommend
    } from '@/api/depIllness';
    import {
        departmentHospital,
        doctorDepartment,
        departmentIllness,
        illnessAudio,
        illnessAsk
    } from '@/utils/recommendType';
    export default {
        props: {
            typeVal: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                dataList: []
            }
        },
        mounted() {
            this.getRecommend()
        },
        methods: {
            getRecommend() {
                recommend({
                        type: this.typeVal
                    })
                    .then(res => {
                        if (res.code == 200) {
                            this.dataList = [...res.data]
                            const isShow = res.data == 0 ? false : true
                            this.$emit('getShow', isShow)
                        }
						this.$emit('loadComplete', true)
                    })
            },
            jumpPage(id, title) {
                const tempTitle = encodeURIComponent(title)
                if (this.typeVal == departmentHospital) {
                    uni.navigateTo({
                        url: `/pages/hospital/hospital?depId=${id}&title=${tempTitle}&isTab=true&typeVal=${this.typeVal}`
                    })
                } else if (this.typeVal == doctorDepartment) {
                    uni.navigateTo({
                        url: `/pages/doctorList/doctorList?depId=${id}&typeVal=${this.typeVal}&title=${tempTitle}`
                    });
                } else if (this.typeVal == departmentIllness) {
                    uni.navigateTo({
                        url: `/pages/disease/info?id=${id}`
                    })
                } else if (this.typeVal == illnessAudio) {
                    uni.navigateTo({
                        url: `/pages/audiohome/audiohome?illnessId=${id}&title=${tempTitle}`
                    })
                } else if (this.typeVal == illnessAsk) {
                    uni.navigateTo({
                        url: `/pages/askhome/askhome?illnessId=${id}&title=${tempTitle}`
                    })
                } else if (this.typeVal == 'sjkzr' || this.typeVal == 'myzs' || this.typeVal == 'lyzx') {
                    uni.navigateTo({
                        url: `/pages/videohome/videohome?illnessId=${id}&title=${tempTitle}`
                    })
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    .dep_icon {
        @include flex(space-between, center);
        flex-wrap: wrap;

        .item {
            @include flex(center, center);
            flex-direction: column;
            margin-bottom: 22rpx;
            @include w-h(156rpx, 156rpx);
            font-size: 26rpx;
            color: #333333;
            background-color: #FFFFFF;
			font-weight: 500;
            border-radius: 12rpx;

            .image {
                margin-bottom: 20rpx;
                @include w-h(57rpx, 57rpx);
            }
        }
    }
</style>
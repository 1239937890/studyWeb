<template>
	<view class="sub_title">
		<view class="left">
			<text :class="['text_1',isBg?'temp':'']">{{title}}</text>
			<slot name="logo"></slot>
		</view>
		<view class="right" v-if="all" @click="handlerCheckIllness">
			<text class="text_2">{{all}}</text>
			<text class="iconfont">&#xe612;</text>
		</view>
		<view v-else></view>
	</view>
</template>
<script>
	import {
		departmentIllness,
		partIllness,
		departmentHospital,
		areaHospital,
		illnessHospital,
		doctorPosition,
		doctorDepartment,
		doctorList,
		hospitalList,
		illnessAudio,
		illnessAsk,
		videoCat
	} from '@/utils/recommendType'
	export default {
		props: {
			isBg:{
				type: Boolean,
				default: false
			},
			name: {
				type: String,
				default: ''
			},
			title: {
				type: String,
				default: ''
			},
			all: {
				type: String,
				default: ''
			},
			typeVal: {
				type: String,
				default: ''
			},
			searchType: {
				type: String,
				default: ''
			},
			illnessId: {
				type: String,
				default: ''
			}
		},
		methods: {
			handlerCheckIllness() {
				const title = encodeURIComponent(this.name)
				if (this.typeVal == doctorList) {
					uni.navigateTo({
						url: `/pages/doctorList/doctorList?typeVal=${this.typeVal}&searchType=${this.searchType}&illnessId=${this.illnessId}`
					});
				} else if (this.typeVal == hospitalList) {
					uni.navigateTo({
						url: `/pages/hospital/hospital?title=${title}&typeVal=${this.typeVal}&illnessId=${this.illnessId}`
					});
				} else if (this.typeVal) {
					const objVal = this.setBarTitle()
					uni.navigateTo({
						url: `/pages/sub/index/lookup/${objVal.pageName}?typeVal=${this.typeVal}&barTitle=${encodeURIComponent(objVal.barTitle)}&isSearch=${objVal.isSearch}&searchType=${this.searchType}`
					})
				}
			},
			setBarTitle() {
				let barTitle = ''
				let pageName = ''
				let isSearch = ''
				switch (this.typeVal) {
					case videoCat:
						barTitle = '按疾病找视频'
						pageName = 'checkIllness'
						isSearch = 'true'
						break;
					case illnessAudio:
						barTitle = '按疾病找音频'
						pageName = 'checkIllness'
						isSearch = 'true'
						break;
					case illnessAsk:
						barTitle = '按疾病找问答'
						pageName = 'checkIllness'
						isSearch = 'true'
						break;
					case departmentIllness:
						barTitle = '按科室查疾病'
						pageName = 'checkIllness'
						isSearch = 'true'
						break;
					case partIllness:
						barTitle = '按部位查疾病'
						pageName = 'checkIllness'
						isSearch = 'true'

						break;
					case departmentHospital:
						barTitle = '按科室找医院'
						pageName = 'checkHospital'
						isSearch = 'true'
						break;
					case areaHospital:
						barTitle = '按城市找医院'
						pageName = 'checkHospital'
						break;
					case illnessHospital:
						barTitle = '按疾病找医院'
						pageName = 'checkIllness'
						isSearch = 'true'
						break;
					case doctorPosition:
						barTitle = '全部职称'
						pageName = 'allTitle'
						isSearch = 'true'
						break;
					case doctorDepartment:
						barTitle = '按科室找医生'
						pageName = 'checkHospital'
						isSearch = 'true'
						break;
				}
				return {
					barTitle,
					pageName,
					isSearch,
				}
			},
		}
	}
</script>
<style lang="scss" scoped>
	.sub_title {
		@include flex(space-between, center);
		font-size: 24rpx;
		color: #666666;

		.left {
			@include flex(flex-start, center);

			.text_1 {
				font-size: 34rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #333333;
			}

			.temp {
				position: relative;
				z-index: 1;
				&::before {
					content: '';
					position: absolute;
					bottom: 4rpx;
					left: 4rpx;
					@include w-h(100%, 16rpx);
					background-color: #4F90F7;
					opacity: 0.4;
					z-index: -1;
				}
			}
		}
	}

	.iconfont {
		font-size: 24rpx;
		color: #999999;
	}

	.rght {
		align-items: center;

	}

	.text_2 {
		font-size: 24rpx;
	}
</style>
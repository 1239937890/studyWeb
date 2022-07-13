<!--
 * @Author: zcj
 * @Autor: Seven
 * @Date: 2022-05-17 10:14:25
 * @LastEditors: Seven
 * @LastEditTime: 2022-05-17 15:01:07
 * @FilePath: \uniDemod:\MFK\mfk-project\mfk-more\src\components\lookUp\rightList.vue
 * @Description: 
 * @Version: 2.0
-->
<template>
	<view class="lists">
		<view class="item" v-for="item in lists" :key="item.id" @click="jumpPage(item.id)">{{item.name}}</view>
	</view>
</template>
<script>
	import {
		departmentHospital,
		areaHospital,
		doctorDepartment
	} from '@/utils/recommendType'
	export default {
		props: {
			lists: {
				type: Array,
				default: () => []
			},
			typeVal: {
				type: String,
				default: ''
			},
			parentId: {
				type: String,
				default: ''
			},
			parentName: {
				type: String,
				default: ''
			}
		},
		data() {
			return {}
		},
		methods: {
			jumpPage(id) {
				// hospital tabHospital
				if (this.typeVal == departmentHospital) {
					uni.navigateTo({
						url: `/pages/hospital/hospital?depId=${this.parentId}&childrenId=${id}&title=${this.parentName}&isTab=true&typeVal=${this.typeVal}`
					});
				} else if (this.typeVal == areaHospital) {
					uni.navigateTo({
						url: `/pages/hospital/hospital?areaId=${this.parentId}&childrenId=${id}&title=${this.parentName}&isTab=true&typeVal=${this.typeVal}`
					});
				} else if (this.typeVal == doctorDepartment) {
					uni.navigateTo({
						// doctorList tabDoctorList
						url: `/pages/doctorList/doctorList?depId=${this.parentId}&childrenId=${id}&title=${this.parentName}&typeVal=${this.typeVal}`
					});
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	.lists {
		height: 100%;
		overflow: scroll;

		.item {
			padding-left: 30rpx;
			height: 100rpx;
			line-height: 100rpx;
			font-size: 32rpx;
			font-family: PingFang SC;
			color: #333333;
			box-sizing: border-box;
		}
	}
</style>

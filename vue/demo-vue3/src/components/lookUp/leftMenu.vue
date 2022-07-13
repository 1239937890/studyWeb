<template>
	<scroll-view scroll-y class='left'>
		<view :class="['item',activityId==item.id?'activity_item':'']" v-for="item in dataList" :key="item.id"
			@click="handlerMenu(item)">
			<view class="activity" v-show="activityId==item.id"></view>
			<text class="text">{{item.name}}</text>
		</view>
	</scroll-view>
</template>
<script>
	import {
		departmentHospital,
		areaHospital,
		doctorDepartment,
		illnessHospital,
		illnessAsk
	} from '@/utils/recommendType'
	import {
		depList
	} from '@/api/depIllness'
	export default {
		props: {
			leftId: {
				type: String,
				default: ''
			},
			typeVal: {
				type: String,
				default: ''
			},
			isLoading:{
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				dataList: [],
				activityId: null
			}
		},
		mounted() {
			this.depList()
		},
		methods: {
			depList() {
				depList({
						type: this.typeVal
					})
					.then(res => {
						if (res.code == 200 && res.data) {
							this.dataList = res.data;
							let list = [];
							let parentName = '';
							if (this.leftId) {
								this.activityId = this.leftId;
								res.data.map(item => {
									if (item.id == this.leftId) {
										list = item.childrens;
										parentName = item.name;
									};
								});
							} else {
								this.activityId = res.data[0].id;
								list = res.data[0].childrens;
								parentName = res.data[0].name;
							}
							const params = {
								list,
								isMove: false,
								parentId: this.activityId,
								parentName
							};
							// console.log('params>>>>>>>>>>>',params)
							this.$emit('getData', params);
						};
					})
			},
			handlerMenu(item) {
				if (this.isLoading) {
					uni.showLoading({
						title: '加载中',
						mask: true
					});
				}
				if (this.activityId != item.id) {
					this.activityId = item.id
					const params = {
						list: item.childrens,
						isMove: true,
						parentId: this.activityId,
						parentName: item.name
					}
					this.$emit('getData', params)
				}
				if (item.childrens.length == 0) {
					const title = encodeURIComponent(item.name)
					if (this.typeVal == departmentHospital || this.typeVal == illnessHospital || this.typeVal ==
						areaHospital) {
						uni.navigateTo({
							url: `/pages/hospital/hospital?title=${title}&typeVal=${this.typeVal}&depId=${item.id}&isTab=true`
						});
					} else if (this.typeVal == doctorDepartment) {
						uni.navigateTo({
							url: `/pages/doctorList/doctorList?depId=${item.id}&typeVal=${this.typeVal}`
						});
					} else if (this.typeVal == illnessAsk) {
						uni.navigateTo({
							url: `/pages/askhome/askhome?departmentId=${item.id}&title=${title}`
						})
					}
					// if (this.typeVal == illnessAsk) {
					// 	uni.navigateTo({
					// 		url: `/pages/askhome/askhome?departmentId=${item.id}&title=${title}`
					// 	})
					// }
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import 'static/scss/leftMenu.scss';
</style>
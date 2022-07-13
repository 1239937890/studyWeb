<template>
	<view class="header">
		<Header id="header" :bgColor="bgColor" :titleImage="titleImage" :title="tabTitle"  :isHomeShow="false"/>
		<image v-if="bg" class="bg" :src="bg"></image>
		<view class="search" @click="jumpPage">
			<text>{{title}}</text>
			<image :src="logo8"></image>
		</view>
	</view>
</template>
<script>
	import Header from '@/components/navbar/header';
	import {
		getSearchVal
	} from "@/utils/index";
	import {
		logo5,
		logo8,
		logo9,
		logo10
	} from "@/utils/pic";
	export default {
		props: {
			titleImage: {
				type: Boolean,
				default: true
			},
			tabTitle: {
				type: String,
				default: ''
			},
			scrollTop: {
				type: Number,
				default: 0
			},
			bgColor: {
				type: String,
				default: 'transparent'
			},
			str: {
				type: String,
				default: ''
			},
			type: {
				type: String,
				default: ''
			},
			titleState: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				bg: '',
				title: '',
				logo8,
				pic: {
					logo5,
					logo9,
					logo10
				}
			}
		},
		created() {
			const bg = [`logo${+this.str}`];
			this.bg = this.pic[bg];
		},
		mounted() {
			this.title = getSearchVal(this.type)
		},
		components: {
			Header
		},
		methods: {
			goBack() {
				uni.navigateBack()
			},
			jumpPage() {
				uni.navigateTo({
					url: `/pages/search/elseSearch?type=${this.type}`
				});
			}
		}
	}
</script>
<style lang="scss" scoped>
	.header {
		display: flex;
		position: relative;
		height: 416rpx;

		.bg {
			@include w-h(100%, 100%)
		}

		.search {
			position: absolute;
			left: 30rpx;
			bottom: -42rpx;
			@include flex(space-between, center);
			@include w-h(690rpx, 84rpx);
			padding: 0 30rpx;
			font-size: 30rpx;
			color: #999999;
			background-color: #FFFFFF;
			box-shadow: 0px 6rpx 10rpx 0px rgba(108, 142, 220, 0.3);
			border-radius: 12rpx;
			box-sizing: border-box;

			image {
				@include w-h(48rpx, 48rpx);
			}
		}
	}
</style>
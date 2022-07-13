<template>
	<view class="loading" v-if="isLoading">
		<view class="top">
			<img class="load-icon" src="@/assets/images/loading-point.png" />
			<img class="load-icon1" src="@/assets/images/loading-point.png" />
			<img class="load-icon2" src="@/assets/images/loading-point.png" />
		</view>
		<text class="loading-tip">{{tip}}</text>
	</view>
</template>
<script>
	export default {
		props: {
			isLoading: {
				type: Boolean,
				default: true
			},
			tip: {
				type: String,
				default: '数据加载中'
			}
		}
	}
</script>

<style lang="scss" scoped>
	@keyframes point1Show {
		0% {
			visibility: hidden;
		}

		33% {
			visibility: hidden;
		}

		66% {
			visibility: visible;
		}


		100% {
			visibility: hidden;
		}
	}

	@keyframes point2Show {
		0% {
			visibility: hidden;
		}

		33% {
			visibility: hidden;
		}

		66% {
			visibility: hidden;
		}


		100% {
			visibility: visible;
		}
	}

	.loading {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: #FFFFFF;
		flex-direction: column;
		z-index: 120;
		@include flex(center, center);
	}

	.load-icon {
		@include w-h(15px, 15px)
	}

	.load-icon1 {
		margin-left: 20px;
		margin-right: 20px;
		animation-name: point1Show;
		animation-duration: 1s;
		animation-iteration-count: infinite;
		@include w-h(15px, 15px)
	}

	.load-icon2 {
		@include w-h(15px, 15px);
		animation-name: point2Show;
		animation-duration: 1s;
		animation-iteration-count: infinite;
	}

	.loading-tip {
		margin-top: 30px;
		color: #999999;
	}
</style>
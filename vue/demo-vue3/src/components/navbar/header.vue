<template>
	<div class="header">
		<div v-if="placeholder" class="placeholder"></div>
		<div class="fix" :style="{backgroundColor: bgColor}">
			<div class="nav_bar">
				<div class="left" v-if="leftShow">
					<div v-if="isReturnIcon" class="return_icon">
						<div v-if="isHomeShow" class="iconHome">
							<img class="image" :src="homeBlack" @click="returnIndex" />
						</div>
					</div>
					<div v-else>
						<div v-if="isHomeShow" class="yuan">
							<img class="image" :src="returnBlack" @click="goBack" />
							<div class="line"></div>
							<img class="home" :src="homeBlack" @click="returnIndex" />
						</div>
						<div v-else class="image_line" @click="goBack">
							<img v-if="isIcon" class="image" :src="returnBlack" />
						</div>
					</div>
					<div v-if="isLeftTitle" class="left_title ellipse">{{leftTitle}}</div>
				</div>
				<div v-else></div>
				<div class="center">
					<div v-if="isFollow" :class="['follow_btn',followText=='已关注'?'follow_btn_temp':'']"
						@click="handlerFollow">
						<text v-show="followText=='关注'" class="iconfont text_1">&#xe608;</text>
						<text>{{followText}}</text>
					</div>
					<div v-if="title" class="page_title ellipse">{{title}}</div>
					<div v-if="titleImage" class="title_image">
						<img class="image" :src="logo1" />
					</div>
				</div>
				<div></div>
			</div>
		</div>
	</div>
</template>
<script>
	import {
		returnBlack,
		homeBlack,
		logo1
	} from "@/utils/pic";
	export default {
		name: "Header",
		props: {
			leftShow: {
				type: Boolean,
				default: true
			},
			titleImage: {
				type: Boolean,
				default: false
			},
			title: {
				type: String,
				default: ''
			},
			leftTitle: {
				type: String,
				default: ''
			},
			bgColor: {
				type: String,
				default: '#FFFFFF'
			},
			followText: {
				type: String,
				default: ''
			},
			isLeftTitle: {
				type: Boolean,
				default: false
			},
			isFollow: {
				type: Boolean,
				default: false
			},
			placeholder: {
				type: Boolean,
				default: true
			},
			isHomeShow: {
				type: Boolean,
				default: true
			},
			isIcon: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				returnBlack,
				homeBlack,
				logo1,
				isReturnIcon: false
			};
		},
		methods: {
			handlerFollow() {
				this.$emit('handlerFollow')
			},
			goBack() {
				if (getCurrentPages().length > 1) {
					uni.navigateBack()
				} else {
					this.returnIndex()
				}
			},
			returnIndex() {
				uni.reLaunch({
					url: '/pages/index/index'
				});
			}
		}
	}
</script>
<style lang="scss" scoped>
	.placeholder {
		height: 88px;
	}

	.fix {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 100;
	}

	.nav_bar {
		position: relative;
		display: flex;
		justify-content: space-between;
		padding: 0 26px;
		height: 88px;
		color: #000000;
	}

	.page_title {
		text-align: center;
		width: 346px;
		font-size: 38px;
		font-family: PingFang SC;
		font-weight: 500;
		color: #000000;
	}

	.left {
		@include flex(center, center);
		height: 100%;

		.yuan {
			@include flex(center, center);
			margin-right: 25px;
			@include w-h(147px, 64px);
			border: 1px solid #EAEAEA;
			border-radius: 31px;

			.image {
				@include w-h(30px, 30px);
			}

			.line {
				margin: 0 20px;
				@include w-h(1px, 38px);
				background-color: #EAEAEA;
			}

			.home {
				@include w-h(30px, 30px);
			}

		}

		.image_line {
			display: flex;

			.image {
				@include flex(center, center);
				@include w-h(30px, 30px);
				margin-right: 25px;
			}
		}

		.left_title {
			width: 200px;
			font-weight: 500;
			font-size: 30px;
			color: #333333;
		}
	}

	.return_icon {
		@include flex(flex-start, center);
		height: 100%;
	}

	.iconHome {
		@include flex(center, center);
		margin: 0 25px 8px 76px;
		height: 100%;

		.image {
			@include w-h(44px, 44px);
		}
	}

	.center {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		@include flex(center, center);

		.follow_btn {
			@include flex(center, center);
			@include w-h(136px, 52px);
			margin-left: 190px;
			font-size: 30px;
			color: #FFFFFF;
			background-color: #4F90F7;
			border-radius: 29px;
			line-height: 28px;
			font-weight: 500;

			.text_1 {
				margin-right: 6px;
				font-size: 26px;
			}
		}

		.follow_btn_temp {
			background-color: #CCCCCC;
		}
	}

	.title_image {
		display: flex;

		.image {
			@include w-h(145px, 27px);
		}
	}
</style>
<template>
	<div class="header">
		<Top />
		<div class="info">
			<div class="head" :style="{ backgroundImage: !isHome ? `url(${headBg})` : '' }">
				<div class="head_left">
					<img src="@/assets/images/common/logo.png" />
					<div>
						<div class="text_1">{{ label }}{{ zh_cn }}</div>
						<div class="text_2">{{ zimu }}{{ zh_py }}</div>
					</div>
					<div v-if="isLogin" class="text_3">——统一身份认证</div>
				</div>
				<div class="head_right">
					<div v-if="name" class="login_in">
						<img src="@/assets/images/common/default-head.png" />
						<span class="name">您好，{{ name }}</span>
						<el-divider direction="vertical"></el-divider>
						<span @click="userStore.delToken()"> 退出 </span>
					</div>
					<div v-else-if="!name && !isLogin" class="login_out">
						<div class="login" @click="userStore.jumpLogin(true)">登录</div>
						<div class="register" v-show="!name" @click="userStore.jumpLogin(false)">立即注册</div>
					</div>
				</div>
			</div>
			<el-divider v-if="isHome" class="divider_divider"></el-divider>
		</div>
	</div>
</template>
<script setup>
import Top from './Top.vue';
import useSystem from '@/store/modules/system';
import useUser from '@/store/modules/user';
const { zh_cn, zh_py, zimu, orgId, label } = storeToRefs(useSystem());
const userStore = useUser();
const name = ref('');
const headBg = new URL('@/assets/images/common/header.png', import.meta.url).href;
const route = useRoute();
const isHome = computed(() => {
	return route.name === 'Home';
});
const isLogin = computed(() => {
	return route.name === 'Login';
});
</script>
<style lang="scss" scoped>
.header {
	position: relative;
	z-index: 2;
}
.info {
	.head {
		@include flex(space-between, center);
		padding: $paddingZy;
		padding-top: 24px;
		padding-bottom: 24px;
		background-repeat: no-repeat;
		background-size: cover;

		.head_left {
			@include flex(flex-start, center);
			color: #fefefe;

			img {
				margin-right: 15px;
				@include w-h(70px, 70px);
			}

			.text_1 {
				font-size: 36px;
				font-family: Microsoft YaHei, Microsoft YaHei-Bold;
				font-weight: 700;
			}

			.text_2 {
				font-size: 15px;
				font-family: Arial, Arial-Bold;
				font-weight: 700;
				letter-spacing: -0.15px;
			}

			.text_3 {
				margin-left: 20px;
				text-align: left;
				font-family: Microsoft YaHei, Microsoft YaHei-Bold;
				font-size: 20px;
				font-weight: 400;
			}
		}

		.head_right {
			font-size: 20px;
			color: #ffffff;

			.login_out {
				@include flex(flex-start);

				.login {
					margin-right: 32px;
					cursor: pointer;
				}

				.register {
					@include flex;
					@include w-h(112px, 40px);
					border: 1px solid #ffffff;
					border-radius: 3px;
					cursor: pointer;
				}
			}
		}
	}

	.divider_divider {
		opacity: 0.3;
	}

	:deep(.el-divider--horizontal) {
		margin: 0 !important;
	}
}
</style>

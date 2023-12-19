<template>
	<div class="login">
		<div class="login_container">
			<el-tabs class="my_tabs" v-model="activeName">
				<el-tab-pane label="账号登录" name="first">
					<Account ref="accountModule" @end="closeLoading" @jump="jumpPage" />
				</el-tab-pane>
				<el-tab-pane label="短信登录" name="second">
					<Sms ref="smsModule" @end="closeLoading" />
				</el-tab-pane>
			</el-tabs>
			<el-button class="login_btn" @click="handleLogin" :loading="loading" size="large" type="primary"> {{ btnText }}</el-button>
			<div class="row">
				<span class="item" @click="jumpPage('/register')">注册&emsp;</span>
				<span>|</span>
				<span class="item" @click="jumpPage">&emsp;忘记密码</span>
			</div>
		</div>
	</div>
</template>
<script>
import { defineComponent } from 'vue';
export default defineComponent({
	beforeRouteEnter(to, from, next) {
		next((vm) => {
			vm.getHomePath(from);
		});
	},
});
</script>
<script setup>
import Account from './components/account';
import Sms from './components/sms';

const route = useRoute();
const router = useRouter();
const redirectPath = route.query.redirectPath;
let homePath = '/';
const zfPath = '/zhengfuxinxiang';
const getHomePath = (from) => {
	homePath = from.path.includes(zfPath) ? zfPath : homePath;
};
const jumpPage = (path) => {
	path ? router.push(path) : router.replace(redirectPath || homePath);
};
const loading = ref(false);
const btnText = computed(() => {
	return loading.value ? '登 录 中...' : '登 录';
});
const activeName = ref('first');
const accountModule = ref();
const smsModule = ref();
const handleLogin = () => {
	loading.value = true;
	activeName.value == 'first' ? accountModule.value.handleLogin() : smsModule.value.handleLogin();
};
const closeLoading = () => {
	loading.value = false;
};
defineExpose({
	getHomePath,
});
</script>

<style lang="scss" scoped>
.login {
	@include flex(flex-start, center);
	@include w-h(100%, 100%);
	padding: $paddingZy;

	.login_container {
		padding: 20px;
	}
}

.my_tabs {
	:deep(.el-tabs__nav) {
		@include w-h(100%, 56px);

		.el-tabs__item {
			flex: 1;
			font-family: SYht_Normal;
			font-weight: 700;
			font-size: 20px;
		}

		.is-active {
			font-size: 30px;
			color: #027aff;
		}

		.el-tabs__active-bar {
			height: 4px;
		}
	}
}

.login_btn {
	@include w-h(100%, 50px);
	font-size: 21px;
	background: #027aff;
	border-color: #027aff;
	border-radius: 25px;
}

.row {
	@include flex(flex-end, center);
	margin: 17px 0 21px;
	padding: 0 10px;
	font-size: 16px;
	font-weight: 700;
	color: #027aff;

	.item {
		cursor: pointer;
	}
}
</style>

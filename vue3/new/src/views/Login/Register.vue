<template>
	<el-card class="my_card">
		<ChForm :options="defaultOptions" :rules="defaultRules" />
	</el-card>
</template>
<script setup name="Register">
import ChForm from '@/components/ChForm';
import { registerlist, zjlx, getCodeImg, registerCode } from '@/api/login';
import validate from '@/api/validate';
import { validIdCard } from '@/utils/validate';
const params = reactive({
	prop6: '1', // 证件类型
	sfzh: '', //证件号码
	name: '', //姓名
	password: '', //密码
	passwordOnceMore: '', //确认密码
	prop16: '', // 活动区域编码
	prop4: '', //详细地址
	prop3: '', //户籍
	email: '', //电子邮箱
	sjh: '', // 手机号码
	captcha: '',
	smsCode: '',
	captchaKey: '',
});
const phoneRules = (rule, value, callback) => {
	if (!value) {
		callback(new Error('请输入联系方式'));
	} else {
		const reg = /^(13|14|15|16|18|17|19)\d{9}$/;
		if (reg.test(value)) {
			callback();
		} else {
			return callback(new Error('请输入正确的电话'));
		}
	}
};
const validatePass = (rule, value, callback) => {
	// if (value === '') {
	// 	callback(new Error('请输入密码'));
	// } else {
	// 	if (this.ruleForm.passwordOnceMore !== '') {
	// 		this.$refs.ruleForm.validateField('checkPass');
	// 	}
	// 	callback();
	// }
	callback();
};
const validatePass2 = (rule, value, callback) => {
	//   if (value === '') {
	//     callback(new Error('请再次输入密码'));
	//   } else if (value !== this.ruleForm.password) {
	//     callback(new Error('两次输入密码不一致!'));
	//   } else {
	//     callback();
	//   }
	callback();
};
const defaultOptions = ref([
	{
		type: 'select',
		prop: 'prop6',
		label: '证件类型',
		default: '1',
		sourceData: [],
	},
	{
		type: 'input',
		prop: 'sfzh',
		label: '证件号码',
	},
	{
		type: 'input',
		prop: 'name',
		label: '真实姓名',
	},
	{
		type: 'input',
		prop: 'password',
		label: '密码',
	},
	{
		type: 'input',
		prop: 'passwordOnceMore',
		label: '确认密码',
	},
	{
		type: 'input',
		prop: 'prop16',
		label: '住址',
	},
	{
		type: 'input',
		prop: 'prop4',
		label: '详细地址',
	},
	{
		type: 'input',
		prop: 'prop3',
		label: '户籍',
	},
	{
		type: 'input',
		prop: 'email',
		label: '电子邮箱',
	},
	{
		type: 'input',
		prop: 'sjh',
		label: '手机号码',
	},
	{
		type: 'input',
		prop: 'captcha',
		label: '图形验证码',
	},
	{
		type: 'input',
		prop: 'smsCode',
		label: '短信验证码',
	},
]);
const defaultRules = ref({
	prop6: [{ required: true, message: '请选择证件类型' }],
	name: [
		{ required: true, message: '请输入真实姓名' },
		{
			min: 0,
			max: 25,
			message: '长度不超25个汉字',
			trigger: 'blur',
		},
	],
	password: [
		{ required: true, validator: validatePass, trigger: 'blur' },
		{
			min: 8,
			max: 16,
			message: validate.passwordMsg,
			trigger: 'blur',
		},
		{
			pattern: validate.password,
			message: validate.passwordMsg,
		},
	],
	passwordOnceMore: [{ required: true, validator: validatePass2, trigger: 'blur' }],
	sfzh: [
		{ required: true, message: '请输入证件号码', trigger: 'blur' },
		{
			validator: validIdCard,
			message: '请输入正确的证件号码',
			trigger: 'blur',
		},
	],

	email: [
		{ required: false, message: '请输入电子邮箱', trigger: 'blur' },
		{
			pattern: validate.email,
			message: validate.emailMsg,
			trigger: 'blur',
		},
	],
	prop3: [{ min: 0, max: 50, message: '长度不超50个汉字', trigger: 'blur' }],
	prop4: [
		{ required: true, message: '请输入详细地址' },
		{
			pattern: validate.containChinese,
			min: 0,
			max: 50,
			message: '请填写详细地址且长度不超50个字符',
			trigger: 'blur',
		},
	],
	sjh: [{ required: true, validator: phoneRules, trigger: 'blur' }],
	smsCode: [{ required: true, message: '请输入短信验证码', trigger: 'blur' }],
});
const zjlxList = async () => {
	const { data } = await zjlx();
	defaultOptions.value[0].sourceData = [...data];
};
zjlxList();
</script>
<style lang="scss" scoped>
.my_card {
	margin: 20px auto;
	padding: 22px 235px 0 235px;
	width: 1200px;
	:deep(.el-form-item__label) {
		font-size: 16px;
		font-weight: 700;
		color: #115388;
	}
}
</style>

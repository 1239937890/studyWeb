import validate from '@/api/validate';
import { getCodeImg } from '@/api/login';
export default function () {
	const key = ref('');
	const codeUrl = ref('');
	const getCode = () => {
		getCodeImg().then((res) => {
			const { captchaKey, img } = res.data;
			key.value = captchaKey;
			codeUrl.value = img;
		});
	};
	const formRules = {
		username: [{ required: true, trigger: 'blur', message: '请输入您的账号' }],
		password: [{ required: true, trigger: 'blur', message: '请输入您的密码' }],
		captcha: [{ required: true, trigger: 'blur', message: '请输入验证码' }],
		sjh: [{ required: true, pattern: validate.phone, trigger: 'blur', message: validate.phoneMsg }],
		smsCode: [{ required: true, trigger: 'blur', message: '请输入短信验证码' }],
	};
	return {
		key,
		codeUrl,
		formRules,
		getCode,
	};
}

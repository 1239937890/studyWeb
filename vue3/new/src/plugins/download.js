import axios from 'axios';
import { ElMessage } from 'element-plus';
import { saveAs } from 'file-saver';
import { getToken } from '@/utils/auth';
import { blobValidate, tansParamsNoencodeURI } from '@/utils/jschrj';
import md5 from 'js-md5';
import { v4 as uuidV4 } from 'uuid';
const baseURL = import.meta.env.VITE_APP_BASE_API;
const MD5SECRET = import.meta.env.VITE_APP_MD5SECRET;

export default {
	name(filePath, name, bucketName) {
		var url = baseURL + 'file/download?path=' + encodeURI(filePath) + '&oldName=' + name + '&bucketName=' + bucketName;
		axios({
			method: 'post',
			url: url,
			responseType: 'blob',
			headers: { Authorization: 'Bearer ' + getToken() },
		}).then(async (res) => {
			const isLogin = await blobValidate(res.data);
			if (isLogin) {
				const blob = new Blob([res.data]);
				this.saveAs(blob, decodeURI(name));
			} else {
				this.printErrMsg(res.data);
			}
		});
	},
	namecode(filePath, name, bucketName) {
		let timestamp = new Date().getTime();
		let nonceStr = uuidV4();
		let params = { oldName: name, path: encodeURI(filePath), bucketName: bucketName };
		let signstr = md5(
			tansParamsNoencodeURI(params) + 'timestamp=' + timestamp + '&nonceStr=' + nonceStr + '&key=' + MD5SECRET
		); //请求头签名
		var url =
			baseURL +
			'file/downloadByCode?path=' +
			encodeURI(filePath) +
			'&oldName=' +
			name +
			'&bucketName=' +
			bucketName +
			'&timestamp=' +
			timestamp +
			'&nonceStr=' +
			nonceStr +
			'&signature=' +
			signstr;
		axios({
			method: 'post',
			url: url,
			responseType: 'blob',
			headers: { Authorization: 'Bearer ' + getToken() },
		}).then(async (res) => {
			const isLogin = await blobValidate(res.data);
			if (isLogin) {
				const blob = new Blob([res.data]);
				this.saveAs(blob, decodeURI(name));
			} else {
				this.printErrMsg(res.data);
			}
		});
	},
	resource(resource) {
		var url = baseURL + '/common/download/resource?resource=' + encodeURI(resource);
		axios({
			method: 'get',
			url: url,
			responseType: 'blob',
			headers: { Authorization: 'Bearer ' + getToken() },
		}).then(async (res) => {
			const isLogin = await this.blobValidate(res.data);
			if (isLogin) {
				const blob = new Blob([res.data]);
				this.saveAs(blob, decodeURI(res.headers['download-filename']));
			} else {
				ElMessage.error('无效的会话，或者会话已过期，请重新登录。');
			}
		});
	},
	zip(url, name) {
		var url = baseURL + url;
		axios({
			method: 'get',
			url: url,
			responseType: 'blob',
			headers: { Authorization: 'Bearer ' + getToken() },
		}).then(async (res) => {
			const isLogin = await blobValidate(res.data);
			if (isLogin) {
				const blob = new Blob([res.data], { type: 'application/zip' });
				this.saveAs(blob, name);
			} else {
				ElMessage.error('无效的会话，或者会话已过期，请重新登录。');
			}
		});
	},
	preview: function (file) {
		window.open(
			`${baseURL}/file/fileView?path=${encodeURI(file.url)}&fileName=${file.oldName}&bucketName=${
				file.bucketName
			}&Authorization=Bearer ${getToken()}`
		);
	},
	previewcode: function (file) {
		let timestamp = new Date().getTime();
		let nonceStr = uuidV4();
		let params = { fileName: file.oldName, path: encodeURI(file.url), bucketName: file.bucketName };
		let signstr = md5(
			tansParamsNoencodeURI(params) + 'timestamp=' + timestamp + '&nonceStr=' + nonceStr + '&key=' + MD5SECRET
		); //请求头签名
		window.open(
			`${baseURL}/file/fileViewByCode?path=${encodeURI(file.url)}&fileName=${file.oldName}&bucketName=${
				file.bucketName
			}&timestamp=${timestamp}&nonceStr=${nonceStr}&signature=${signstr}&Authorization=Bearer ${getToken()}`
		);
	},
	getFileURL: function (file) {
		return `${baseURL}/file/download?path=${encodeURI(file.url)}&oldName=${file.oldName}&bucketName=${
			file.bucketName
		}&Authorization=Bearer ${getToken()}`;
	},
	getFilePreviewURL: function (file) {
		let timestamp = new Date().getTime();
		let nonceStr = uuidV4();
		let params = { fileName: file.oldName, path: encodeURI(file.url), bucketName: file.bucketName };
		let signstr = md5(
			tansParamsNoencodeURI(params) + 'timestamp=' + timestamp + '&nonceStr=' + nonceStr + '&key=' + MD5SECRET
		); //请求头签名
		return `${baseURL}/file/fileViewByCode?path=${encodeURI(file.url)}&fileName=${file.oldName}&bucketName=${
			file.bucketName
		}&timestamp=${timestamp}&nonceStr=${nonceStr}&signature=${signstr}&Authorization=Bearer ${getToken()}`;
	},
	saveAs(text, name, opts) {
		saveAs(text, name, opts);
	},
};

// import JSEncrypt from './jsencrypt.min';
import { JSEncrypt } from 'jsencrypt';

//用登录加密的公钥
const login_public_key =
	'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuhYwk+T6c2rHAfzDTYJAibBAwZ+LRMuj\n' +
	'vZcSaymtyJpMOYDP7jqldpoqHVOWu9OlfW8RW1LjIPKKDSI3gkoc9Modv1Ieqa/3D8Gjk9sg6Roa\n' +
	'904AD5/owG4Og/odVdrs0mNpE9Bw7WsLKCO/Ue1HYqjQVxPHeZVct5+tTIhZxWS4KI3DR+STm3aa\n' +
	'jD1O4z2y0BotOjf9OAI+VUe0E6R+paaqMB2vPLJL/7lmL/gimXGVvctY2HCA76oF7iinmSR9XZbE\n' +
	'icR6lpACO0Jalguf8ChZL+uHAVU04PiMmQfpN2UYVCeHIx98CM/4Zc+pghJ6DPaoz2xsYj+e1tdW\n' +
	'kXDJUwIDAQAB';
// 密钥对生成 http://web.chacuo.net/netrsakeypair
const publicKey =
	'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuhYwk+T6c2rHAfzDTYJAibBAwZ+LRMuj\n' +
	'vZcSaymtyJpMOYDP7jqldpoqHVOWu9OlfW8RW1LjIPKKDSI3gkoc9Modv1Ieqa/3D8Gjk9sg6Roa\n' +
	'904AD5/owG4Og/odVdrs0mNpE9Bw7WsLKCO/Ue1HYqjQVxPHeZVct5+tTIhZxWS4KI3DR+STm3aa\n' +
	'jD1O4z2y0BotOjf9OAI+VUe0E6R+paaqMB2vPLJL/7lmL/gimXGVvctY2HCA76oF7iinmSR9XZbE\n' +
	'icR6lpACO0Jalguf8ChZL+uHAVU04PiMmQfpN2UYVCeHIx98CM/4Zc+pghJ6DPaoz2xsYj+e1tdW\n' +
	'kXDJUwIDAQAB';

const privateKey =
	'MIIBVAIBADANBgkqhkiG9w0BAQEFAASCAT4wggE6AgEAAkEAqhHyZfSsYourNxaY\n' +
	'7Nt+PrgrxkiA50efORdI5U5lsW79MmFnusUA355oaSXcLhu5xxB38SMSyP2KvuKN\n' +
	'PuH3owIDAQABAkAfoiLyL+Z4lf4Myxk6xUDgLaWGximj20CUf+5BKKnlrK+Ed8gA\n' +
	'kM0HqoTt2UZwA5E2MzS4EI2gjfQhz5X28uqxAiEA3wNFxfrCZlSZHb0gn2zDpWow\n' +
	'cSxQAgiCstxGUoOqlW8CIQDDOerGKH5OmCJ4Z21v+F25WaHYPxCFMvwxpcw99Ecv\n' +
	'DQIgIdhDTIqD2jfYjPTY8Jj3EDGPbH2HHuffvflECt3Ek60CIQCFRlCkHpi7hthh\n' +
	'YhovyloRYsM+IS9h/0BzlEAuO0ktMQIgSPT3aFAgJYwKpqRYKlLDVcflZFCKY7u3\n' +
	'UP8iWi1Qw0Y=';

// 加密
export function encrypt(txt) {
	const encryptor = new JSEncrypt();
	encryptor.setPublicKey(publicKey); // 设置公钥
	return encryptor.encrypt(txt); // 对数据进行加密
}

// 登录加密
export function encrypt_login(txt) {
	const encryptor = new JSEncrypt();
	encryptor.setPublicKey(login_public_key); // 设置公钥
	return encryptor.encrypt(txt); // 对数据进行加密
}

// 解密
export function decrypt(txt) {
	const encryptor = new JSEncrypt();
	encryptor.setPrivateKey(privateKey); // 设置私钥
	return encryptor.decrypt(txt); // 对数据进行解密
}

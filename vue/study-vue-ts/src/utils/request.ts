import { Toast } from 'vant';
import router from '../router';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
interface AxiosResponseProps<T = any> {
  code: string | number;
  data: T;
  message: string;
}
class HttpRequest {
  private readonly baseURL: string;
  private readonly withCredentials: boolean; //表示跨域请求时是否需要使用凭证
  private readonly timeout: number;
  constructor() {
    this.baseURL = '/api';
    this.withCredentials = false;
    this.timeout = 1000 * 60;
  }
  //初始化请求配置
  initConfig(): AxiosRequestConfig {
    return {
      baseURL: this.baseURL,
      withCredentials: this.withCredentials,
      timeout: this.timeout,
    };
  }
  //拦截器
  interceptors(instance: AxiosInstance) {
    //定义存放请求接口数组
    let requestList: any[] = [];
    //设置loading为false
    const setLoadingToFalse = (response: AxiosResponse<AxiosResponseProps> | AxiosError) => {
      console.log('response>>>XXXXXX>>>>>>>>>>>>', response);
      const { url, method } = response.config!;
      const filterArr = requestList.filter((item) => item.url == url && item.method == method);
      filterArr.forEach((item) => (item.isLoading = false));
      console.log('filterArr>>>>>>>', filterArr);
      //所有请求都加载完才让加载提示消失
      if (requestList.every((item) => !item.isLoading)) {
        // vuexStore.commit("changeIsLoading", false);
      }
    };
    //请求
    instance.interceptors.request.use((config: AxiosRequestConfig) => {
      console.log('请求config>>>', config);
      const token = window.localStorage.getItem('token');
      if (token) {
        //@ts-ignore
        config.headers.token = token;
      }
      const ignoreLoadingUrls = ['/login'];
      if (!ignoreLoadingUrls.includes(config.url as string)) {
        if (requestList.length < 10) {
          requestList.unshift({
            ...config,
            isLoading: true,
          });
        } else {
          requestList = [
            ...requestList.slice(0, 9),
            {
              ...config,
              isLoading: true,
            },
          ];
        }
        // vuexStore.commit("changeIsLoading", true);
      }
      return config;
    });
    //响应
    instance.interceptors.response.use(
      (response: AxiosResponse) => {
        const { code, message } = response.data;
        if (code != '200') {
          Toast.fail(message);
        }
        // if(code=='416'){
        // router.push('/login')
        // }
        setLoadingToFalse(response);
        return response.data;
      },
      (err: AxiosError) => {
        console.log('err', err);
        setLoadingToFalse(err);
        return Promise.reject(err);
      }
    );
  }
  request(): AxiosInstance {
    const instance = axios.create(this.initConfig());
    console.log('instance>>>', instance);
    this.interceptors(instance);
    return instance;
  }
}
const http = new HttpRequest();
console.log('http>>>', http);
export default http.request();

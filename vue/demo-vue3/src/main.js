import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import 'lib-flexible/flexible';
import 'vant/lib/index.css'; // 全局引入样式
const app = createApp(App);
app.use(router);
app.mount('#app');
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router/index';
import "./common/font_3124212_4j118uk0rwf/iconfont.css";
import 'lib-flexible/flexible';
import 'vant/lib/index.css'; // 全局引入样式
const app = createApp(App);
app.use(router);
app.use(createPinia);
app.mount('#app');
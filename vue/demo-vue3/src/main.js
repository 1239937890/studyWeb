import {
    createApp
} from 'vue';
import App from './App.vue';
import router from './router/index';
import {
    createPinia
} from 'pinia';
import piniaPersist from 'pinia-plugin-persist'; //持久化存储
import "./common/font_3124212_4j118uk0rwf/iconfont.css"; //icon
import 'lib-flexible/flexible'; //rem适配
import 'vant/lib/index.css'; // 全局引入样式
const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPersist);
app.use(router).use(pinia);
app.mount('#app');
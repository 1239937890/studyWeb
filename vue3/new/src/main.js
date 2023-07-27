import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import '@/assets/styles/index.scss';
import pinia from './store';
import plugins from './plugins';
import App from './App.vue';
import './permission';
import router from './router';

const app = createApp(App);
app.use(ElementPlus);
app.use(pinia);

app.use(router);
app.use(plugins);
app.mount('#app');

import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import axiosInstance from './plugins/axios'

const app = createApp(App)
app.config.globalProperties.$axios = axiosInstance
app.use(router)
app.use(Antd)
app.mount('#app')

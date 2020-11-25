import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/global.css'
import './plugins/element.js'
import axios from 'axios';

//配置请求根路径
axios.defaults.baseURL = '/api';
axios.interceptors.request.use(config => {
    //为请求头对象，添加token验证的authorization字段
    // config.headers.Authorization = window.sessionStorage.getItem('token');
    // console.log("header-config", config);

    return config
})
Vue.prototype.$http = axios;




Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
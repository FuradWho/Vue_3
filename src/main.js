import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import echarts from "echarts";

axios.defaults.baseURL = 'http://localhost:8099/xk'
axios.defaults.headers.post['Content-Type'] = 'application/json'
// 在request 拦截器中, 展示进度条 NProgress.start()
// 请求在到达服务器之前，先会调用use中的这个回调函数来添加请求头信息
axios.interceptors.request.use(config => {
  NProgress.start()
  console.log(config)
  config.headers.Authorization = window.sessionStorage.getItem('Authorization')
  // 在最后必须 return config
  return config
})
// response 拦截器中,  隐藏进度条NProgress.done()
axios.interceptors.response.use(config => {
  NProgress.done()
  return config
})
Vue.prototype.$http = axios

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts;
Vue.use(ElementUI)

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
import './assets/css/style.css'; //通用样式

import Vue from 'vue';
import ElementUI from 'element-ui';
import Axios from 'axios';
import VueCookie from 'vue-cookie';


import store from './app/store'; //vuex初始化
import router from './app/router'; //路由初始化

import App from './app/App.vue';
import urlConfig from './urlConfig';

Vue.use(ElementUI);
Vue.use(VueCookie);
//http
Vue.prototype.$http = Axios;
Axios.defaults.withCredentials = true;
//事件总线
var bus = new Vue();
Vue.prototype.$bus = bus;

Vue.prototype.serverUrl = urlConfig.serverUrl;

new Vue({
  store: store,
  router: router,
  el: '#app',
  render: h => h(App)
});
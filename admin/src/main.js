// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'element-ui/lib/theme-chalk/index.css'; //通用样式

import Vue from 'vue';
import ElementUI from 'element-ui';
import Axios from 'axios';
import App from './App';
import router from './router';
import Moment from 'moment';

Vue.config.productionTip = false;

Vue.use(ElementUI);

import urlConfig from './urlConfig';


//http
Vue.prototype.$http = Axios;
Vue.prototype.serverUrl = urlConfig.serverUrl;

Vue.prototype.$moment = Moment;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

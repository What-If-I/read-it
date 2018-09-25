import 'spectre.css';
import 'spectre.css/dist/spectre-icons.css';
import 'vue-snotify/styles/simple.css';

import axios from 'axios';
import Vue from 'vue';
import VueAxios from 'vue-axios';
import Snotify, { SnotifyPosition } from 'vue-snotify';

import App from './App.vue';
import router from './router';
import store from './store';

axios.defaults.baseURL = 'http://127.0.0.1:5000';
axios.defaults.timeout = 10000; // ms

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.use(Snotify, {
  toast: {
    timeout: 5000,
    showProgressBar: false,
    position: SnotifyPosition.rightTop,
  },
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

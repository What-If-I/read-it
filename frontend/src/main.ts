import 'spectre.css';
import 'spectre.css/dist/spectre-icons.css';
import 'vue-snotify/styles/simple.css';

import * as Sentry from '@sentry/browser';
import axios from 'axios';
import Vue from 'vue';
import VueAxios from 'vue-axios';
import Snotify, { SnotifyPosition } from 'vue-snotify';
import Vue2TouchEvents from 'vue2-touch-events';

import App from './App.vue';
import router from './router';
import store from './store';

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: 'https://f0c42f8ba0414594b8b4ac27636b787a@sentry.io/1290536',
    integrations: [new Sentry.Integrations.Vue({ Vue })],
  });
}
axios.defaults.baseURL = process.env.VUE_APP_BACKEND_URL;
axios.defaults.timeout = 30000; // ms

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.use(Vue2TouchEvents);
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

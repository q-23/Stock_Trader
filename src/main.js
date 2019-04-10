import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import Vue2Filters from 'vue2-filters';
import {routes} from './routes.js';
import {store} from './store/store';

const router = new VueRouter({
  routes,
  mode: `history`
});

Vue.use(Vue2Filters);
Vue.use(VueRouter);


new Vue({
  el: '#app',
  router,
    store,
  render: h => h(App)
});

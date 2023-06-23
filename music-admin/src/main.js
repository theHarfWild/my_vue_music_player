import Vue from "vue";
import ElementUI from 'element-ui';
import './assets/main.scss'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import '@/router/permission.js'
Vue.config.productionTip = false;
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

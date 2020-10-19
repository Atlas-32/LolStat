import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import $ from 'jquery'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
// Vue.use(BootstrapVue)
Vue.use(ElementUI);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
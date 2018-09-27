// babel-polyfill will pollute the global environment
import 'babel-polyfill'
import Vue from 'vue'
import router from './router'
import store from './store'
import App from './app.vue'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

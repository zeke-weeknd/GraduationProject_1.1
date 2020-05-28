import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// import Blob from './vendor/Blob'
// import Export2Excel from './vendor/Export2Excel.js'

Vue.config.productionTip = false
import http from './http'
Vue.prototype.$http = http

new Vue({
  router,
  // Blob,
  // Export2Excel,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import VueResize from 'vue-resize'

import App from '@components/app'
import router from './router'
import store from './store'

Vue.use(VueResize)

global.app = new Vue({
  el: '.root',
  router,
  store,
  render: h => h(App)
})

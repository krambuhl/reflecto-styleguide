import Vue from 'vue'

import App from '@components/app'
import router from './router'

global.app = new Vue({
  el: '.root',
  router,
  render: h => h(App)
})

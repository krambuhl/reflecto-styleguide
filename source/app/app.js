import Vue from 'vue'
import VueResize from 'vue-resize'
import VueHighlight from 'vue-highlightjs'

import App from '@components/app'
import router from './router'
import store from './store'

Vue.use(VueResize)
Vue.use(VueHighlight)

global.app = new Vue({
  el: '.root',
  router,
  store,
  render: h => h(App)
})

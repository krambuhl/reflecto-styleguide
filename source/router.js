import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '*',
    component: require('Content/index')
  }],
  linkActiveClass: 'is-active-route',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) return savedPosition
    else return { x: 0, y: 0 }
  }
})

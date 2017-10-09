import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [{
    name: 'example',
    path: '*',
    component: require('@components/example').default
  }],
  linkActiveClass: 'is-active-route',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) return savedPosition
    // else return { x: 0, y: 0 }
  }
})

router.afterEach(function (to, routeFrom) {
  const toMeta = to.meta

  if (toMeta.pageTitle) {
    document.title = toMeta.pageTitle
  } else {
    document.title = 'Styleguide'
  }
})

export default router

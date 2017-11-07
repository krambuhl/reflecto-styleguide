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
  linkActiveClass: 'is-active-route'
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

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [{
    path: '*',
    component: require('@components/example').default,
    props: (route) => {
      const { type, name, id } = route.query
      return { type, name, id }
    }
  }],
  linkActiveClass: 'is-active-route',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) return savedPosition
    else return { x: 0, y: 0 }
  }
})

router.afterEach((to, routeFrom) => {
  const toMeta = to.meta

  if (toMeta.pageTitle) {
    document.title = toMeta.pageTitle
  } else {
    document.title = 'Styleguide'
  }
})

export default router

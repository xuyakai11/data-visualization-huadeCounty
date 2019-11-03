import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'Index',
      component: () => import('./views/Index.vue')
    },
    {
      path: '/uploadfile',
      name: 'UpLoadFile',
      component: () => import('./views/UpLoadFile.vue')
    }
  ]
})

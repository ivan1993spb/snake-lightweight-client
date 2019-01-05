import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/About')
    },
    {
      path: '/games',
      name: 'games',
      component: () => import('@/views/Games')
    },
    {
      path: '/games/:id',
      name: 'game',
      component: () => import('@/views/Game')
    },
    {
      path: '/new',
      name: 'new',
      component: () => import('@/views/New')
    },
    {
      path: '/games/:id/play',
      name: 'play',
      component: () => import('@/views/Play')
    }
  ]
})

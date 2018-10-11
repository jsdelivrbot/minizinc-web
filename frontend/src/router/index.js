import Vue from 'vue'
import Router from 'vue-router'
import IDE from '@/components/ide'
import Login from '@/components/login'
// import firebase from 'firebase'

import * as routeGaurds from './gaurds'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ide',
      beforeEnter: routeGaurds.isLoggedIn,
      component: IDE
    },
    {
      path: '/login',
      name: 'login',
      beforeEnter: routeGaurds.isLoggedOut,
      component: Login
    },
    {
      path: '*',
      redirect: '/login'
    }
  ]
})

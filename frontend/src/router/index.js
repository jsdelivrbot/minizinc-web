import Vue from 'vue'
import Router from 'vue-router'
import IDE from '@/components/ide'
import Login from '@/components/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ide',
      component: IDE
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
import IDE from '@/components/ide'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'IDE',
      component: IDE
    }
  ]
})
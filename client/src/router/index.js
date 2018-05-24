import Vue from 'vue'
import Router from 'vue-router'
import postList from '@/components/postList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'postList',
      component: postList
    }
  ]
})

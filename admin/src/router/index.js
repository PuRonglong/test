import Vue from 'vue'
import Router from 'vue-router'
import addPost from '@/components/posts/addPost'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'addPost',
      component: addPost
    }
  ]
})

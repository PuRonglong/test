import Vue from 'vue';
import VueRouter from 'vue-router';

import Bar from './components/Bar.vue';
import Foo from './components/Foo.vue';
import Map from './components/Map.vue';
import postList from './components/postList.vue';
import addPost from './components/admin/addPost.vue';

Vue.use(VueRouter);

const routes = [{
    path: '',
    component: postList
}, {
    path: '/foo',
    component: Foo
}, {
    path: '/bar',
    component: Bar
}, {
    path: '/map',
    component: Map
}, {
    path: '/addPost',
    component: addPost
}];

export default new VueRouter({
    routes: routes,
    mode: 'hash'
});
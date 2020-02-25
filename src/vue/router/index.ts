import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import utils from '@/common/utils';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: utils.loadDataFromLS() ? '' : { name: 'Setup' }
  },
  {
    path: '/setup',
    name: 'Setup',
    component: () =>
      import(/* webpackChunkName: "Setup" */ '../views/Setup.vue'),
    redirect: utils.loadDataFromLS() ? { name: 'Home' } : ''
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;

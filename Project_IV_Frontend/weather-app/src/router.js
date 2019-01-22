import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'start',
      component: () => import(/* webpackChunkName: "start" */ './views/Start.vue'),
    },
    {
      path: '/addlocation',
      name: 'addlocation',
      component: () => import(/* webpackChunkName: "addlocation" */ './views/AddLocation.vue'),
    }
  ],
});

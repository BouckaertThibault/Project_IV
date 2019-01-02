import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'splash',
      component: () => import(/* webpackChunkName: "splash" */ './views/Splash.vue'),
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import(/* webpackChunkName: "signin" */ './views/SignIn.vue'),
    },
    {
      path: '/weathercards',
      name: 'weathercards',
      component: () => import(/* webpackChunkName: "weathercards" */ './views/Weathercards.vue'),
    },
    {
      path: '/addlocation',
      name: 'addlocation',
      component: () => import(/* webpackChunkName: "addlocation" */ './views/AddLocation.vue'),
    }
  ],
});

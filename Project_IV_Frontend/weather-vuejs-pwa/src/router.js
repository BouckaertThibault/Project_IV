import Vue from 'vue';
import Router from 'vue-router';
import Store from './store.js'

Vue.use(Router);

let router = new Router({
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
      path: '/signup',
      name: 'signup',
      component: () => import(/* webpackChunkName: "signup" */ './views/SignUp.vue'),
    },
    {
      path: '/weathercards',
      name: 'weathercards',
      component: () => import(/* webpackChunkName: "weathercards" */ './views/Weathercards.vue'),
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: '/editweathercard/:LocationId',
      name: 'editweathercard',
      component: () => import(/* webpackChunkName: "editweathercard" */ './views/EditWeathercard.vue'),
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: '/addlocation',
      name: 'addlocation',
      component: () => import(/* webpackChunkName: "addlocation" */ './views/AddLocation.vue'),
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: '/account',
      name: 'account',
      component: () => import(/* webpackChunkName: "account" */ './views/Account.vue'),
      meta: { 
        requiresAuth: true
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (Store.getters.isLoggedIn) {
      next()
      return
    }
    next('/signin') 
  } else {
    next() 
  }
})

export default router

import Vue from 'nativescript-vue'
import Splash from './components/Splash'
import VueDevtools from 'nativescript-vue-devtools'
import store from './store';
import Axios from 'axios'

Vue.prototype.$http = Axios;

if(TNS_ENV !== 'production') {
  Vue.use(VueDevtools)
}
// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')


new Vue({
  render: h => h('frame', [h(Splash)]),
  store
}).$start()

import Vue from 'nativescript-vue'
import Splash from './components/Splash'
import store from './store';
import Axios from 'axios'

Vue.registerElement("Mapbox", () => require("nativescript-mapbox").MapboxView)
Vue.prototype.$http = Axios;

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')


new Vue({
  render: h => h('frame', [h(Splash)]),
  store
}).$start()

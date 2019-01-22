import Vue from 'vue';
import VueMapbox from 'vue-mapbox'
import Mapbox from 'mapbox-gl'
import Axios from 'axios'

import App from './App.vue';
import router from './router';
import store from './store';

import './registerServiceWorker';

Vue.use(VueMapbox, { mapboxgl: Mapbox })
Vue.prototype.$http = Axios;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

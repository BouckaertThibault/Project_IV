import Vue from 'vue';
import VueMapbox from 'vue-mapbox'
import Mapbox from 'mapbox-gl'

import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

Vue.use(VueMapbox, { mapboxgl: Mapbox })

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

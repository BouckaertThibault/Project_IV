import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    savedLocations: localStorage.getItem('savedLocations') ? JSON.parse(localStorage.getItem('savedLocations')): []
  },
  getters: {
    getAllLocations: state => state.savedLocations
  },
  actions: {
    addWeatherLocation: ({commit}, locationObj) => {
      commit('saveNewLocation', locationObj.woeid);
    },
    updateSavedLocations: ({commit}, newLocations) => {
      commit('overwriteLocationOrder', newLocations)
    }
    //async api call
    //klaar; woeid doorgeven
    //commit("saveLocation", woeid);
  },
  mutations: {
    saveNewLocation : (state, loc) => {
      state.savedLocations.push(loc);
      //localstorage kan enkel een string saven, maar bijna zo groot als je wilt
      localStorage.setItem('savedLocations', JSON.stringify(state.savedLocations));
    },
    overwriteLocationOrder: (state, newLocs) =>{
      state.savedLocations = newLocs;
      localStorage.setItem("savedLocations", JSON.stringify(state.savedLocations))
    }

  },

});

import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'
import VueCookies from 'vue-cookies'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: '',
    token: VueCookies.get('token') || '',
    user: {},
    username: '',
    savedLocations: localStorage.getItem('savedLocations') ? JSON.parse(localStorage.getItem('savedLocations')): []
  },
  getters: {
    getAllLocations: state => state.savedLocations,
    getToken: state => state.token,
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    loggedInUser: state => state.user,
    loggedUsername: state => state.username,
  },
  actions: {
    addWeatherLocation: ({commit}, locationObj) => {
      commit('saveNewLocation', locationObj.woeid);
    },
    updateSavedLocations: ({commit}, newLocations) => {
      commit('overwriteLocationOrder', newLocations)
    },
    login({commit}, user){
      return new Promise((resolve, reject) => {
        commit('authRequest')
        axios({url: 'https://projectivapi20190112011952.azurewebsites.net/api/Auth/token', data: user, method: 'POST' })
        .then(resp => {
          console.log(resp);
          const token = resp.data.token
          const user = resp.data.user
          VueCookies.set('token', token , {expires: 1} )
          // axios.defaults.headers.common['Authorization'] = token
          commit('authSuccess', token, user)
          commit('saveUsername', resp.data.userName)
          resolve(resp)
        })
        .catch(err => {
          commit('authError')
          VueCookies.remove('token')
          reject(err)
        })
      })
  },
  register({commit}, user){
    return new Promise((resolve, reject) => {
      commit('authRequest')
      axios({url: 'https://projectivapi20190112011952.azurewebsites.net/api/Auth/register', data: user, method: 'POST' })
      .then(resp => {
        const token = resp.data.token
        const user = resp.data.user
        VueCookies.set('token', token, "1d","/app")
        // axios.defaults.headers.common['Authorization'] = token
        commit('authSuccess', token, user)
        resolve(resp)
      })
      .catch(err => {
        commit('authError', err)
        VueCookies.remove('token')
        reject(err)
      })
    })
  },
  logout({commit}){
    return new Promise((resolve) => {
      commit('logout')
      VueCookies.remove('token')
      resolve()
    })
    .catch(err => {
      console.log(err);
    })
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
    },
    saveUsername(state, b){
      state.username = b
    },
    authRequest(state){
      state.status = 'loading'
    },
    authSuccess(state, token, user){
      state.status = 'success'
      state.token = token
      state.user = user
    },
    authError(state){
      state.status = 'error'
    },
    logout(state){
      state.status = ''
      state.token = ''
    }

  },

});

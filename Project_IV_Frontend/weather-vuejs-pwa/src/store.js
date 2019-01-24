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
    getLocationById: (state) => (name) => {
      return state.savedLocations.find(todo => todo.name === name)
    },
    getToken: state => state.token,
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    loggedInUser: state => state.user,
    loggedUsername: state => state.username,
  },
  actions: {
    // addWeatherLocation: ({commit}, locationObj) => {
    //   commit('saveNewLocation', locationObj.woeid);
    // },
    addWeatherLocation: ({commit}, city) => {
      commit('saveNewLocation', city);
    },
    updateSavedLocations: ({commit}, newLocations) => {
      commit('overwriteLocationOrder', newLocations)
    },
    updateWeatherData: ({commit}, newData) => {
      commit('overwriteWeatherData', newData)
    },
    deleteWeatherData: ({commit}, id) => {
      commit('deleteWeatherData', id)
    },
    login({commit}, user){
      return new Promise((resolve, reject) => {
        commit('authRequest')
        axios({url: 'https://projectivapi20190112011952.azurewebsites.net/api/Auth/login', data: user, method: 'POST' })
        .then(resp => {
          console.log(resp);
          const token = resp.data.token
          const user = resp.data.user
          console.log("TRYING TO SAVE TOKEN: " + token)
          VueCookies.set('token', token , {expires: 1} )
          console.log("TOKEN SAVE COMPLETE")
          // axios.defaults.headers.common['Authorization'] = token
          commit('authSuccess', token, user)
          commit('saveUsername', resp.data.userName)
          resolve(resp)
        })
        .catch(err => {
          commit('authError')
          alert("Username or password is wrong")
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
        console.log(err);
        alert("There was an error creating your account")
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
    // overwriteWeatherData: (state, newData) =>{
    //   var ori = state.savedLocations;
    //   var data = new Array(newData);
    //   var res = ori.map(obj => data.find(o => o.id === obj.id) || obj);
    //   localStorage.setItem("savedLocations", JSON.stringify(res));
    // },
    overwriteWeatherData: (state, newData) =>{
      var data = new Array(newData);
      state.savedLocations = state.savedLocations.map(obj => data.find(o => o.id === obj.id) || obj);
      localStorage.setItem("savedLocations", JSON.stringify(state.savedLocations));
    },
    // deleteWeatherData: (state, id) =>{
    //   var ori = state.savedLocations;
    //   var res = ori.filter(el => el.id !== id);
    //   localStorage.setItem("savedLocations", JSON.stringify(res));
    // },
    deleteWeatherData: (state, id) =>{
      state.savedLocations = state.savedLocations.filter(el => el.id !== id);
      localStorage.setItem("savedLocations", JSON.stringify(state.savedLocations));
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

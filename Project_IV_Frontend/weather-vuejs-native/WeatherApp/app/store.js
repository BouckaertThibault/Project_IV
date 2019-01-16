import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'
import * as appSettings from "tns-core-modules/application-settings";
import { request, getFile, getImage, getJSON, getString } from "tns-core-modules/http";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: '',
    token: appSettings.getString("token") || '',
    user: {},
    username: '',
    savedLocations: appSettings.getString("savedLocations") ? JSON.parse(appSettings.getString("savedLocations")): []
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
          console.log("TRYING TO SAVE TOKEN: " + token)
          appSettings.setString("token", JSON.stringify(token))
          console.log("TOKEN SAVE COMPLETE")
          // axios.defaults.headers.common['Authorization'] = token
          commit('authSuccess', token, user)
          commit('saveUsername', resp.data.userName)
          resolve(resp)
        })
        .catch(err => {
          commit('authError')
          console.log(err)
          appSettings.remove("token")
          reject(err)
        })
      })
  },
  register({commit}, user){
    return new Promise((resolve, reject) => {
      commit('authRequest')
      axios({url: 'https://projectivapi20190112011952.azurewebsites.net/api/Auth/register', data: user, method: 'POST' })
      .then(resp => {
        console.log(resp);
        const token = resp.data.token
        const user = resp.data.user
        // axios.defaults.headers.common['Authorization'] = token
        commit('authSuccess', token, user)
        resolve(resp)
      })
      .catch(err => {
        commit('authError', err)
        
        reject(err)
      })
    })
  },
  logout({commit}){
    return new Promise((resolve) => {
      commit('logout')
      appSettings.remove("token")
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
      appSettings.setString("savedLocations", JSON.stringify(state.savedLocations));
    },
    overwriteLocationOrder: (state, newLocs) =>{
      state.savedLocations = newLocs;
      appSettings.setString("savedLocations", JSON.stringify(state.savedLocations));
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
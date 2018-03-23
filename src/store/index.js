import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    gwToken: '',
    loginMsg: ''
  },
  mutations: {
    getStorageToken (state) {
      let token = window.localStorage.getItem('gw_token')
      state.gwToken = token
    },
    getStorageLoginMsg (state) {
      state.loginMsg = window.localStorage.getItem('login_msg')
    }
  },
  actions: {
    setToken ({commit}) {
      commit('getStorageToken')
    },
    setLoginMsg ({commit}) {
      commit('getStorageLoginMsg')
    }
  }
})

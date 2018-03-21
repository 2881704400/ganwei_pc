import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appkey: '',
    infokey: ''
  },
  mutations: {
    setAppkey (state, key) {
      state.appkey = key
    },
    setInfokey (state, key) {
      state.infokey = key
    }
  }
})

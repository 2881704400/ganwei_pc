import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    gwToken: '',
    loginMsg: '',
    navEquipsClickTime: 0,
    curEquip: {
      equipNo: ''
    }
  },
  mutations: {
    getStorageToken (state) {
      let token = window.localStorage.getItem('gw_token')
      state.gwToken = token
    },
    getStorageLoginMsg (state) {
      state.loginMsg = window.localStorage.getItem('login_msg')
    },
    clickEquips (state, number) {
      state.navEquipsClickTime = number
    },
    setEquipNo (state, nom) {
      state.curEquip.equipNo = nom
    }
  },
  actions: {
    reflashSet ({commit}) {
      commit('getStorageToken')
      commit('getStorageLoginMsg')
    }
  }
})

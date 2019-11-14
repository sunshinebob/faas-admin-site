import Vue from 'vue'
import Vuex from 'vuex'
import { routes } from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    routes,
    userName: 'bob',
    opened: false
  },
  mutations: {
    SET_OPENED (state, payload) {
      state.opened = payload
    }
  },
  actions: {},
  getters: {
    routes: state => state.routes,
    userName: state => state.userName,
    opened: state => state.opened
  },
  modules: {}
})

import Vue from 'vue'
import Vuex from 'vuex'
// import * as firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    token: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
      console.log('state: ', state)
    }
  },
  actions: {
    signIn ({ commit }, payload) {
      // todo determine if user has files, if so get them if not then create blank file state
      const newPayload = {
        displayName: payload.displayName,
        email: payload.email,
        photoURL: payload.photoURL,
        uid: payload.uid,
        files: []
      }
      commit('setUser', newPayload)
    },
    logout ({ commit }, payload) {
      commit('setUser', {})
    }
  },
  getters: {
    user (state) {
      return state.user
    }
  }
})

import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

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
      const users = initializeFirestore()
      let userState
      users
        .doc(payload.uid)
        .get()
        .then(user => {
          if (user.exists) {
            console.log('Previously Logged in: ', user.data())
            userState = user.data()
          } else {
            userState = {
              displayName: payload.displayName,
              email: payload.email,
              photoURL: payload.photoURL,
              uid: payload.uid,
              projects: []
            }
            console.log('New user created: ', userState)
            users.doc(payload.uid).set(userState)
            commit('setUser', userState)
          }
        })
        .catch(err => {
          console.log('err: ', err)
        })
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

function initializeFirestore () {
  const db = firebase.firestore()
  const settings = { timestampsInSnapshots: true }
  db.settings(settings)
  return db.collection('users')
}

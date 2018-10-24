import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    token: null,
    projects: []
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
      getCollection('users')
        .doc(payload.uid)
        .set(payload)
    },
    initNewProjects (user) {
      const testProjects = [
        {
          name: 'Test project',
          owner: payload.email,
          uid: 'abc',
          files: [
            {
              name: 'model.mzn',
              uid: 'bcxa',
              code: `int: n;
  array[1..n] of var 1..2*n: x;
  include "alldifferent.mzn";
  constraint alldifferent(x);
  solve maximize sum(x);
  output ["The resulting values are \\(x)."];
  `
            },
            {
              name: 'data.dzn',
              uid: 'qwer',
              code: 'n = 9;'
            }
          ]
        }
      ]
      const projectsRef = getCollection('projects').doc()
      return projectsRef.update({
        owner: user.email,
        projects: testProjects
      })
    },
    addProject (state, project) {
      state.projects.push(project)
    },
    updateProject (state, updates) {
      const index = state.projects.findIndex(
        project => project.uid === updates.uid
      )
      state.projects.splice(index, 1, updates)
    },
    deleteProject (state, uid) {
      const index = state.projects.findIndex(project => project.uid === uid)
      state.projects.splice(index, 1)
    },
    setProjectState (state, projects) {
      state.projects = projects
    }
  },
  actions: {
    signIn ({ commit }, payload) {
      const users = getCollection('users')
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
              uid: payload.uid
            }
            console.log('New user created: ', userState)
            commit('initNewProjects', userState)
          }
          commit('setUser', userState)
        })
        .catch(err => {
          console.log('err: ', err)
        })
    },
    logout ({ commit }, payload) {
      commit('setUser', {})
    },
    initRealtimeListeners (context) {
      const projects = getCollection('projects')
      projects
        .where('owner', '==', context.state.user.email)
        .onSnapshot(snapshot => {
          snapshot.docChanges().forEach(change => {
            const source = change.doc.metadata.hasPendingWrites
              ? 'Local'
              : 'Server'
            if (change.type === 'added' && source === 'Server') {
              const payload = change.doc.data()
              context.commit('addProject', {
                uid: payload.uid,
                name: payload.name,
                owner: payload.owner,
                files: payload.files
              })
            }
            if (change.type === 'modified' && source === 'Server') {
              const payload = change.doc.data()
              context.commit('updateProject', payload)
            }
            if (change.type === 'removed' && source === 'Server') {
              const payload = change.doc.data()
              context.commit('deleteProject', payload.uid)
            }
          })
        })
    },
    addProject (context, payload) {
      getCollection('projects')
        .doc()
        .update({ ...payload, timestamp: new Date() })
        .then(project => {
          context.commit('addProject', project)
        })
    },
    updateProject (context, payload) {
      getCollection('projects')
        .doc(payload.uid)
        .set(payload, { merge: true })
        .then(() => {
          context.commit('updateProject', payload)
        })
    },
    deleteProject (context, uid) {
      getCollection('projects')
        .doc(uid)
        .delete()
        .then(() => {
          context.commit('deleteProject', uid)
        })
    },
    getProjects (context) {
      getCollection('projects')
        .where('owner', '==', context.state.user.email)
        .get()
        .then(snapshot => {
          let projects = []
          snapshot.forEach(doc => {
            projects.push(doc.data())
          })
          context.commit('setProjectState', projects)
        })
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    projects (state) {
      return state.projects
    }
  }
})

function getCollection (collection) {
  const db = firebase.firestore()
  const settings = { timestampsInSnapshots: true }
  db.settings(settings)
  return db.collection(collection)
}

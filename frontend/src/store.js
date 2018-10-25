import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
import {
  resolve
} from 'path'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    token: null,
    selectedProjectIndex: 0,
    projects: []
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
      getCollection('users')
        .doc(payload.uid)
        .set(payload)
    },
    addProject(state, project) {
      state.projects.push(project)
    },
    updateProject(state, updates) {
      const index = state.projects.findIndex(
        project => project.uid === updates.uid
      )
      state.projects.splice(index, 1, updates)
    },
    deleteProject(state, uid) {
      const index = state.projects.findIndex(project => project.uid === uid)
      state.projects.splice(index, 1)
    },
    setProjects(state, projects) {
      state.projects = projects
    },
    updateProjectIndex(state, index) {
      state.selectedProjectIndex = index
    }
  },
  actions: {
    signIn({
      commit
    }, payload) {
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
            const newUserProject = {
              name: 'Test project',
              owner: payload.email,
              uid: ID(),
              files: [{
                  name: 'model.mzn',
                  uid: ID(),
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
                  uid: ID(),
                  code: 'n = 9;'
                }
              ]
            }
            getCollection('projects')
              .add(newUserProject)
              .then(project => {
                commit('setProjects', [project])
              })
          }
          commit('setUser', userState)
        })
        .catch(err => {
          console.log('err: ', err)
        })
    },
    logout({
      commit
    }) {
      commit('setUser', {})
      commit('setProjects', [])
    },
    initRealtimeListeners(context, user) {
      const projects = getCollection('projects')
      projects.where('owner', '==', user.email).onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          const source = change.doc.metadata.hasPendingWrites ?
            'Local' :
            'Server'
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
    addProject(context, payload) {
      getCollection('projects')
        .doc()
        .update({
          ...payload,
          timestamp: new Date()
        })
        .then(project => {
          context.commit('addProject', project)
        })
    },
    updateProject(context, payload) {
      getCollection('projects')
        .doc(payload.uid)
        .set(payload, {
          merge: true
        })
        .then(() => {
          context.commit('updateProject', payload)
        })
    },
    deleteProject(context, uid) {
      getCollection('projects')
        .doc(uid)
        .delete()
        .then(() => {
          context.commit('deleteProject', uid)
        })
    },
    getProjects(context, user) {
      getCollection('projects')
        .where('owner', '==', user.email)
        .get()
        .then(snapshot => {
          const projects = []
          snapshot.docs.forEach(doc => {
            const data = doc.data()
            let proj = {
              uid: data.uid,
              owner: data.owner,
              name: data.name,
              files: data.files
            }
            projects.push(proj)
            console.log('proj: ', proj);
          })
          // console.log('projects: ', projects);
          const uniqueProjects = projects.filter(function (project, index) {
            return projects.indexOf(project) == index;
          })
          context.commit('setProjects', uniqueProjects)
          // console.log('uniqueProjects: ', uniqueProjects);
        })
    },
    updateProjectIndex(context, index) {
      context.commit('updateProjectIndex', index)
    }
  },
  getters: {
    user(state) {
      return state.user
    },
    projects(state) {
      const noneFound = [{
        name: 'No projects found',
        files: []
      }]
      return state.projects || noneFound
    },
    selectedProjectIndex(state) {
      return state.selectedProjectIndex
    }
  }
})

function getCollection(collection) {
  const db = firebase.firestore()
  const settings = {
    timestampsInSnapshots: true
  }
  db.settings(settings)
  return db.collection(collection)
}

function ID() {
  return (
    '_' +
    Math.random()
    .toString(36)
    .substr(2, 9)
  )
}

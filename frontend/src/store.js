import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    token: null,
    selectedProjectIndex: 0,
    selectedFileIndex: 0,
    projects: []
  },
  mutations: {
    setUser(state, payload) {
      if(payload) {
        state.user = payload
        getCollection('users')
          .doc(payload.uid)
          .set(payload)
      }
      else {
        state.user = null
      }
    },
    addProject(state, project) {
      state.projects.push(project)
    },
    updateProject(state, updates) {
      const index = state.projects.findIndex(
        project => project.id === updates.id
      )
      state.projects.splice(index, 1, updates)
    },
    deleteProject(state, id) {
      if (id) {
        const index = state.projects.findIndex(project => project.id === id)
        state.projects.splice(index, 1)
      }
    },
    setProjects(state, projects) {
      state.projects = projects
    },
    updateProjectIndex(state, index) {
      state.selectedProjectIndex = index
    },
    updateFileIndex(state, index) {
      state.selectedFileIndex = index
    }
  },
  actions: {
    signIn({
      dispatch,
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
            dispatch('getProjects', userState)
            dispatch('initRealtimeListeners', payload)
          } else {
            userState = {
              displayName: payload.displayName,
              email: payload.email,
              photoURL: payload.photoURL,
              uid: payload.uid
            }
            console.log('New user created: ', userState)
            dispatch('initTestProject', payload.email)
          }
          commit('setUser', userState)
        })
        .catch(err => {
          console.log('err: ', err)
        })
    },
    initTestProject(context, email) {
      const newUserProject = {
        name: 'Sample project',
        owner: email,
        timestamp: new Date(),
        collaborators: [],
        files: [{
            name: 'model.mzn',
            id: ID(),
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
            id: ID(),
            code: 'n = 9;'
          }
        ]
      }
      getCollection('projects').add(newUserProject)
        .then(() => {
          context.dispatch('getProjects', {email})
          context.dispatch('initRealtimeListeners', {email})
        })
    },
    logout({
      commit
    }) {
      commit('setUser', null)
      commit('setProjects', null)
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
              id: payload.id,
              name: payload.name,
              owner: payload.owner,
              files: payload.files,
              collaborators: payload.collaborators
            })
          }
          if (change.type === 'modified' && source === 'Server') {
            const payload = change.doc.data()
            context.commit('updateProject', payload)
          }
          if (change.type === 'removed' && source === 'Server') {
            const payload = change.doc.data()
            context.commit('deleteProject', payload.id)
          }
        })
      })

      projects.where('collaborators', 'array-contains', user.email).onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          const source = change.doc.metadata.hasPendingWrites ?
            'Local' :
            'Server'
          if (change.type === 'added' && source === 'Server') {
            const payload = change.doc.data()
            context.commit('addProject', {
              id: payload.id,
              name: payload.name,
              owner: payload.owner,
              files: payload.files,
              collaborators: payload.collaborators
            })
          }
          if (change.type === 'modified' && source === 'Server') {
            const payload = change.doc.data()
            context.commit('updateProject', payload)
          }
          if (change.type === 'removed' && source === 'Server') {
            const payload = change.doc.data()
            context.commit('deleteProject', payload.id)
          }
        })
      })
    },
    addProject(context, payload) {
      getCollection('projects').add({
          ...payload,
          timestamp: new Date()
        })
        .then(function (docRef) {
          getCollection('projects').doc(docRef.id).get().then(doc => {
            const data = doc.data()
            let proj = {
              id: doc.id,
              owner: data.owner,
              name: data.name,
              files: data.files,
              collaborators: data.collaborators
            }
            context.commit('addProject', proj)
          })
        })
    },
    updateProject(context, payload) {
      getCollection('projects')
        .doc(payload.id)
        .set(payload, {
          merge: true
        })
        .then(() => {
          context.commit('updateProject', payload)
        })
    },
    deleteProject(context, id) {
      getCollection('projects')
        .doc(id)
        .delete()
        .then(() => {
          context.commit('deleteProject', id)
        })
    },
    getProjects(context, user) {
      getCollection('projects')
        .where('owner', '==', user.email)
        .get()
        .then(snapshot1 => {
          getCollection('projects')
            .where('collaborators', 'array-contains', user.email)
            .get()
            .then(snapshot2 => {
              const projects = []
              snapshot1.docs.forEach(doc => {
                const data = doc.data()
                const proj = {
                  id: doc.id,
                  owner: data.owner,
                  name: data.name,
                  files: data.files,
                  collaborators: data.collaborators
                }
                projects.push(proj)
              })
              snapshot2.docs.forEach(doc => {
                const data = doc.data()
                const proj = {
                  id: doc.id,
                  owner: data.owner,
                  name: data.name,
                  files: data.files,
                  collaborators: data.collaborators
                }
                projects.push(proj)
              })
              const uniqueProjects = projects.filter(function (project, index) {
                return projects.indexOf(project) == index
              })
              console.log('uniqueProjects: ', uniqueProjects);
              return context.commit('setProjects', uniqueProjects)
            })
        })
    },
    updateProjectIndex(context, index) {
      context.commit('updateProjectIndex', index)
    },
    updateFileIndex(context, index) {
      context.commit('updateFileIndex', index)
    }
  },
  getters: {
    user(state) {
      return state.user
    },
    projects(state) {
      const noneFound = [{
        name: 'No projects found',
        id: 'blah',
        files: []
      }]
      if (!state.projects || state.projects.length <= 0) return noneFound
      return state.projects
    },
    selectedProjectIndex(state) {
      return state.selectedProjectIndex
    },
    selectedFileIndex(state) {
      return state.selectedFileIndex
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
    '_mzw_' +
    Math.random()
    .toString(36)
    .substr(2, 20)
  )
}

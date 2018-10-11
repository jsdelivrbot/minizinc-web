// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import Vuetify from 'vuetify'

import 'vuetify/dist/vuetify.min.css'

import firebase from 'firebase'

Vue.use(Vuetify, {
  iconfont: 'md'
})

Vue.config.productionTip = false

let app
firebase.initializeApp({
  apiKey: 'AIzaSyB0201qNOjRgCDiVNKw77wx-Kbkts-o_ak',
  authDomain: 'minizinc-web-1538942191327.firebaseapp.com',
  databaseURL: 'https://minizinc-web-1538942191327.firebaseio.com',
  projectId: 'minizinc-web-1538942191327',
  storageBucket: 'minizinc-web-1538942191327.appspot.com',
  messagingSenderId: '1014902901695'
})
firebase.auth().onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      el: '#app',
      router,
      store,
      components: { App },
      template: '<App/>',
      created () {}
    })
  }
})

/* eslint-disable no-new */

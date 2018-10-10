<template>
  <div id="login">
   <div id="firebaseui-auth-container"></div>
  </div>
</template>

<script>
import firebase from 'firebase'
import firebaseui from 'firebaseui'
// import {config} from '../helpers/firebaseConfig'

export default {
  name: 'login',
  data: function () {
    return {}
  },
  methods: {
    signIn () {
    }
  },
  mounted () {
    const uiConfig = {
      signInSuccessUrl: '/',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
      ]
    }
    const ui = new firebaseui.auth.AuthUI(firebase.auth())
    ui.start('#firebaseui-auth-container', uiConfig)
  }
}

</script>

<style>
#login {
	text-align: center;
	justify-content: center;
}

.top-margin {
	margin-top: 100px;
}
</style>

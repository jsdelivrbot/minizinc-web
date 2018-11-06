<template>
  <div class="login">
    <video autoplay muted loop id="myVideo">
      <source src="https://storage.googleapis.com/coverr-main/mp4/Love-Coding.mp4" type="video/mp4">
    </video>
  <v-layout row>
    <v-flex xs12 sm4 offset-sm4>
      <v-card class="login-card">
          <div class="centerize">
            <v-card-text>
              <div class="centerize my-header">Welcome to Mini Zinc Web IDE</div>
              <div class="centerize my-header">Capstone project of Harrison Thomas</div>
            </v-card-text>
            <div class="headline"></div>
          </div>
        <v-card-actions class="centerize">
          <div id="firebaseui-auth-container"></div>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
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
.login {
	background-color: lightgray !important;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
}

.top-margin {
	margin-top: 100px;
}

.login-card {
	margin-top: 30vh;
}

.centerize {
	justify-content: center !important;
	text-align: center !important;
}

.my-header {
	font-size: 24px;
	margin: 20px;
}

#myVideo {
    position: fixed;
    right: 0;
    bottom: 0;
    min-width: 100%;
    min-height: 100%;
}
</style>

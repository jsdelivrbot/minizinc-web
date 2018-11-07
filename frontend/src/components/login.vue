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
            <div v-if="!loading" class="add-margin">
              <v-btn @click="signIn" large dark color="red">
                <!-- <v-icon dark left>remove_circle</v-icon> -->
                Sign in with Google
              </v-btn>
            </div>
            <div v-if="loading" class="add-margin">
              <v-progress-circular :size="70" :width="7" color="red" indeterminate v-if="loading" ></v-progress-circular>
            </div>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import firebase from 'firebase'
import firebaseui from 'firebaseui'

export default {
  name: 'login',
  data: function () {
    return {
      loading: true
    }
  },
  methods: {
    signIn() {
      const self = this
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(provider).then((result) => {
        console.log('result: ', result);
        this.user = result.user
        self.$router.push({
            name: 'ide'
          })
      }).catch(err => console.log(error))
      this.loading = true
    }
  },
  mounted () {
    this.loading = false;
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
.add-margin {
  margin-bottom: 20px;
}
</style>

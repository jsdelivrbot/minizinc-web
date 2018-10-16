<style>
#ide {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

.sidebar-header {
	font-size: 24px;
	margin-top: 30px;
}

body {
	/* overflow: hidden; */
	margin: 0;
	background-color: white;
}

#editor {
	margin: 0;
	left: 0;
	height: 100%;
	width: 80vh;
	font-size: 20px;
}

.remove-margin {
	margin: 0 !important;
	padding: 0 !important;
}

.left-align {
	font-size: 15px;
	text-align: left;
	margin-top: 20px;
}

.inputs {
	margin-left: 10px;
	width: 90%;
	font-family: Consolas, monaco, monospace;
}

.code-text {
	font-family: Consolas, monaco, monospace;
}
.custom-container {
	margin: 0;
	padding: 0;
	margin-top: 10px;
}
.username {
	margin-left: 20px;
	margin-right: 20px;
}
</style>

<template>
  <div id="ide">
  <v-app
    id="inspire"
    dark
  >
    <v-navigation-drawer
      v-model="drawerOpen"
      clipped
      app
    >
      <v-list>
        <v-subheader class="sidebar-header">Projects
          <v-btn fab dark small color="red" @click="createProject">
            <v-icon dark>add</v-icon>
          </v-btn>
        </v-subheader>
        <!-- <v-list-tile v-for="file in files" :key="file.name" @click="switchFile(file)">
          <v-list-tile-title selected v-text="file.name"></v-list-tile-title>
        </v-list-tile> -->

        <v-subheader class="sidebar-header">Files
          <v-btn fab dark small color="red" @click="createFile">
            <v-icon dark>add</v-icon>
          </v-btn>
        </v-subheader>
        <v-list-tile v-for="file in files" :key="file.name" @click="switchFile(file)">
          <v-list-tile-title selected v-text="file.name"></v-list-tile-title>
        </v-list-tile>
      </v-list>
      <v-select
        :items="themes"
        label="Select Theme"
        outline
        v-on:change="selectTheme"
      ></v-select>
    </v-navigation-drawer>
    <v-toolbar
      color="red"
      fixed
      app
    >
      <v-toolbar-side-icon @click.stop="drawerOpen = !drawerOpen"></v-toolbar-side-icon>
      <v-icon class="mx-3">fab fa-youtube</v-icon>
      <v-toolbar-title class="mr-5 align-center">
        <span class="title">MiniZinc Web IDE - {{selectedFile}}</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
        <v-avatar
          size="45"
          color="grey lighten-4"
        >
          <img :src="photoURL" alt="avatar">
        </v-avatar>
          <span class="username">{{displayName}}</span>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn @click="logout" flat>Logout</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height class="remove-margin">
        <v-layout align-space-around>
           <v-flex xs8 fill-height fill-width>
            <editor id="editor" v-model="codeEntered" lang="ruby" v-bind:theme="theme"></editor>
           </v-flex>
          <v-flex xs4 fill-height fill-width>
            <v-layout>
              <v-flex xs3>
                <p class="left-align">Console:&nbsp; <span class="code-text">minizinc</span></p>
              </v-flex>
              <v-flex xs4>
                <v-text-field
                  class="inputs"
                  label="Flags"
                  placeholder="--solver Gecode"
                  :value="flags"
                ></v-text-field>
              </v-flex>
              <v-flex xs5>
                <v-text-field
                  class="inputs"
                  label="Files"
                  placeholder="model.mzn data.dzn"
                  :value="filesToSend"
                ></v-text-field>
                <v-btn @click="sendScript()" color="error">Solve</v-btn>
              </v-flex>
            </v-layout>
            <p class="left-align">{{consoleBaseOutput}}</p>
            <p class="left-align">{{consoleOutput}}</p>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
  </div>
</template>

<script>
/* eslint-disable */
import firebase from 'firebase'
import axiosBase from '../../utils/requestBase';

export default {
  name: 'ide',
	data: function() {
		return {
			drawerOpen: false,
			currentFile: 'demo.mzn',
      theme: 'vibrant_ink',
      flags: '--solver Gecode',
      filesToSend: 'model.mzn data.dzn',
      selectedFile: '',
      files: [
        {
          name: 'model.mzn',
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
          code: 'n = 5;'
        }
      ],
      consoleBaseOutput: 'Console output will go here\n\n',
      consoleOutput: '',
      codeEntered: '',
      themes: [
        'ambiance',
        'chaos',
        'chrome',
        'clouds_midnight',
        'clouds',
        'cobalt',
        'crimson_editor',
        'dawn',
        'dracula',
        'dreamweaver',
        'eclipse',
        'github',
        'gob',
        'gruvb,',
        'idle_fingers',
        'iplastic',
        'katzenmilch',
        'kr_theme',
        'kuroir',
        'merbivore_soft',
        'merbivore',
        'mono_industrial',
        'monokai',
        'pastel_on_dark',
        'solarized_dark',
        'solarized_light',
        'sqlserver',
        'terminal',
        'textmate',
        'tomorrow_night_blue',
        'tomorrow_night_bright',
        'tomorrow_night_eighties',
        'tomorrow_night',
        'tomorrow',
        'twilight',
        'vibrant_ink',
        'xcode'
      ],
      photoURL: '',
      displayName: ''
		};
	},
	components: {
		editor: require('vue2-ace-editor'),
	},
	methods: {
    createFile() {

    },
    createProject() {

    },
    selectTheme(theme){
      this.theme = theme
    },
    switchFile(file) {
      this.saveCurrentFile()
      this.selectedFile = file.name
      this.codeEntered = file.code
      this.drawerOpen = false
    },
    saveCurrentFile() {
      for(let f of this.files){
        if (f.name === this.selectedFile) f.code = this.codeEntered
      }
    },
    sendScript(){
      this.consoleOutput = 'Loading...'
      this.saveCurrentFile()
      let self = this;
      let tempFiles = [];
      for (let file of self.files) {
        if (self.filesToSend.indexOf(file.name) > -1) {
          tempFiles.push(file)
        }
      }

      axiosBase()
        .post('/api/run-zinc', {
          flags: self.flags.split(' '),
          files: tempFiles
        })
        .then(res => {
          let response = res.data.replace(/-/g, '');
          response = response.replace(/=/g, '');
          self.consoleOutput = response;
        });
    },
		loadAllThemes() {
      require('brace/mode/ruby');
			require('brace/theme/twilight');
			require('brace/theme/ambiance');
			require('brace/theme/chaos');
			require('brace/theme/chrome');
			require('brace/theme/clouds_midnight');
			require('brace/theme/clouds');
			require('brace/theme/cobalt');
			require('brace/theme/crimson_editor');
			require('brace/theme/dawn');
			require('brace/theme/dracula');
			require('brace/theme/dreamweaver');
			require('brace/theme/eclipse');
			require('brace/theme/github');
			require('brace/theme/gob');
			require('brace/theme/gruvbox');
			require('brace/theme/idle_fingers');
			require('brace/theme/iplastic');
			require('brace/theme/katzenmilch');
      require('brace/theme/kr_theme');
			require('brace/theme/kuroir');
			require('brace/theme/merbivore_soft');
			require('brace/theme/merbivore');
			require('brace/theme/mono_industrial');
			require('brace/theme/monokai');
			require('brace/theme/pastel_on_dark');
			require('brace/theme/solarized_dark');
			require('brace/theme/solarized_light');
			require('brace/theme/sqlserver');
			require('brace/theme/terminal');
			require('brace/theme/textmate');
			require('brace/theme/tomorrow_night_blue');
			require('brace/theme/tomorrow_night_bright');
			require('brace/theme/tomorrow_night_eighties');
			require('brace/theme/tomorrow_night');
			require('brace/theme/tomorrow');
			require('brace/theme/vibrant_ink');
			require('brace/theme/xcode');
    },
    logout() {
      const self = this;
      firebase.auth().signOut().then(() => {
        self.$store.dispatch('logout')
        self.$router.push({name: 'login'})
      })
    }
  },
	created() {
    const self = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        self.$store.dispatch('signIn', user)
        self.photoURL = user.photoURL
        self.displayName = user.displayName
      }
    });

    this.codeEntered = this.files[0].code
    this.selectedFile = this.files[0].name
    this.loadAllThemes()
  },
};
</script>

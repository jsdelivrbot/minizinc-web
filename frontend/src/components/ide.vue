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
.files-header {
	font-size: 18px;
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

.sidebar-input {
	margin-left: 20px;
}

.clickable {
	cursor: pointer;
}

.theme-selector {
	position: fixed;
	bottom: 0;
	margin-bottom: 100px;
	width: 90%;
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
      disable-resize-watcher
    >
      <v-list>
        <v-subheader class="sidebar-header">Projects
          <v-btn fab fixed right dark small color="red" @click="showNewProject = !showNewProject">
            <v-icon dark>add</v-icon>
          </v-btn>
        </v-subheader>
        <v-layout row wrap>
          <v-flex xs10 class="sidebar-input">
            <v-text-field
              label="New Project"
              v-if="showNewProject"
              @keyup.enter="createProject"
              v-model="newProject"
              autofocus
              dark
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-list-tile v-for="(project, index) in projects" :key="project.name" @click="switchProject(project)">
          <v-list-tile-title
          v-text="project.name"></v-list-tile-title>
          <v-btn fab dark fixed right flat small color="red" @click.stop="switchProject" @click="deleteProject(project, index)">
            <v-icon dark>delete</v-icon>
          </v-btn>
        </v-list-tile>

        <v-subheader style="text-align: left;" v-if="projects.length > 0" class="sidebar-header files-header">Files in "{{selectedProject.name}}"
          <v-btn fab fixed right dark small color="red" @click="showNewFile = !showNewFile">
            <v-icon dark>add</v-icon>
          </v-btn>
        </v-subheader>
        <v-layout row wrap>
          <v-flex xs10 class="sidebar-input">
            <v-text-field
              label="New Project"
              v-if="showNewFile"
              @keyup.enter="createFile"
              v-model="newFile"
              autofocus
              dark
            ></v-text-field>
          </v-flex>
        </v-layout>
          <v-list-tile v-for="(file, index) in selectedProject.files" :key="file.name" class="clickable" @click="switchFile(file)">
            <v-list-tile-title
            v-text="file.name"></v-list-tile-title>
          <v-btn fab dark fixed right flat small color="red" @click.stop="switchFile" @click="deleteFile(file, index)">
            <v-icon dark>delete</v-icon>
          </v-btn>
          </v-list-tile>
        <v-subheader v-if="selectedProject.files.length <= 0">No files exist yet. Create one!</v-subheader>
      </v-list>
      <v-select
        :items="themes"
        label="Select Theme"
        outline
        v-on:change="selectTheme"
        class="theme-selector"
        fixed
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
          <img :src="currentUser.photoURL" alt="avatar">
        </v-avatar>
          <span class="username">{{currentUser.displayName}}</span>
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
                  v-model="flags"
                ></v-text-field>
              </v-flex>
              <v-flex xs5>
                <v-text-field
                  class="inputs"
                  label="Files"
                  placeholder="model.mzn data.dzn"
                  v-model="filesToSend"
                ></v-text-field>
                <v-btn @click="sendScript()" color="error">Solve</v-btn>
              </v-flex>
            </v-layout>
            <p class="left-align">{{consoleBaseOutput}}</p>
                <v-progress-circular
                  center
                  indeterminate
                  color="red"
                  v-if="loading"
                ></v-progress-circular>
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
// import axiosBase from '../../utils/requestBase';
import axios from 'axios'


export default {
  name: 'ide',
	data: function() {
		return {
			drawerOpen: false,
      theme: 'vibrant_ink',
      flags: '--solver Gecode',
      filesToSend: 'model.mzn data.dzn',
      selectedFile: '',
      projects: null,
      selectedProject: null,
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
      showNewProject: false,
      newProject: '',
      newFile: '',
      showNewFile: false,
      currentUser: {
        photoURL: '',
        displayName: ''
      },
      loading: false
		};
	},
	components: {
		editor: require('vue2-ace-editor'),
	},
	methods: {
    createProject() {
      this.showNewProject = false
      const newProject = {
        name : this.newProject,
        owner: this.currentUser.email,
        files: []
      }
      this.projects.push(newProject)
      this.newProject = ''
      this.switchProject(newProject)
      //todo reflect new project in database
      //todo reflect files on node server
    },
    createFile() {
      this.showNewFile = false
      const file = {
        name: this.newFile,
        code: ''
      }
      this.selectedProject.files.push(file)
      this.newFile = ''
      this.switchFile(file)
    },
    selectTheme(theme){
      this.theme = theme
    },
    switchFile(file, autoClose = true) {
      this.saveSelectedFile()
      this.selectedFile = file.name
      this.codeEntered = file.code
      if (autoClose) this.drawerOpen = false
    },
    deleteFile(file, index) {
      this.selectedProject.files.splice(index, 1)
      if (this.selectedProject.files.length >= 1) {
        this.switchFile(this.selectedProject.files[0], false)
      }
      else {
        this.selectedFile = `Please create a file to start with "${this.selectedProject.name}".`
        this.codeEntered = ''
      }
      this.drawerOpen = true
    },
    deleteProject(project, index) {
      this.projects.splice(index, 1)
      if (this.projects.length >= 1) {
        this.switchProject(this.projects[0])
      }
      else {
        this.selectedProject.files = []
        this.selectedProject.name = ''
        this.selectedFile = `Please create a project to get started.`
        this.codeEntered = ''
      }
      this.drawerOpen = true
    },
    switchProject(project) {
      console.log('project: ', project);
      this.saveSelectedFile()
      this.projects.forEach(p => {
        if (p.name === project.name) {
          this.selectedProject = project
        }
      })
      if (this.selectedProject.files.length <= 0) {
        this.selectedFile = `Please create a file to start with "${project.name}".`
        this.codeEntered = ''
      }
      else {
        this.selectedFile = this.selectedProject.files[0].name
        this.codeEntered = this.selectedProject.files[0].code
      }

    },
    saveSelectedFile() {
      for(let f of this.selectedProject.files){
        if (f.name === this.selectedFile) f.code = this.codeEntered
      }
    },
    sendScript(){
      this.loading = true
      this.consoleOutput = ''
      this.saveSelectedFile()
      let self = this;
      let tempFiles = [];
      for (let file of self.selectedProject.files) {
        if (self.filesToSend.indexOf(file.name) > -1) {
          tempFiles.push(file)
        }
      }
      if (tempFiles.length <= 0){
        self.consoleOutput = `Couldn't find any files that you specified.`
        this.loading = false
        return
      }
      let url
      if (window.location.href === 'http://localhost:8080/#/') {
        url = 'http://localhost:30001/api/run-zinc'
      } else {
        url = '/api/run-zinc'
      }

      axios
        .post(url, {
          flags: self.flags.split(' '),
          files: tempFiles
        })
        .then(res => {
          let response = res.data.replace(/-/g, '');
          response = response.replace(/=/g, '');
          self.consoleOutput = response;
          this.loading = false
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
        self.currentUser = user
      }
    });

    if (!this.projects) {
      this.projects = [
        {
          name: 'Test project',
          owner: 'harrison.thomas04@gmail.com',
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
              code: 'n = 9;'
            }
        ]
      }]
    }

    this.selectedProject = this.projects[0];
    this.codeEntered = this.selectedProject.files[0].code
    this.selectedFile = this.selectedProject.files[0].name
    this.loadAllThemes()
  },
};
</script>

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
	height: 100vh;
	width: 80vh;
	font-size: 20px;
	/* margin-top: 20px; */
}

.remove-margin {
	margin: 0 !important;
	padding: 0 !important;
}

.left-align {
	font-size: 15px;
	text-align: left;
	padding-top: 20px;
	margin-left: 15px;
}

.inputs {
	margin-left: 10px;
	margin-top: 20px;
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

.edit-button {
	margin-right: 25px;
}
</style>

<template>
  <div id="ide" v-if="currentUser.displayName !== ''">
    <v-app id="inspire" dark>
      <v-navigation-drawer v-model="drawerOpen" clipped app disable-resize-watcher>
        <v-list>
          <v-subheader class="sidebar-header">Projects
            <v-btn fab fixed right dark small color="red" @click="showNewProject = !showNewProject">
              <v-icon dark>add</v-icon>
            </v-btn>
          </v-subheader>
          <v-layout row wrap>
            <v-flex xs10 class="sidebar-input">
              <v-text-field label="New Project" v-if="showNewProject" @keyup.enter="createProject" v-model="newProject"
                autofocus dark></v-text-field>
            </v-flex>
          </v-layout>
          <div v-if="projectsExist" >
            <v-list-tile v-for="(project, index) in projects" :key="project.id" @click="switchProject(project, index)">
              <v-list-tile-title v-if="!editingProject[index]" v-text="project.name"></v-list-tile-title>
              <v-text-field v-if="editingProject[index]" @keyup.enter="editProject(project, index)" v-model="editedProjectName"
                autofocus dark></v-text-field>
              <v-btn fab right flat small color="white" class="edit-button" v-on:click.stop="startEditingProject(project, index)">
                <v-icon dark>edit</v-icon>
              </v-btn>
              <v-btn fab fixed right flat small color="white" v-on:click.stop="deleteProject(project, index)">
                <v-icon dark>delete</v-icon>
              </v-btn>
            </v-list-tile>
          </div>
          <v-subheader v-if="!projectsExist && !showNewProject">No projects exist. Create one!</v-subheader>

          <v-subheader style="text-align: left;" v-if="projectsExist" class="sidebar-header files-header">Files
            in "{{selectedProject.name}}"
            <v-btn fab fixed right dark small color="red" @click="showNewFile = !showNewFile">
              <v-icon dark>add</v-icon>
            </v-btn>
          </v-subheader>
          <v-layout row wrap>
            <v-flex xs10 class="sidebar-input">
              <v-text-field label="New Project" v-if="showNewFile" @keyup.enter="createFile" v-model="newFile"
                autofocus dark></v-text-field>
            </v-flex>
          </v-layout>
          <div v-if="filesExist" >
            <v-list-tile v-for="(file, index) in selectedProject.files" :key="file.id" class="clickable" @click="switchFile(file, index)">
              <v-list-tile-title v-if="!editingFile[index]" v-text="file.name"></v-list-tile-title>
              <v-text-field v-if="editingFile[index]" @keyup.enter="editFile(file, index)" @click.stop v-model="editedFileName"
                autofocus dark></v-text-field>
              <v-btn fab right flat small class="edit-button" color="white" v-on:click.stop="startEditingFile(file, index)">
                <v-icon dark>edit</v-icon>
              </v-btn>
              <v-btn fab fixed right flat small color="white" v-on:click.stop="deleteFile(file, index)">
                <v-icon dark>delete</v-icon>
              </v-btn>
            </v-list-tile>
          </div>
          <v-subheader v-if="projectsExist && !filesExist && !showNewFile">No
            files exist
            yet. Create one!</v-subheader>
        </v-list>
        <v-select :items="themes" label="Select Theme" outline v-on:change="selectTheme" class="theme-selector"></v-select>
      </v-navigation-drawer>
      <v-toolbar color="red" fixed app>
        <v-toolbar-side-icon @click.stop="drawerOpen = !drawerOpen"></v-toolbar-side-icon>
        <v-icon class="mx-3">fab fa-youtube</v-icon>
        <v-toolbar-title class="mr-5 align-center">
          <span class="title">MiniZinc Web IDE - {{selectedFile ? selectedFile.name : 'Please create a file to get started'}}</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-avatar size="45" color="grey lighten-4">
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
              <editor id="editor" v-model="codeEntered" lang="ruby" v-bind:theme="theme" @change="saveSelectedFile"></editor>
            </v-flex>
            <v-flex xs4 fill-height fill-width>
              <v-layout>
                <v-flex xs3>
                  <p class="left-align">Console:&nbsp; <span class="code-text">minizinc</span></p>
                </v-flex>
                <v-flex xs4>
                  <v-text-field class="inputs" label="Flags" placeholder="--solver Gecode" v-model="flags"></v-text-field>
                </v-flex>
                <v-flex xs5>
                  <v-text-field class="inputs" label="Files" placeholder="model.mzn data.dzn" v-model="filesToSend"></v-text-field>
                  <v-btn @click="sendScript()" color="error">Solve</v-btn>
                </v-flex>
              </v-layout>
              <p class="left-align">{{consoleBaseOutput}}</p>
              <v-progress-circular center indeterminate color="red" v-if="awaitingScriptResponse"></v-progress-circular>
              <p class="left-align">{{consoleOutput}}</p>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
      <v-snackbar v-model="snackbar" color="error" :timeout="6000" bottom>
        {{ snackbarText }}
        <v-btn dark flat @click="undoDelete()">
          Undo
        </v-btn>
      </v-snackbar>
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
    data: function () {
      return {
        drawerOpen: false,
        theme: 'vibrant_ink',
        flags: '--solver Gecode',
        filesToSend: 'model.mzn data.dzn',
        // selectedProject: {
        //   name: 'No projects found',
        //   files: []
        // },
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
        awaitingScriptResponse: false,
        loading: true,
        snackbar: false,
        snackbarText: '',
        deletionStack: [],
        projectsExist: false,
        filesExist: false,
        editingProject: [],
        editingFile: [],
        editedProjectName: '',
        editedFileName: '',
        projectCount: -1,
        fileCount: -1
      };
    },
    components: {
      editor: require('vue2-ace-editor'),
    },
    methods: {
      createProject() {
        this.showNewProject = false
        const newProject = {
          name: this.newProject,
          owner: this.currentUser.email,
          files: []
        }
        this.$store.dispatch('addProject', newProject)
        this.newProject = ''
        //todo reflect files on node server
      },
      createFile() {
        this.showNewFile = false
        const newFile = {
          name: this.newFile,
          code: '',
          id: this.ID()
        }
        const currentProject = this.selectedProject
        this.$store.dispatch('updateProject', {
          ...currentProject,
          files: [...currentProject.files, newFile]
        })
        this.newFile = ''
      },
      selectTheme(theme) {
        this.theme = theme
      },
      switchFile(file, index, ) {
        this.saveSelectedFile()
        this.loading = true
        this.$store.dispatch('updateFileIndex', index)
      },
      undoDelete() {
        this.snackbar = false
        const item = this.deletionStack.pop()
        if (item.files) {
          let copy = {...item}
          delete copy.id
          this.$store.dispatch('addProject', copy)
        }
        else {
          let copy = {...this.selectedProject}
          copy.files.push(item)
          this.$store.dispatch('updateProject', copy)
        }
      },
      deleteFile(file, index) {
        this.snackbarText = `"${file.name}" deleted.`
        this.snackbar = true
        this.deletionStack.push({ ...file})

        let copy = {...this.selectedProject}
        copy.files.splice(index, 1)
        if (this.$store.getters.selectedFileIndex === index) {
          this.$store.dispatch('updateFileIndex', 0)
          this.loading = true
        }
        this.$store.dispatch('updateProject', copy)


        this.drawerOpen = true
      },
      deleteProject(project, index) {
        this.snackbarText = `"${project.name}" deleted.`
        this.snackbar = true
        this.deletionStack.push({ ...project})

        if (this.$store.getters.selectedProjectIndex === index) {
          // selected project was just deleted.
          this.$store.dispatch('updateProjectIndex', 0)
          this.$store.dispatch('updateFileIndex', 0)
          this.loading = true
        }

        this.$store.dispatch('deleteProject', project.id)
      },
      switchProject(project, index) {
        this.saveSelectedFile()
        this.loading = true
        this.$store.dispatch('updateProjectIndex', index)
        this.$store.dispatch('updateFileIndex', 0)
      },
      startEditingProject(project, index) {
        this.editingFile.forEach((file, i) => {
          if (file) {
            this.$set(this.editingFile, i, false)
          }
        })
        this.editingProject.forEach((project, i) => {
          if (project && index !== i) {
            this.$set(this.editingProject, i, false)
          }
        })
        this.editedProjectName = project.name
        this.$set(this.editingProject, index, !this.editingProject[index])
      },
      editProject(project, index) {
        this.$set(this.editingProject, index, !this.editingProject[index])
        let copy = {...project, name: this.editedProjectName}
        this.editedProjectName = ''
        this.$store.dispatch('updateProject', copy)

      },
      startEditingFile(file, index) {
        this.editingProject.forEach((project, i) => {
          if (project) {
            this.$set(this.editingProject, i, false)
          }
        })
        this.editingFile.forEach((file, i) => {
          if (file && index !== i) {
            this.$set(this.editingFile, i, false)
          }
        })
        this.editedFileName = file.name
        this.$set(this.editingFile, index, !this.editingFile[index])
      },
      editFile(file, index) {
        this.$set(this.editingFile, index, !this.editingFile[index])
        let copy = {...this.selectedProject}
        copy.files[index].name = this.editedFileName
        this.editedFileName = ''
        this.$store.dispatch('updateProject', copy)
      },
      saveSelectedFile() {
        let copy = {...this.selectedProject}
        if (this.selectedFile.code !== this.codeEntered) {
          copy.files[this.$store.getters.selectedFileIndex].code = this.codeEntered
          this.$store.dispatch('updateProject', copy)
          console.log('updating code')
        }
      },
      sendScript() {
        this.awaitingScriptResponse = true
        this.consoleOutput = ''
        this.saveSelectedFile()
        let self = this;
        let tempFiles = [];
        for (let file of self.selectedProject.files) {
          if (self.filesToSend.indexOf(file.name) > -1) {
            tempFiles.push(file)
          }
        }
        if (tempFiles.length <= 0) {
          self.consoleOutput = `Couldn't find any files that you specified.`
          this.awaitingScriptResponse = false
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
            this.awaitingScriptResponse = false
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
          self.$router.push({
            name: 'login'
          })
        })
      },
      ID() {
        return (
          '_mzw_' +
          Math.random()
          .toString(36)
          .substr(2, 20)
        )
      }
    },
    watch: {
      codeEntered: function (newCode) {
        this.saveSelectedFile()
      }
    },
    created() {
      const self = this;
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          self.$store.dispatch('signIn', user)
          self.currentUser = user
        }
      });
      this.loadAllThemes()
    },
    computed: {
      projects() {
        const numProjects = this.$store.getters.projects.length
        if (numProjects !== this.projectCount) {
          this.projectCount = numProjects
          this.editingProject = []
          for(let i = 0; i < numProjects; i++) {
            this.editingProject.push(false)
          }
        }
        return this.$store.getters.projects;
      },
      selectedProject() {
        this.projectsExist = this.projects[this.$store.getters.selectedProjectIndex].id !== 'blah'
        const files = this.projects[this.$store.getters.selectedProjectIndex].files
        if (files.length !== this.fileCount && files.length > 0) {
          this.fileCount = files.length
          this.editingFile = []
          for(let i = 0; i < files.length; i++) {
            this.editingFile.push(false)
          }
            console.log('reset: ', this.editingFile);
        }
        return this.projects[this.$store.getters.selectedProjectIndex]
      },
      selectedFile() {
        if(this.loading && this.selectedProject.files[this.$store.getters.selectedFileIndex]) {
          this.loading = false
          this.codeEntered = this.selectedProject.files[this.$store.getters.selectedFileIndex].code
        }
        else if (this.loading) {
          this.codeEntered = ''
        }

        if(!this.loading) {
          this.filesExist = this.selectedProject.files.length > 0
          this.codeEntered = this.selectedProject.files[this.$store.getters.selectedFileIndex].code
          return this.selectedProject.files[this.$store.getters.selectedFileIndex] || null
        }
        return null
      }
    }
  };

</script>

<style>
#ide {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	z-index: 1 !important;
}

.navbar {
	z-index: 10 !important;
}

.console-output {
	white-space: pre-wrap;
}

.sidebar-header {
	font-size: 24px !important;
	margin-top: 30px !important;
	color: white !important;
}

.files-header {
	margin-top: 30px !important;
	color: white !important;
	font-size: 18px !important;
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
	width: 90%;
	margin-top: 15px !important;
	font-family: Consolas, monaco, monospace;
}

.files-selector {
	margin-top: 0;
	/* padding-top: 5px !important; */
}

.selected {
	/* margin-top: 15px; */
	background-color: rgb(110, 110, 110);
}

.code-text {
	font-family: Consolas, monaco, monospace;
	margin-top: 18px !important;
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
	margin-top: 30px;
}

.edit-button {
	margin-right: 25px !important;
}

.delete-button:hover {
	color: red;
}

.solve-button {
	padding: 0 !important;
	margin: 0 !important;
}

.quit-button {
	padding: 0 !important;
	margin: 0 !important;
	margin-left: 15px !important;
}

.add-collaborator {
	margin-left: 15px;
}

.share-project-title {
	font-size: 24px;
}

.owner-text {
	font-size: 10px;
}

.loading-spinner {
	margin-top: 50px;
}
</style>

<template>
  <div id="ide" v-if="currentUser.displayName !== ''">
    <v-app id="inspire" dark>
      <v-navigation-drawer v-model="drawerOpen" clipped app disable-resize-watcher>
        <v-list>
          <v-subheader class="sidebar-header">Projects
            <v-btn
              fab
              fixed
              right
              dark
              small
              color="red"
              @click="showNewFile = false; showNewProject = !showNewProject"
            >
              <v-icon dark>add</v-icon>
            </v-btn>
          </v-subheader>
          <v-layout row wrap="">
            <v-flex xs10 class="sidebar-input">
              <v-text-field
                label="New Project"
                v-if="showNewProject"
                @keyup.enter="createProject"
                v-model="newProject"
                autofocus
                dark
                color="white"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <div v-if="projectsExist">
            <v-list-tile
              v-for="(project, index) in projects"
              :key="project.id"
              @click="switchProject(project, index)"
              v-bind:class="{ 'selected': selectedProject.id === project.id }"
            >
            <v-list-tile-title v-if="!editingProject[index]" v-text="project.name"></v-list-tile-title>
              <span
                class="owner-text"
                v-if="currentUser.email !== project.owner"
                v-text="collaborators[project.owner]"
              ></span>
              <v-text-field
                autoselect
                v-if="editingProject[index]"
                @keyup.enter="editProject(project, index)"
                v-model="editedProjectName"
                autofocus
                dark
              ></v-text-field>
              <v-menu bottom left v-if="currentUser.email === project.owner">
                <v-btn slot="activator" dark icon right fixed>
                  <v-icon>more_vert</v-icon>
                </v-btn>
                <v-list>
                  <v-list-tile
                    v-on:click.stop="switchProject(project, index);drawerOpen=false;showShareProject=true"
                    @mouseover="shareProjColor = 'blue'"
                    @mouseleave="shareProjColor = 'white'"
                  >
                    <v-icon dark small :color="shareProjColor">person_add</v-icon>&nbsp;
                    <v-list-tile-title>Share</v-list-tile-title>
                  </v-list-tile>
                  <v-list-tile
                    v-on:click.stop="startEditingProject(project, index)"
                    @mouseover="editProjColor = 'yellow'"
                    @mouseleave="editProjColor = 'white'"
                  >
                    <v-icon dark small :color="editProjColor">edit</v-icon>&nbsp;
                    <v-list-tile-title>Rename</v-list-tile-title>
                  </v-list-tile>
                  <v-list-tile
                    v-on:click.stop="deleteProject(project, index)"
                    @mouseover="deleteProjColor = 'red'"
                    @mouseleave="deleteProjColor = 'white'"
                  >
                    <v-icon dark small class="delete-button" :color="deleteProjColor">delete</v-icon>&nbsp;
                    <v-list-tile-title>Delete</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
            </v-list-tile>
          </div>
          <v-subheader v-if="!projectsExist && !showNewProject">No projects exist. Create one!</v-subheader>
          <v-subheader style="text-align: left;" v-if="projectsExist" class="files-header">
            Files
            in "{{selectedProject.name}}"
            <v-btn
              fab
              fixed
              right
              dark
              small
              color="red"
              @click="showNewProject = false; showNewFile = !showNewFile"
            >
              <v-icon dark>add</v-icon>
            </v-btn>
          </v-subheader>
          <v-layout row wrap="">
            <v-flex xs10 class="sidebar-input">
              <v-text-field
                label="New File"
                v-if="showNewFile"
                @keyup.enter="createFile"
                v-model="newFile"
                color="white"
                autofocus
                dark
              ></v-text-field>
            </v-flex>
          </v-layout>
          <div v-if="filesExist">
            <v-list-tile
              v-for="(file, index) in selectedProject.files"
              :key="file.id"
              class="clickable"
              @click="switchFile(file, index)"
              v-bind:class="{ 'selected': selectedFile.id === file.id }"
            >
              <v-list-tile-title v-if="!editingFile[index]" v-text="file.name"></v-list-tile-title>
              <v-text-field
                v-if="editingFile[index]"
                @keyup.enter="editFile(file, index)"
                @click.stop
                v-model="editedFileName"
                autofocus
                dark
              ></v-text-field>
              <v-btn
                fab
                right
                flat
                small
                class="edit-button"
                :color="editFileColors[index]"
                @mouseover="editFileColorChange(index, 'yellow')"
                @mouseleave="editFileColorChange(index, 'white')"
                v-on:click.stop="startEditingFile(file, index)"
              >
                <v-icon dark>edit</v-icon>
              </v-btn>
              <v-btn
                fab
                fixed
                right
                flat
                small
                :color="deleteFileColors[index]"
                @mouseover="deleteFileColorChange(index, 'red')"
                @mouseleave="deleteFileColorChange(index, 'white')"
                v-on:click.stop="deleteFile(file, index)"
              >
                <v-icon dark>delete</v-icon>
              </v-btn>
            </v-list-tile>
          </div>
          <v-subheader v-if="projectsExist && !filesExist && !showNewFile">
            No
            files exist
            yet. Create one!
          </v-subheader>
        </v-list>
        <v-layout align-end justify-center row class="theme-selector">
          <v-select
            :items="themes"
            label="Select Theme"
            outline
            v-on:change="selectTheme"
            value="vibrant_ink"
            class="theme-selector"
          ></v-select>
        </v-layout>
        <v-layout align-end justify-center row>
          <v-btn
            dark
            color="red"
            @click="drawerOpen = false; showBugReport = true"
            target="_blank"
          >Bug / Feature</v-btn>
        </v-layout>
        <v-layout align-end justify-center row>
          <v-btn
            dark
            flat
            color="white"
            href="https://github.com/harryt04/minizinc-web"
            target="_blank"
          >
            <v-icon class="mx-3">fab fa-github</v-icon>View Source On Github
          </v-btn>
          <v-spacer></v-spacer>
        </v-layout>
        <v-layout align-end justify-center row>
          <div>Version 1.0.2</div>
        </v-layout>
      </v-navigation-drawer>
      <v-toolbar color="red" fixed app class="navbar">
        <v-toolbar-side-icon @click.stop="drawerOpen = !drawerOpen"></v-toolbar-side-icon>
        <v-toolbar-title class="mr-5 align-center">
          <span
            class="title"
          >MiniZinc Web IDE - {{selectedFile ? selectedFile.name : 'Please create a file to get started'}}</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn @click="showRightPanel = !showRightPanel" flat>Toggle Right Panel</v-btn>
        </v-toolbar-items>
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
            <v-flex xs12 fill-height fill-width v-if="!showRightPanel">
              <editor
                id="editor"
                v-model="codeEntered"
                :lang="mode"
                v-bind:theme="theme"
                @change="saveSelectedFile"
              ></editor>
              <div v-if="projectsExist">
                <v-dialog light v-model="showShareProject" max-width="500px">
                  <v-card>
                    <v-card-title class="share-project-title">Share "{{selectedProject.name}}"</v-card-title>
                    <v-list>
                      <div v-if="selectedProject.collaborators.length > 0">
                        <v-flex xs9>
                          <v-list-tile
                            v-for="(collaborator, index) in selectedProject.collaborators"
                            :key="collaborator"
                          >
                            <v-list-tile-title>{{collaborator}}</v-list-tile-title>
                            <v-btn fab flat small v-on:click="removeCollaborator(index)">
                              <v-icon dark>delete</v-icon>
                            </v-btn>
                          </v-list-tile>
                        </v-flex>
                      </div>
                      <v-list-tile>
                        <v-list-tile-title
                          v-if="selectedProject.collaborators.length <= 0"
                        >No collaborators invited. Invited one!</v-list-tile-title>
                      </v-list-tile>
                    </v-list>
                    <v-layout>
                      <v-flex xs10>
                        <v-text-field
                          class="add-collaborator"
                          max-width="300px"
                          label="New Collaborator's Email address"
                          @keyup.enter="addCollaborator"
                          v-model="newCollaboratorEmail"
                          autofocus
                          light
                          :rules="[rules.required, rules.email]"
                        ></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-card-actions>
                      <v-btn color="error" @click="addCollaborator(); showShareProject=false">Done</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog light v-model="showBugReport" max-width="640">
                  <iframe
                    src="https://docs.google.com/forms/d/e/1FAIpQLSet0L6_CBQA0nnH-E2YYiyMbiSDCsEt-pAXEcILY0Bb8C7E-Q/viewform?embedded=true"
                    width="640"
                    height="700"
                    frameborder="0"
                    marginheight="0"
                    marginwidth="0"
                  >Loading...</iframe>
                </v-dialog>
              </div>
            </v-flex>

            <v-flex xs8 fill-height fill-width v-if="showRightPanel">
              <editor
                id="editor"
                v-model="codeEntered"
                :lang="mode"
                v-bind:theme="theme"
                @change="saveSelectedFile"
              ></editor>
              <div v-if="projectsExist">
                <v-dialog light v-model="showShareProject" max-width="500px">
                  <v-card>
                    <v-card-title class="share-project-title">Share "{{selectedProject.name}}"</v-card-title>
                    <v-list>
                      <div v-if="selectedProject.collaborators.length > 0">
                        <v-flex xs9>
                          <v-list-tile
                            v-for="(collaborator, index) in selectedProject.collaborators"
                            :key="collaborator"
                          >
                            <v-list-tile-title>{{collaborator}}</v-list-tile-title>
                            <v-btn fab flat small v-on:click="removeCollaborator(index)">
                              <v-icon dark>delete</v-icon>
                            </v-btn>
                          </v-list-tile>
                        </v-flex>
                      </div>
                      <v-list-tile>
                        <v-list-tile-title
                          v-if="selectedProject.collaborators.length <= 0"
                        >No collaborators invited. Invited one!</v-list-tile-title>
                      </v-list-tile>
                    </v-list>
                    <v-layout>
                      <v-flex xs10>
                        <v-text-field
                          class="add-collaborator"
                          max-width="300px"
                          label="New Collaborator's Email address"
                          @keyup.enter="addCollaborator"
                          v-model="newCollaboratorEmail"
                          autofocus
                          light
                          :rules="[rules.required, rules.email]"
                        ></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-card-actions>
                      <v-btn color="error" @click="addCollaborator(); showShareProject=false">Done</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog light v-model="showBugReport" max-width="640">
                  <iframe
                    src="https://docs.google.com/forms/d/e/1FAIpQLSet0L6_CBQA0nnH-E2YYiyMbiSDCsEt-pAXEcILY0Bb8C7E-Q/viewform?embedded=true"
                    width="640"
                    height="700"
                    frameborder="0"
                    marginheight="0"
                    marginwidth="0"
                  >Loading...</iframe>
                </v-dialog>
              </div>
            </v-flex>


            <!-- Right Panel -->

            <v-flex xs4 fill-height fill-width v-show="showRightPanel">
              <v-layout>
                <v-flex xs12>
                  <v-layout align-center justify-center row class="inputs-container">
                    <v-flex xs5>
                      <v-text-field
                        class="inputs"
                        color="white"
                        label="Flags"
                        placeholder="--solver Gecode"
                        v-model="flags"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs7>
                      <v-select
                        class="files-selector"
                        v-model="selectedFilesToSend"
                        :items="filesToSend"
                        color="red"
                        box
                        chips
                        label="Files to send"
                        multiple
                      ></v-select>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
              <v-layout>
                <v-btn
                  left
                  @click="sendScript()"
                  :disabled="awaitingScriptResponse"
                  color="error"
                  class="solve-button"
                >Solve</v-btn>
                <v-btn
                  left
                  @click="sendSigTerm()"
                  :disabled="!awaitingScriptResponse"
                  color="error"
                  class="quit-button"
                >Quit</v-btn>
              </v-layout>
              <v-progress-circular
                center
                indeterminate
                color="red"
                v-if="awaitingScriptResponse"
                :size="70"
                :width="7"
                class="loading-spinner"
              ></v-progress-circular>
              <div class="left-align console-output">{{consoleOutput}}</div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
      <v-snackbar v-model="snackbar" color="error" :timeout="6000" bottom>
        {{ snackbarText }}
        <v-btn dark flat @click="undoDelete()">Undo</v-btn>
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
        flags: '--solver Gecode -a',
        // filesToSend: 'model.mzn data.dzn',
        showShareProject: false,
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
        fileCount: -1,
        newCollaboratorEmail: '',
        rules: {
          required: value => !!value || 'Required.',
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          }
        },
        deleteFileColors: [],
        editFileColors: [],
        deleteProjColor: 'white',
        editProjColor: 'white',
        shareProjColor: 'white',
        showBugReport: false,
        mode: 'ruby',
        filesToSend: [],
        selectedFilesToSend: [],
        collaborators: [],
        showRightPanel: true
      };
    },
    components: {
      editor: require('vue2-ace-editor'),
    },
    methods: {
      editFileColorChange(index, color){
        this.$set(this.editFileColors, index, color)
      },
      deleteFileColorChange(index, color){
        this.$set(this.deleteFileColors, index, color)
      },
      addCollaborator() {
        var validateEmailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (validateEmailRegEx.test(String(this.newCollaboratorEmail).toLowerCase())) {
          let copy = {...this.selectedProject}
          copy.collaborators.push(this.newCollaboratorEmail)
          this.$store.dispatch('updateProject', copy)
          this.newCollaboratorEmail = ''
        }
      },
      removeCollaborator(index) {
        let copy = {...this.selectedProject}
        copy.collaborators.splice(index, 1)
        this.$store.dispatch('updateProject', copy)
      },
      createProject() {
        this.showNewFile = false
        const newProject = {
          name: this.newProject,
          owner: this.currentUser.email,
          files: [],
          collaborators: []
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
        this.showNewProject = false
        this.showNewFile = false
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
        this.showNewProject = false
        this.showNewFile = false
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

        }
      },
      sendScript() {
        this.awaitingScriptResponse = true
        this.consoleOutput = ''
        let self = this;
        let tempFiles = [];
        for (let file of self.selectedProject.files) {
          if (self.selectedFilesToSend.indexOf(file.name) > -1) {
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

            if(!res.data.error) {
              self.consoleOutput = res.data.message;
              this.awaitingScriptResponse = false
            }
            else {
              self.consoleOutput = res.data.message;
              this.awaitingScriptResponse = false
            }
          })
      },
      sendSigTerm() {
        let url
        const self = this
        if (window.location.href === 'http://localhost:8080/#/') {
          url = 'http://localhost:30001/api/kill-last'
        } else {
          url = '/api/kill-last'
        }

        axios
          .post(url, {})
          .then(res => {
            console.log('res: ', res);
            self.consoleOutput += res.data.message;
            this.awaitingScriptResponse = false
          })
      },
      loadAllThemes() {
        require('brace/mode/ruby');
        require('brace/mode/mzn');
        require('brace/mode/json');
        require('brace/mode/javascript');
        require('brace/mode/text');
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
      },
      getCollaborator(email) {
        getCollection('users')
          .where('email', '==', email)
          .get()
          .then(snapshot => {
            snapshot.forEach(user => {
              this.collaborators[email] = user.data().displayName
            })
          })
          .catch(err => {
            console.log('err: ', err)
          })
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
          self.currentUser = user
          self.$store.dispatch('signIn', user)
        }
      });
      this.loadAllThemes()
    },
    computed: {
      projects() {
        const numProjects = this.$store.getters.projects.length
        if (numProjects !== this.projectCount && !this.loading) {
          this.projectCount = numProjects
          this.editingProject = []
          this.deleteFileColors = []
          this.editFileColors = []
          for(let i = 0; i < numProjects; i++) {
            this.editingProject.push(false)
            this.deleteFileColors.push('white')
            this.editFileColors.push('white')
          }
          this.collaborators = []
          this.$store.getters.projects.forEach(project => {
            if (project.owner !== this.currentUser.email) {
              this.getCollaborator(project.owner)
            }
          })
          console.log('this.collaborators: ', this.collaborators);
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
        }
        this.filesToSend = this.projects[this.$store.getters.selectedProjectIndex].files.map(file => file.name)


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
          const currentFileType = this.selectedProject.files[this.$store.getters.selectedFileIndex].name.split('.').pop()
          switch (currentFileType) {
            case "mzn":
            case "dzn":
              this.mode = 'mzn'
              break
            case "json":
              this.mode = 'json'
              break
            case "js":
              this.mode = 'javascript'
              break
            default:
              this.mode = 'text'
              break
          }
          return this.selectedProject.files[this.$store.getters.selectedFileIndex] || null
        }
        return null
      }
    },
    mounted() {
      const self = this
      window.addEventListener("keydown", e => {
        if ((e.ctrlKey || e.metaKey) && (e.which == 83 || e.which == 13)) {
          event.preventDefault()
          self.sendScript()
        }
      });
    }
  };

  function getCollection(collection) {
  const db = firebase.firestore()
  const settings = {
    timestampsInSnapshots: true
  }
  db.settings(settings)
  return db.collection(collection)
}

</script>

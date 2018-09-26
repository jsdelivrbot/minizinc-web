<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

.sidebar-header {
	font-size: 24px;
}

body {
	overflow: hidden;
	background-color: black;
}

#editor {
	margin: 0;
	margin-top: 10px;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	font-size: 20px;
}
</style>

<template>
  <div id="app">
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
        <v-header class="sidebar-header">Files</v-header>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      color="red"
      fixed
      clipped-left
      app
    >
      <v-toolbar-side-icon @click.stop="drawerOpen = !drawerOpen"></v-toolbar-side-icon>
      <v-icon class="mx-3">fab fa-youtube</v-icon>
      <v-toolbar-title class="mr-5 align-center">
        <span class="title">MiniZinc Web IDE</span>
      </v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fill-height>
        <v-layout justify-center align-center>
          <editor id="editor" v-model="codeEntered" lang="javascript" v-bind:theme="theme" @init="initEditor"></editor>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
  </div>
</template>

<script>
export default {
	name: 'app',
	data: function() {
		return {
      drawerOpen: false,
			codeEntered: `let test= true;\nif (test){  \nconsole.log('Hello World!')\n}\n`,
			theme: 'twilight',
		};
	},
	components: {
		editor: require('vue2-ace-editor'),
	},
	methods: {
		initEditor() {
			require('brace/mode/javascript');
			require('brace/theme/twilight');
		},
	},
	created() {},
};
</script>



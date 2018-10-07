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
	margin-top: 30px;
}

body {
	/* overflow: hidden; */
	background-color: white;
}

#editor {
	margin: 0;
	left: 0;
	height: 100%;
	width: 100%;
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
        <v-subheader class="sidebar-header">Files</v-subheader>
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
        <span class="title">MiniZinc Web IDE - {{currentFile}}</span>
      </v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height class="remove-margin">
        <v-layout align-space-around>
           <v-flex xs8 fill-height fill-width>
            <editor id="editor" v-model="codeEntered" lang="ruby" v-bind:theme="theme" @init="initEditor"></editor>
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
                  :value="files"
                ></v-text-field>
                <v-btn @click="sendScript()" color="error">Send</v-btn>
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
import axiosBase from '../utils/requestBase';

export default {
	name: 'app',
	data: function() {
		return {
			drawerOpen: false,
			currentFile: 'demo.mzn',
      theme: 'twilight',
      flags: '--solver Gecode',
      files: 'model.mzn data.dzn',
      consoleBaseOutput: 'Console output will go here\n\n',
      consoleOutput: '',
      codeEntered: `int: n;
array[1..n] of var 1..2*n: x;
include "alldifferent.mzn";
constraint alldifferent(x);
solve maximize sum(x);
output ["The resulting values are \\(x).\\n"];
`
		};
	},
	components: {
		editor: require('vue2-ace-editor'),
	},
	methods: {
		initEditor() {
			require('brace/mode/ruby');
			require('brace/theme/twilight');
    },
    sendScript(){
      let self = this;
      let tempFiles = [];
      tempFiles.push({
        name: 'model.mzn',
        code: self.codeEntered
      })
      tempFiles.push({
        name: 'data.dzn',
        code: 'n = 5;'
      })

      axiosBase()
        .post('/api/run-zinc', {
          flags: self.flags.split(' '),
          files: [...tempFiles]
        })
        .then(res => {
          let response = res.data.replace(/-/g, '');
          response = response.replace(/=/g, '');
          self.consoleOutput = response;
        });
    },
		loadAllThemes() {
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
	},
	created() {},
};
</script>

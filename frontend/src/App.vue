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
	font-size: 20px;
	text-align: left;
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
            <p class="left-align">{{consoleOutput}}</p>
          </v-flex>
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
      currentFile: 'demo.mzn',
      theme: 'twilight',
      consoleOutput: 'Console output will go here',
      codeEntered:
`% Golomb rulers.

include "globals.mzn";

int: n = 4;

array [1..n] of var 0..(n * n): mark;

constraint mark[1] = 0;
constraint forall (i in 1..(n - 1)) (mark[i] < mark[i + 1]);
constraint
    all_different (i in 1..n, j in (i + 1)..n) (mark[j] - mark[i]);

solve minimize mark[n];

output ["golomb: ", show(mark), "\\n"];
`,
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
    loadAllThemes(){
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

    }
  },
  created() {},
};
</script>



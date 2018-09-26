<template>
  <div id="app">
    <v-toolbar dark color="primary">
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title class="white--text">MiniZinc Web IDE</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>
    </v-toolbar>
    <!-- <editor id="editor" v-model="codeEntered" lang="javascript" v-bind:theme="theme" @init="initEditor"></editor> -->
  </div>
</template>

<script>
export default {
  name: 'app',
  data: function(){
    return{
      codeEntered:`let test= true;\nif (test){  \nconsole.log('Hello World!')\n}\n`,
      theme: 'twilight'
    }
  },
  components: {
    editor: require('vue2-ace-editor')
  },
  methods:{
    initEditor(){
      require('brace/mode/javascript');
      require('brace/theme/twilight');
    }
  },
  created(){}
}
</script>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}

body {
	overflow: hidden;
	/* background-color: black; */
}

#editor {
	margin: 0;
	margin-top: 10px;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
  font-size:20px;

}
</style>

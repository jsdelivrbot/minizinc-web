<template>
  <div id="app">
    <editor id="editor" v-model="codeEntered" lang="html" theme="twilight" mode="javascript" @init="initEditor"></editor>
  </div>
</template>

<script>
export default {
  name: 'app',
  data: function(){
    return{
      codeEntered:""
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
  created(){
  }
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
}
</style>

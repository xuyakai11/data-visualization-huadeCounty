<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
body {
  font-size: .16rem;
  line-height: 1.33;
  color: #00e4ff;
  background: #f0f2f5;

}
#app {
  font-family: 'MicrosoftYaHei', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100vw;
  height: 100vh;
}
body,div,p,h1,h2,h3,h4,h5,h6,textarea,ul,ol,li,dl,dt,dd{
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}
a:link,a:visited,a:hover,a:active{
	color:inherit;
	text-decoration: none;
}
a:active,
a:hover {
  outline: 0;
}
h1,h2,h3,h4,h5,h6{
	font-weight: 400;
}
ol,
ul {
  list-style: none;
}
img{
	vertical-align: top;
}
.clearfix:before, 
.clearfix:after { 
  display: table; 
  line-height: 0; 
  content: ""; 
} 
.clearfix:after { 
  clear: both; 
}
.ellipsis{
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
</style>
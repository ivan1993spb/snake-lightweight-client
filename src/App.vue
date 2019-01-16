<template>
  <div id="app">
    <div id="nav">
      <div class="logo"><img src="./assets/logo.png" alt=""></div>
      <router-link to="/">Home</router-link>
      <router-link to="/games">Games</router-link>
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
@font-face {
  font-family: 'Classic';
  src:  url('assets/fonts/classic.ttf') format('ttf'),
        url('assets/fonts/classic.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}

body {
  margin: 0;
  padding: 0;
  background: #000;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #fff;
}
#nav {
  display:flex;
  justify-content: center;
  padding: 30px;
  font-family: Classic;
  border-bottom: 3px solid #fff;
  .logo {
    margin-right:50px;
    img {
      width:50px;
    }
  }
  a {
    font-size:3rem;
    color: #2c3e50;
    padding-left: 30px;
    padding-right: 30px;
    text-decoration: none;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

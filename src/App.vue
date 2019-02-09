<template>
  <div id="app">
    <div id="nav">
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
  .logo {
    margin-right:50px;
    img {
      width:50px;
    }
  }
  a {
    font-size: 5rem;
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

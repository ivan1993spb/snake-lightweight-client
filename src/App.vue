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
    padding: 0px 30px;
    @media (max-width: 800px) {
      font-size: 4rem;
      padding: 0px 25px;
    }
    @media (max-width: 650px) {
      font-size: 3.5rem;
      padding: 0px 20px;
    }
    @media (max-width: 550px) {
      font-size: 2.5rem;
      padding: 0px 15px;
    }
    color: #354759;
    text-decoration: none;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

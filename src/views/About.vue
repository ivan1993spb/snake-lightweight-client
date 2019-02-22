<template>
  <div class="about">
    <h1>About</h1>
    <div class="about-content">
      <h3>Client info</h3>
      <div>
        <div>Client version: {{ VERSION }}</div>
        <div>Client build: {{ BUILD }}</div>
        <div>License: {{ LICENSE }}</div>
        <div>Author: {{ AUTHOR }}</div>
        <div>Client source code: <a href="https://github.com/ivan1993spb/snake-lightweight-client">here</a></div>
        <div>Issues: <a href="https://github.com/ivan1993spb/snake-lightweight-client/issues">here</a></div>
      </div>
      <h3>Server info</h3>
      <div v-if="isLoadingInfo">Loading</div>
      <div v-else>
        <div>Server version: {{ info.version }}</div>
        <div>Server build: {{ info.build }}</div>
        <div>License: {{ info.license }}</div>
        <div>Author: {{ info.author }}</div>
        <div>Server source code: <a href="https://github.com/ivan1993spb/snake-server">here</a></div>
        <div>Issues: <a href="https://github.com/ivan1993spb/snake-server/issues">here</a></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'
import { FETCH_INFO } from '@/store/actions.type'
import { AUTHOR, BUILD, LICENSE, VERSION } from '@/common/config'

export default {
  name: 'about',
  data () {
    return {
      VERSION,
      BUILD,
      LICENSE,
      AUTHOR
    }
  },
  computed: {
    ...mapGetters(['info', 'isLoadingInfo'])
  },
  beforeRouteEnter (to, from, next) {
    Promise.all([
      store.dispatch(FETCH_INFO)
    ]).then(() => {
      next()
    })
  }
}
</script>
<style lang="scss">
  .about {
    font-family: Classic, sans-serif;
    letter-spacing: 2px;

    h1 {
      text-align: center;
      font-size: 3rem;
    }

    h3 {
      color: #4283b9;
      font-size: 2rem;
    }

    // TODO: Use that color: #8342b9?

    .about-content {
      max-width: 790px;
      margin: 0 auto;

      li {
        padding-bottom:10px;
      }
    }
  }
</style>

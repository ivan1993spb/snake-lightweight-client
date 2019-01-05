<template>
  <div class="about">
    <h1>About</h1>
    <div v-if="isLoadingInfo">Loading</div>
    <div v-else>
      <div>Server source code: https://github.com/ivan1993spb/snake-server</div>
      <div>Client source code: https://github.com/ivan1993spb/snake-lightweight-client</div>
      <div>Server version: {{ info.version }}</div>
      <div>Server build: {{ info.build }}</div>
      <div>License: {{ info.license }}</div>
      <div>Author: {{ info.author }}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'
import { FETCH_INFO } from '@/store/actions.type'

export default {
  name: 'about',
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

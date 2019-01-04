<template>
  <div class="home">
    <h1>Home</h1>
    <div>Welcome to the snake arcade game!</div>
    <div>Server capacity: {{ capacity * 100 }}%</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'
import { FETCH_CAPACITY } from '@/store/actions.type'

export default {
  name: 'home',
  computed: {
    ...mapGetters(['capacity'])
  },
  beforeRouteEnter (to, from, next) {
    Promise.all([
      store.dispatch(FETCH_CAPACITY)
    ]).then(() => {
      next()
    })
  }
}
</script>

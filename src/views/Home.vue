<template>
  <div class="home">
    <h1>Home</h1>
    <div>Welcome to the snake arcade game!</div>
    <div>
      <i>Server capacity: </i>
      <b>{{ capacity > 1 ? capacity.toFixed(0) : capacity.toFixed(2) }}%</b>
    </div>
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
  methods: {
    updateCapacity () {
      store.dispatch(FETCH_CAPACITY)
    }
  },
  beforeRouteEnter (to, from, next) {
    Promise.all([
      store.dispatch(FETCH_CAPACITY)
    ]).then(() => {
      next()
    })
  },
  mounted () {
    this.capacityUpdateInterval = setInterval(() => {
      this.updateCapacity()
    }, 10000)
  },
  beforeDestroy () {
    clearInterval(this.capacityUpdateInterval)
  }
}
</script>

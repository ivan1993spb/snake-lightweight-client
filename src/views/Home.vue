<template>
  <div class="home">
    <h1>Home</h1>
    <h2>Welcome to the snake arcade game!</h2>
    <div>
      <h3>Game rules</h3>
      <p>A player controls a snake.</p>
      <p>The task of the game is to grow the biggest snake.</p>
      <p>In order to do that players may eat apples, watermelons, smallest snakes and remains of dead snakes of other players.</p>
      <p>If a snake hits a wall, that snake will die, and the player will start again with new small snake.</p>
      <p>Once a snake has grown it may eat the smallest snakes.</p>
      <h3>Control</h3>
      <p>Use arrows, WASD, IJKL or mouse</p>
    </div>
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

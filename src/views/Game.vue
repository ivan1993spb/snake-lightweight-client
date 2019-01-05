<template>
  <div>
    <h1>Game {{ game.id }}</h1>
    <div v-if='!isLoadingGame'>
      <div>Game ID: {{ game.id }}</div>
      <div>Map size: {{ game.width }}x{{ game.height }}</div>
      <div>Players: {{ game.count }}/{{ game.limit }}</div>
      <div>Messages: {{ game.rate }} per sec</div>
    </div>
    <div v-else>Loading</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'
import { FETCH_GAME, UPDATE_GAME } from '@/store/actions.type'

export default {
  name: 'game',
  computed: {
    ...mapGetters(['game', 'isLoadingGame'])
  },
  methods: {
    updateGame () {
      store.dispatch(UPDATE_GAME, this.game.id)
    }
  },
  beforeRouteEnter (to, from, next) {
    Promise.all([
      store.dispatch(FETCH_GAME, to.params.id)
    ]).then(() => {
      next()
    })
  },
  mounted () {
    this.gameUpdateInterval = setInterval(() => {
      this.updateGame()
    }, 10000)
  },
  beforeDestroy () {
    clearInterval(this.gameUpdateInterval)
  }
}
</script>

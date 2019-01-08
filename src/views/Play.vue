<template>
  <div>
    <h1>Play game {{ game.id }}</h1>
    <div>
      <span><b>Details</b></span>
      <span>Players: {{ game.count }}/{{ game.limit }}</span>
      <span>Messages: {{ game.rate }} per sec</span>
    </div>
    <div>
      <Playground :width="game.width" :height="game.height" :id="game.id"/>
    </div>
    <div>Use arrows, WASD, HJKL or mouse</div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import Playground from '@/components/Playground'
import { UPDATE_GAME } from '@/store/actions.type'
import store from '@/store'

export default {
  name: 'play',
  computed: {
    ...mapGetters(['game'])
  },
  components: {
    Playground
  },
  methods: {
    updateGame () {
      store.dispatch(UPDATE_GAME, this.game.id)
    }
  },
  beforeRouteEnter (to, from, next) {
    Promise.all([
      store.dispatch(UPDATE_GAME, to.params.id)
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

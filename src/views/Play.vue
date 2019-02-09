<template>
  <div class="play">
    <h1>Play game {{ game.id }}</h1>
    <div class="play-content">
      <div>
        <span><b>Details</b></span>
        <span>Players: {{ game.count }}/{{ game.limit }}</span>
        <span>Messages: {{ game.rate }} per sec</span>
      </div>
      <div v-if="isLoadingGame">
        <div>Loading</div>
      </div>
      <div v-else>
        <Playground :width="game.width" :height="game.height" :id="game.id"/>
      </div>
      <div>Use arrows, WASD, IJKL or mouse</div>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import Playground from '@/components/Playground'
import { FETCH_GAME, UPDATE_GAME } from '@/store/actions.type'
import store from '@/store'

export default {
  name: 'play',
  computed: {
    ...mapGetters(['game', 'isLoadingGame'])
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
<style lang="scss">
  .play {
    font-family: Classic, sans-serif;
    letter-spacing: 2px;

    h1 {
      text-align: center;
      font-size: 3rem;
    }

    .play-content {
      max-width: 790px;
      margin: 0 auto;
    }
  }
</style>

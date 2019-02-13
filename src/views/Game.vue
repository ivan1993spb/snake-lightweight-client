<template>
  <div class="game">
    <h1>{{ name }}</h1>
    <div class="game-content">
      <div v-if="!isLoadingGame">
        <div>Game ID: {{ game.id }}</div>
        <div>Map size: {{ game.width }}x{{ game.height }}</div>
        <div>Players: {{ game.count }}/{{ game.limit }}</div>
        <div>Messages: {{ game.rate }} per sec</div>
        <div v-if="game.count === 0" @click="deleteGame">delete</div>
        <div v-if="game.limit > game.count">
          <router-link :to="{ name: 'play', params: { id: game.id }}">Play</router-link>
        </div>
      </div>
      <div v-else>Loading</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import converter from 'number-to-words'
import store from '@/store'
import router from '@/router'
import {
  DELETE_GAME,
  FETCH_GAME,
  UPDATE_GAME
} from '@/store/actions.type'

export default {
  name: 'game',
  computed: {
    ...mapGetters(['game', 'isLoadingGame']),
    name: function () {
      return 'Game ' + converter.toWords(this.game.id)
    }
  },
  methods: {
    updateGame () {
      store.dispatch(UPDATE_GAME, this.game.id)
    },
    deleteGame () {
      store.dispatch(DELETE_GAME, this.game.id)
      router.push('/games')
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
  .game {
    font-family: Classic, sans-serif;
    letter-spacing: 2px;

    h1 {
      text-align: center;
      font-size: 3rem;
    }

    .game-content {
      max-width: 790px;
      margin: 0 auto;
    }
  }
</style>

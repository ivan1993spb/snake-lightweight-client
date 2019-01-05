<template>
  <div>
    <h1>Games</h1>

    <div v-if="isLoadingGames">Loading</div>
    <div v-else>
      <div>Games count: {{ count }}/{{ limit }}</div>

      <div v-if="count > 0">
        <div
          v-for="({id, width, height, limit, count, rate}, index) in games"
          v-bind:key="'game'+index">
          <GameItem
            :id="id"
            :width="width"
            :height="height"
            :count="count"
            :limit="limit"
            :rate="rate"
          />
        </div>
      </div>
      <div v-else>
        Empty
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'
import GameItem from '@/components/GameItem'
import { FETCH_GAMES, UPDATE_GAMES } from '@/store/actions.type'

export default {
  name: 'games',
  components: {
    GameItem
  },
  computed: {
    ...mapGetters(['games', 'count', 'limit', 'isLoadingGames'])
  },
  methods: {
    updateGames () {
      store.dispatch(UPDATE_GAMES)
    }
  },
  beforeRouteEnter (to, from, next) {
    Promise.all([
      store.dispatch(FETCH_GAMES)
    ]).then(() => {
      next()
    })
  },
  mounted () {
    this.gamesUpdateInterval = setInterval(() => {
      this.updateGames()
    }, 10000)
  },
  beforeDestroy () {
    clearInterval(this.gamesUpdateInterval)
  }
}
</script>

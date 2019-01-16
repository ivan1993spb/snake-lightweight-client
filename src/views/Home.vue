<template>
  <div class="home">
    <h1>Welcome to the snake arcade game!</h1>
    <div class="home-content">
      <div class="home-content__block">
        <h3>Game rules</h3>
          <ul>
            <li>A player controls a snake.</li>
            <li>The task of the game is to grow the biggest snake.</li>
            <li>In order to do that players may eat apples, watermelons, smallest snakes and remains of dead snakes of other players.</li>
            <li>If a snake hits a wall, that snake will die, and the player will start again with new small snake.</li>
            <li>Once a snake has grown it may eat the smallest snakes.</li>
          </ul>
      </div>
      <div class="home-content__block">
        <h3>Control</h3>
        <p>Use arrows, WASD, IJKL or mouse</p>
      </div>
    </div>
    <div>
      <Capacity :capacity="capacity"/>
    </div>
    <div class="btn-start">
      <router-link to="/games"><img src="../assets/button.png" alt=""></router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'
import Capacity from '@/components/Capacity'
import { FETCH_CAPACITY } from '@/store/actions.type'

export default {
  name: 'home',
  components: {
    Capacity
  },
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
<style lang="scss">
  .home {
    font-family: Classic, sans-serif;
    letter-spacing: 2px;
    h1 {
      text-align:center;
    }
    .home-content {
      max-width: 790px;
      margin: 0 auto;
      li {
        padding-bottom:10px;
      }
    }
    .btn-start {
      max-width:300px;
      margin: 0 auto;
      img {
        width:100%;
      }
    }
  }
</style>

<template>
  <div class="home">
    <h1>Welcome to snake online arcade game!</h1>
    <div class="home-content">
      <div class="home-content__block">
        <h3>Game rules</h3>
          <ul>
            <li>You control a snake</li>
            <li>You need to grow the biggest snake</li>
            <li>You can eat apples, mice, watermelons, small and dead snakes</li>
            <li>If you hit a wall, your snake will die and you will start over</li>
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
      text-align: center;
      font-size: 3rem;
    }

    h3 {
      color: #4283b9;
      font-size: 2rem;
    }

    .home-content {
      max-width: 790px;
      margin: 0 auto;
      li {
        padding-bottom: 10px;
      }
    }
  }
</style>

<template>
  <div class="new">
    <h1>New game</h1>
    <div class="new-content">
      <h3>Map size</h3>
      <div class="new-content-row">
        <label for="width-range">Width</label>
        <input id="width-range" type="range" min="8" max="255" step="1" v-model="width">
        <input id="width-number" type="number" v-model="width"/>
      </div>
      <div class="new-content-row">
        <label for="height-range">height</label>
        <input id="height-range" type="range" min="8" max="255" step="1" v-model="height">
        <input id="height-number" type="number" v-model="height"/>
      </div>
      <h3>Players limit</h3>
      <div class="new-content-row">
        <label for="limit-range">Players limit</label>
        <input id="limit-range" type="range" min="1" max="100" step="1" v-model="limit">
        <input id="limit-number" type="number" v-model="limit"/>
      </div>
      <h3>Gameplay preferences</h3>
      <div class="new-content-row">
        <label for="enable-walls">Enable walls</label>
        <input id="enable-walls" type="checkbox" v-model="enableWalls">
      </div>
      <div class="new-content-row">
        <div class="new-content-row-button" @click="create">OK</div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import store from '@/store'
import { CREATE_GAME } from '@/store/actions.type'
import { clientSizePx } from '@/common/helpers'

const INITIAL_MAP_WIDTH_MIN = 30
const INITIAL_MAP_WIDTH_MAX = 100
const INITIAL_MINIMUM_LIMIT = 5
const INITIAL_LIMIT_MAP_FACTOR = 0.01

export default {
  name: 'new',
  computed: {
  },
  methods: {
    create () {
      store.dispatch(CREATE_GAME, {
        width: this.width,
        height: this.height,
        limit: this.limit,
        'enable_walls': this.enableWalls
      })
    }
  },
  data () {
    const {
      width: widthPx,
      height: heightPx
    } = clientSizePx()
    const width = _.random(INITIAL_MAP_WIDTH_MIN, INITIAL_MAP_WIDTH_MAX)
    const height = Math.ceil(width * heightPx / widthPx)
    const limit = Math.max(INITIAL_MINIMUM_LIMIT, Math.ceil(width * height * INITIAL_LIMIT_MAP_FACTOR))

    return {
      width,
      height,
      limit,
      enableWalls: true
    }
  }
}
</script>
<style lang="scss">
  .new {
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
    .new-content {
      max-width: 790px;
      margin: 0 auto;

      .new-content-row {
        margin-bottom: 40px;

        label {
          width: 200px;
          font-size: 1.5rem;
          display:inline-block;
        }

        input, label {
          margin: 0px 20px;
        }

        input[type=number] {
          width: 100px;
          font-weight: bold;
        }

        .new-content-row-button {
          cursor: pointer;
          display: inline-block;
          font-size: 3rem;
          font-weight: bold;
          text-decoration: none;
          padding: 15px 30px;
          background: #494;
          color: #fff;
        }

        .new-content-row-button:hover {
          background: #fff;
          color: #494;
        }
      }
    }
  }
</style>

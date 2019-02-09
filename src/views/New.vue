<template>
  <div class="new">
    <h1>Create new game</h1>
    <div class="new-content">
      <h3>Map size</h3>
      <div>
        <label for="width-range">Width</label>
        <input id="width-range" type="range" min="8" max="255" step="1" v-model="width">
        <input id="width-number" type="number" v-model="width"/>
      </div>
      <div>
        <label for="height-range">height</label>
        <input id="height-range" type="range" min="8" max="255" step="1" v-model="height">
        <input id="height-number" type="number" v-model="height"/>
      </div>
      <h3>Players limit</h3>
      <div>
        <label for="limit-range">Players limit</label>
        <input id="limit-range" type="range" min="1" max="100" step="1" v-model="limit">
        <input id="limit-number" type="number" v-model="limit"/>
      </div>
      <div>
        <button @click="create">Create</button>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import { CREATE_GAME } from '@/store/actions.type'

export default {
  name: 'new',
  computed: {
  },
  methods: {
    create () {
      store.dispatch(CREATE_GAME, {
        width: this.width,
        height: this.height,
        limit: this.limit
      })
    }
  },
  data () {
    return {
      width: 30,
      height: 30,
      limit: 5
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
    }
  }
</style>

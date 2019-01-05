<template>
  <div>
    <h1>Create new game</h1>
    <h2>Map size</h2>
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
    <h2>Players limit</h2>
    <div>
      <label for="limit-range">Players limit</label>
      <input id="limit-range" type="range" min="1" max="100" step="1" v-model="limit">
      <input id="limit-number" type="number" v-model="limit"/>
    </div>
    <hr/>
    <div>
      <button @click="create">Create</button>
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

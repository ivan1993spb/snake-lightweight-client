<template>
  <div>
    <span>
      <router-link :to="{ name: 'game', params: { id } }">Game {{ id }}</router-link>
    </span>
    <span>
      <b>Map: {{ width }}x{{ height }}</b>
    </span>
    <span>
      <b>Players: {{ count }}/{{ limit }}</b>
    </span>
    <span>rate: {{ rate }}</span>
    <span v-if="count===0" @click="deleteGame">
      <i>delete</i>
    </span>
    <span v-else>
      <s>delete</s>
    </span>
  </div>
</template>

<script>
import { DELETE_GAME } from '@/store/actions.type'

export default {
  name: 'GameItem',
  props: {
    id: {
      type: Number,
      required: true
    },
    width: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    },
    count: {
      type: Number,
      required: true
    },
    limit: {
      type: Number,
      required: true
    },
    rate: {
      type: Number,
      required: true
    }
  },
  methods: {
    deleteGame () {
      this.$store.dispatch(DELETE_GAME, this.id)
    }
  }
}
</script>

<style lang="scss">
span {
  margin: 20px;
}
</style>

<template>
  <div class="game-item">
    <div>
      <router-link :to="{ name: 'game', params: { id } }">{{ name }}</router-link>
    </div>
    <div>
      <b>map: {{ width }}x{{ height }}</b>
    </div>
    <div>
      <b>players: {{ count }}/{{ limit }}</b>
    </div>
    <div>rate: {{ rate }}</div>
    <div class="game-item-delete" v-if="count===0" @click="deleteGame">
      <i>delete</i>
    </div>
    <div class="game-item-delete-disable" v-else>
      <s>delete</s>
    </div>
  </div>
</template>

<script>
import converter from 'number-to-words'
import store from '@/store'
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
  computed: {
    name: function () {
      return 'Game ' + converter.toWords(this.id)
    }
  },
  methods: {
    deleteGame () {
      store.dispatch(DELETE_GAME, this.id)
    }
  }
}
</script>

<style lang="scss">
.game-item {
  div {
    display: inline-block;
    margin: 10px;
  }

  .game-item-delete {
    color: #944;
    cursor: pointer;
    font-weight: bolder;
  }

  .game-item-delete:hover {
    color: #f77;
  }

  .game-item-delete-disable {
    color: #999;
  }
}
</style>

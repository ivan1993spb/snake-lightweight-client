<template>
  <div class="game-container">
    <canvas
      ref="canvas-snakes"
      class="game-canvas game-canvas-snakes"
    />
    <canvas
      ref="canvas-food"
      class="game-canvas game-canvas-food"
    />
    <canvas
      ref="canvas-walls"
      class="game-canvas game-canvas-walls"
    />
    <canvas
      ref="canvas-grid"
      class="game-canvas game-canvas-grid"
    />
  </div>
</template>

<script>
import Game from '@/game'

export default {
  name: 'Playground',

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
    }
  },

  mounted () {
    const id = this.id

    const canvasSnakes = this.$refs['canvas-snakes']
    const canvasFood = this.$refs['canvas-food']
    const canvasWalls = this.$refs['canvas-walls']
    const canvasGrid = this.$refs['canvas-grid']

    const width = this.width
    const height = this.height

    this.game = new Game({
      canvases: {
        canvasSnakes,
        canvasFood,
        canvasWalls,
        canvasGrid
      },
      map: {
        width,
        height
      },
      id
    })

    this.game.start()
  },

  beforeDestroy () {
    this.game.stop()
  }
}
</script>

<style lang="scss">

.game-container {
  .game-canvas {
    position: absolute;

    &-snakes {
      z-index: 1;
    }

    &-food {
      z-index: 2;
    }

    &-walls {
      z-index: 3;
    }

    &-grid {
      z-index: 4;
    }
  }
}

</style>

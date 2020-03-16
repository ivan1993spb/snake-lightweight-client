<template>
  <div class="game-container">
    <canvas
      ref="canvas-game"
      class="game-canvas game-canvas-game"
    />
    <div
      ref="countdown-bar"
      class="countdown-bar countdown-bar-inactive"
    />
    <div
      ref="keep-canvas-height"
      class="game-keep-canvas-height"
    />
  </div>
</template>

<script>

import log from 'loglevel'

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

    const canvasGame = this.$refs['canvas-game']

    const divCanvasHeight = this.$refs['keep-canvas-height']
    const divCountdownBar = this.$refs['countdown-bar']

    const width = this.width
    const height = this.height

    import('@/game')
      .then(module => module.default)
      .then(game => {
        this.game = new game.Core({
          canvases: {
            canvasGame
          },
          divCanvasHeight,
          map: {
            width,
            height
          },
          game: {
            id
          },
          elements: {
            countdown: divCountdownBar,
            notification: null
          }
        })

        this.game.start()
      })
      .catch(error => {
        log.error('game importing error', error)
      })
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

    &-game {
      z-index: 1;
    }
  }

  .game-keep-canvas-height {
    margin-top: 20px;
  }

  .countdown-bar {
    position: absolute;
    z-index: 5;
    background: #040;
    opacity: 0.6;
    cursor: default;
    user-select: none;

    text-align: center;
    vertical-align: middle;
    font-size: 12rem;

    &-active {
      display: block;
    }

    &-inactive {
      display: none;
    }
  }
}

</style>

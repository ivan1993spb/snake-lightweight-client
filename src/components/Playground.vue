<template>
  <div>
    <canvas ref="canvas-snakes" width="200" height="200"></canvas>
    <canvas ref="canvas-food" width="200" height="200"></canvas>
    <canvas ref="canvas-walls" width="200" height="200"></canvas>
  </div>
</template>

<script>
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
    // TODO: Use different canvases for different objects.
    const contextSnakes = this.$refs['canvas-snakes'].getContext('2d', { alpha: false })
    // const contextFood = this.$refs['canvas-food'].getContext('2d', { alpha: false })
    // const contextWalls = this.$refs['canvas-walls'].getContext('2d', { alpha: true })
    console.log(contextSnakes)
    console.log(this.id, this.width, this.height)
  }
}
</script>

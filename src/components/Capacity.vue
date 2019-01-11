<template>
  <div class="capacity">
    <div>Server capacity</div>
    <div>{{ capacity > 1 ? capacity.toFixed(0) : capacity.toFixed(2) }}</div>
    <div>%</div>
  </div>
</template>

<script>
export default {
  name: 'capacity',
  props: {
    capacity: {
      type: Number,
      required: true
    }
  }
}
</script>

<style lang="scss">
.capacity {
  margin: 10px;

  div {
    display: inline-block;
    margin: 2px;
  }
}
</style>

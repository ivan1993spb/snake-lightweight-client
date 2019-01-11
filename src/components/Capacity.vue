<template>
  <div class="capacity">
    <div>Server capacity</div>
    <div>{{ capacityStr }}</div>
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
  },
  computed: {
    capacityStr: function () {
      const capacity = this.capacity * 100
      return capacity.toFixed(capacity > 0 && capacity < 1 ? 2 : 0)
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

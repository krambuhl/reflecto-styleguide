<template>
  <iframe class="demo" :src="src"></iframe>
</template>

<script>
export default {
  name: 'demo',
  computed: {
    src () {
      return `demo.html?type=${this.type}&name=${this.name}&id=${this.id}`
    }
  },
  props: ['type', 'name', 'id']
}
</script>

<style lang="css" scoped>
  .demo {
    border: 1px solid black;
    width: 100%;
    min-height: 300px;
  }
</style>

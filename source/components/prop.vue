<template>
  <code class="prop" v-html="value"></code>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'prop',
  computed: {
    ...mapGetters(['exampleProps']),
    value () {
      return this.exampleProps[this.$props.propKey] || '&mdash;'
    }
  },
  props: ['propKey']
}
</script>

<style>
.prop {
  border: 1px solid #ddd;
  border-radius: 3px;
  display: inline-block;
  padding: 2px 0.5em;
}
</style>

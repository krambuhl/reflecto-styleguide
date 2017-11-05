<template>
  <code class="prop" v-html="value"></code>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'prop',
  props: ['propKey'],
  computed: {
    ...mapGetters(['exampleProps']),
    value () {
      return this.exampleProps[this.$props.propKey] || '&mdash;'
    }
  }
}
</script>

<style scopes>
.prop {
  border: 1px solid #ddd;
  border-radius: 3px;
  color: var(--color-purple);
  display: inline-block;
  overflow: auto;
  padding: 2px 0.5em;
  white-space: nowrap;
  max-width: 180px;
}
</style>

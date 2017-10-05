<template>
  <div class="padding" :class="variantClass"><slot></slot></div>
</template>

<script>
export default {
  name: 'padding',
  computed: {
    variantClass () {
      return `padding--${this.variant}`
    }
  },
  props: {
    variant: { type: String, default: 'medium' }
  }
}
</script>

<style>
.padding--small { padding: 0.5em; }
.padding--medium { padding: 1em; }
.padding--large { padding: 2em; }
</style>

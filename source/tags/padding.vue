<template>
  <div class="padding" :class="variantClass"><slot></slot></div>
</template>

<script>
export default {
  name: 'padding',
  computed: {
    variantClass() {
      return `padding--${variant}`
    }
  },
  props: {
    variant: { type: String, default: 'normal' }
  }
};
</script>

<style>
</style>

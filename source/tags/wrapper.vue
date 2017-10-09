<template>
  <div class="wrapper" :class="variantClass"><slot></slot></div>
</template>

<script>
export default {
  name: 'wrapper',
  computed: {
    variantClass () {
      return `wrapper--${this.variant}`
    }
  },
  props: {
    variant: { type: String, default: 'full' }
  }
}
</script>

<style>
.wrapper--small { max-width: 720px; }
.wrapper--medium { max-width: 1080px; }
.wrapper--large { max-width: 1280px; }
.wrapper--full { max-width: 100%; }
</style>

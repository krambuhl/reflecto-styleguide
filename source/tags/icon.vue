<template>
  <div>
    <IconExpand v-if="name === 'expand'" class="icon" :class="variantClass" />
    <IconCollapse v-if="name === 'collapse'" class="icon" :class="variantClass" />
  </div>
</template>

<script>
import IconExpand from './assets/full-width--expand.svg'
import IconCollapse from './assets/full-width--collapse.svg'

export default {
  name: 'icon',
  components: {
    IconExpand,
    IconCollapse
  },
  computed: {
    variantClass () {
      return `icon--${this.variant} icon--${this.size}`
    }
  },
  props: {
    name: { type: String, required: true },
    variant: { type: String, default: 'block' },
    size: { type: String, default: 'medium' }
  }
}
</script>

<style>
.icon {
}

.icon--block { display: block; }
.icon--inline { display: inline-block; }
.icon--small { height: 0.5em; }
.icon--medium { height: 1em; }
.icon--large { height: 2em; }
</style>

<template>
  <div class="code">{{value}}</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'code',
  computed: {
    ...mapGetters(['exampleProps']),
    value () {
      return this.exampleProps
    }
  },
  props: ['propKey']
}
</script>

<style>
.code {

}
</style>

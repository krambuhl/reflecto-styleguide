<template>
  <page-wrapper>
    <router-view></router-view>
  </page-wrapper>
</template>

<script>
import PageWrapper from '@components/page-wrapper'

export default {
  components: {
    PageWrapper
  },
  mounted () {
    this.updateRoute()
  },
  methods: {
    updateRoute () {
      this.$store.commit('updateRoute', { route: this.$route })
    }
  },
  watch: {
    $route (to, from) {
      this.updateRoute()
    }
  }
}
</script>

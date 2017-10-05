<template>
  <div class="example" v-html="readme">
  </div>
</template>

<script>
import Vue from 'vue'
import Demo from '@components/demo'

const { getExample, getReadme } = global.__ElementArchive__

export default {
  name: 'example',
  computed: {
    example () {
      return getExample(this.type, this.name, this.id)
    },
    exampleProps () {
      return this.example.component.props
    },
    readme () {
      return getReadme(this.type, this.name)
    }
  },
  mounted () {
    this.renderComponents()
  },
  methods: {
    renderComponents () {
      const data = Object.assign({}, {
        type: this.type,
        name: this.name,
        id: this.id
      })

      console.log(Demo, data)

      this.demo = new Vue({
        el: '[data-var="example.demo"]',
        render: (h) => h(Demo, { props: data })
      })
    }
  },
  watch: {
    '$route' (to, from) {
      this.renderComponents()
    }
  },
  props: ['type', 'name', 'id']
}
</script>

<style>
</style>

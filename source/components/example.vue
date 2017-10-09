<template>
  <div class="example" v-html="readme">
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import Code from '@components/code'
import Demo from '@components/demo'
import Prop from '@components/prop'
import Selector from '@components/selector'

export default {
  name: 'example',
  computed: mapGetters(['readme', 'exampleProps']),
  watch: {
    readme () {
      this.destroyComponents()
      this.$nextTick(() => {
        this.renderComponents()
      })
    }
  },
  methods: {
    renderComponents () {
      const shared = {
        router: this.$router,
        store: this.$store
      }

      this.selector = new Vue({
        ...shared,
        el: '[data-var="example.selector"]',
        render: (h) => h(Selector)
      })

      this.demo = new Vue({
        ...shared,
        el: '[data-var="example.demo"]',
        render: (h) => h(Demo)
      })

      this.code = new Vue({
        ...shared,
        el: '[data-var="example.code"]',
        render: (h) => h(Code)
      })

      this.props =
        Array.prototype.slice.call(this.$el.querySelectorAll(`[data-var^="props."]`))
          .reduce((all, el) => {
            const prop = el.getAttribute('data-var').substr('props.'.length)
            all[prop] = new Vue({
              ...shared,
              el: el,
              render: (h) => h(Prop, { props: { propKey: prop } })
            })
            return all
          }, { })
    },
    destroyComponents () {
      if (this.selector) this.selector.$destroy()
      if (this.demo) this.demo.$destroy()
      if (this.code) this.demo.$destroy()
      if (this.props) {
        Object.keys(this.props)
          .forEach((key) => this.props[key].$destroy())
      }
    }
  }
}
</script>

<style>
.example {
  padding-left: 2rem;
  padding-right: 2rem;

  & > * {
    margin-left: auto;
    margin-right: auto;
    max-width: 960px;
  }

  & > p:first-of-type {
    font-size: 1.5em;
    line-height: 1.35em;
  }

  & > * + * {
    margin-top: 1em;
  }
}
</style>

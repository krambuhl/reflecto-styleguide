<template>
  <div class="example">
    <div v-if="isFound" v-html="readme"></div>
    <div v-else class="not-found">Not found</div>
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
  computed: {
    ...mapGetters(['readme']),
    isFound () {
      return this.readme.length > 0
    }
  },
  mounted () {
    this.shared = {
      parent: this,
      router: this.$router,
      store: this.$store
    }

    this.selector = new Vue({
      ...this.shared,
      render: (h) => h(Selector)
    }).$mount()

    this.demo = new Vue({
      ...this.shared,
      render: (h) => h(Demo)
    }).$mount()

    this.code = new Vue({
      ...this.shared,
      render: (h) => h(Code)
    }).$mount()

    this.props = []
  },
  watch: {
    readme () {
      this.$nextTick(() => {
        this.attachComponents()
      })
    }
  },
  methods: {
    createNewPropComponent () {
      this.props.push(new Vue({
        ...this.shared,
        render (h) {
          return h(Prop, { props: { propKey: this.propKey } })
        },
        data: {
          propKey: undefined
        }
      }).$mount())
    },
    attachComponent (selector, vm) {
      const el = document.querySelector(selector)
      if (el) {
        el.appendChild(vm.$el)
      }
    },
    attachComponents () {
      this.attachComponent('[data-var="example-selector"]', this.selector)
      this.attachComponent('[data-var="example.demo"]', this.demo)
      this.attachComponent('[data-var="example.code"]', this.code)

      Array.prototype.slice.call(this.$el.querySelectorAll('[data-var^="props"]'))
        .forEach((el, i) => {
          if (!this.props[i]) {
            this.createNewPropComponent()
          }

          const component = this.props[i]
          const name = el.getAttribute('data-var').substr('props.'.length)

          component.propKey = name
          el.appendChild(component.$el)
        })
    }
  }
}
</script>

<style>
.not-found {
  text-align: center;
  margin: 4em auto;
  font-size: 1.35em;
  font-weight: 700;
}

.example {
  padding-left: var(--padding);
  padding-right: var(--padding);

  & td {
    vertical-align: top;
  }

  & table code {
    color: var(--color-purple);
    font-family: monospace;
    font-size: 1em;
  }

  & > * {
    margin-left: auto;
    margin-right: auto;
    max-width: 960px;
  }

  & [data-var="example.demo"],
  & [data-var="example.code"] {
    max-width: 100%;

    & > * {
      margin-left: auto;
      margin-right: auto;
    }
  }

  & > p:first-of-type {
    font-size: 1.5em;
    line-height: 1.35em;
  }

  & > * + * {
    margin-top: 1em;
  }

  & > .demo + .demo {
    margin-top: 2em;
  }

  & h1,
  & h2,
  & h3,
  & h4,
  & h5,
  & h6 {
    line-height: 1.4em;
    font-weight: 700;
  }

  & h1 { font-size: 2.4em; }
  & h2 { font-size: 2.0em; }
  & h3 { font-size: 1.7em; }
  & h4 { font-size: 1.4em; }
  & h5 { font-size: 1.3em; }
  & h6 { font-size: 1.2em; }
}
</style>

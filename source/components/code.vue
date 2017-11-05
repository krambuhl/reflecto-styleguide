<template>
  <div class="code">
    <ActionList
      label="View:"
      :items="views"
      class="actions"
      @click="change($event)"
    />

    <div class="container">
      <pre v-if="selected === 'html'" v-highlightjs="html"><code class="html"></code></pre>
      <pre v-if="selected === 'json'" v-highlightjs="json"><code class="json"></code></pre>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Beautify from 'js-beautify'
import ActionList from '@components/action-list'

export default {
  name: 'code',
  components: {
    ActionList
  },
  data () {
    return {
      selected: 'html',
      views: [
        { value: 'html', text: 'HTML', isActive: true },
        { value: 'json', text: 'JSON' }
        // { value: 'hyperx', text: 'HyperX' }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'example',
      'exampleProps'
    ]),
    json () {
      return JSON.stringify(this.exampleProps, null, 4)
    },
    rawHtml () {
      if (this.example) {
        return this.example.component.outerHTML
      }
      return ''
    },
    html () {
      return Beautify.html(this.rawHtml, {
        'wrap_line_length': 119
      })
    }
  },
  methods: {
    change (ev) {
      this.selected = ev.target.value
      this.views = this.views.map((view, i) => {
        return Object.assign({}, view, {
          isActive: view.value === this.selected
        })
      })
    }
  }
}
</script>

<style scoped>
.code {
  background-color: var(--color-purple);
  border-radius: 5px;
  margin-top: 2.5em;
  max-width: 1280px;
}

.container {
  background-color: var(--color-darkPurple);
  color: white;
  border-radius: 5px;

  & .hljs {
    padding: 2em;
    display: block;
    overflow-x: auto;
  }

  & .hljs.html {
    & :global(.hljs-tag) {
      color: white;
    }

    & :global(.hljs-name) {
      color: var(--color-pink);
    }

    & :global(.hljs-attr) {
      color: var(--color-green);
    }

    & :global(.hljs-string) {
      color: var(--color-yellow);
    }

    & :global(.hljs-literal) {
      color: var(--color-lightPurple);
    }
  }

  & .hljs.json {
    & :global(.hljs-attr) {
      color: var(--color-blue);
    }

    & :global(.hljs-string) {
      color: var(--color-yellow);
    }

    & :global(.hljs-literal) {
      color: var(--color-lightPurple);
    }
  }

}
</style>

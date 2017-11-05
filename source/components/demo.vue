<template>
  <div
    class="demo"
    :class="{
      'is-fullwidth': this.isFullWidth,
      'is-wide': this.isWide
    }"
    :style="{ maxWidth: this.isWide ? this.width : '1280px' }"
  >
    <ActionList
      label="max-width:"
      class="sizes"
      :items="sizes"
      @click="updateWidth($event)"
    />

    <div
      class="container"
      :style="{ maxWidth: this.width }"
    >
      <iframe
        ref="iframe"
        class="iframe"
        src="demo.html"
        :height="height"
      ></iframe>

      <resize-observer @notify="updateHeight" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Icon from '@tags/icon'
import ActionList from '@components/action-list'

export default {
  name: 'demo',
  components: {
    Icon,
    ActionList
  },
  data () {
    return {
      renderDemo () {},
      width: '1280px',
      isWide: false,
      height: 100,
      sizes: [
        { width: 320, text: '320px' },
        { width: 640, text: '640px' },
        { width: 960, text: '960px' },
        { width: 1280, text: '1280px', isActive: true },
        { width: 'none', text: 'Full Width' }
      ]
    }
  },
  computed: {
    ...mapState({
      type: state => state.query.type,
      name: state => state.query.name,
      id: state => state.query.id
    }),
    isFullWidth () {
      return this.width === 'none'
    }
  },
  methods: {
    onLoad () {
      this.renderDemo = this.$refs.iframe.contentWindow.render
      this.updateDemo()
    },
    updateWidth (ev) {
      const { width } = ev.target

      this.sizes = this.sizes.map((size, i) => {
        return Object.assign({}, size, {
          isActive: size.width === width
        })
      })

      this.width = width === 'none' ? width : `${width}px`
      this.isWide = width === 'none' || width >= 1281
      this.$nextTick(() => this.updateHeight())
    },
    updateHeight () {
      if (this.$refs.iframe.contentWindow) {
        this.height = this.$refs.iframe.contentWindow.document.body.scrollHeight
      }
    },
    updateDemo () {
      this.renderDemo({
        type: this.type,
        name: this.name,
        id: this.id
      })

      this.$nextTick(() => {
        this.updateHeight()
      })
    }
  },
  watch: {
    id () {
      this.updateDemo()
    }
  },
  mounted () {
    const self = this
    this.$refs.iframe.onload = () => {
      self.onLoad()
    }
  }
}
</script>

<style scoped>
  .demo {
    border-radius: 5px;
    background-color: var(--color-medium-dark);
    max-width: 1280px;

    & > * {
      max-width: 1280px;
    }

    &.is-fullwidth {
      margin-left: -2em;
      margin-right: -2em;
      border-radius: 0;
    }

    &.is-wide {
      & .sizes {
        margin-left: auto;
        margin-right: auto;
      }
    }
  }

  .container {
    position: relative;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.2) 0 0 0.1em;
    /* margin-left: auto;
    margin-right: auto; */

    &.is-fullwidth {
      margin-left: -2em;
      margin-right: -2em;
    }
  }

  .iframe {
    display: block;
    min-height: 200px;
    width: 100%;
  }
</style>

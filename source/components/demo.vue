<template>
  <div class="demo" :class="{ 'is-fullwidth': this.isFullWidth }"  :style="{ maxWidth: this.width }">
    <ul class="demo__sizes">
      <li><a @click="updateWidth(320)">Mobile / 400px</a></li>
      <li><a @click="updateWidth(640)">Tablet / 768px</a></li>
      <li><a @click="updateWidth(960)">Small Desktop / 960px</a></li>
      <li><a @click="updateWidth('none')">Full Width</a></li>
    </ul>

    <iframe ref="iframe" class="demo__iframe" src="demo.html" :height="height"></iframe>
    <resize-observer @notify="updateHeight" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'demo',
  data () {
    return {
      width: '960px',
      height: 100
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
    updateWidth (size) {
      this.width = typeof size === 'number' ? `${size}px` : size
    },
    updateHeight () {
      this.height = this.$refs.iframe.contentWindow.document.body.scrollHeight
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

<style>
  .demo {
    position: relative;
    padding-left: 0;
    padding-right: 0;

    &.is-fullwidth {
      max-width: none;
      margin-left: -2em;
      margin-right: -2em;
    }
  }

  .demo__sizes {
    font-size: 0.6em;
    text-transform: uppercase;

    & > li {
      display: inline-block;
    }
  }

  .demo__iframe {
    outline: #ddd solid 1px;
    margin: 2em auto;
    width: 100%;
    max-width: 100%;
  }
</style>

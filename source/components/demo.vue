<template>
  <div class="demo">
    <ul class="demo__sizes">
      <li><button @click="updateWidth(320)">Mobile / 400px</button></li>
      <li><button @click="updateWidth(640)">Tablet / 768px</button></li>
      <li><button @click="updateWidth(960)">Small Desktop / 960px</button></li>
      <li><button @click="updateWidth(1280)">Medium Desktop / 1280px</button></li>
      <li><button @click="updateWidth('none')">
        <Icon name="expand" />
      </button></li>
    </ul>

    <div
      class="demo__container"
      :class="{ 'is-fullwidth': this.isFullWidth }"
      :style="{ maxWidth: this.width }"
    >
      <iframe
        ref="iframe"
        class="demo__iframe"
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
export default {
  name: 'demo',
  components: {
    Icon
  },
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
      this.$nextTick(() => this.updateHeight())
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
    max-width: none;

    & > * {
      margin-left: auto;
      margin-right: auto;
      max-width: 960px;
    }
  }

  .demo__container {
    position: relative;

    &.is-fullwidth {
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
    margin: 2em auto;
    max-width: 100%;
    min-height: 200px;
    outline: #ddd solid 1px;
    width: 100%;
  }
</style>

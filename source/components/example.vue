<template>
  <div class="example" v-html="readme">
  </div>
</template>

<script>
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
    rawReadme () {
      return getReadme(this.type, this.name)
    },
    readmeKeys () {
      return this.rawReadme.match(/{{\s*[\w.]+\s*}}/g).map((x) => x.match(/[\w.]+/)[0])
    },
    readme () {
      const parts = this.rawReadme.split(/{{\s*[\w.]+\s*}}/g)

      return parts.reduce((sum, part, i) => {
        const key = this.readmeKeys[i]
        sum += part

        if (key) {
          const match = key.match(/props\./)
          if (match) {
            const prop = this.exampleProps[key.substr(match[0].length)] || ''
            sum += `<div data-var="${key}">${prop}</div>`
          } else if (key === 'example.demo') {
            sum += `<iframe class="example-demo" src="demo.html?type=${this.type}&name=${this.name}&id=${this.id}"></iframe>`
          } else {
            sum += `<div data-var="${key}">${key}</div>`
          }
        }
        return sum
      }, '')
    }
  },
  methods: {
    renderProps () {
      // const props = Object.keys(this.props)
      console.log(this.readmeKeys.filter((key) => key.match(/props\./)))
    }
  },
  mounted () {
    this.renderProps()
  },
  watch: {
    '$route' (to, from) {
      this.renderProps()
    }
  },
  props: ['type', 'name', 'id']
}
</script>

<style>
  .example-demo {
    border: 1px solid black;
    width: 100%;
    min-height: 300px;
  }
</style>

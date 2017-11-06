<template>
  <div class="selector">
    <select type="text" class="input" v-model="selectedId" @change="onSelectChange">
      <option
        v-for="(example, key) in items"
        :key="example.id"
        :value="example.id"
      >
        {{example.title}}
      </option>
    </select>
    <span class="icon"></span>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'demo',
  data () {
    return {
      selectedId: this.exampleId
    }
  },
  mounted () {
    if (this.selectedId === undefined) {
      this.selectedId = this.exampleId
    }
  },
  computed: {
    ...mapState(['query']),
    ...mapGetters(['examples', 'exampleId']),
    items () {
      return Object.keys(this.examples).map((key, i) => {
        const example = this.examples[key]
        const id = key.substr(key.lastIndexOf('/') + 1)

        return Object.assign({}, example, { id })
      })
    }
  },
  watch: {
    exampleId () {
      this.selectedId = this.exampleId
    }
  },
  methods: {
    onSelectChange () {
      this.$router.push({
        name: 'example',
        params: this.$route.params,
        query: Object.assign({ }, this.query, { id: this.selectedId })
      })
    }
  }
}
</script>

<style scopes>
  .selector {
    margin-bottom: 2em;
    position: relative;
  }

  .input {
    appearance: none;
    border: 1px solid #ddd;
    background-color: #fff;
    font-size: 1em;
    padding: 1em;
    width: 100%;

    &:hover {
      border-color: #999;
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0px 1px var(--color-purple);
      border-color: var(--color-purple);
    }
  }

  .icon {
    display: inline-block;
    position: absolute;
    right: 1.75em;
    top: 50%;

    &::before,
    &::after {
      content: "\0020";
      position: absolute;
      width: 10px;
      height: 2px;
      background-color: black;
    }

    &::before {
      transform: rotate(45deg);
      left: -6px;
    }

    &::after {
      transform: rotate(-45deg);
    }
  }
</style>

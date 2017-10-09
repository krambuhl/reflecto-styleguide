<template>
  <div class="selector">
    <select type="text" class="selector__input" @change="onChange" v-model="selected">
      <option
        v-for="(example, key) in examples"
        :key="key"
        :value="key"
      >
        {{example.title}}
      </option>
    </select>
    <span class="selector__icon"></span>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'demo',
  computed: {
    ...mapState(['query']),
    ...mapGetters(['example', 'examples'])
  },
  created () {
    this.selected =
      Object.keys(this.examples)
        .find((key) => key.indexOf(`/${this.query.id}`) >= 0)
  },
  methods: {
    onChange (ev) {
      this.selected = ev.target.value
      this.id = this.selected.substr(this.selected.lastIndexOf('/') + 1)
      this.$router.replace({
        name: 'example',
        params: this.$route.params,
        query: Object.assign({ }, this.query, { id: this.id })
      })
    }
  }
}
</script>

<style>
  .selector {
    margin-bottom: 2em;
    position: relative;
  }

  .selector__input {
    appearance: none;
    border: 1px solid #ddd;
    background-color: #fff;
    font-size: 1em;
    padding: 1em;
    width: 100%;

    &:focus {
      border-color: purple;
    }
  }

  .selector__icon {
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

<template>
  <ul class="action-list">
    <li v-if="label">
      <span class="label">{{label}}</span>
    </li>
    <li v-for="item in items">
      <button
        class="option"
        :class="{ 'is-active': item.isActive }"
        @click="action(item)"
      >
        {{item.text}}
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'action-list',
  props: {
    label: {
      type: String
    },
    items: {
      type: Array,
      required: true
    }
  },
  methods: {
    action (target) {
      this.$emit('click', { target })
    }
  }
}
</script>

<style scoped>
  .action-list {
    align-items: center;
    color: white;
    display: flex;
    width: 100%;
    padding: 1em;
    text-transform: uppercase;
  }

  .label {
    letter-spacing: 0.05em;
    padding: 0 0.75em;
    font-size: 0.75rem;
  }

  .option {
    display: inline-block;
    appearance: none;
    border: none;
    border-radius: 0;
    border-bottom: 2px solid transparent;
    background-color: transparent;
    color: white;
    font-size: 1rem;
    line-height: 1.2em;
    padding: 0.35em 0.75em;
    cursor: pointer;

    &:focus {
      position: relative;
      z-index: 2;
    }

    &:hover,
    &:focus {
      border-bottom-color: rgba(255, 255, 255, 0.5);
    }

    &.is-active,
    &:active {
      border-bottom-color: rgba(255, 255, 255, 1);
    }
  }

  .button {
    background-color: transparent;
    border: 1px solid transparent;
    border-radius: 4px;
    padding: 0.8em 1.2em;
    cursor: pointer;

    & .icon {
      height: 0.8em;
      fill: white;
    }

    &:hover,
    &:focus {
      border-color: rgba(255, 255, 255, 0.5);
    }

    &.is-active,
    &:active {
      border-color: rgba(255, 255, 255, 1);
    }
  }

</style>

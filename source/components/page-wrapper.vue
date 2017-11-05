<template>
  <div id="app" class="page-wrapper">
    <mast-head class="page-wrapper_mast"></mast-head>
    <div id="content" class="page-wrapper__content">
      <transition name="fade">
        <slot></slot>
      </transition>
    </div>
  </div>
</template>

<style>
  .page-wrapper {
    min-height: 100vh;
    min-width: 600px;
  }

  .page-wrapper__content {
    margin-top: var(--padding);
    margin-bottom: var(--padding);
  }

  .fade-enter-active {
    transition: transform 0.3s ease, opacity 0.3s ease;
  }

  .fade-leave-active {
    display: none;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
    transform: translate3d(0, 1.5em, 0);
  }
</style>

<script>
  import MastHead from '@components/mast-head'

  export default {
    components: {
      MastHead
    }
  }
</script>

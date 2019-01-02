<template>
  <div class="c-button">
    <button class="c-primary-button">
      <slot>Button</slot>
    </button>
  </div>
</template>

<script>
export default {
  name: 'PrimaryButton'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import './src/style/components/components.primary-button';
</style>

<template>
  <div class="o-container-center">
      <div class="splash-container-img">
          <img src="@/assets/Weather-logo.png" alt="Logo" class="splash-img">
      </div>
      <div class="splash-container-buttons">
          <primary-button>Sign in</primary-button>
          <primary-button>Sign up</primary-button>
      </div>
  </div>
</template>

<script>
 import PrimaryButton from '@/components/forms/PrimaryButton';


  export default {
    name: 'splash',
    components: {
      PrimaryButton
    }
    
  }
</script>

<style lang="scss">
  @import './src/style/base';
  @import './src/style/components/components.container';
  @import './src/style/components/components.splash';
</style>
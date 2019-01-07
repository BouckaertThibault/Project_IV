<template>
  <div class="o-container-center">
      <div class="splash-container-img">
          <img src="@/assets/Weather-logo.png" alt="Logo" class="splash-img">
      </div>
      <div class="splash-container-buttons">
          <primary-button @click.native="onSignin">Sign in</primary-button>
          <primary-button @click.native="onSignup" class="splash-button-signup" >Sign up</primary-button>
      </div>
  </div>
</template>

<script>
 import PrimaryButton from '@/components/forms/PrimaryButton';


  export default {
    name: 'splash',
    components: {
      PrimaryButton
    },
    methods:{
      onSignin: function() {
        this.$router.push('/signin'); 
        console.log("button pushed");
      },
      onSignup: function() {
        this.$router.push('/signup'); 
        console.log("button pushed");
      }
    }
    
  }
</script>

<style lang="scss">
  @import './src/style/base';
  @import './src/style/components/components.container';
  @import './src/style/components/components.splash';
</style>
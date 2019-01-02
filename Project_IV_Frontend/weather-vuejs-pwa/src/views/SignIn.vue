<template>
  <div class="o-container-center">
     <h1>Sign in</h1>
     <form>
      <label>Email</label>
      <input>
      <label>Password</label>
      <input>
      <primary-button>Sign in</primary-button>
      <div>
        <label>I do not have an account</label>
        <label>I forgot password</label>
      </div>
     </form>

  </div>
</template>

<script>
 import PrimaryButton from '@/components/forms/PrimaryButton';


  export default {
    name: 'signin',
    components: {
      PrimaryButton
    }
    
  }
</script>

<style lang="scss">
  @import './src/style/base';
  @import './src/style/components/components.container';
  @import './src/style/components/components.signin';
</style>
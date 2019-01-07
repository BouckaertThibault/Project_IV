<template>
  <div class="o-container-start">
      <form @submit.prevent="login" class="c-form">
          <h1>Sign in</h1>
          <label class="c-form-label">Username</label>
          <input v-model="username" class="c-form-input" type="text" placeholder="Username" required autofocus>
          <label class="c-form-label">Password</label>
          <input v-model="password" class="c-form-input" type="password" placeholder="Password" required> 
          <span class="c-error" v-bind:class="{ active: isActive }">Something went wrong...</span>
          <primary-button class="signin-container-buttons" type="submit">Sign in</primary-button>
          <router-link to="register"><span class="c-span-swap">I do not have an account</span></router-link>
      </form>
  </div>
</template>

<script>
 import PrimaryButton from '@/components/forms/PrimaryButton';


  export default {
    name: 'signin',
    data(){
      return {
        isActive: false,
        username : "",
        password : ""
      }
    },
    methods: {
      login: function () {
        let username = this.username 
        let password = this.password
        this.$store.dispatch('login', { username, password })
       .then(() => {this.$router.push('/weathercards'); this.isActive=false;})
       .catch(err => {console.log(err); this.isActive=true;})
      }
    },
    components: {
      PrimaryButton
    }
    
  }
</script>

<style scoped lang="scss">
  @import './src/style/components/components.container';
  @import './src/style/components/components.signin';
  @import './src/style/elements/elements.forms';
</style>
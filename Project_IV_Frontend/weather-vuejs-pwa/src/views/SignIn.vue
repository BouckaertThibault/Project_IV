<template>
  <div class="o-container-center">
    <div @click="goBack" class="c-arrow">
          <img src="@/assets/Arrow-back.svg" alt="back">
    </div>
      <form @submit.prevent="login" class="c-form">
          <h1>Sign in</h1>
          <label class="c-form-label">Username</label>
          <input v-model="username" class="c-form-input" type="text" placeholder="Username" required autofocus>
          <label class="c-form-label">Password</label>
          <input v-model="password" class="c-form-input" type="password" placeholder="Password" required> 
          <primary-button class="signin-container-buttons" type="submit">Sign in</primary-button>
          <router-link to="signup" class="c-swap"><span>I do not have an account</span></router-link>
          <div v-if="loading" class="loader"></div>
      </form>
  </div>
</template>

<script>
 import PrimaryButton from '@/components/forms/PrimaryButton';

  export default {
    name: 'signin',
    data(){
      return {
        loading: false,
        username : "",
        password : ""
      }
    },
    methods: {
      login: function () {
        this.loading = true;
        let username = this.username 
        let password = this.password
        this.$store.dispatch('login', { username, password })
       .then(() => {this.loading=false; this.$router.push('/weathercards'); })
       .catch(err => {this.loading=false; console.log(err); })
      },
      goBack(){
        this.$router.go(-1);
      },
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
  @import './src/style/components/components.arrow';
</style>
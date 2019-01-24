<template>
  <div class="o-container-center">
    <div @click="goBack" class="c-arrow">
          <img src="@/assets/Arrow-back.svg" alt="back">
    </div>
      <form @submit.prevent="register" class="c-form">
          <h1>Sign Up</h1>
          <label class="c-form-label">Username</label>
          <input v-model="username" class="c-form-input" type="text" placeholder="Username" required autofocus>
          <label class="c-form-label">Email</label>
          <input v-model="email" class="c-form-input" type="email" placeholder="Email" required>
          <label class="c-form-label">Password</label>
          <input v-model="password" class="c-form-input" type="password" placeholder="Password" required>
          <label class="c-form-label">Confirm password</label>
          <input v-model="password_confirmation" class="c-form-input" type="password" placeholder="Password confirmation" required>
          <primary-button class="signup-container-buttons" type="submit">Next step</primary-button>
          <router-link to="signin" class="c-swap"><span>I already have an account</span></router-link>
          <div v-if="loading" class="loader"></div>
      </form>
  </div>
</template>

<script>
 import PrimaryButton from '@/components/forms/PrimaryButton';


  export default {
    name: 'signup',
    data(){
      return {
        username : "",
        email : "",
        password : "",
        password_confirmation : "",
        loading: false
      }
    },
    methods: {
      goBack(){
        this.$router.go(-1);
      },
        register: function () {
          this.loading = true;
          let data = {
            username: this.username,
            email: this.email,
            password: this.password
          }
          this.$store.dispatch('register', data)
        .then(() => {this.loading = false; this.$router.push('/signin');})
        .catch(err => {this.loading = false; console.log(err);})
        }
  },
    components: {
      PrimaryButton
    }
    
  }
</script>

<style scoped lang="scss">
  @import './src/style/components/components.container';
  @import './src/style/components/components.signup';
  @import './src/style/elements/elements.forms';
  @import './src/style/components/components.arrow';
</style>
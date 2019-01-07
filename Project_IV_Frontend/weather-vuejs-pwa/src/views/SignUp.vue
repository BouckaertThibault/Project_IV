<template>
  <div class="o-container-start">
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
          <span class="c-error" v-bind:class="{ active: isActive }">Something went wrong...</span>
          <primary-button class="signup-container-buttons" type="submit">Next step</primary-button>
          <router-link to="login"><span class="c-span-swap">I already have an account</span></router-link>
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
        isActive: false
      }
    },
    methods: {
        register: function () {
          let data = {
            username: this.username,
            email: this.email,
            password: this.password
          }
          this.$store.dispatch('register', data)
        .then(() => {this.$router.push('/signin'); this.isActive=false;})
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
  @import './src/style/components/components.signup';
  @import './src/style/elements/elements.forms';
</style>
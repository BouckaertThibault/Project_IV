<template>
  <div class="o-container">
    <primary-button @click.native="logout" class="c-edit-button c-edit-button-delete">Logout</primary-button>
    <div class="c-footer">
      <img src="@/assets/House-icon.png" alt="Logo" @click="goToHome" class="c-footer__profile">
      <img src="@/assets/Account-activated-icon.png" alt="Logo" class="c-footer__home">
    </div>
  </div>
</template>

<script>
  import PrimaryButton from "@/components/forms/PrimaryButton";


  export default {
    name: 'account',
    components: {
      PrimaryButton
    },
    methods: {
      goToHome(){
        this.$router.push('/Weathercards')
      },
      logout(){
        if (confirm("Are you sure you want to log out?")) { 
          this.$store.dispatch('logout')
          this.$router.push('/')
        }
        else{
          console.log("user not logged out")
        }
      }
    }

  }
</script>

<style scoped lang="scss">
  @import './src/style/base';
  @import './src/style/components/components.container';
  @import './src/style/components/components.footer';
</style>
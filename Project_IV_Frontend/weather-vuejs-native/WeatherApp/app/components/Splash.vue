<template>
    <Page actionBarHidden="true">
        <ActionBar title="My App"/>
        <GridLayout rows="*, 150" columns="*" backgroundColor="white" >
            <Image src="~/assets/images/Weather-logo.png" width="55%" row="0" col="0" class="splash-img"></Image>
  
            <StackLayout row="1" col="0">
            <Button class="btn btn-primary btn-rounded-lg c-primary-button c-button-spacer" text="Sign in"  width="90%" height="50" @tap="SignIn()"></Button>
            <Button class="btn btn-primary btn-rounded-lg c-primary-button splash-signup " text="Sign up"  width="90%" height="50" @tap="SignUp()"></Button>
            </StackLayout>
        </GridLayout>
    </Page>
</template>

<script>
import SignIn from '@/components/SignIn';
import SignUp from '@/components/SignUp';

  export default {
    name: 'Splash',
    
    methods: {
    SignIn: function() {
     this.$navigateTo(SignIn)
    },
    SignUp: function() {
     this.$navigateTo(SignUp)
    },
  //   created: function () {
  //   this.$http.interceptors.response.use(undefined, function (err) {
  //     return new Promise(function (resolve, reject) {
  //       if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
  //         this.$store.dispatch(logout)
  //       }
  //       throw err;
  //     });
  //   });
  // },
  }
}
</script>

<style scoped lang="scss">
//   @import './app/style/base';
  @import './app/style/components/components.primary-button';
  @import './app/style/components/components.splash';
</style>



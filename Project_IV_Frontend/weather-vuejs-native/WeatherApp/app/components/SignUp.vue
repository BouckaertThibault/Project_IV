<template>
    <Page actionBarHidden="true">
        <ActionBar title="My App"/>
        <FlexboxLayout class="page" alignItems="center">
            <StackLayout class="form">
                <label text="Sign up" class="label-title"/>
                <StackLayout class="input-field">
                    <Label text="Username" class="label"/>
                    <TextField v-model="username" hint="Username" class="inputfield"></TextField>
                </StackLayout>

                <StackLayout class="input-field">
                    <Label text="Email" class="label"/>
                    <TextField v-model="email" hint="Email" class="inputfield"></TextField>
                </StackLayout>

                <StackLayout class="input-field">
                    <Label text="Password" class="label"/>
                    <TextField v-model="password" hint="Password" secure="true" class="inputfield"></TextField>
                </StackLayout>

                <StackLayout class="input-field">
                    <Label text="Confirm password" class="label"/>
                    <TextField v-model="password_confirmation" hint="Password" secure="true" class="inputfield"></TextField>
                </StackLayout>

                <Button text="Sign up" class="btn btn-primary btn-rounded-lg c-primary-button"  height="50" @tap="register()"></Button>
                <Label text="I already have an account" class="label-link" textAlignment="center" @tap="SignIn()"></Label>
            </StackLayout>
        </FlexboxLayout>
    </Page>
</template>

<script>
import SignIn from '@/components/SignIn';

  export default {
    name: 'Signup',
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
        .then(() => {this.$navigateTo(SignIn); this.isActive=false;})
        .catch(err => {console.log(err); this.isActive=true;})
        },
        SignIn: function() {
            this.$navigateTo(SignIn)
        },
  }
  }
</script>

<style scoped lang="scss">
//   @import './app/style/base';
  @import './app/style/components/components.signin';
  @import './app/style/components/components.primary-button';
  @import './app/style/elements/elements.inputfield';
  @import './app/style/elements/elements.labels';
  @import './app/style/elements/elements.page';
</style>
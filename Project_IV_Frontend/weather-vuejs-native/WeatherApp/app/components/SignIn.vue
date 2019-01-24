<template>
    <Page actionBarHidden="true">
        <ActionBar title="My App"/>
        <FlexboxLayout class="page" alignItems="center" justifyContent="center">
            <Image @tap="goBack" alignSelf="flex-start" class="arrow-back" src="~/assets/images/Arrow-back.png" width="24" height="40"></Image>
            <StackLayout class="form" > 
                <label text="Sign in" class="label-title"/>
                <StackLayout class="input-field">
                    <Label text="Username" class="label"/>
                    <TextField v-model="username" hint="Username" class="inputfield"></TextField>
                </StackLayout>

                <StackLayout class="input-field">
                    <Label text="Password" class="label"/>
                    <TextField v-model="password" hint="Password" secure="true" class="inputfield"></TextField>
                </StackLayout>

                <FlexboxLayout alignItems="center" flexDirection="column" >
                    <Button text="Sign in" class="btn btn-primary btn-rounded-lg c-primary-button" width="100%" height="50" @tap="login()"></Button>
                    <Label text="I do not have an account" class="label-link" @tap="SignUp()"></Label>
                </FlexboxLayout>
                <ActivityIndicator :busy="loading" height="70" width="70" marginTop="30"/>
            </StackLayout>
        </FlexboxLayout>
    </Page>
</template>

<script>
import Weathercards from '@/components/Weathercards';
import Addlocation from '@/components/AddLocation';
import SignUp from '@/components/SignUp';

  export default {
    name: 'Signin',
    data(){
      return {
        username : "",
        password : "",
        loading: false,
      }
    },
    methods: {
      goBack(){
          this.$navigateBack()
      },
      login: function () {
          if(this.username == "" || this.password == ""){
             alert({title: "Error",
                    message: "Username or password can't be empty",
                    okButtonText: "OK"
                })
        }
        else{
            this.loading = true;
            let username = this.username 
            let password = this.password
            this.$store.dispatch('login', { username, password })
        .then(() => {this.loading = false; this.$navigateTo(Weathercards); })
        .catch(err => {
            console.log("ERROR HIERZO: " + err); 
            this.loading = false; 
            })
        }
        
      },
       SignUp: function() {
            this.$navigateTo(SignUp)
        },
    },
    
  }
</script>

<style scoped lang="scss">
//   @import './app/style/base';
  @import './app/style/components/components.signin';
  @import './app/style/components/components.primary-button';
  @import './app/style/components/components.arrowback';
  @import './app/style/elements/elements.inputfield';
  @import './app/style/elements/elements.labels';
  @import './app/style/elements/elements.page';
</style>
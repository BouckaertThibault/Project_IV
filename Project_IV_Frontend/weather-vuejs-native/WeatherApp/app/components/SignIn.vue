<template>
    <Page actionBarHidden="true">
        <ActionBar title="My App"/>
        <FlexboxLayout class="page" alignItems="center">
            <StackLayout class="form">
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
                    <Button text="Sign in" class="btn btn-primary btn-rounded-lg c-primary-button" width="100%" @tap="login()"></Button>
                    <Label text="I do not have an account" class="label"></Label>
                </FlexboxLayout>
            </StackLayout>
        </FlexboxLayout>
    </Page>
</template>

<script>
import Weathercards from '@/components/Weathercards';
import Addlocation from '@/components/AddLocation';

  export default {
    name: 'Signin',
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
       .then(() => {this.$navigateTo(Addlocation); this.isActive=false;})
       .catch(err => {console.log(err); this.isActive=true;})
      }
    },
    
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
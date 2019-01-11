<template>
    <Page actionBarHidden="true">
        <ActionBar title="My App"/>
        <FlexboxLayout class="page" alignItems="center">
            <StackLayout class="form">
                <label text="Sign up" class="label-title"/>
                <StackLayout class="input-field">
                    <Label text="Username" class="label"/>
                    <TextField hint="Username" class="inputfield"></TextField>
                </StackLayout>

                <StackLayout class="input-field">
                    <Label text="Email" class="label"/>
                    <TextField hint="Email" class="inputfield"></TextField>
                </StackLayout>

                <StackLayout class="input-field">
                    <Label text="Password" class="label"/>
                    <TextField hint="Password" secure="true" class="inputfield"></TextField>
                </StackLayout>

                <StackLayout class="input-field">
                    <Label text="Confirm password" class="label"/>
                    <TextField hint="Password" secure="true" class="inputfield"></TextField>
                </StackLayout>

                <Button text="Sign up" class="btn btn-primary btn-rounded-lg c-primary-button"  height="50"></Button>
            </StackLayout>
        </FlexboxLayout>
    </Page>
</template>

<script>
  export default {
    name: 'Signup',
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
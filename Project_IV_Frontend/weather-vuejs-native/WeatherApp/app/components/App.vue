<template>
    <Page actionBarHidden="true">
        <ActionBar title="My App"/>
        <GridLayout rows="*, 50, 50" columns="*" backgroundColor="white" >
            <Image src="~/assets/images/Weather-logo.png" width="55%" row="0" col="0" rowSpan="2" class="splash-img"></Image>

            <Button class="btn btn-primary btn-rounded-lg splash-buttons" text="Sign in" row="1" col="0" width="90%" height="40"></Button>
            <Button class="btn btn-primary btn-rounded-lg splash-buttons splash-signup" text="Sign up"  row="2" col="0" width="90%" height="40" ></Button>

        </GridLayout>
    </Page>
</template>

<script>
  
</script>

<style scoped lang="scss">
//   @import './app/style/base';
  @import './app/style/components/components.splash';
</style>



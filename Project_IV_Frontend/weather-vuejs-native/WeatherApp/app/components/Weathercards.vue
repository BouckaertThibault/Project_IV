<template>
    <Page actionBarHidden="true">
        <ActionBar title="My App"/>
        <FlexboxLayout class="page" alignItems="center">
            <Image src="~/assets/images/Weather-logo.png" width="55%" row="0" col="0" class="splash-img"></Image>
        </FlexboxLayout>
    </Page>
</template>

<script>
  

  export default {
    name: 'Weathercards',
   
  }
</script>

<style scoped lang="scss">

  @import './app/style/components/components.primary-button';
  @import './app/style/elements/elements.inputfield';
  @import './app/style/elements/elements.labels';
  @import './app/style/elements/elements.page';
</style>
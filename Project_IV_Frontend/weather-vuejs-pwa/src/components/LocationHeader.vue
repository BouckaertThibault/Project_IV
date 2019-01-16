<template>
      <div class="c-header">
          <div class="c-header__locations">
              <h3>My Objects</h3> 
              <p>3 working</p>
          </div>
          <primary-button class="c-primary-button--weathercards"/>
      </div>
</template>

<script>
import PrimaryButton from "@/components/forms/PrimaryButton";

export default {
  name: 'LocationHeader',
  components:{
    PrimaryButton
  }
}
</script>

<style lang="scss">
  @import './src/style/components/components.header';
</style>

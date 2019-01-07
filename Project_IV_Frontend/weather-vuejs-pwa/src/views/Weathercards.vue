<template>
  <div class="o-container">
    <location-header></location-header>
    <draggable v-model='savedLocation'>
      <weather-card v-for="l in getLocations" :key="l" :woeid="l"/>
    </draggable>
    <app-footer></app-footer>
  </div>
</template>

<script>
  import LocationHeader from "@/components/LocationHeader";
  import WeatherCard from "@/components/WeatherCard"
  import AppFooter from "@/components/AppFooter";
  import draggable from 'vuedraggable'


  export default {
    name: 'weathercards',
    components: {
      LocationHeader,
      WeatherCard,
      AppFooter,
      draggable
    },
    computed:{
      getLocations: function() {
        return this.$store.getters.getAllLocations;
      },
      savedLocation: {
        get() {
            return this.$store.getters.getAllLocations
        },
        set(value) {
            this.$store.dispatch('updateSavedLocations', value)
        }
    }
    },

  }
</script>

<style scoped lang="scss">
  @import './src/style/base';
  @import './src/style/components/components.container';
</style>
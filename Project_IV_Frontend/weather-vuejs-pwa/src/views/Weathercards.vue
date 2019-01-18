<template>
  <div class="o-container">
    <div class="c-header">
          <div class="c-header__locations">
              <h3>My Objects</h3> 
              <p>3 working</p>
          </div>
          <router-link to="addlocation"><primary-button class="c-primary-button--weathercards">New object</primary-button></router-link>
      </div>
    <draggable v-model='savedLocation'>
      <weather-card  @click.native="editCard(l.name)" v-for="l in getLocations" :key="l.id" :woeid="l" />
    </draggable>
    <app-footer></app-footer>
  </div>
</template>

<script>
  // import LocationHeader from "@/components/LocationHeader";
  import WeatherCard from "@/components/WeatherCard"
  import AppFooter from "@/components/AppFooter";
  import draggable from 'vuedraggable'
  import PrimaryButton from "@/components/forms/PrimaryButton";


  export default {
    name: 'weathercards',
    components: {
      // LocationHeader,
      WeatherCard,
      AppFooter,
      draggable,
      PrimaryButton
    },
    methods: {
      editCard: function (name) {
        this.$router.push({ name: 'editweathercard', params: { LocationId: name } })
    }
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
  @import './src/style/components/components.header';
</style>
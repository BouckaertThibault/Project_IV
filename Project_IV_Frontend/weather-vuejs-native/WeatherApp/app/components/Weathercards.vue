<template>
    <Page actionBarHidden="true">
        <ActionBar title="My App"/>
         <GridLayout rows="80,*" class="c-weathercards--border">
            <GridLayout row="0"  columns="3*,2*">
                <label class="c-weathercards--title" col="0" >My objects</label>
                <Button col="1" class="btn btn-primary btn-rounded-lg c-primary-button" height="40" width="100%" @tap="AddLocation()">New object</Button>
            </GridLayout>
            <ScrollView row="1" orientation="vertical" >
              <StackLayout>
              <Weathercard @tap="editCard" v-for="l in getLocations" :key="l.id" :woeid="l"></Weathercard>
              </StackLayout>
            </ScrollView>
         </GridLayout>
    </Page>
</template>

<script>
  import Weathercard from "@/components/Weathercard"
  import AddLocation from "@/components/AddLocation"
  import EditWeathercard from "@/components/EditWeathercard"

  export default {
    name: 'Weathercards',
    components: {
      Weathercard,
    },
    methods: {
      AddLocation: function() {
     this.$navigateTo(AddLocation)
    },
    editCard(value) {  
      console.log(value);
        this.$navigateTo(EditWeathercard, { props: { LocationId: value } })
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
    }
  }
</script>

<style scoped lang="scss">

  @import './app/style/components/components.primary-button';
  @import './app/style/components/components.weathercards';
  @import './app/style/elements/elements.inputfield';
  @import './app/style/elements/elements.labels';
  @import './app/style/elements/elements.page';
</style>
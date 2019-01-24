<template>
    <Page actionBarHidden="true">
        <ActionBar title="My App"/>
        <TabView iosIconRenderingMode="alwaysOriginal" androidTabsPosition="bottom" tabBackgroundColor="white" @selectedIndexChange="onTabChange($event)">
          <TabViewItem :iconSource="houseImg">
              <GridLayout rows="80,*" class="c-weathercards--border">
                <GridLayout row="0"  columns="3*,2*">
                    <label class="c-weathercards--title" col="0" >My objects</label>
                    <Button col="1" class="btn btn-primary btn-rounded-lg c-primary-button" height="40" width="100%" @tap="AddLocation()">New object</Button>
                </GridLayout>
                <ScrollView row="1" orientation="vertical" scrollBarIndicatorVisible="false">
                  <StackLayout>
                  <Weathercard @tap="editCard" v-for="l in getLocations" :key="l.id" :woeid="l"></Weathercard>
                  </StackLayout>
                </ScrollView>
              </GridLayout>
          </TabViewItem>
          <TabViewItem :iconSource="accountImg">
            <Label text="Content for Tab 2" />
          </TabViewItem>
        </TabView>
         
    </Page>
</template>

<script>
  import Weathercard from "@/components/Weathercard"
  import AddLocation from "@/components/AddLocation"
  import EditWeathercard from "@/components/EditWeathercard"

  export default {
    name: 'Weathercards',
    data(){
      return {
        houseImg: "~/assets/images/houseactivated.png",
        accountImg: "~/assets/images/account.png",
        tab1activated: true
      }
    },
    components: {
      Weathercard,
    },
    beforeCreate(){
      console.log("WEATHERCARDS BEFORECREATED!!!!");
    },
    created(){
      console.log("WEATHERCARDS CREATED!!!!");
    },
    mounted(){
      console.log("WEATHERCARDS MOUNTED!!!");
    },
    updated(){
      console.log("WEATHERCARDS UPDATED!!!");
    },
    methods: {
    onTabChange(args) {
      if(this.tab1activated == true){
        console.log("house activated")
        this.houseImg = "~/assets/images/houseactivated.png";
        this.accountImg = "~/assets/images/account.png";
      }
      else{
        console.log("account activated")
        this.houseImg = "~/assets/images/house.png";
        this.accountImg = "~/assets/images/accountactivated.png"; 
      }
      this.tab1activated = !this.tab1activated;
    },
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
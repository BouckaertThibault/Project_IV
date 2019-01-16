<template>
    <Page actionBarHidden="true">
        <ActionBar title="My App"/>
         <GridLayout width="100%" height="100%">
        <Mapbox 
        width="100%" 
        height="100%"
            accessToken="pk.eyJ1IjoidGhpYmF1bHQ3IiwiYSI6ImNqbmxzOW9lYTE1ZGsza3M1aWRtNzg1NmkifQ.XdOPMxUfRUL7rVv2tG_3NA"
            mapStyle="traffic_day"
            latitude="37.7397"
            longitude="-121.4252"
            hideCompass="true"
            zoomLevel="12"
            showUserLocation="false"
            disableZoom="false"
            disableRotation="false"
            disableScroll="false"
            disableTilt="false"
            @mapReady="onMapReady($event)">
        </Mapbox>
        </GridLayout>
        
    </Page>
</template>



<script>
 // import { MglMap, MglMarker } from 'nativescript-mapbox';
 // import 'mapbox-gl/dist/mapbox-gl.css';
  import * as utils from "utils/utils";
  
export default {
  
    name: 'AddLocation',
    data(){
      return{
        location: '',
        markers: [],
        accessToken: 'pk.eyJ1IjoidGhpYmF1bHQ3IiwiYSI6ImNqbmxzOW9lYTE1ZGsza3M1aWRtNzg1NmkifQ.XdOPMxUfRUL7rVv2tG_3NA',
        mapStyle: 'mapbox://styles/thibault7/cjnltgjr30lg12rozl2r91pvn'
      }
    },
     methods: {
            onMapReady(args) {
                args.map.addMarkers([
                    {
                        lat: 37.7397,
                        lng: -121.4252,
                        title: "Tracy, CA",
                        subtitle: "Home of The Polyglot Developer!",
                        onCalloutTap: () => {
                            utils.openUrl("https://www.thepolyglotdeveloper.com");
                        }
                    }
                ]);
            }
        }
    // components:{
    //   MglMap,
    //   MglMarker
    // },
    // methods:{
    // searchButton: function() {
    //   if(this.location == ""){
    //     //this.inputfield == "Vul een locatie in";
    //     console.log('Vul een locatie in');
    //   }
    //   else{
    //      console.log('selected town: ' + this.location);
    //      this.searchLocation();
    //   }
     
    // },
    // searchLocation: function() {
    //   console.log("this is location: " + this.location);
    //   const endpoint = `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20geo.places%20where%20text%3D%22${ this.location }%22&format=json`;

    //   fetch(endpoint)
    //     .then(response => response.json())
    //     .then(data=>{
    //       //this.addMarkerData(data.query.results.place);
    //       let cityObj = null;
    //       if(Array.isArray(data.query.results.place)){
    //         cityObj = data.query.results.place[0];
    //       }
    //       else {
    //         cityObj = data.query.results.place;
    //       }
    //       this.$store.dispatch('addWeatherLocation', cityObj);
    //     })
    //     .catch(err => {
    //       console.error('An error occured: ', err);
    //     })
    // },
    // addNewLocation: function(el, e){
    //   console.log('clicked');
    //   console.log('Element, ', el);
    //   console.log('Event, ', e);
    //   let test = this.$refs.map.queryRenderedFeatures(e.point,
    //     {
    //       radius: 10
    //     }
    //   );
    //   console.log(test);
    //   console.log(this.location);
    //   if(test.length != 0){
    //     if(test[0].sourceLayer == "place_label"){
    //       console.log(test[0].properties.name);
    //       this.location = test[0].properties.name;
    //       console.log(this.location);
    //     }
    //     else{
    //       console.log("Not a town");
    //     }

    //   }
    //   else{
    //     console.log("nothing found");
    //   }

      
    //   //check of feature town is, ja: vraag om toe te voegen aan het weeroverzicht
    // }
  // }
};
</script>

<style scoped lang="scss">
  @import './app/style/components/components.primary-button';
  @import './app/style/elements/elements.inputfield';
  @import './app/style/elements/elements.labels';
  @import './app/style/elements/elements.page';
</style>
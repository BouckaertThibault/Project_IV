<template>
    <Page actionBarHidden="true">
        <ActionBar title="My App"/>
         <GridLayout rows="*, 200" width="100%" height="100%">
        <Mapbox 
        ref="map"
        @tap="addNewLocation($el ,$event)"
        width="100%" 
        height="100%"
            :accessToken="accessToken"
            :mapStyle="mapStyle"
            
            hideCompass="true"
            zoomLevel="12"
            showUserLocation="false"
            disableZoom="false"
            disableRotation="false"
            disableScroll="false"
            disableTilt="false"
            @mapReady="onMapReady($event)">
        </Mapbox>
        <FlexboxLayout row="1" width="100%" height="200" backgroundColor="white" alignItem="center" flexDirection="column" justifyContent="space-around">
            <label class="c-card--item c-card--title">Add Location</label>
            <TextField  :text="location" hint="Tap for a location" class="inputfield c-card--item"></TextField>
            <Button  class="btn btn-primary btn-rounded-lg c-primary-button c-card--item" width="100%" @tap="searchButton()">Add {{location}}</Button>
        </FlexboxLayout>
        </GridLayout>
        
    </Page>
</template>



<script>
 // import { MglMap, MglMarker } from 'nativescript-mapbox';
 // import 'mapbox-gl/dist/mapbox-gl.css';
  import * as utils from "utils/utils";
  import Weathercards from '@/components/Weathercards';
  
export default {
  
    name: 'AddLocation',
    data(){
      return{
        location: '',
        markers: [],
        accessToken: 'pk.eyJ1IjoidGhpYmF1bHQ3IiwiYSI6ImNqbmxzOW9lYTE1ZGsza3M1aWRtNzg1NmkifQ.XdOPMxUfRUL7rVv2tG_3NA',
        mapStyle: 'mapbox://styles/thibault7/cjr5i8iwk452v2srx7pg929ka',
        coordinates: [0,0]
      }
    },
    methods:{
    onMapReady(args) {
        var self = this;
        args.map.setOnMapClickListener(function(point) {
            args.map.removeMarkers();
            console.log("Map clicked: " + JSON.stringify(point));
            const endpoint = `https://api.opencagedata.com/geocode/v1/json?q=${point.lat}+${point.lng}&key=df386088e80840fc8452839031722474&language=en&pretty=1&no_annotations=1`;
            
            fetch(endpoint)
                .then(response => response.json())
                
                .then(data=>{
                    console.log('DATA: ' + JSON.stringify(data));
                    if(data.results[0].components.city == undefined){
                        self.location = data.results[0].components.town;
                    }
                    else{
                        self.location = data.results[0].components.city;
                    }
                    
                })
                .then(function(){
                    args.map.addMarkers([
                        {
                        lat: point.lat,
                        lng: point.lng
                        }]
                    );
                })
                .catch(err => {
                    console.error('An error occured: ', err);
                })
            });
    },
    searchButton: function() {
      if(this.location == ""){
        //this.inputfield == "Vul een locatie in";
        console.log('Vul een locatie in');
      }
      else{
         console.log('selected town: ' + this.location);
         this.searchLocation();
      }
     
    },
    searchLocation: function() {

      const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${this.location}&units=metric&appid=83dec79fbb45d7ddc77f9657e7a41084`;

       fetch(endpoint)
          .then(response => response.json())
          
          .then(data=>{
            console.log('DATA: ' + JSON.stringify(data));
            this.$store.dispatch('addWeatherLocation', data)

          })
          .then(() => {this.$navigateTo(Weathercards)})
          .catch(err => {
            console.error('An error occured: ', err);
          })

    },
    addNewLocation: function(el, e){
      console.log('clicked');
      console.log('Element, ', el);
      console.log('Event, ', e);
      this.coordinates = [e.lngLat.lng, e.lngLat.lat];
      console.log('coordinates: ' + this.coordinates);
      let test = this.$refs.map.queryRenderedFeatures(e.point,
        {
          radius: 10
        }
      );
      console.log(test);
      console.log(this.location);
      if(test.length != 0){
        if(test[0].sourceLayer == "place_label"){
          console.log(test[0].properties.name);
          this.location = test[0].properties.name;
          console.log(this.location);
        }
        else{
          console.log("Not a town");
        }

      }
      else{
        console.log("nothing found");
      }

      
      //check of feature town is, ja: vraag om toe te voegen aan het weeroverzicht
    }
  }
};
</script>

<style scoped lang="scss">
  @import './app/style/components/components.primary-button';
  @import './app/style/elements/elements.inputfield';
  @import './app/style/elements/elements.labels';
  @import './app/style/elements/elements.card';
  @import './app/style/elements/elements.page';
</style>
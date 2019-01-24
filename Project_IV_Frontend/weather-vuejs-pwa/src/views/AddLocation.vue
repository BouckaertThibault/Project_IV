<template>
  <div>
    <mgl-map class="c-map"
    ref="map"
    @click="addNewLocation($el ,$event)"
    :accessToken="accessToken"
    :mapStyle.sync="mapStyle">
    <MglMarker :coordinates="coordinates" color="red" ></MglMarker>
    <div @click="goBack" class="c-arrow">
        <img src="@/assets/Arrow-back.svg" alt="back">
      </div>
    </mgl-map>
    <form class="c-card" @submit.prevent="searchButton">
      <h1 class="c-card--title">Add Location</h1>
      <primary-button @click="searchButton">{{buttonText}}</primary-button>
    </form>
  </div>
</template>

<script>
  import { MglMap, MglMarker } from 'vue-mapbox';
  import 'mapbox-gl/dist/mapbox-gl.css';
  import PrimaryButton from '@/components/forms/PrimaryButton';
  

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
    components:{
      MglMap,
      MglMarker,
      PrimaryButton
    },
    computed: {
      buttonText: function(){
        if(this.location == ""){
          return "Tap the map!"
        }
        else if(this.location == undefined){
          return "Try another location"
        }
        else{
          return `Add ${this.location}`
        }
      }
    },
    methods:{
      goBack(){
        this.$router.go(-1);
      },
    searchButton: function() {
      if(this.location == ""){
        //this.inputfield == "Vul een locatie in";
        alert("Choose a location")
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
            console.log('DATA: ' + data);
            this.$store.dispatch('addWeatherLocation', data)

          })
          .then(() => {this.$router.push('/weathercards')})
          .catch(err => {
            console.error('An error occured: ', err);
          })

    },
    addNewLocation: function(el, e){
      console.log('clicked');
      console.log('Element, ', el);
      console.log('Event, ', e);
      this.coordinates = [e.lngLat.lng, e.lngLat.lat];
      var self = this;
        
            const endpoint = `https://api.opencagedata.com/geocode/v1/json?q=${e.lngLat.lat}+${e.lngLat.lng}&key=df386088e80840fc8452839031722474&language=en&pretty=1&no_annotations=1`;
            
            fetch(endpoint)
                .then(response => response.json())
                
                .then(data=>{
                    console.log('DATA: ' + JSON.stringify(data));
                    if(data.results[0].components.city_district !== undefined){
                        self.location = data.results[0].components.city_district;
                    }
                    else if(data.results[0].components.town !== undefined){
                      self.location = data.results[0].components.town;
                    }
                    else{
                      self.location = data.results[0].components.city;
                    }
                    
                })
               
                .catch(err => {
                    console.error('An error occured: ', err);
                
            });
    }
  }
};
</script>

<style lang="scss">
  @import './src/style/base';
  @import './src/style/components/components.map';
  @import './src/style/elements/elements.forms';
  @import './src/style/components/components.arrow';
  @import './src/style/elements/elements.card';
</style>
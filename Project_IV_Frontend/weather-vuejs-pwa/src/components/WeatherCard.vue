<template>
  <!-- <div class="c-weather-card">
      <div class="c-weather-card-info">
        <div class="c-weather-card-text">
          <p>woeid: {{woeid}}</p>
          <p class="c-weather-card-info__location">City: {{city}}</p>
          <p class="c-weather-card-info__region">Country: {{country}}</p>
          <div class="c-weather-card-stats">
            <p class="c-weather-card-info__temperature">Temperatuur: {{temperatuur}}°C</p>
            <p class="c-weather-card-info__rain">Vochtigheid: {{humidity}}</p>
            <p class="c-weather-card-info__wind">Wind: {{wind}}</p>
          </div>
        </div>
        <div class="c-weather-card-img">
          <img src="@/assets/sunny-activated.png" alt="Logo" class="c-weather-card-img--image">
        </div>
      </div>
  </div> -->
  
  <div class="c-weather-card">
      <div class="c-weather-card-info">
        <div class="c-weather-card-text">
          <slot></slot>
          <p class="c-weather-card-info__location">{{city}}</p>
          <p class="c-weather-card-info__region">{{country}}</p>
          <div class="c-weather-card-stats">
            <p class="c-weather-card-info__temperature">{{temperatuur}}°C</p>
            <img src="@/assets/Neerslag.png" alt="Logo" class="splash-img c-weather-card-info__rain-img">
            <p class="c-weather-card-info__rain">{{humidity}}%</p>
            <img src="@/assets/windsnelheid.png" alt="Logo" class="splash-img c-weather-card-info__wind-img">
            <p class="c-weather-card-info__wind">{{wind}} km/h</p>
          </div>
        </div>
        <div class="c-weather-card-img">
          <img src="@/assets/sunny-activated.png" alt="Logo" class="c-weather-card-img--image">
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'WeatherCard',
  data(){
    return{
      city: '',
      country: '',
      temperatuur: '',
      humidity: '',
      wind: ''
    }
  },
  props: {
   woeid: {
    required: true
   }
  },
  created(){
      this.searchWeather(this.woeid);
  },
  methods:{
      // searchWeather: function(woeid) {
      //   const endpoint = `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(${woeid})&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`;

      //   fetch(endpoint)
      //     .then(response => response.json())
      //     .then(data=>{
      //       this.city = data.query.results.channel.location.city;
      //       this.wind = data.query.results.channel.wind.speed
      //       this.humidity = data.query.results.channel.atmosphere.humidity;

      //     })
      //     .catch(err => {
      //       console.error('An error occured: ', err);
      //     })
      // }
      searchWeather: function(woeid) {
        
        
            this.city = woeid.name;
            this.country = woeid.sys.country;
            this.temperatuur = woeid.main.temp;
            this.wind = woeid.wind.speed;
            this.humidity = woeid.main.humidity;

          
         
      }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import './src/style/components/components.weather-card';
</style>

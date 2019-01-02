<template>
  <div class="c-weather-card">
      <div>
        <p>woeid: {{woeid}}</p>
        <p>City: {{city}}</p>
        <p>Wind: {{wind}}mph</p>
        <p>Vochtigheid: {{humidity}}</p>
      </div>
  </div>
</template>

<script>
export default {
  name: 'WeatherCard',
  data(){
    return{
      city: '',
      wind: '',
      humidity: '',
    }
  },
  props: {
   woeid: {
    type: String,
    required: true
   }
  },
  created(){
      this.searchWeather(this.woeid);
  },
  methods:{
      searchWeather: function(woeid) {
        const endpoint = `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(${woeid})&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`;

        fetch(endpoint)
          .then(response => response.json())
          .then(data=>{
            this.city = data.query.results.channel.location.city;
            this.wind = data.query.results.channel.wind.speed
            this.humidity = data.query.results.channel.atmosphere.humidity;

          })
          .catch(err => {
            console.error('An error occured: ', err);
          })
      }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import './src/style/components/components.weather-card';
</style>

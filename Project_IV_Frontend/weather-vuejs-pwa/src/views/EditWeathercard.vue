<template>
  <div >
    <div class="c-weather-card">
        <div class="c-weather-card-info">
          <div class="c-weather-card-text">
            <p class="c-weather-card-info__location">{{b.name}}</p>
            <p class="c-weather-card-info__region">{{b.sys.country}}</p>
            <div class="c-weather-card-stats">
              <p class="c-weather-card-info__temperature">{{b.main.temp}}°C</p>
              <img src="@/assets/Neerslag.png" alt="Logo" class="splash-img c-weather-card-info__rain-img">
              <p class="c-weather-card-info__rain">{{b.main.humidity}}%</p>
              <img src="@/assets/windsnelheid.png" alt="Logo" class="splash-img c-weather-card-info__wind-img">
              <p class="c-weather-card-info__wind">{{b.wind.speed}} km/h</p>
            </div>
          </div>
          <div class="c-weather-card-img">
            <img src="@/assets/sunny-activated.png" alt="Logo" class="c-weather-card-img--image">
          </div>
        </div>
    </div>

    <div class="o-container">
      <div class="c-edit-variable">
        <label>Temperature</label>
        <label>{{temp}}°C</label>
        <VueNumberInput v-model="temp"  @change="changeTemp" :step="1" :min="-50" :max="50"  inline center controls rounded class="edit-number"></VueNumberInput>
      </div>

      <div class="c-edit-variable">
        <label>Wind speed</label>
        <label>{{windSpeed}}km/h</label>
        <VueNumberInput v-model="windSpeed" @change="changeWindSpeed" :step="1" :min="0" :max="200"  inline center controls rounded class="edit-number"></VueNumberInput>
      </div>

      <div class="c-edit-variable">
        <label>Direction of the wind</label>
        <input type="range" @change="changeDirection" min="1" max="100" value="50" class="slider" id="myRange">
      </div>

      <div class="c-edit-variable">
        <label>Cloudiness</label>
        <label>{{cloud}}%</label>
        <input type="range" @change="changeCloud" min="0" max="100" v-model="cloud" class="slider" id="myRange">
      </div>

      <div class="c-edit-variable">
        <label>Humidity</label>
        <label>{{humidity}}%</label>
        <input type="range" @change="changeHumidity" min="0" max="100" v-model="humidity" class="slider" id="myRange">
      </div>

      <primary-button @click.native="deleteData" class="c-edit-button c-edit-button-delete">Delete card</primary-button>
      <primary-button @click.native="resetData" class="c-edit-button">Select default settings</primary-button>
      <primary-button @click.native="updateData" class="c-edit-button">Apply changes</primary-button>

    </div>

  </div>
</template>

<script>
  import PrimaryButton from "@/components/forms/PrimaryButton";
  import VueNumberInput from '@chenfengyuan/vue-number-input';

  export default {
    name: 'Editweathercard',
    data(){
      return {
        originalData: "",
        temp:  "",
        windSpeed: "",
        windDirection: "",
        cloud: "",
        humidity: ""
      }
    },
    components: {
      PrimaryButton,
      VueNumberInput,
    },
    created() {
      this.originalData = this.b;
      this.temp = this.b.main.temp;
      this.windSpeed = this.b.wind.speed;
      this.cloud = this.b.clouds.all;
      this.humidity = this.b.main.humidity;
    },
    methods: {
      deleteData: function() {
        this.$store.dispatch('deleteWeatherData', this.b.id);
        this.$router.push('/weathercards');
      },
      updateData: function() {
        console.log("test" + JSON.stringify(this.originalData));
        this.b.main.temp = this.temp;
        this.b.wind.speed = this.windSpeed;
        this.b.clouds.all = this.cloud;
        this.b.main.humidity = this.humidity;
        console.log("test2" + JSON.stringify(this.b));
        this.$store.dispatch('updateWeatherData', this.b)
        this.$router.push('/weathercards');
      },
      resetData: function() {
          const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${this.$route.params.LocationId}&units=metric&appid=83dec79fbb45d7ddc77f9657e7a41084`;

          fetch(endpoint)
              .then(response => response.json())
              
              .then(data=>{
                console.log('DATA: ' + data);
                this.temp = data.main.temp;
                this.windSpeed = data.wind.speed;
                this.cloud = data.clouds.all;
                this.humidity = data.main.humidity;
                this.b.main.temp = data.main.temp;;
                this.b.wind.speed = data.wind.speed;
                this.b.clouds.all = data.clouds.all;
                this.b.main.humidity = data.main.humidity;
                this.$store.dispatch('updateWeatherData', data)
              })
              .catch(err => {
                console.error('An error occured: ', err);
              })

      },
      changeTemp(event) {
        console.log("temp change: " + event);
        this.temp = event;
      },
      changeWindSpeed(event) {
        console.log("windspeed change: " + event);
        this.windSpeed = event;
      },
      changeDirection(event) {
        console.log("direction change: " + event);
        this.windDirection = event;
      },
      changeCloud(event) {
        console.log("cloud change: " + event.target.value);
        this.cloud = event.target.value;
      },
      changeHumidity(event) {
        console.log("humidity change: " + event.target.value);
        this.humidity = event.target.value;
      }
    },
    computed: {
    b: function(){
      console.log(this.$store.getters.getLocationById(this.$route.params.LocationId));
      return this.$store.getters.getLocationById(this.$route.params.LocationId);
    },

  },

  }
</script>

<style scoped lang="scss">
  @import './src/style/base';
  @import './src/style/components/components.container';
  @import './src/style/components/components.edit-weather-card';
</style>
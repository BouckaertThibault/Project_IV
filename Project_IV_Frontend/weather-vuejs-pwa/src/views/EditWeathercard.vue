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
        <label>20°C</label>
        <input type="range" min="1" max="100" value="50" class="slider" id="myRange">
      </div>

      <div class="c-edit-variable">
        <label>Wind speed</label>
        <label>20km/h</label>
        <input type="range" min="1" max="100" value="50" class="slider" id="myRange">
      </div>

      <div class="c-edit-variable">
        <label>Direction of the wind</label>
        <input type="range" min="1" max="100" value="50" class="slider" id="myRange">
      </div>

      <div class="c-edit-variable">
        <label>Cloudiness</label>
        <input type="range" min="1" max="100" value="50" class="slider" id="myRange">
      </div>

      <div class="c-edit-variable">
        <label>Humidity</label>
        <label>40%</label>
        <input type="range" min="1" max="100" value="50" class="slider" id="myRange">
      </div>

      <primary-button class="c-edit-button">Select default settings</primary-button>
      <primary-button class="c-edit-button">Apply changes</primary-button>
    </div>

  </div>
</template>

<script>
  import PrimaryButton from "@/components/forms/PrimaryButton";

  export default {
    name: 'Editweathercard',
    components: {
      PrimaryButton
    },
    computed: {
    b: function(){
      console.log(this.$store.getters.getLocationById(this.$route.params.LocationId));
      return this.$store.getters.getLocationById(this.$route.params.LocationId);
    }
  },

  }
</script>

<style scoped lang="scss">
  @import './src/style/base';
  @import './src/style/components/components.container';
  @import './src/style/components/components.edit-weather-card';
</style>
<template>
  <Page actionBarHidden="true">
        <ActionBar title="My App"/>
        <StackLayout>
          <GridLayout class="c-weathercard" width="100%" height="200" columns="3*,*" rows="*,*,*">
              <label row="0" col="0" class="c-weathercard--title">{{b.name}}</label>
              <label row="1" col="0" class="c-weathercard--country" >{{b.sys.country}}</label>
              <Image rowSpan="2" col="1" row="0" class="c-weathercard--img"  src="~/assets/images/sunny-activated.png"
                  width="70" height="51" />
              <StackLayout row="2" colSpan="2" orientation="horizontal" width="340"
                  height="210" >
                  <Label width="100" height="50" class="c-weathercard--temperature">{{b.main.temp}}°C</Label>
                  <Image width="16" height="16" class="c-weathercard--rest"  src="~/assets/images/Neerslag.png" />
                  <Label width="70" height="20" class="c-weathercard--rest c-weathercard--mini" >{{b.main.humidity}}%</Label>
                  <Image width="16" height="16" class="c-weathercard--rest"  src="~/assets/images/windsnelheid.png" />
                  <Label width="70" height="20" class="c-weathercard--rest c-weathercard--mini" >{{b.wind.speed}} km/h</Label>
              </StackLayout>
          </GridLayout>
        <Label  width="100" height="50">PROP: {{$props.LocationId}}</Label>
        </StackLayout>
    </Page>
</template>

<script>
export default {
  props: ["LocationId"],
  name: 'EditWeathercard',
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
      },
      resetData: function() {
          const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${this.$props.LocationId}&units=metric&appid=83dec79fbb45d7ddc77f9657e7a41084`;

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
      console.log(this.$store.getters.getLocationById(this.$props.LocationId));
      return this.$store.getters.getLocationById(this.$props.LocationId);
    },

  },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import './app/style/components/components.editweathercard';
  @import './app/style/elements/elements.labels';
  @import './app/style/elements/elements.page';
</style>

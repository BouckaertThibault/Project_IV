<template>
  <Page actionBarHidden="true">
        <ActionBar title="My App"/>
        <ScrollView scrollBarIndicatorVisible="false">
        <StackLayout>
          <GridLayout class="c-editweathercard" width="100%" height="200" columns="3*,*" rows="*,*,*">
              <label row="0" col="0" class="c-editweathercard--title">{{C.name}}</label>
              <label row="1" col="0" class="c-editweathercard--country" >{{C.sys.country}}</label>
              <Image rowSpan="2" col="1" row="0" class="c-editweathercard--img"  src="~/assets/images/sunny-activated.png"
                  width="70" height="51" />
              <StackLayout row="2" colSpan="2" orientation="horizontal" width="340"
                  height="210" >
                  <Label width="100" height="50" class="c-editweathercard--temperature">{{C.main.temp}}°C</Label>
                  <Image width="16" height="16" class="c-editweathercard--rest"  src="~/assets/images/Neerslag.png" />
                  <Label width="70" height="20" class="c-editweathercard--rest c-editweathercard--mini" >{{C.main.humidity}}%</Label>
                  <Image width="16" height="16" class="c-editweathercard--rest"  src="~/assets/images/windsnelheid.png" />
                  <Label width="70" height="20" class="c-editweathercard--rest c-editweathercard--mini" >{{C.wind.speed}} km/h</Label>
              </StackLayout>
          </GridLayout>
          <StackLayout class="c-editweathercard--border">
            <GridLayout height="80" rows="*,*" columns="*,*">
              <Label class="c-editweathercard--leftlabel" row="0" col="0" width="100" height="30">Temperature</Label>
              <Label class="c-editweathercard--rightlabel" row="0" col="1" width="100" height="30" >{{temp}}°C</Label>
              <Slider row="1" colSpan="2" value="80" v-model="temp" @change="changeTemp" minValue="-50" maxValue="50"/>
            </GridLayout>
            <GridLayout height="80" rows="*,*" columns="*,*">
              <Label class="c-editweathercard--leftlabel" row="0" col="0" width="100" height="30">Wind speed</Label>
              <Label class="c-editweathercard--rightlabel" row="0" col="1" width="100" height="30" >{{windSpeed}}km/h</Label>
              <Slider row="1" colSpan="2" value="80" v-model="windSpeed" @change="changeWindSpeed" minValue="0" maxValue="200"/>
            </GridLayout>
            <GridLayout height="80" rows="*,*" columns="*,*">
              <Label class="c-editweathercard--leftlabel" row="0" col="0" width="150" height="30">Direction of the wind</Label>
              <Slider row="1" colSpan="2" value="80" />
            </GridLayout>
            <GridLayout height="80" rows="*,*" columns="*,*">
              <Label class="c-editweathercard--leftlabel" row="0" col="0" width="100" height="30">Cloudiness</Label>
              <Label class="c-editweathercard--rightlabel" row="0" col="1" width="100" height="30">{{cloud}}%</Label>
              <Slider row="1" colSpan="2" minValue="0" maxValue="100" v-model="cloud" @change="changeCloud"/>
            </GridLayout>
            <GridLayout height="80" rows="*,*" columns="*,*">
              <Label class="c-editweathercard--leftlabel" row="0" col="0" width="100" height="30">Humidity</Label>
              <Label class="c-editweathercard--rightlabel" row="0" col="1" width="100" height="30">{{humidity}}%</Label>
              <Slider row="1" colSpan="2" marginBottom="20" minValue="0" maxValue="100" v-model="humidity" @change="changeHumidity"/>
            </GridLayout>
            <Button  class="btn btn-primary btn-rounded-lg c-primary-button c-button-spacer c-primary-button-delete" width="100%" @tap="deleteData()">Delete card</Button>
            <Button  class="btn btn-primary btn-rounded-lg c-primary-button c-button-spacer" width="100%" @tap="resetData()">Select default settings</Button>
            <Button  class="btn btn-primary btn-rounded-lg c-primary-button c-button-spacer" width="100%" @tap="updateData()">Apply changes</Button>
          </StackLayout>
        </StackLayout>
        </ScrollView>
    </Page>
</template>

<script>
import Weathercards from '@/components/Weathercards';

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
        humidity: "",
        C: ""
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
        this.$navigateTo(Weathercards);
      },
      updateData: function() {
        console.log("test" + JSON.stringify(this.originalData));
        this.b.main.temp = this.temp;
        this.b.wind.speed = this.windSpeed;
        this.b.clouds.all = this.cloud;
        this.b.main.humidity = this.humidity;
        console.log("test2" + JSON.stringify(this.b));
        this.$store.dispatch('updateWeatherData', this.b)
        this.$navigateTo(Weathercards);
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
      try{
        console.log(this.$store.getters.getLocationById(this.$props.LocationId));
        this.C = this.$store.getters.getLocationById(this.$props.LocationId);
        return this.$store.getters.getLocationById(this.$props.LocationId);
      }
      catch(err){
        console.log("Error occured on editweathercard computed function b: " + err);
      }
      
    },

  },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import './app/style/components/components.primary-button'; 
  @import './app/style/components/components.editweathercard';
  @import './app/style/elements/elements.labels';
  @import './app/style/elements/elements.page';
</style>

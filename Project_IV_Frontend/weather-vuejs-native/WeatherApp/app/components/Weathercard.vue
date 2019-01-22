<template>
        <GridLayout  @tap="message()" class="c-weathercard" width="340" height="200" columns="3*,*" rows="*,*,*">
            <label row="0" col="0" class="c-weathercard--title">{{city}}</label>
            <label row="1" col="0" class="c-weathercard--country" >{{country}}</label>
            <Image rowSpan="2" col="1" row="0" class="c-weathercard--img"  src="~/assets/images/sunny-activated.png"
                width="70" height="51" />
            <StackLayout row="2" colSpan="2" orientation="horizontal" width="340"
                height="210" >
                <Label width="100" height="50" class="c-weathercard--temperature">{{temperatuur}}°C</Label>
                <Image width="16" height="16" class="c-weathercard--rest"  src="~/assets/images/Neerslag.png" />
                <Label width="70" height="20" class="c-weathercard--rest c-weathercard--mini" >{{humidity}}%</Label>
                <Image width="16" height="16" class="c-weathercard--rest"  src="~/assets/images/windsnelheid.png" />
                <Label width="70" height="20" class="c-weathercard--rest c-weathercard--mini" >{{wind}} km/h</Label>
            </StackLayout>
        </GridLayout>
</template>

<script>
export default {
  name: 'Weathercard',
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
      message: function(){
          this.$emit('tap', this.woeid.name);
          console.log("Card touched in component");
      },
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
  @import './app/style/components/components.weathercard';
  @import './app/style/elements/elements.labels';
  @import './app/style/elements/elements.page';
</style>

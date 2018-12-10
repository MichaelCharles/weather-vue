<template>
  
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  },
  mounted() {
    axios.get('https://api.openweathermap.org/data/2.5/weather?lat=40.7&lon=74.1&APPID=7271d3292aac8f43062a11e66a3aa1b0').then((response)=>{
      console.log(response);
    })
  }
}
</script>

<style>

</style>

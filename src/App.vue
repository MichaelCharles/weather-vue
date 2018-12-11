<template>
  <div class="flex-wrapper">
    <div class="app-container">
      <div class="message-container" @click="this.refreshMessage">
        <p class="message-text">
          {{ message }}
          </p>
        </div>
      <div class="row-wrapper">
        <div class="temp-column">
          {{ location.name }}
          <div v-if="isCelsius" @click="this.toggleScale" class="temp-area">
            <span class="temp">{{ weather.temp.c.value }}</span>
            <span class="scale">°C</span>
          </div>
          <div v-if="!isCelsius" @click="this.toggleScale" class="temp-area">
            <span class="temp">{{ weather.temp.f.value }}</span>
            <span class="scale">°F</span>
          </div>
          {{ weather.type.blurb }}
        </div>
        <div class="desc-column">
          <p>
            Click on the temperature or
            <a @click="this.toggleScale" class href="#">here</a> to display in
            <span v-if="isCelsius">Fahrenheit</span>
            <span v-if="!isCelsius">Celsius</span>, and click on the message or
            <a href="#" id="update-message">here</a> to update the reference point. Weather data is provided by
            <a
              href="http://openweathermap.org/"
              target="_blank"
            >OpenWeatherMap</a>. Concept inspired by
            <a href="https://xkcd.com/526/" target="_blank">this xkcd comic</a>. Weather insights, snarky remarks, and other comments are based on
            a survey taken from reddit's
            <a
              href="http://www.reddit.com/r/samplesize"
              target="_blank"
            >r/SampleSize</a> community. Web app written by
            <a
              href="http://michaelcharl.es/aubrey"
              target="_blank"
            >MichaelCharl.es/Aubrey</a>.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ReferencePointRepository from "./ReferencePointRepository";
import Location from "./Location";
import Weather from "./Weather";
import CookieManager from "./CookieManager";

export default {
  name: "app",
  components: {},
  data() {
    return {
      message: " ",
      tempString: "",
      isCelsius: true,
      location: new Location(),
      weather: new Weather(),
      repo: new ReferencePointRepository(),
      cookieManager: new CookieManager(),
    };
  },
  mounted() {
    if (!this.cookieManager.get("scale")) {
      this.cookieManager.set("scale", "c", 30);
    }
    this.isCelsius = this.cookieManager.get('scale') === "c";
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.location.lock({
          lon: position.coords.longitude,
          lat: position.coords.latitude
        });
        this.updateWeather();
      });
    } else {
      axios.get("http://ip-api.com/json").then(response => {
        this.location.update(response.data);
        this.updateWeather();
      });
    }
  },
  methods: {
    refreshMessage(temp) {
      this.message = this.repo.getMessage(
        Math.round(!temp ? temp : this.weather.temp.c.value)
      );
    },
    toggleScale() {
      this.isCelsius = !this.isCelsius;
      if (this.isCelsius) {
        this.cookieManager.set('scale', 'c', 30);
      } else {
        this.cookieManager.set('scale', 'f', 30);
      }
    },
    updateWeather() {
      let latitude = this.location.latitude;
      let longitude = this.location.longitude;
      axios
        .get(
          "https://api.openweathermap.org/data/2.5/weather?lat=" +
            latitude +
            "&lon=" +
            longitude +
            "&APPID=7271d3292aac8f43062a11e66a3aa1b0"
        )
        .then(response => {
          this.location.update({ name: response.data.name });
          this.weather.update(response.data);
          this.refreshMessage(this.weather.temp.c.value);
        });
    }
  }
};
</script>

<style>
@import url("https://use.typekit.net/xka6rpp.css");
body {
  background: #212121;
  color: #f2f2f2;
  font-size: 18px;
  font-family: futura-pt, sans-serif;
  font-weight: 400;
}
a {
  color: #ff669c;
  font-weight: 500;
  text-decoration: none;
}
a:hover {
  color: #ffa0b8;
  text-decoration: underline;
}
.flex-wrapper {
  height: 90vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.app-container {
  max-width: 600px;
  width: 100%;
}
.message-container {
  border-bottom: 1px #444 solid;
  cursor: pointer;
}
.message-text {
  margin: .5em;
  font-size: 2em;
  padding: 0;
  font-weight: 700;
}
.row-wrapper {
  display: flex;
  align-items: center;
}
.desc-column {
  flex: 2 auto;
  padding: 0 1em 0;
}
.desc-column p {
  border-left: 1px #444 solid;
  padding-left: 1em;
}
.temp-column {
  flex: 1 auto;

  padding: 1em;
}
.temp-area {
  display: flex;
  cursor: pointer;
}
.condensed {
  font-family: futura-pt-condensed, sans-serif;
}
.temp {
  font-weight: 500;
  font-size: 3em;
}
.scale {
  font-family: futura-pt-condensed, sans-serif;
  font-size: 1.5em;
  margin-top: 0.3em;
}
</style>

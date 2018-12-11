export default class Weather {
  constructor() {
    this.temp = {
      k: 0,
      c: 0,
      f: 0
    };
    this.blurb = "";
  }
  update(data) {
    let temp = data.main.temp;
    let id = data.weather[0].id;
    this.temp = {
      k: temp,
      c: this.kelvinToCelsius(temp),
      f: this.kelvinToFahrenheit(temp)
    };
    this.blurb = this.parseWeatherId(id);
  }
  kelvinToCelsius(temp) {
    return Math.round((temp - 273.15) * 10) / 10;
  }
  kelvinToFahrenheit(temp) {
    return Math.round((temp * (9 / 5) - 459.67) * 10) / 10;
  }
  parseWeatherId(id) {
    switch (id) {
      // Group 2xx: Thunderstorm
      case 200:
        return "Thunderstorm with light rain.";
      case 201:
        return "Thunderstorm with rain.";
      case 202:
        return "Thunderstorm with heavy rain.";
      case 210:
        return "Light thunderstorm.";
      case 211:
        return "Thunderstorm.";
      case 212:
        return "Heavy thunderstorm.";
      case 221:
        return "Ragged thunderstorm.";
      case 230:
        return "Thunderstorm with light drizzle.";
      case 231:
        return "Thunderstorm with drizzle.";
      case 232:
        return "Thunderstorm with heavy drizzle.";
      // Group 3xx: Drizzle
      case 300:
        return "Light intensity drizzle.";
      case 301:
        return "Drizzle.";
      case 302:
        return "Heavy intensity drizzle.";
      case 310:
        return "Light drizzle rain.";
      case 311:
        return "Drizzle rain.";
      case 312:
        return "High intensity drizzle rain.";
      case 313:
        return "Rain and drizzle.";
      case 314:
        return "Heavy shower rain and drizzle.";
      case 321:
        return "Shower drizzle.";
      // Group 5xx: Rain
      case 500:
        return "Light rain.";
      case 501:
        return "Moderate rain.";
      case 502:
        return "High intensity rain.";
      case 503:
        return "Very heavy rain.";
      case 504:
        return "Extreme rain.";
      case 511:
        return "Freezing rain.";
      case 520:
        return "Low intensity shower.";
      case 521:
        return "Shower rain.";
      case 522:
        return "Heavy intensity shower rain.";
      case 531:
        return "Ragged shower rain.";
      // Group 6xx: Snow
      case 600:
        return "Light snow.";
      case 601:
        return "Snow.";
      case 602:
        return "Heavy snow.";
      case 611:
        return "Sleet.";
      case 612:
        return "Shower sleet.";
      case 615:
        return "Light rain and snow.";
      case 616:
        return "Rain and snow.";
      case 620:
        return "Light shower snow.";
      case 621:
        return "Shower snow.";
      case 622:
        return "heavy shower snow.";
      // Group 7xx: Atmosphere
      case 701:
        return "Mist.";
      case 711:
        return "Smoke.";
      case 721:
        return "Haze.";
      case 731:
        return "Sand, dust whirls.";
      case 741:
        return "Fog.";
      case 751:
        return "Sand.";
      case 761:
        return "Dust.";
      case 762:
        return "Volcanic ash.";
      case 771:
        return "Squalls.";
      case 781:
        return "Tornado.";
      // Group 800: Clear
      case 800:
        return "Clear.";
      // Group 80x: Clouds
      case 801:
        return "Few clouds.";
      case 802:
        return "Scattered clouds.";
      case 803:
        return "Broken clouds.";
      case 804:
        return "Overcast.";
      // Group 90x: Extreme
      case 900:
        return "Tornado.";
      case 901:
        return "Tropical storm.";
      case 902:
        return "Hurricane.";
      case 903:
        return "Cold.";
      case 904:
        return "Hot.";
      case 905:
        return "Windy.";
      case 906:
        return "Hail.";
      // Group 9xx: Additional
      case 951:
        return "Calm.";
      case 952:
        return "Light breeze.";
      case 953:
        return "Gentle breeze.";
      case 954:
        return "Moderate breeze.";
      case 955:
        return "Fresh breeze.";
      case 956:
        return "Strong breeze.";
      case 957:
        return "High winds.";
      case 958:
        return "Gale.";
      case 959:
        return "Severe gale.";
      case 960:
        return "Storm.";
      case 961:
        return "Violent storm.";
      case 962:
        return "Hurricane.";
      default:
        return "Not available.";
    }
  }
}

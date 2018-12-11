export default class Weather {
  constructor() {
    this.temp = {
      k: {
        value: 0,
        string: ""
      },
      c: {
        value: 0,
        string: ""
      },
      f: {
        value: 0,
        string: ""
      }
    };
    this.type = {blurb:"",icon:""};
  }
  update(data) {
    let temp = data.main.temp;
    let id = data.weather[0].id;
    this.temp = {
      k: {
        value: temp,
        string: temp + "°K"
      },
      c: {
        value: this.kelvinToCelsius(temp),
        string: this.kelvinToCelsius(temp) + "°C"
      },
      f: {
        value: this.kelvinToFahrenheit(temp),
        string: this.kelvinToFahrenheit(temp) + "°F"
      }
    };
    this.type = this.parseWeatherId(id);
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
        return {blurb: "Thunderstorm with light rain.", icon: "wi-thunderstorm"};
      case 201:
        return {blurb: "Thunderstorm with rain.", icon: "wi-thunderstorm"};
      case 202:
        return {blurb: "Thunderstorm with heavy rain.", icon: "wi-thunderstorm"};
      case 210:
        return {blurb: "Light thunderstorm.", icon: "wi-thunderstorm"};
      case 211:
        return {blurb: "Thunderstorm.", icon: "wi-thunderstorm"};
      case 212:
        return {blurb: "Heavy thunderstorm.", icon: "wi-thunderstorm"};
      case 221:
        return {blurb: "Ragged thunderstorm.", icon: "wi-thunderstorm"};
      case 230:
        return {blurb: "Thunderstorm with light drizzle.", icon: "wi-thunderstorm"};
      case 231:
        return {blurb: "Thunderstorm with drizzle.", icon: "wi-thunderstorm"};
      case 232:
        return {blurb: "Thunderstorm with heavy drizzle.", icon: "wi-thunderstorm"};
      // Group 3xx: Drizzle
      case 300:
        return {blurb: "Light intensity drizzle.", icon: "wi-raindrops"};
      case 301:
        return {blurb: "Drizzle.", icon: "wi-raindrops"};
      case 302:
        return {blurb: "Heavy intensity drizzle.", icon: "wi-showers"};
      case 310:
        return {blurb: "Light drizzle rain.", icon: "wi-raindrops"};
      case 311:
        return {blurb: "Drizzle rain.", icon: "wi-raindrops"};
      case 312:
        return {blurb: "High intensity drizzle rain.", icon: "wi-showers"};
      case 313:
        return {blurb: "Rain and drizzle.", icon: "wi-showers"};
      case 314:
        return {blurb: "Heavy shower rain and drizzle.", icon: "wi-showers"};
      case 321:
        return {blurb: "Shower drizzle.", icon: "wi-showers"};
      // Group 5xx: Rain
      case 500:
        return {blurb: "Light rain.", icon: "wi-rain"};
      case 501:
        return {blurb: "Moderate rain.", icon: "wi-rain"};
      case 502:
        return {blurb: "High intensity rain.", icon: "wi-rain"};
      case 503:
        return {blurb: "Very heavy rain.", icon: "wi-rain"};
      case 504:
        return {blurb: "Extreme rain.", icon: "wi-rain"};
      case 511:
        return {blurb: "Freezing rain.", icon: "wi-rain"};
      case 520:
        return {blurb: "Low intensity shower.", icon: "wi-showers"};
      case 521:
        return {blurb: "Shower rain.", icon: "wi-showers"};
      case 522:
        return {blurb: "Heavy intensity shower rain.", icon: "wi-showers"};
      case 531:
        return {blurb: "Ragged shower rain.", icon: "wi-showers"};
      // Group 6xx: Snow
      case 600:
        return {blurb: "Light snow.", icon: "wi-snow"};
      case 601:
        return {blurb: "Snow.", icon: "wi-snow"};
      case 602:
        return {blurb: "Heavy snow.", icon: "wi-snow"};
      case 611:
        return {blurb: "Sleet.", icon: "wi-sleet"};
      case 612:
        return {blurb: "Shower sleet.", icon: "wi-sleet"};
      case 615:
        return {blurb: "Light rain and snow.", icon: "wi-snow"};
      case 616:
        return {blurb: "Rain and snow.", icon: "wi-snow"};
      case 620:
        return {blurb: "Light shower snow.", icon: "wi-snow"};
      case 621:
        return {blurb: "Shower snow.", icon: "wi-snow"};
      case 622:
        return {blurb: "heavy shower snow.", icon: "wi-snow"};
      // Group 7xx: Atmosphere
      case 701:
        return {blurb: "Mist.", icon: "wi-fog"};
      case 711:
        return {blurb: "Smoke.", icon: "wi-smoke"};
      case 721:
        return {blurb: "Haze.", icon: "wi-day-haze"};
      case 731:
        return {blurb: "Sand, dust whirls.", icon: "wi-sandstorm"};
      case 741:
        return {blurb: "Fog.", icon: "wi-fog"};
      case 751:
        return {blurb: "Sand.", icon: "wi-sandstorm"};
      case 761:
        return {blurb: "Dust.", icon: "wi-dust"};
      case 762:
        return {blurb: "Volcanic ash.", icon: "wi-valcano"};
      case 771:
        return {blurb: "Squalls.", icon: "wi-cloudy-gusts"};
      case 781:
        return {blurb: "Tornado.", icon: "wi-tornado"};
      // Group 800: Clear
      case 800:
        return {blurb: "Clear.", icon: "wi-day-sunny"};
      // Group 80x: Clouds
      case 801:
        return {blurb: "Few clouds.", icon: "wi-cloud"};
      case 802:
        return {blurb: "Scattered clouds.", icon: "wi-cloud"};
      case 803:
        return {blurb: "Broken clouds.", icon: "wi-cloud"};
      case 804:
        return {blurb: "Overcast.", icon: "wi-cloudy"};
      // Group 90x: Extreme
      case 900:
        return {blurb: "Tornado.", icon: "wi-tornado"};
      case 901:
        return {blurb: "Tropical storm.", icon: "wi-storm-warning"};
      case 902:
        return {blurb: "Hurricane.", icon: "wi-hurricane"};
      case 903:
        return {blurb: "Cold.", icon: "wi-snowflake-cold"};
      case 904:
        return {blurb: "Hot.", icon: "wi-hot"};
      case 905:
        return {blurb: "Windy.", icon: "wi-windy"};
      case 906:
        return {blurb: "Hail.", icon: "wi-hail"};
      // Group 9xx: Additional
      case 951:
        return {blurb: "Calm.", icon: "wi-hail"};
      case 952:
        return {blurb: "Light breeze.", icon: "wi-hail"};
      case 953:
        return {blurb: "Gentle breeze.", icon: "wi-hail"};
      case 954:
        return {blurb: "Moderate breeze.", icon: "wi-hail"};
      case 955:
        return {blurb: "Fresh breeze.", icon: "wi-hail"};
      case 956:
        return {blurb: "Strong breeze.", icon: "wi-hail"};
      case 957:
        return {blurb: "High winds.", icon: "wi-hail"};
      case 958:
        return {blurb: "Gale.", icon: "wi-hail"};
      case 959:
        return {blurb: "Severe gale.", icon: "wi-hail"};
      case 960:
        return {blurb: "Storm.", icon: "wi-hail"};
      case 961:
        return {blurb: "Violent storm.", icon: "wi-hail"};
      case 962:
        return {blurb: "Hurricane.", icon: "wi-hurricane"};
      default:
        return {blurb: "Not available.", icon: "wi-na"};
    }
  }
}

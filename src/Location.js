export default class Location {
  constructor() {
    this.latitude = 24;
    this.longitde = 27;
    this.name = "";
  }
  update(data) {
    this.longitude = data.lon;
    this.latitude = data.lat;
    this.name = data.name ? data.name : "";
  }
}

export default class Location {
  constructor() {
    this.latitude = 24;
    this.longitde = 27;
    this.name = "";
    this.locked = false;
  }
  update(data) {
    if (this.locked === false) {
      this.longitude = data.lon;
      this.latitude = data.lat;
    }
    this.name = data.name ? data.name : "";
  }
  lock(data) {
    this.update(data);
    this.locked = true;
  }
}

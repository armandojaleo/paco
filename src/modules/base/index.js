export default class Base {
  constructor() {
    this.getCoordinates().then((position) => {
      var elemDiv = document.createElement('div');
      elemDiv.innerHTML = `[${position.coords.latitude}, ${position.coords.longitude}]`
      document.body.appendChild(elemDiv);
    });
  }

  getCoordinates() {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject)
    })
  }

  getTime() {
    var myDate = new Date();
    return myDate.getHours() + ', ' + myDate.getMinutes();
  };

  getDate() {
    var myDate = new Date();
    return myDate.getDate();
  };

  static getCoordinatesNow() {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject)
    })
  }

  static load() {
    console.log('Base module loaded')
    return true;
  }
}

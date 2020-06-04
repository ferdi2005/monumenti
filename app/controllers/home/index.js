// Arguments passed into this controller can be accessed via the `$.args` object directly or:
const Map = require('ti.map');
// $.activityIndicator.hide();
// $.activityIndicator.style = Titanium.UI.ActivityIndicatorStyle.DARK;
$.errorlabel.hide();
function findmon(e) {
  if (Ti.Geolocation.locationServicesEnabled) {
    $.mapview.removeAllCircles();
    var args = e;
    lat = args.coords.latitude;
    lon = args.coords.longitude;
    url = 'https://wlm.puglia.wiki/monuments.json?latitude=' + lat + '&longitude=' + lon;
    // $.activityIndicator.show();
    var circle = $.mapview.addCircle(Map.createCircle({
      radius: 50,
      center: [e.coords.longitude, e.coords.latitude],
      fillColor: "#4289ef"
    }));

    var xhr = Ti.Network.createHTTPClient({
      onload: function (e) {
        var response = JSON.parse(this.responseText);
        $.mapview.removeAllAnnotations();
        $.mapview.region = {
          latitude: response[1][0],
          longitude: response[1][1],
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
          zoomLevel: 10
        };
        $.mapview.center = [args.coords.latitude, args.coords.longitude];

        $.mapview.mapType = Map.NORMAL_TYPE;
        $.mapview.height = Ti.UI.FILL;
        response[0].forEach(function (item) {
          annotation = Map.createAnnotation({
            latitude: item.latitude,
            longitude: item.longitude,
            title: item.itemLabel,
            pincolor: Map.ANNOTATION_RED,
            myid: item.id
          });
          $.mapview.addAnnotation(annotation);
        });
        //  $.activityIndicator.hide();
      },
      onerror: function (e) {
        alert('Errore di connessione: ' + e.error);
        // $.activityIndicator.hide();

      },
      timeout: 15000 // milliseconds
    });
    xhr.open('GET', url);
    xhr.send();
  } else {
    alert('Abilita prima i servizi di localizzazione!');
  }

}

// TODO: Usare l'event listner location
function locate() {
  if (Ti.Geolocation.hasLocationPermissions(Titanium.Geolocation.AUTHORIZATION_WHEN_IN_USE)) {
    Ti.Geolocation.getCurrentPosition(function (e) {
      findmon(e);
    });
  } else {
    Ti.Geolocation.requestLocationPermissions(Ti.Geolocation.AUTHORIZATION_WHEN_IN_USE, function (e) {
      if (e.success) {
        Ti.Geolocation.getCurrentPosition(function (e) {
          findmon(e);
        });
      } else {
        $.errorlabel.show();
        $.mapview.region = {
          latitude: 41.9109,
          longitude: 12.4818,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
          zoomLevel: 10
        };
        $.mapview.mapType = Map.NORMAL_TYPE;
        $.mapview.height = Ti.UI.SIZE;
      }
    });
}}
// setInterval(localize(), 120000);
$.winmap.addEventListener('open', locate);
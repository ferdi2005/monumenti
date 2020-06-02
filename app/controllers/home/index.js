// Arguments passed into this controller can be accessed via the `$.args` object directly or:
const Map = require('ti.map');
$.activityIndicator.hide();
function findmon(e) {
    var args = e;
    lat = args.coords.latitude;
    lon = args.coords.longitude;
    url = 'https://wlm.puglia.wiki/monuments.json?latitude=' + lat + '&longitude=' + lon;
    $.activityIndicator.show();

  var xhr = Ti.Network.createHTTPClient({
        onload: function(e) {
          var response = JSON.parse(this.responseText);
                $.mapview.region = {
                  latitude: response[1][0],
                  longitude: response[1][1], 
                  latitudeDelta: 0.1,
                   longitudeDelta: 0.1
              };
              $.mapview.mapType = Map.NORMAL_TYPE;
              $.mapview.height = Ti.UI.FILL;
            response[0].forEach(function(item)  {
                $.mapview.addAnnotation(Map.createAnnotation({
                latitude: item.latitude,
                longitude: item.longitude,
                title: item.itemLabel,
                pincolor: Map.ANNOTATION_RED,
                myid: item.id
                }));
              });
      $.activityIndicator.hide();
        },
        onerror: function(e) {
          alert('Errore di connessione: ' + e.error);
          $.activityIndicator.hide();
        },
        timeout: 5000 // milliseconds
      });
      xhr.open('GET', url);
        xhr.send();
        
  }


if (Ti.Geolocation.locationServicesEnabled) { 
  Ti.Geolocation.getCurrentPosition(function(e) {
    findmon(e);
  });
} else {
  Ti.Geolocation.requestLocationPermissions(Ti.Geolocation.AUTHORIZATION_WHEN_IN_USE, function() {
    Ti.Geolocation.getCurrentPosition(function(e) {
      findmon(e);
    });
  });
}
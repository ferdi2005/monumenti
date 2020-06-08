// Arguments passed into this controller can be accessed via the `$.args` object directly or:
const Map = require('ti.map');
$.mapview.height = Ti.UI.FILL;
$.searchfield.hide();
$.searchfield.autocorrect = false;
$.searchfield.height = false;
function findmon(e, type) {
  var args = e;
  // TODO: rimuovere le occorrenze di args
  if (type == "geoloc") {
    if (Ti.Geolocation.locationServicesEnabled && (e.coords != null || undefined) && (e.coords.latitude != null || undefined)) {
      $.mapview.removeAllCircles();
      lat = args.coords.latitude;
      lon = args.coords.longitude;
      url = 'https://wlm.puglia.wiki/monuments.json?latitude=' + lat + '&longitude=' + lon;
      // $.activityIndicator.show();
      var circle = $.mapview.addCircle(Map.createCircle({
        radius: 50,
        center: [e.coords.longitude, e.coords.latitude],
        fillColor: "#4289ef"
      }));
    } else {
      alert('Qualcosa è andato storto! Clicca il tasto refresh per aggironare la mappa e assicurati di aver attivato la localizzazione.');
    }
  }
  if (type == "city") {
    url = 'https://wlm.puglia.wiki/monuments.json?city=' + e;
  }

  var xhr = Ti.Network.createHTTPClient({
    onload: function (e) {
      var response = JSON.parse(this.responseText);
      $.mapview.removeAllAnnotations();
      if (response[1] != null && response[1] != undefined && response[1] != "") {
        $.mapview.region = {
          latitude: response[1][0],
          longitude: response[1][1],
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
          zoomLevel: 10
        };
        if (type == "geoloc") {
          $.mapview.center = [args.coords.latitude, args.coords.longitude];
        }
      } else {
        $.mapview.region = {
          latitude: 41.9109,
          longitude: 12.4818,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
          zoomLevel: 10
        };
        alert("Non hai inserito nessuna località o c'è stato un errore nella geolocalizzazione.");
      }

      $.mapview.mapType = Map.NORMAL_TYPE;
      $.mapview.height = Ti.UI.FILL;
      response[0].forEach(function (item) {
        annotation = Map.createAnnotation({
          latitude: item.latitude,
          longitude: item.longitude,
          title: item.itemLabel,
          pincolor: Map.ANNOTATION_RED,
          myid: item.id,
          leftButton: "/images/Info blue.png"
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
}

// TODO: Usare l'event listner location
function locate() {
  if (Ti.Geolocation.hasLocationPermissions(Titanium.Geolocation.AUTHORIZATION_WHEN_IN_USE)) {
    Ti.Geolocation.getCurrentPosition(function (e) {
      findmon(e, "geoloc");
    });
  } else {
    Ti.Geolocation.requestLocationPermissions(Ti.Geolocation.AUTHORIZATION_WHEN_IN_USE, function (e) {
      if (e.success) {
        Ti.Geolocation.getCurrentPosition(function (e) {
          findmon(e, "geoloc");
        });
      } else {
        $.mapview.region = {
          latitude: 41.9109,
          longitude: 12.4818,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
          zoomLevel: 10
        };
        $.mapview.mapType = Map.NORMAL_TYPE;
        $.mapview.height = Ti.UI.SIZE;
        alert("Impossibile localizzarti, non hai dato il permesso alla localizzazione. Cerca una città cliccando sulla lente di ingrandimento oppure abilita la localizzazione dalle impostazioni sulla privacy.");
      }
    });
  }
}
// setInterval(localize(), 120000);
$.winmap.addEventListener('open', locate);
$.winmap.addEventListener('click', function(e){
  if (e.annotation != undefined && e.annotation != null && !e.deselected)  {
    if (e.clicksource == "infoWindow" || e.clicksource == "leftPane" ||  e.clicksource == "leftButton" || e.clicksource == "title") {
      Alloy.Globals.utils.openmodal('home/show', e.annotation.myid);
    }
  }
});

$.refresh.addEventListener('click', function () {
  locate()
});

$.search.addEventListener('click', function () {
  $.searchfield.show();
  $.searchfield.focus();
  $.searchfield.addEventListener('return', function (e) {
    findmon(e.value, "city");
    $.searchfield.hide();
  });
});

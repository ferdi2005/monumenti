// Arguments passed into this controller can be accessed via the `$.args` object directly or:
const Map = require('ti.map');
$.mapview.height = Ti.UI.FILL;
$.searchfield.hide();
$.searchfield.autocorrect = false;
$.activityIndicator.hide();
function findmon(e, type, latkeep, latdelta, londelta) {
  if (latkeep != true) {
    var latdelta = 0.1;
    var londelta = 0.1;
  }
  $.activityIndicator.show();
  var args = e;
  // TODO: rimuovere le occorrenze di args
  if (type == "geoloc") {
    if (Ti.Geolocation.locationServicesEnabled && (e.coords != null || undefined) && (e.coords.latitude != null || undefined)) {
      $.mapview.removeAllCircles();
      lat = args.coords.latitude;
      lon = args.coords.longitude;
      url = 'https://cerca.wikilovesmonuments.it/monuments.json?latitude=' + lat + '&longitude=' + lon;
      // $.activityIndicator.show();
      var circle = $.mapview.addCircle(Map.createCircle({
        radius: 50,
        center: [e.coords.longitude, e.coords.latitude],
        fillColor: "#4289ef",
        opacity: '0.4'
      }));
    } else {
      alert('Qualcosa è andato storto! Clicca il tasto refresh per aggironare la mappa e assicurati di aver attivato la localizzazione.');
    }
  }
  if (type == "city") {
    url = 'https://cerca.wikilovesmonuments.it/monuments.json?city=' + e;
  }

  var xhr = Ti.Network.createHTTPClient({
    onload: function (e) {
      var response = JSON.parse(this.responseText);
      $.mapview.removeAllAnnotations();
      if (response[1] != null && response[1] != undefined && response[1] != "") {
        $.mapview.region = {
          latitude: response[1][0],
          longitude: response[1][1],
          latitudeDelta: latdelta,
          longitudeDelta: londelta
        };
        if (type == "geoloc") {
          $.mapview.center = [args.coords.latitude, args.coords.longitude];
        }
      } else {
        $.mapview.region = {
          latitude: 41.9109,
          longitude: 12.4818,
          latitudeDelta: latdelta,
          longitudeDelta: londelta
        };
        $.mapview.mapType = Map.NORMAL_TYPE;
        $.mapview.height = Ti.UI.FILL;
        alert("Non hai inserito nessuna località o c'è stato un errore nella geolocalizzazione.");
      }

      $.mapview.mapType = Map.NORMAL_TYPE;
      $.mapview.height = Ti.UI.FILL;
      response[0].forEach(function (item) {
        annotation = Map.createAnnotation({
          latitude: item.latitude,
          longitude: item.longitude,
          title: item.itemLabel,
          myid: item.id,
          leftButton: "/images/Info blue.png"
        });
        // Cambia il colore del pin a seconda che ci siano o no fotografie
        if (item.with_photos) {
          annotation.pincolor = Map.ANNOTATION_AZURE;
        } else {
          annotation.pincolor = Map.ANNOTATION_RED;
        }
        $.mapview.addAnnotation(annotation);
      });
      $.activityIndicator.hide();
    },
    onerror: function (e) {
      alert('Errore di connessione: ' + e.error);
      $.activityIndicator.hide();

    },
    timeout: 15000
  });
  xhr.open('GET', url);
  xhr.send();
}

// TODO: Usare l'event listner location
function locate(latkeep, latdelta, londelta) {
  if (latkeep != true) {
    var latdelta = 0.1;
    var londelta = 0.1;
  }
  if (Ti.Geolocation.hasLocationPermissions(Titanium.Geolocation.AUTHORIZATION_WHEN_IN_USE)) {
    Ti.Geolocation.getCurrentPosition(function (e) {
      findmon(e, "geoloc", latkeep, latdelta, londelta);
    });
  } else {
    Ti.Geolocation.requestLocationPermissions(Ti.Geolocation.AUTHORIZATION_WHEN_IN_USE, function (e) {
      if (e.success) {
        Ti.Geolocation.getCurrentPosition(function (e) {
          findmon(e, "geoloc", latkeep, latdelta, londelta);
        });
      } else {
        $.mapview.region = {
          latitude: 41.9109,
          longitude: 12.4818,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1
        };
        $.mapview.mapType = Map.NORMAL_TYPE;
        $.mapview.height = Ti.UI.FILL;
        alert("Impossibile localizzarti, non hai dato il permesso alla localizzazione. Cerca una città cliccando sulla lente di ingrandimento oppure abilita la localizzazione dalle impostazioni sulla privacy.");
      }
    });
  }
}
// setInterval(localize(), 120000);
$.winmap.addEventListener('open', locate);
$.winmap.addEventListener('click', function (e) {
  if (e.annotation != undefined && e.annotation != null && !e.deselected) {
    if (e.clicksource == "infoWindow" || e.clicksource == "leftPane" || e.clicksource == "leftButton" || e.clicksource == "title") {
      Alloy.Globals.utils.openmodal('home/show', e.annotation.myid);
    }
  }
});

$.refresh.addEventListener('click', function () {
  locate(true, $.mapview.region.latitudeDelta, $.mapview.region.longitudeDelta);
});

$.search.addEventListener('click', function () {
  $.searchfield.show();
  $.searchfield.focus();
  if (OS_ANDROID) {
    $.searchfield.height = "20%";
  }
  $.searchfield.addEventListener('return', function (e) {
    findmon(e.value, "city");
    $.searchfield.hide();
    $.searchfield.height = "10%";
    if (OS_ANDROID) {
      Ti.UI.Android.hideSoftKeyboard();
    }
  });
});


$.search.addEventListener('blur', function(e){
  $.searchfield.hide();
  if (OS_ANDROID) {
    Ti.UI.Android.hideSoftKeyboard();
  }
});
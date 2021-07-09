// Arguments passed into this controller can be accessed via the `$.args` object directly or:

if (OS_IOS) {
  var Map = require('ti.map');
}

$.searchfield.hide();
$.searchfield.autocorrect = false;
$.activityIndicator.hide();
var defaultZoom = 14; // Per Android

if (OS_ANDROID) {
  $.osm.height = Ti.UI.FILL;
  $.osm.location = { longitude: 41.9109, latitude: 12.4818, zoomLevel: defaultZoom};
}

if (OS_IOS) {
  $.mapview.mapType = Map.NORMAL_TYPE;
  $.mapview.height = Ti.UI.FILL;
}

function findmon(e, type, latkeep, latdelta, londelta) {
  if (latkeep != true) {
    if (OS_IOS) {
      var latdelta = 0.1;
      var londelta = 0.1;
    }

    if (OS_ANDROID) {
      var latdelta = defaultZoom;
    }
  }
  $.activityIndicator.show();
  var args = e;
  // TODO: rimuovere le occorrenze di args
  if (type == "geoloc") {
    if (Ti.Geolocation.locationServicesEnabled && (e.coords != null || undefined) && (e.coords.latitude != null || undefined)) {
      lat = args.coords.latitude;
      lon = args.coords.longitude;
      url = 'https://cerca.wikilovesmonuments.it/monuments.json?range=30&latitude=' + lat + '&longitude=' + lon;
      $.activityIndicator.show();
    } else {
      alert("Qualcosa è andato storto! Assicurati di aver attivato la localizzazione e riavvia l'applicazione o clicca refresh.");
      $.activityIndicator.hide();
      return
    }
  }
  if (type == "city") {
    url = 'https://cerca.wikilovesmonuments.it/monuments.json?city=' + e;
  }

  var xhr = Ti.Network.createHTTPClient({
    onload: function (e) {
      var response = JSON.parse(this.responseText);
      if (OS_IOS) {
        $.mapview.removeAllAnnotations();
      }

      if (OS_ANDROID) {
        $.osm.clearMarker();
      }

      if (response[1] != null && response[1] != undefined && response[1] != "") {
        if (OS_IOS) {
          $.mapview.region = {
            latitude: response[1][0],
            longitude: response[1][1],
            latitudeDelta: latdelta,
            longitudeDelta: londelta
          };
        }

        if (OS_ANDROID) {
          $.osm.location = {
            latitude: response[1][0],
            longitude: response[1][1],
            zoomLevel: latdelta
          }
        }
        if (type == "geoloc") {
          if (OS_IOS) {
            $.mapview.center = [args.coords.latitude, args.coords.longitude];
          }
        }
      } else {
        // Mappa con ti.map
        if (OS_IOS) {
          $.mapview.region = {
            latitude: 41.9109,
            longitude: 12.4818,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1
        }
      }
        // Mappa con OSM
        if (OS_ANDROID) {
          $.osm.location = { longitude: 41.9109, latitude: 12.4818, zoomLevel: defaultZoom};
        }
        alert("Non hai inserito nessuna località o c'è stato un errore nella geolocalizzazione.");
      }

      if (OS_IOS) {
        response[0].forEach(function (item) {
          annotation = Map.createAnnotation({
            latitude: item.latitude,
            longitude: item.longitude,
            title: item.itemlabel,
            myid: item.id,
            leftButton: "/images/Info ios.png"
          });
          // Cambia il colore del pin a seconda che ci siano o no fotografie
          if (item.with_photos) {
            annotation.pincolor = Map.ANNOTATION_AZURE;
          } else {
            annotation.pincolor = Map.ANNOTATION_RED;
          }
          $.mapview.addAnnotation(annotation);
        });
      }

      if (OS_ANDROID) {
        markers = []
        // Evita di prendere tutti tutti i risultati, che sono moltissimi
        response[0].forEach(function (item) {
          if (item.with_photos) {
            var icon = "/images/Info blue.png";
          } else {
            var icon = "/images/Info red.png";
          }
          markers.push({
            latitude: item.latitude,
            longitude: item.longitude,
            title: item.itemlabel,
            icon: icon,
            id: item.id
          });
        });
        $.osm.addMarkers(markers);
      }
      
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
    if (OS_IOS) {
      var latdelta = 0.1;
      var londelta = 0.1;
    }

    if (OS_ANDROID) {
      var latdelta = defaultZoom;
    }
  }
  
  if (Ti.Geolocation.hasLocationPermissions(Ti.Geolocation.AUTHORIZATION_WHEN_IN_USE) || Ti.Geolocation.hasLocationPermissions(Ti.Geolocation.AUTHORIZATION_ALWAYS)) {
    Ti.Geolocation.getCurrentPosition(function (e) {
      if (e.success) {
        if (OS_ANDROID) {
          findmon(e, "geoloc", latkeep, latdelta);
        }

        if (OS_IOS) {
          findmon(e, "geoloc", latkeep, latdelta, londelta);
        }
      } else {
        if (OS_IOS) {
          $.mapview.region = {
            latitude: 41.9109,
            longitude: 12.4818,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1
          }
        }
        // Mappa con OSM
        if (OS_ANDROID) {
          $.osm.location = { longitude: 41.9109, latitude: 12.4818, zoomLevel: defaultZoom}
        }
        alert("Attiva la geolocalizzazione per usare la mappa.");
      }
    });
  } else {
    Ti.Geolocation.requestLocationPermissions(Ti.Geolocation.AUTHORIZATION_WHEN_IN_USE, function (e) {
      if (e.success) {
        Ti.Geolocation.getCurrentPosition(function (e) {
          if (OS_ANDROID) {
            findmon(e, "geoloc", latkeep, latdelta);
          }

          if (OS_IOS) {
            findmon(e, "geoloc", latkeep, latdelta, londelta);
          }
        });
      } else {

        // Mappa con ti.map
        if (OS_IOS) {
          $.mapview.region = {
            latitude: 41.9109,
            longitude: 12.4818,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1
          }
        }

        // Mappa con OSM
        if (OS_ANDROID) {
          $.osm.location = { longitude: 41.9109, latitude: 12.4818, zoomLevel: defaultZoom}
        }

        alert("Impossibile localizzarti, non hai dato il permesso alla localizzazione. Cerca una città cliccando sulla lente di ingrandimento oppure abilita la localizzazione dalle impostazioni sulla privacy.");
      }
    });
  }
}

$.winmap.addEventListener('open', function(e){

  if (Ti.App.Properties.getBool("flurry", "notset") == "notset") {
    var dialog = Ti.UI.createAlertDialog({
        buttonNames: ['Accetta', 'Rifiuta'],
        message: "Vuoi condividere con lo sviluppatore di quest'applicazione alcuni dati di utilizzo e in particolare di crash, in modo da poter contribuire al miglioramento della stessa, tramite la piattaforma Flurry?",
        title: 'Dati di utilizzo e crash'
      });
      dialog.addEventListener('click', function(e) {
        if (e.index == 0) {
            Ti.App.Properties.setBool("flurry", true);
        } else {
            Ti.App.Properties.setBool("flurry", false);
        }
        locate();
      });
      dialog.show();
  } else {
    locate();
  }
});

if (OS_IOS) {
  // setInterval(localize(), 120000);
  $.winmap.addEventListener('click', function (e) {
    if (e.annotation != undefined && e.annotation != null && !e.deselected) {
      if (e.clicksource == "infoWindow" || e.clicksource == "leftPane" || e.clicksource == "leftButton" || e.clicksource == "title") {
        Alloy.Globals.utils.openmodal('home/show', e.annotation.myid);
      }
    }
  });
}


if (OS_ANDROID) {
  function infoboxClick(e) {
    Alloy.Globals.utils.openmodal('home/show', e.marker.id);
  }

  $.osm.addEventListener("infoboxClick", infoboxClick);
}

$.refresh.addEventListener('click', function(e){
  if (OS_IOS) {
    findmon({coords: {latitude: $.mapview.region.latitude, longitude: $.mapview.region.longitude}}, "geoloc", true, $.mapview.region.latitudeDelta, $.mapview.region.longitudeDelta);
  }

  if (OS_ANDROID) {
    findmon({coords: {latitude: $.osm.location.latitude, longitude: $.osm.location.longitude}}, "geoloc", true, $.osm.location.zoomLevel);
  }
});

function my_location() {
  if (OS_IOS) {
    locate(true, $.mapview.region.latitudeDelta, $.mapview.region.longitudeDelta);
  }

  if (OS_ANDROID) {
    locate(true, $.osm.location.zoomLevel);
  }

  $.searchfield.hide();
  $.searchfield.height = "10%";
  if (OS_ANDROID) {
    Ti.UI.Android.hideSoftKeyboard();
  }
}

$.my_location.addEventListener("click", my_location);

$.search.addEventListener('click', function () {
  $.searchfield.show();
  $.searchfield.focus();
  if (OS_ANDROID) {
    $.searchfield.height = "20%";
  }
  
$.searchfield.addEventListener('return', function (e) {
  if (e.value.trim() == "") {
    home();
  } else {
    findmon(e.value, "city");
    $.searchfield.blur();
    $.searchfield.hide();
    $.searchfield.height = "10%";
    if (OS_ANDROID) {
      Ti.UI.Android.hideSoftKeyboard();
    }
  }
  });
});

$.winmap.addEventListener("blur", function(e){
  $.searchfield.blur();
  $.searchfield.hide();
  $.searchfield.height = "10%";
});

$.search.addEventListener('blur', function(e){
  $.searchfield.hide();
  if (OS_ANDROID) {
    Ti.UI.Android.hideSoftKeyboard();
  }
});

// Arguments passed into this controller can be accessed via the `$.args` object directly or:
if (OS_IOS) {
  var Map = require('ti.map');
}

if (OS_ANDROID) {
  var OSM = require('ti.osm');
}

$.searchfield.hide();
$.searchfield.autocorrect = false;
$.activityIndicator.hide();
var defaultZoom = 9; // Per Android

if (OS_ANDROID) {
  $.osm.height = Ti.UI.FILL;
  $.osm.mapType = OSM.WIKIMEDIA;

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
      url = 'https://cerca.wikilovesmonuments.it/monuments.json?latitude=' + lat + '&longitude=' + lon;
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
            zoom: latdelta
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
          $.osm.location = { longitude: 41.9109, latitude: 41.9109, zoomLevel: 9};
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
      }

      if (OS_ANDROID) {
        response[0].forEach(function (item) {
          $.osm.addMarker({
            latitude: item.latitude,
            longitude: item.longitude,
            title: item.itemlabel,
            icon: "/images/Info blue.png",
            id: item.id
          });
        });
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
      if (OS_ANDROID) {
        findmon(e, "geoloc", latkeep, latdelta);

      }

      if (OS_IOS) {
        findmon(e, "geoloc", latkeep, latdelta, londelta);
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

        // Mappa con OSM
        if (OS_ANDROID) {
          $.osm.location = { longitude: 41.9109, latitude: 41.9109, zoomLevel: 9}
        }

        };
        alert("Impossibile localizzarti, non hai dato il permesso alla localizzazione. Cerca una città cliccando sulla lente di ingrandimento oppure abilita la localizzazione dalle impostazioni sulla privacy.");
      }
    });
  }
}

$.winmap.addEventListener('open', locate);

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
  function markerClick(e) {
    Alloy.Globals.utils.openmodal('home/show', e.marker.id);
  }

  $.osm.addEventListener("infoboxClick", markerClick);
  $.osm.addEventListener("markerClick", markerClick);
}

$.refresh.addEventListener('click', function () {
  if (OS_IOS) {
    locate(true, $.mapview.region.latitudeDelta, $.mapview.region.longitudeDelta);
  }

  if (OS_ANDROID) {
    locate(true, $.osm.zoomLevel);
  }
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

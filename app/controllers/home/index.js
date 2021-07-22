// Arguments passed into this controller can be accessed via the `$.args` object directly or:
if (OS_IOS) {
  var Map = Alloy.Globals.Map;

  if (Ti.UI.userInterfaceStyle == Ti.UI.USER_INTERFACE_STYLE_DARK) {
    $.refresh.backgroundImage = "/images/refresh white.png";
    $.my_location.backgroundImage = "/images/location white.png";
  }
}

if (OS_ANDROID) {
  Ti.App.addEventListener("pause", function(e) {
    $.osm.pause();
  });

  Ti.App.addEventListener("resume", function(e) {
    $.osm.resume();
  });
}

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
      alert(L("error_geolocation"));
      $.activityIndicator.hide();
      return
    }
  }
  if (type == "city") {
    url = 'https://cerca.wikilovesmonuments.it/monuments.json?townid=' + e;
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
        alert(L("error_geolocation"));
      }

      if (OS_IOS) {
        response[0].forEach(function (item) {
          annotation = Map.createAnnotation({
            latitude: item.latitude,
            longitude: item.longitude,
            title: item.itemlabel,
            myid: item.item,
            leftButton: "/images/Info ios.png"
          });
          // Cambia il colore del pin a seconda che ci siano o no fotografie
          if (item.noupload) {
            annotation.pincolor = Map.ANNOTATION_PURPLE;
          } else if (item.tree) {
            if (item.with_photos) {
              annotation.image = "/images/tree blue ios.png";
            } else {
              annotation.image = "/images/tree red ios.png"
            }
          } else {
             if (item.with_photos) {
              annotation.pincolor = Map.ANNOTATION_AZURE;
            } else {
              annotation.pincolor = Map.ANNOTATION_RED;
            }
          }
          $.mapview.addAnnotation(annotation);
        });
      }

      if (OS_ANDROID) {
        markers = []
        // Evita di prendere tutti tutti i risultati, che sono moltissimi
        response[0].forEach(function (item) {
          if (item.noupload) {
            var icon = "/images/Info grey.png"
          } else if (item.with_photos) {
            if (item.tree) {
              var icon = "/images/tree blue android.png";
            } else {
              var icon = "/images/Info blue.png";
            }
          } else {
            if (item.tree) {
              var icon = "/images/tree red android.png";
            } else {
              var icon = "/images/Info red.png";
            }
          }
          markers.push({
            latitude: item.latitude,
            longitude: item.longitude,
            title: item.itemlabel,
            icon: icon,
            id: item.item
          });
        });
        $.osm.addMarkers(markers);
      }
      
      $.activityIndicator.hide();
    },
    onerror: function (e) {
      alert(String.format(L("connection_erorr"), e.error));
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
        alert(L("activate_geolocation"));
      }
    });
  } else {
    Ti.Geolocation.requestLocationPermissions(Ti.Geolocation.AUTHORIZATION_WHEN_IN_USE, function (e) {
      if (e.success || e.authorizationStatus == 3) { // su iOS ritorna success solo quando e.authorizationStatus == 4, anche il 3 per noi va bene.
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

        alert(L("no_geolocation_permission"));
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
        Alloy.Globals.utils.open('home/show', e.annotation.myid);
      }
    }
  });
}


if (OS_ANDROID) {
  function infoboxClick(e) {
    Alloy.Globals.utils.open('home/show', e.marker.id);
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

  if (OS_ANDROID) {
    Ti.UI.Android.hideSoftKeyboard();
  }
}

$.my_location.addEventListener("click", my_location);

Alloy.Globals.events.on("map_close", function(e){
  if (OS_ANDROID) {
    findmon({coords: {latitude: e.latitude, longitude: e.longitude}}, "geoloc", true, $.osm.location.zoomLevel);
  }

  if (OS_IOS) {
    findmon({coords: {latitude: e.latitude, longitude: e.longitude}}, "geoloc", true, $.mapview.region.latitudeDelta, $.mapview.region.longitudeDelta);
  }
});


Alloy.Globals.events.on("set_city", function(e){
  if (OS_IOS) {
    findmon(e.town, "city", true, $.mapview.region.latitudeDelta, $.mapview.region.longitudeDelta);
  }

  if (OS_ANDROID) {
    findmon(e.town, "city", true, $.osm.location.zoomLevel);
  }
});
// Arguments passed into this controller can be accessed via the `$.args` object directly or:
if (OS_IOS) {
    var Map = require('ti.map');
}

var Dialog = require('ti.webdialog');
var Identity = require("ti.identity");

var args = $.args;

if (OS_ANDROID) {
    Ti.App.addEventListener("pause", function(e) {
      $.osm.pause();
    });
  
    Ti.App.addEventListener("resume", function(e) {
      $.osm.resume();
    });
}

// Nasconde tutti i buttons per mostrarli via via.
$.Upload.hide();
$.Upload.height = 0;

$.Info.hide();
$.Info.height = 0;

$.image.hide();
$.image.height = 0;

$.allphotos.hide();
$.allphotos.height = 0;

$.Wikipedia.hide();
$.Wikipedia.height = 0;

$.Osm_button.hide();
$.Osm_button.height = 0;

$.address.hide();
$.address.height = 0;

if(OS_IOS) {
    $.mapview.hide();
}
if(OS_ANDROID) {
    $.osm.hide();
}

// Mostra bottone indietro
if (OS_ANDROID) {
    $.show.activity.onCreateOptionsMenu = function(e) { 
            var menu = e.menu; 
            var menuItem = menu.add({ 
                title: "Back", 
                icon: "images/back.png", 
                showAsAction: Ti.Android.SHOW_AS_ACTION_ALWAYS
            }); 
            menuItem.addEventListener("click", function(e) { 
                $.show.close();
            }); 
        };
}

$.scrollable.width = Ti.UI.SIZE;

// Alert per WLM
var today = new Date();
if (today.getMonth() == 8) { // I mesi in JavaScriptlandia partono da 0
    $.Alert.hide();
    $.Alert.height = 0;
} else {
    $.Alert.show();
    $.Alert.height = Ti.UI.SIZE;
}

$.activityIndicator.show();
var url = "http://cerca.wikilovesmonuments.it/show_by_wikidata.json?item=" + args;
$.scrollable.disableBounce = true;
var client = Ti.Network.createHTTPClient({
    onload: function (e) {
        var response = JSON.parse(this.responseText);

        // L'elemento è indicato con response

        $.show.title = response.itemlabel;
        
        if (response.latitude != null && response.longitude != null) {
            if (OS_IOS) {
                $.mapview.region = {
                    latitude: response.latitude,
                    longitude: response.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01
                };
                $.mapview.center = [response.latitude, response.longitude];
                $.mapview.show();
                $.mapview.addEventListener('click', function (e) {
                    if (e.annotation != undefined && e.annotation != null && !e.deselected) {
                        if (e.clicksource == "pin") {
                            tabgroup.activeTab = 0;
                            Alloy.Globals.events.trigger("map_close", {latitude: response.latitude, longitude: response.longitude, monument_item: args});
                            $.show.close();
                        }
                    }
                    });
                }
                  
            if (OS_ANDROID) {
                $.osm.location = {
                    latitude: response.latitude,
                    longitude: response.longitude,
                    zoomLevel: 15,
                }
                $.osm.show();
            }
        }
        
        if (OS_ANDROID) {
            $.osm.addEventListener("markerClick", function(e){
                tabgroup.activeTab = 0;
                Alloy.Globals.events.trigger("map_close", {latitude: response.latitude, longitude: response.longitude, monument_item: args});
                $.show.close();
            });
        }
        if (response.image != null && response.image != undefined && response.image != "") {
            $.image.image = "https://commons.wikimedia.org/w/thumb.php?f=" + response.image + "&w=500";
            $.image.addEventListener("load", function(e){
                $.image.height = "40%";
                $.image.show();
            });

            $.image.addEventListener("click", function(e) {
                Ti.API.log(decodeURI(response.image));
                var image_url = "https://commons.wikimedia.org/wiki/File:" + decodeURI(response.image).replaceAll("%2C", ",");

                if (Dialog.isSupported()) {
                    if (OS_ANDROID || !Dialog.isOpen()) {
                        Dialog.open({
                            title: response.image,
                            url: image_url,
                            entersReaderIfAvailable: false
                        });
                    }
                } else {
                    Ti.Platform.openURL(image_url);
                }
            });
        }
        if (response.itemdescription != null && response.itemdescription != undefined && response.itemdescription != "") {
            $.description.text = response.itemdescription;
        } else {
            $.description.hide();
            $.description.height = 0;
        }
        if (response.wikipedia != null && response.wikipedia != undefined && response.wikipedia != "") {
            $.Wikipedia.addEventListener("click", function(){
                if (Dialog.isSupported()) {
                    if (OS_ANDROID || !Dialog.isOpen()) {
                        Dialog.open({
                            title: response.itemlabel,
                            url: response.wikipedia
                        });
                    }
                } else {
                    Ti.Platform.openURL(response.wikipedia);
                }     
            });
            $.Wikipedia.show();
            $.Wikipedia.height = Ti.UI.SIZE;
        }
        $.title.text = response.itemlabel;
        // Sistema per il caricamento delle fotografie
        function startPhotoUpload() {
            Ti.Media.openPhotoGallery({
                allowMultiple: true,
                mediaTypes: [Titanium.Media.MEDIA_TYPE_PHOTO],
                cancel: function(e) {
                    alert(L("upload_stopped"));
                },
                error: function(e) {
                    alert(L("no_upload_permission"));
                },
                success: function(e){
                    // Recupero token salvato nel keychain e procedo con la lettura delle informazioni
                    var keychainItem = Identity.createKeychainItem({ identifier: "token" });
                    keychainItem.addEventListener("read", function(k){
                        if (k.success == true) {
                            Alloy.Globals.utils.open("upload/title", [Titanium.Platform.id, k.value, e.images, response.item]);
                        } else {
                            Alloy.Globals.utils.open("upload/config", "delete");
                        }
                    });
                    keychainItem.read();
                }
            });
        }
        $.Upload.addEventListener('click', function (e) {
            if (Ti.App.Properties.getBool("registrato", false) == false || Ti.App.Properties.getBool("autorizzato", false) == false) {
                var window = Alloy.createController("upload/config", "show").getView();
                window.addEventListener("close", function(e){
                    if (Ti.App.Properties.getBool("registrato", false) == false || Ti.App.Properties.getBool("autorizzato", false) == false) {
                        alert(L("signup_not_completed"));
                    } else {
                        if (response.noupload == false) {
                            startPhotoUpload();
                        }
                    }
                });
                tabgroup.activeTab.open(window, {animated: true});     
            } else {
                if (response.noupload == false) {
                    startPhotoUpload();
                }
            }
        });
        // Evita il caricamento di foto di monumenti scaduti
        if (response.noupload == false) {
            $.Upload.height = Ti.UI.SIZE;
            $.Upload.show();
        } else {
            $.Alert.text = L("authorization_expired");
        }
        
        $.Info.addEventListener('click', function (e) {
            var info_url;
            var reasonator_url =  "http://reasonator.toolforge.org/?q=" + response.item + "&lang=" + Ti.Locale.currentLanguage;
            var wikidata_url = "http://www.wikidata.org/wiki/" + response.item + "?uselang=" + Ti.Locale.currentLanguage;
            
            var message = Ti.UI.createAlertDialog({message: String.format(L("more_information"), response.itemlabel), buttonNames: ["Wikidata", "Reasonator"]});
            message.addEventListener("click", function(e){
                switch(e.index) {
                    case 0:
                        info_url = wikidata_url;
                        break;
                    case 1:
                        info_url = reasonator_url;
                        break;
                }

                if (Dialog.isSupported()) {
                    if (OS_ANDROID || !Dialog.isOpen()) {
                        Dialog.open({
                            title: response.itemlabel,
                            url: info_url
                        });
                    }
                } else {
                    Ti.Platform.openURL(info_url);
                }
            });
            message.show();
        });
        $.Info.height = Ti.UI.SIZE;
        $.Info.show();
        
        function openOSMdialog(response, osm_url) {
            if (Dialog.isSupported()) {
                if (OS_ANDROID || !Dialog.isOpen()) {
                    Dialog.open({
                        title: response.itemlabel,
                        url: osm_url
                    });
                }
            } else {
                Ti.Platform.openURL(osm_url);
            }
        }

        function showOSMalert(response, osm_url) {
            var alert = Ti.UI.createAlertDialog({message: String.format(L("choose_mean"), response.itemlabel), buttonNames: [L("by_car"), L("on_foot"), L("by_bike")]});
            alert.addEventListener("click", function(e){
                switch(e.index) {
                    case 0:
                        osm_url += "&engine=graphhopper_car";
                        openOSMdialog(response, osm_url);
                        break;
                    case 1:
                        osm_url += "&engine=graphhopper_foot";
                        openOSMdialog(response, osm_url);
                        break;
                    case 2:
                        osm_url += "&engine=graphhopper_bicycle";
                        openOSMdialog(response, osm_url);
                        break;
                }
            });
            alert.show();
        }
        
        $.allphotos.addEventListener("click", function(e) {
            if (Dialog.isSupported()) {
                    var allphotos_url = response.allphotos;

                    if (OS_ANDROID || !Dialog.isOpen()) {
                    Dialog.open({
                        title: response.itemlabel,
                        url: allphotos_url
                    });
                }
            } else {
                Ti.Platform.openURL(response.wikipedia);
            }
        });
        if (response.with_photos) {
            $.allphotos.show();
            $.allphotos.height = Ti.UI.SIZE;
        }

        if (response.latitude != null && response.longitude != null) {
            $.Osm_button.addEventListener('click', function (e) {                
                if (Ti.Geolocation.hasLocationPermissions(Ti.Geolocation.AUTHORIZATION_WHEN_IN_USE) || Ti.Geolocation.hasLocationPermissions(Ti.Geolocation.AUTHORIZATION_ALWAYS)) {
                    Ti.Geolocation.getCurrentPosition(function (e) {
                        if (e.success) {
                            var osm_url = "https://www.openstreetmap.org/directions?route=" + e.coords.latitude + "," + e.coords.longitude + ";" + response.latitude + "," + response.longitude;

                            showOSMalert(response, osm_url);
                        } else {
                            alert(L("no_geoloc_no_route"));
                        }
                    });
                } else {
                    Ti.Geolocation.requestLocationPermissions(Ti.Geolocation.AUTHORIZATION_WHEN_IN_USE, function (e) {
                        if (e.success || e.authorizationStatus == 3) { // su iOS ritorna success solo quando e.authorizationStatus == 4, anche il 3 per noi va bene.
                            Ti.Geolocation.getCurrentPosition(function (e) {
                                var osm_url = "https://www.openstreetmap.org/directions?route=" + e.coords.latitude + "," + e.coords.longitude + ";" + response.latitude + "," + response.longitude;

                                showOSMalert(response, osm_url);
                            });
                        } else {
                            alert(L("no_geoloc_no_route"));
                        }
                    });
                }
            });
            
            $.Osm_button.show();
            $.Osm_button.height = Ti.UI.SIZE;
            

            if (OS_IOS) {
                var annotation = Map.createAnnotation({
                    latitude: response.latitude,
                    longitude: response.longitude,
                    title: response.itemlabel,
                    myid: response.id
                });
                
                if (response.noupload) {
                    // annotation.pincolor = Map.ANNOTATION_PURPLE;
                    annotation.image = "/images/Info grey ios.png";
                } else if (response.tree) {
                    if (response.with_photos) {
                      if (response.featured || response.quality) {
                        annotation.image = "/images/tree gold ios.png";
                      } else {
                        annotation.image = "/images/tree blue ios.png";
                      }
                    } else {
                      annotation.image = "/images/tree red ios.png";
                    }
                  } else if (response.is_castle) {
                    if (response.with_photos) {
                      if (response.featured || response.quality) {
                        annotation.image = "/images/castle gold ios.png";
                      } else {
                        annotation.image = "/images/castle blue ios.png";
                      }
                    } else {
                      annotation.image = "/images/castle red ios.png";
                    }
                  } else {
                     if (response.with_photos) {
                      if (response.featured || response.quality) {
                        annotation.image = "/images/Info gold ios.png";
                      } else {
                        // annotation.pincolor = Map.ANNOTATION_AZURE;
                        annotation.image = "/images/Info blue ios.png";
                      }
                    } else {
                      // annotation.pincolor = Map.ANNOTATION_RED;
                      annotation.image = "/images/Info red ios.png";
                    }
                  }               
                $.mapview.addAnnotation(annotation);
            }

            if (OS_ANDROID) {
                if (response.noupload) {
                    var icon = "/images/Info grey.png"
                  } else if (response.with_photos) {
                    if (response.tree) {
                      if (response.featured || response.quality) {
                        var icon = "/images/tree gold android.png";
                      } else {
                        var icon = "/images/tree blue android.png";
                      }
                    } else if (response.is_castle) {
                      if (response.featured || response.quality) {
                        var icon = "/images/castle gold android.png";
                      } else {
                        var icon = "/images/castle blue android.png";
                      }
                    } else {
                      if (response.featured || response.quality) {
                        var icon = "/images/Info gold.png";
                      } else {
                        var icon = "/images/Info blue.png";
                      }
                    }
                  } else {
                    if (response.tree) {
                      var icon = "/images/tree red android.png";
                    } else if (response.is_castle) {
                      var icon = "/images/castle red android.png";
                    } else {
                      var icon = "/images/Info red.png";
                    }
                  }                            
                  
                var markers = [];
                markers.push({
                    latitude: response.latitude,
                    longitude: response.longitude,
                    title: response.itemlabel,
                    id: response.id,
                    icon: icon
                });
                $.osm.addMarkers(markers);
            }
        }

        
        if (response.address != null && response.address != undefined && response.address != "") {
            $.address.text = response.address;
            $.address.show();
            $.address.height = Ti.UI.SIZE;

            $.activityIndicator.hide();
        } else {
            /* Ti.Geolocation.reverseGeocoder(response.latitude, response.longitude, function (e) {
                if (e.success) {
                    $.address.text = e.places[0].address;
                    $.address.show();
                    $.activityIndicator.hide();
                } else {
                    $.address.hide();
                    $.activityIndicator.hide();
                }
            }); */
            var url = "http://cerca.wikilovesmonuments.it/address.json?id=" + response.id;
            var client = Ti.Network.createHTTPClient({
                onload: function (e) {
                    $.address.text = this.responseText;
                    $.address.show();
                    $.address.height = Ti.UI.SIZE;

                    $.activityIndicator.hide();
                },
                onerror: function (e) {
                    $.address.hide();
                    $.activityIndicator.hide();
                    // Fallisce silenziosamente
                },
                timeout: 5000
            });
            client.open("GET", url);
            client.send();
        }
    },
    onerror: function (e) {
        alert(String.format(L("connection_error"), e.error));
        $.activityIndicator.hide();
        $.show.close();
    },
    timeout: 50000
});
client.open("GET", url);
client.send();
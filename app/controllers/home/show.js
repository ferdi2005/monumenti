// Arguments passed into this controller can be accessed via the `$.args` object directly or:
const Map = require('ti.map');
const Dialog = require('ti.webdialog');
const Identity = require("ti.identity");

var args = $.args;

// Nasconde tutti i buttons per mostrarli via via.
$.Upload.hide();
$.Info.hide();
$.Wikipedia.hide();
$.Osm_button.hide();
$.address.hide();
if(OS_ANDROID) {
    $.osm.hide();
}

var today = new Date();
$.scrollable.width = Ti.UI.SIZE;
if (today.getMonth() == 8) { // I mesi in JavaScriptlandia partono da 0
    $.Alert.hide();
} else {
    $.Alert.show();
}

$.activityIndicator.show();
var url = "http://cerca.wikilovesmonuments.it/show.json?id=" + args;
$.scrollable.disableBounce = true;
var client = Ti.Network.createHTTPClient({
    onload: function (e) {
        var response = JSON.parse(this.responseText);

        // L'elemento è indicato con response

        $.window.title = response.itemlabel;

        if (OS_ANDROID) {
            $.window.addEventListener("open", function(){
                $.window.activity.actionBar.title = response.itemlabel;
            });
        }
        
        if (OS_IOS) {
            $.mapview.region = {
                latitude: response.latitude,
                longitude: response.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
            };
            $.mapview.center = [response.latitude, response.longitude];
        }

        if (OS_ANDROID) {
            $.osm.location = {
                latitude: response.latitude,
                longitude: response.longitude,
                zoomLevel: 15,
            }
            $.osm.show();
        }
        
        if (response.image != null && response.image != undefined && response.image != "") {
            $.image.image = "https://commons.wikimedia.org/w/thumb.php?f=" + response.image + "&w=1000";
        }
        if (response.itemdescription != null && response.itemdescription != undefined && response.itemdescription != "") {
            $.description.text = response.itemdescription;
        } else {
            $.description.hide();
        }
        if (response.wikipedia != null && response.wikipedia != undefined && response.wikipedia != "") {
            $.Wikipedia.addEventListener("click", function(){
                if (Dialog.isSupported()) {
                    Dialog.open({
                        title: response.itemlabel,
                        url: response.wikipedia
                    })
                } else {
                    Ti.Platform.openURL(response.wikipedia);
                }     
            });
            $.Wikipedia.show();
        }
        $.title.text = response.itemlabel;
        // Sistema per il caricamento delle fotografie
        function startPhotoUpload() {
            Ti.Media.openPhotoGallery({
                allowMultiple: true,
                mediaTypes: [Titanium.Media.MEDIA_TYPE_PHOTO],
                cancel: function(e) {
                    alert("Hai annullato il caricamento delle foto")
                },
                error: function(e) {
                    alert("Potresti non aver concesso l'autorizzazione ad accedere alla galleria foto. Verifica.")
                },
                success: function(e){
                    // Recupero token salvato nel keychain e procedo con la lettura delle informazioni
                    var keychainItem = Identity.createKeychainItem({ identifier: "token" });
                    keychainItem.addEventListener("read", function(k){
                        if (k.success == true) {
                            Alloy.Globals.utils.open("upload/title", [Titanium.Platform.id, k.value, e.images, response.item]);
                        } else {
                            alert("Si è verificato un errore con la lettura del keychain, riprova più tardi.")
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
                        alert("Non hai completato la registrazione! Effettua il login con Wikimedia Commons per caricare le fotografie.")
                    } else {
                        startPhotoUpload();
                    }
                });
                tabgroup.activeTab.open(window, {modal: true, animated: true});     
            } else {
                startPhotoUpload();
            }
        });
        $.Upload.show();
        $.Info.addEventListener('click', function (e) {
            var info_url;
            var reasonator_url =  "http://reasonator.toolforge.org/?q=" + response.item + "&lang=it";
            var wikidata_url = "http://www.wikidata.org/wiki/" + response.item;
            
            var alert = Ti.UI.createAlertDialog({message: "Maggiori informazioni su " + response.itemlabel, buttonNames: ["Wikidata", "Reasonator"]});
            alert.addEventListener("click", function(e){
                switch(e.index) {
                    case 0:
                        info_url = wikidata_url;
                        break;
                    case 1:
                        info_url = reasonator_url;
                        break;
                }

                if (Dialog.isSupported()) {
                    Dialog.open({
                        title: response.itemlabel,
                        url: info_url
                    });
                } else {
                    Ti.Platform.openURL(info_url);
                }
            });
            alert.show();
        });
        $.Info.show();
    
        function showOSMalert(response, osm_url) {
            var alert = Ti.UI.createAlertDialog({message: "Come vuoi raggiungere " + response.itemlabel + "?", buttonNames: ["In auto", "A piedi", "In bici"]});
            alert.addEventListener("click", function(e){
                switch(e.index) {
                    case 0:
                        osm_url += "&engine=graphhopper_car";
                        break;
                    case 1:
                        osm_url += "&engine=graphhopper_foot";
                        break;
                    case 2:
                        osm_url += "&engine=graphhopper_bicycle";
                        break;
                }

                if (Dialog.isSupported()) {
                    Dialog.open({
                        title: response.itemlabel,
                        url: osm_url
                    });
                } else {
                    Ti.Platform.openURL(osm_url);
                }
            });
            alert.show();
        }

        $.Osm_button.addEventListener('click', function (e) {
            var osm_url; // Dichiaro la variabile url, che sarà popolata in vari modi a seconda della situazione
            
            if (Ti.Geolocation.hasLocationPermissions(Ti.Geolocation.AUTHORIZATION_WHEN_IN_USE) || Ti.Geolocation.hasLocationPermissions(Ti.Geolocation.AUTHORIZATION_ALWAYS)) {
                Ti.Geolocation.getCurrentPosition(function (e) {
                    if (e.success) {
                        osm_url = "https://www.openstreetmap.org/directions?route=" + e.coords.latitude + "%2C" + e.coords.longitude + "%3B" + response.latitude + "%2C" + response.longitude;

                        showOSMalert(response, osm_url);
                    } else {
                        alert("Senza geolocalizzazione attiva non sono in grado di tracciare un percorso!");
                    }
                });
            } else {
                Ti.Geolocation.requestLocationPermissions(Ti.Geolocation.AUTHORIZATION_WHEN_IN_USE, function (e) {
                    if (e.success) {
                        Ti.Geolocation.getCurrentPosition(function (e) {
                            osm_url = "https://www.openstreetmap.org/directions?route=" + e.coords.latitude + "%2C" + e.coords.longitude + "%3B" + response.latitude + "%2C" + response.longitude;

                            showOSMalert(response, osm_url);
                        });
                    } else {
                        alert("Senza autorizzazione alla posizione non sono in grado di tracciare un percorso!");
                    }
                });
            }
            
        });
        
        $.Osm_button.show();

        if (OS_IOS) {
            var annotation = Map.createAnnotation({
                latitude: response.latitude,
                longitude: response.longitude,
                title: response.itemlabel,
                myid: response.id
            });
            
            $.mapview.addAnnotation(annotation);
        }

        if (OS_ANDROID) {
            if (response.with_photos) {
                if (response.tree) {
                  var icon = "/images/tree blue.png";
                } else {
                  var icon = "/images/Info blue.png";
                }
              } else {
                if (response.tree) {
                  var icon = "/images/tree red.png";
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

        if (response.address != null && response.address != undefined && response.address != "") {
            $.address.text = response.address;
            $.address.show();
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
        alert('Errore di rete, tornare indietro: ' + e.error);
        $.activityIndicator.hide();
    },
    timeout: 50000
});
client.open("GET", url);
client.send();
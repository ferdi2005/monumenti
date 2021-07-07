// Arguments passed into this controller can be accessed via the `$.args` object directly or:
const Map = require('ti.map');
const Dialog = require('ti.webdialog');
const Identity = require("ti.identity");

var args = $.args;

// Nasconde tutti i buttons per mostrarli via via.
$.Upload.hide();
$.Wikidata.hide();
$.Wikipedia.hide();
$.Osm.hide();
$.Reasonator.hide();

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
        $.Upload.addEventListener('click', function (e) {
            if (Ti.App.Properties.getBool("registrato", false) == false || Ti.App.Properties.getBool("autorizzato", false) == false) {
                Alloy.Globals.utils.open('upload/config'); //TODO: implementare dall'altro lato
            } else {
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
        });
        $.Upload.show();
        $.Wikidata.addEventListener('click', function (e) {
            if (Dialog.isSupported()) {
                Dialog.open({
                    title: response.item,
                    url: "http://www.wikidata.org/wiki/" + response.item
                })
            } else {
                Ti.Platform.openURL("http://www.wikidata.org/wiki/" + response.item);
            }
        });
        $.Wikidata.show();
        $.Reasonator.addEventListener('click', function (e) {
            if (Dialog.isSupported()) {
                Dialog.open({
                    title: response.item,
                    url: "http://reasonator.toolforge.org/?q=" + response.item + "&lang=it"
                })
            } else {
                Ti.Platform.openURL("http://reasonator.toolforge.org/?q=" + response.item + "&lang=it");
            }
        });
        if (!OS_IOS) {
            $.Reasonator.show();
        }
        $.Osm.addEventListener('click', function (e) {
            if (Ti.Geolocation.hasLocationPermissions(Ti.Geolocation.AUTHORIZATION_WHEN_IN_USE) || Ti.Geolocation.hasLocationPermissions(Ti.Geolocation.AUTHORIZATION_ALWAYS)) {
                Ti.Geolocation.getCurrentPosition(function (e) {
                    if (Dialog.isSupported()) {
                        Dialog.open({
                            title: response.item,
                            url: "http://www.openstreetmap.org/directions?route=" + e.coords.latitude + "%2C" + e.coords.longitude + "%3B" + response.latitude + "%2C" + response.longitude
                        }) } else {
                    Ti.Platform.openURL("http://www.openstreetmap.org/directions?route=" + e.coords.latitude + "%2C" + e.coords.longitude + "%3B" + response.latitude + "%2C" + response.longitude);
                        }
                });
            } else {
                Ti.Geolocation.requestLocationPermissions(Ti.Geolocation.AUTHORIZATION_WHEN_IN_USE, function (e) {
                    if (e.success) {
                        Ti.Geolocation.getCurrentPosition(function (e) {
                            if (Dialog.isSupported()) {
                                Dialog.open({
                                    title: response.item,
                                    url: "http://www.openstreetmap.org/directions?route=" + e.coords.latitude + "%2C" + e.coords.longitude + "%3B" + response.latitude + "%2C" + response.longitude
                                }) } else {
                            Ti.Platform.openURL("http://www.openstreetmap.org/directions?route=" + e.coords.latitude + "%2C" + e.coords.longitude + "%3B" + response.latitude + "%2C" + response.longitude);
                                }
                        });
                    } else {
                        if (Dialog.isSupported()) {
                            Dialog.open({
                                title: response.item,
                                url: "http://www.openstreetmap.org/directions"
                            });
                        } else {
                        Ti.Platform.openURL("http://www.openstreetmap.org/directions");
                        }
                    }
                });
            }
        });
        if (!OS_IOS) {
            $.Osm.show();
        }

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
                var icon = "/images/Info blue.png";
            } else {
                var icon = "/images/Info red.png";
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
            Ti.Geolocation.reverseGeocoder(response.latitude, response.longitude, function (e) {
                if (e.success) {
                    $.address.show();
                    $.address.text = e.places[0].address;
                    $.activityIndicator.hide();
                } else {
                    $.address.hide();
                    $.activityIndicator.hide();
                }
            });
        }
        /* if (OS_IOS) {
            var url = "http://cerca.wikilovesmonuments.it/address.json?id=" + args;
            var client = Ti.Network.createHTTPClient({
                onload: function (e) {
                    $.address.show();
                    $.address.text = this.responseText;
                    $.activityIndicator.hide();
                },
                onerror: function (e) {
                    alert('Errore nel ritrovare indirizzo: ' + e.error);
                },
                timeout: 5000
            });
            client.open("GET", url);
            client.send();


        } */

    },
    onerror: function (e) {
        alert('Errore di rete, tornare indietro: ' + e.error);
        $.activityIndicator.hide();
    },
    timeout: 50000
});
client.open("GET", url);
client.send();
// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
$.listview.hide();
$.activityIndicator.hide();

// Codice da Shima, licenza CC-BY-SA, vedi https://stackoverflow.com/questions/39654196/calculate-distance-between-two-latitude-longitude-points-titanium

function getDistance(lat1, lon1, lat2, lon2) { 
    var radlat1 = Math.PI * lat1 / 180;
    var radlat2 = Math.PI * lat2 / 180;
    var theta = lon1 - lon2;
    var radtheta = Math.PI * theta / 180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515;
    dist = dist * 1.609344;
    dist = dist.toFixed(2);
    return dist;
}

function search(value, user_initiated) {
    $.activityIndicator.show();

    var url = 'http://cerca.wikilovesmonuments.it/namesearch.json?search=' + encodeURI(value);
    var xhr = Ti.Network.createHTTPClient({
        onload: function(e) {
            var location;
            var located;

            response = JSON.parse(this.responseText);

            if (Ti.Geolocation.hasLocationPermissions(Ti.Geolocation.AUTHORIZATION_WHEN_IN_USE) || Ti.Geolocation.hasLocationPermissions(Ti.Geolocation.AUTHORIZATION_ALWAYS)) {
                Ti.Geolocation.getCurrentPosition(function (e) {
                    if (e.success) {
                        location = e;
                        located = true;
                    } else {
                        located = false;
                    }
                });
            } else {
                Ti.Geolocation.requestLocationPermissions(Ti.Geolocation.AUTHORIZATION_WHEN_IN_USE, function (e) {
                    if (e.success) {
                        Ti.Geolocation.getCurrentPosition(function (e) {
                            if (e.success) {
                                location = e;
                                located = true;
                            } else {
                                located = false;
                            }
                        });
                    } else {
                        located = false;
                    }
                });
            }

            if (response.length > 0) {
                data = []
                response.forEach(function (item) {
                    var title;

                    // Ottengo la distanza tra elementi
                    if (located && item.latitude != null && item.longitude != null) {
                        title = item.itemlabel + " (" + getDistance(location.coords.latitude, location.coords.longitude, item.latitude, item.longitude) + " km)";
                    } else {
                        title = item.itemlabel;
                    }
                                                
                    itemdata =  { 
                        properties: {
                            itemId: item.id,
                            title: title ,
                            accessoryType: Ti.UI.LIST_ACCESSORY_TYPE_NONE,
                            color: '#000000',
                            backgroundColor: '#FFFFFF',
                            latitude: item.latitude,
                            longitude: item.longitude
                        }
                    }
                    data.push(itemdata);
                });
                
                if ($.listsection.items != data) {
                    data = data.sort(function(a,b){
                        return getDistance(location.coords.latitude, location.coords.longitude, a.properties.latitude, a.properties.longitude) - getDistance(location.coords.latitude, location.coords.longitude, b.properties.latitude, b.properties.longitude);
                    })
                    $.listsection.setItems(data);
                }
                $.listview.show();
                $.activityIndicator.hide();
            } else {
                if (user_initiated) {
                    alert("Nessun risultato trovato! Prova a fare un'altra ricerca");
                }
                $.activityIndicator.hide();
            }

        },
        onerror: function(e) {
            alert('Errore di connessione' + e.error);
            $.activityIndicator.hide();
        },
        timeout: 50000
    });
    xhr.open('GET', url);
    xhr.send();
}

$.listview.addEventListener('itemclick', function(e){
    var window = Alloy.createController('home/show', e.itemId).getView();
    tabgroup.activeTab.open(window);
});

$.winsearch.addEventListener('open', function(){
    $.searchfield.addEventListener('return', function (e) {
        if (e.value.length < 3) {
            alert("Inserisci minimo 3 caratteri per effettuare una ricerca.");
        } else if (e.value.length < 5) {
            search(e.value, true);
        }
        $.searchfield.blur();
        if (OS_ANDROID) {
            Ti.UI.Android.hideSoftKeyboard();
        }
    });

    $.searchfield.addEventListener("change", function(e){
        if (e.value.length >= 5) {
            search(e.value, false)
        }
    })
 });

if (OS_ANDROID) {
    $.winsearch.addEventListener('blur', function(){
        $.searchfield.blur();
        Ti.UI.Android.hideSoftKeyboard();
    });
}

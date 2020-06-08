// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var today = new Date();
if (today.getMonth() == 9) {
    $.Alert.hide();
} else {
    $.Alert.show();
}
var url = "https://wlm.puglia.wiki/show.json?id=" + args;
$.scrollable.disableBounce = true;
var client = Ti.Network.createHTTPClient({
    onload: function (e) {
        var response = JSON.parse(this.responseText);
        if (response.image != null && response.image != undefined && response.image != "") {
            $.image.defaultImage = "/images/spin.gif";
            $.image.image = "https://commons.wikimedia.org/w/thumb.php?f=" + response.image + "&w=1000";
        }
        if (response.itemDescription != null && response.itemDescription != undefined && response.itemDescription != "") {
            $.description.text = response.itemDescription;
        } else {
            $.description.hide();
        }
        $.title.text = response.itemLabel;
        $.Wikidata.addEventListener('click', function (e) {
            Ti.Platform.openURL("https://www.wikidata.org/wiki/" + response.item);
        });
        $.Commons.addEventListener('click', function (e) {
            Ti.Platform.openURL("https://commons.wikimedia.org/w/index.php?title=Special:UploadWizard&campaign=wlm-it&id=" + response.wlmid + "&uselang=it&descriptionlang=it&lat=" + response.latitude + "&lon=" + response.longitude + "&categories=Images+from+Wiki+Loves+Monuments+" + today.getFullYear() + "+in+Italy");
        });
        $.Osm.addEventListener('click', function (e) {
            if (Ti.Geolocation.hasLocationPermissions(Titanium.Geolocation.AUTHORIZATION_WHEN_IN_USE)) {
                Ti.Geolocation.getCurrentPosition(function (e) {
                    Ti.Platform.openURL("https://www.openstreetmap.org/directions?route=" + e.coords.latitude + "%2C" + e.coords.longitude + "%3B" + response.latitude + "%2C" + response.longitude);
                });
            } else {
                Ti.Geolocation.requestLocationPermissions(Ti.Geolocation.AUTHORIZATION_WHEN_IN_USE, function (e) {
                    if (e.success) {
                        Ti.Geolocation.getCurrentPosition(function (e) {
                            Ti.Platform.openURL("https://www.openstreetmap.org/directions?route=" + e.coords.latitude + "%2C" + e.coords.longitude + "%3B" + response.latitude + "%2C" + response.longitude);
                        });
                    } else {
                        Ti.Platform.openURL("https://www.openstreetmap.org/directions");
                    }
                });
            }
        });

        Ti.Geolocation.reverseGeocoder(response.latitude, response.longitude, function (e) {
            if (e.success) {
                $.address.show();
                $.address.text = e.places[0].address;
            } else {
                $.address.hide();
            }
        });

    },
    onerror: function (e) {
        alert('Errore di rete: ' + e.error);
    },
    timeout: 5000
});
client.open("GET", url);
client.send();
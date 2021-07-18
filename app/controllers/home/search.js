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


function setMonumentsData(response, user_initiated, located = false, location){
    if (response.length > 0) {
        data = []
        response.forEach(function (item) {
            var title;
            // Ottengo la distanza tra elementi
            if (located == true && item.latitude != null && item.longitude != null) {
                title = item.itemlabel + " (" + getDistance(location.coords.latitude, location.coords.longitude, item.latitude, item.longitude) + " km)";
            } else {
                title = item.itemlabel;
            }
                                        
            itemdata =  { 
                properties: {
                    itemId: "monument" + item.item,
                    title: title ,
                    accessoryType: Ti.UI.LIST_ACCESSORY_TYPE_NONE
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
            alert(L("no_results_found"));
        }
        $.listsection.setItems([]);
        $.activityIndicator.hide();
    }
}

function searchTowns(value, user_initiated) {
    $.activityIndicator.show();
    
    var url = 'http://cerca.wikilovesmonuments.it/towns/search.json?query=' + encodeURI(value);
    var xhr = Ti.Network.createHTTPClient({
        onload: function(e) {
            response = JSON.parse(this.responseText);

            if (response.length > 0) {
                data = []

                response.forEach(function(town) {
                    itemdata =  { 
                        properties: {
                            itemId: "town" + town.item,
                            title: town.visible_name,
                            accessoryType: Ti.UI.LIST_ACCESSORY_TYPE_NONE,
                        }
                    }
                    data.push(itemdata);   
                });

                if ($.listsection.items != data) {
                    $.listsection.setItems(data);
                }

                $.listview.show();
                $.activityIndicator.hide();
                
            } else {
                if (user_initiated) {
                    alert(L("no_results_found"));
                }
                $.listsection.setItems([]);
                $.activityIndicator.hide();
        }

        },
        onerror: function(e) {
            alert(String.format(L("connection_erorr"), e.error));
            $.activityIndicator.hide();
        },
        timeout: 50000
    });
    xhr.open('GET', url);
    xhr.send();
}

function searchMonuments(value, user_initiated) {
    $.activityIndicator.show();
    
    var url = 'http://cerca.wikilovesmonuments.it/namesearch.json?search=' + encodeURI(value);
    var xhr = Ti.Network.createHTTPClient({
        onload: function(e) {
            response = JSON.parse(this.responseText);

            if (Ti.Geolocation.hasLocationPermissions(Ti.Geolocation.AUTHORIZATION_WHEN_IN_USE) || Ti.Geolocation.hasLocationPermissions(Ti.Geolocation.AUTHORIZATION_ALWAYS)) {
                Ti.Geolocation.getCurrentPosition(function (e) {
                    if (e.success) {
                        setMonumentsData(response, user_initiated, true, e);
                    } else {
                        setMonumentsData(response, user_initiated);
                    }
                });
            } else {
                Ti.Geolocation.requestLocationPermissions(Ti.Geolocation.AUTHORIZATION_WHEN_IN_USE, function (e) {
                    if (e.success) {
                        Ti.Geolocation.getCurrentPosition(function (e) {
                            if (e.success) {
                                setMonumentsData(response, user_initiated, true, e);
                            } else {
                                setMonumentsData(response, user_initiated);
                            }
                        });
                    } else {
                        setMonumentsData(response, user_initiated);
                    }
                });
            }

        },
        onerror: function(e) {
            alert(String.format(L("connection_erorr"), e.error));
            $.activityIndicator.hide();
        },
        timeout: 50000
    });
    xhr.open('GET', url);
    xhr.send();
}

$.listview.addEventListener('itemclick', function(e){
    if (e.itemId.startsWith("monument")) {
        var window = Alloy.createController('home/show', e.itemId.replace("monument", "")).getView();
        tabgroup.activeTab.open(window);
    } else if (e.itemId.startsWith("town")) {
        tabgroup.activeTab = 0;
        Alloy.Globals.events.trigger("set_city", {town: e.itemId.replace("town", "")})
    }
});

$.winsearch.addEventListener('open', function(){
    // Setup iniziale della selezione
    $.listsection.headerTitle = L('list_section_monuments_header');
    $.searchfield.hintText = L("monument_searchfield");
    $.optionbar.index = 0;

    $.searchfield.addEventListener('return', function (e) {
        if (e.value.length < 3) {
            alert(L("minimum_char"));
        } else if (e.value.length < 5) {
            if ($.optionbar.index == 0) {
                searchMonuments(e.value, true);
            } else {
                searchTowns(e.value, true);
            }
        }
        $.searchfield.blur();
        if (OS_ANDROID) {
            Ti.UI.Android.hideSoftKeyboard();
        }
    });

    $.searchfield.addEventListener("change", function(e){
        if (e.value.length >= 5) {
            if ($.optionbar.index == 0) {
                searchMonuments(e.value, false)
            } else {
                searchTowns(e.value, false);
            }
        }
    });

    setFields();
 });

$.winsearch.addEventListener('blur', function(){
    $.searchfield.blur();
    if (OS_ANDROID) {
        Ti.UI.Android.hideSoftKeyboard();
    }
    $.listview.hide();
});

function setFields(){
    if ($.optionbar.index == 0) {
        $.listsection.headerTitle = L('list_section_monuments_header');
        $.searchfield.hintText = L("monument_searchfield");
    } else {
        $.listsection.headerTitle = L('list_section_towns_header');
        $.searchfield.hintText = L("town_searchfield");
    }
    $.listsection.setItems([]);
    $.activityIndicator.hide();
    $.searchfield.value = "";
    $.searchfield.blur();
    if (OS_ANDROID) {
        Ti.UI.Android.hideSoftKeyboard();
    }
}

$.optionbar.addEventListener("click", setFields);

$.winsearch.addEventListener("focus", setFields);
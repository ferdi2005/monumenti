tabgroup = $.index;
Ti.Geolocation.requestLocationPermissions(Ti.Geolocation.AUTHORIZATION_WHEN_IN_USE, function(e) {
    if(e.success) {
        $.index.open();
    } else {
        alert('Attenzione! Non concedendo la geolocalizzazione, non potremo localizzarti e trovare i monumenti vicino a te.');
        $.index.open();
    }
});
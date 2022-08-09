// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

$.button.addEventListener("click", function(e) {
    Ti.Geolocation.requestLocationPermissions(Ti.Geolocation.AUTHORIZATION_WHEN_IN_USE, function (e) {
        if (!e.success && e.authorizationStatus != 3) { // su iOS ritorna success solo quando e.authorizationStatus == 4, anche il 3 per noi va bene.
            alert(L("no_geoloc_no_route"));
        }
        Ti.App.Properties.setInt("onboarding_status", 2);

        Alloy.Globals.utils.open("onboarding/stats", {animated: false});
        $.location.close({animated: false});
    });
});


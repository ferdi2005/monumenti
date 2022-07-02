// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

function set_analytics() {
    Ti.App.addEventListener("uncaughtException", function(e) {
        JSON.stringify(e);
        var url = Alloy.Globals.backend + "/analytics/crash.json?data=" + JSON.stringify(e);

        if (Ti.App.Properties.getBool("analytics", "notset") == true) {
            url += "&uuid=" + Titanium.Platform.id + "&device_name=" + String(Titanium.Platform.username) + "&os=" + Titanium.Platform.osname + "&os_version=" + Titanium.Platform.version + "&model=" + Titanium.Platform.model;
        }

        var xhr = Ti.Network.createHTTPClient({
            onload: function() {
                Ti.API.info("Analytics sent");
            },
            onerror: function() {
                Ti.API.error("Analytics error");
            },
            timeout: 5000
        });
        xhr.open("GET", url);
        xhr.send();
    });
}

function do_close() {
    Ti.App.Properties.setInt("onboarding_status", 3);
    Alloy.Globals.utils.open("onboarding/faq");
    $.stats.close({animated: false});
}
$.yes.addEventListener("click", function(){
    Ti.App.Properties.setBool("analytics", true);
    set_analytics();
    do_close();
});

$.no.addEventListener("click", function(){
    Ti.App.Properties.setBool("analytics", false);
    do_close();
})


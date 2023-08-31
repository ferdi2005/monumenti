global.tabgroup = $.index;

var url = Alloy.Globals.backend + '/analytics/version.json?old_version=' + Ti.App.version;

if (Ti.App.Properties.getBool("analytics", "notset") == true) {
    url += "&uuid=" + Titanium.Platform.id + "&device_name=" + String(Titanium.Platform.username) + "&os=" + Titanium.Platform.osname + "&os_version=" + Titanium.Platform.version + "&model=" + Titanium.Platform.model;
}

// AVVISO DI CHUISURA APPLICAZIONE

var dialog = Ti.UI.createAlertDialog({
    message: L("farewell"),
    ok: L("farewell_cta"),
    canceledOnTouchOutside: false,
    persistent: true
});
dialog.show();

dialog.addEventListener('click', function(e) {
    Ti.Platform.openURL("https://app.wikilovesmonuments.it");
    dialog.show();
});

/*
var xhr = Ti.Network.createHTTPClient({
    onload: function(e) {
        response = JSON.parse(this.responseText);
        if (!response.updated) {
            var dialog = Ti.UI.createAlertDialog({
                message: String.format(L("update_app"), Ti.App.version, response.app_version),
                okid: "ok",
            });
            dialog.addEventListener('click', function(e) {
                $.index.open();
            });
            dialog.show();            
        } else { 
            $.index.open();
        }
    },
    onerror: function(e) {
        $.index.open();
    },
    timeout: 5000
});
xhr.open('GET', url);
xhr.send();

// Evita chiusure accidentali dell'app col back
$.index.onBack = function(e) {
    var dialog = Ti.UI.createAlertDialog({
        buttonNames: [L("no"), L("yes")],
        messageid: "close_app_ask"
        });
    dialog.addEventListener('click', function(e) {
        if (e.index == 1) {
            $.index.close();
        }
    });
    dialog.show();
}
*/
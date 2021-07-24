global.tabgroup = $.index;

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
function check_and_show_analytics() {
    Ti.API.log(Ti.App.Properties.getBool("analytics", "notset"));
    if (Ti.App.Properties.getBool("analytics", "notset") == "notset") {
        var analytics = Ti.UI.createAlertDialog({
            buttonNames: [L("accept"), L("refuse")],
            messageid: "analytics_ask",
            titleid: 'analytics_title'
          });
        analytics.addEventListener('click', function(e) {
            if (e.index == 0) {
                Ti.App.Properties.setBool("analytics", true);
                set_analytics();
                $.index.open();
            } else {
                Ti.App.Properties.setBool("analytics", false);
                $.index.open();
            }
        });
        analytics.show();
    } else {
        $.index.open();
    }
}

var url = Alloy.Globals.backend + '/analytics/version.json?old_version=' + Ti.App.version;

if (Ti.App.Properties.getBool("analytics", "notset") == true) {
    url += "&uuid=" + Titanium.Platform.id + "&device_name=" + String(Titanium.Platform.username) + "&os=" + Titanium.Platform.osname + "&os_version=" + Titanium.Platform.version + "&model=" + Titanium.Platform.model;
}

var xhr = Ti.Network.createHTTPClient({
    onload: function(e) {
        response = JSON.parse(this.responseText);
        Ti.API.log(response);
        if (!response.updated) {
            var dialog = Ti.UI.createAlertDialog({
                message: String.format(L("update_app"), Ti.App.version, response.app_version),
                okid: "ok",
            });
            dialog.addEventListener('click', function(e) {
                check_and_show_analytics();
            });
            dialog.show();            
        } else { 
            check_and_show_analytics();
        }
    },
    onerror: function(e) {
        $.index.open();
    },
    timeout: 5000
});
xhr.open('GET', url);
xhr.send();

$.index.addEventListener("open", function(e) {
    if (Ti.App.Properties.getBool("faq_dismissed", "notset") == "notset") {
        var faq = Ti.UI.createAlertDialog({
            buttonNames: [L("read_faq"), L("no_more_faq"), L("later_faq")],
            messageid: "faq_ask",
        });
        faq.addEventListener('click', function(e) {
            if (e.index == 0) {
                Ti.App.Properties.setBool("faq_dismissed", true);
                var Dialog = require("ti.webdialog");

                var faq_url = Alloy.Globals.backend + "/faq?language=" + Ti.Locale.currentLanguage;

                if (Dialog.isSupported()) {
                    if (OS_ANDROID || !Dialog.isOpen()) {
                        Dialog.open({
                            title: "FAQ",
                            url: faq_url
                        });
                    }
                } else {
                    Ti.Platform.openURL(faq_url);
                }
            } else if (e.index == 1) {
                Ti.App.Properties.setBool("faq_dismissed", true);
            }
        });
        faq.show();
    } else {
        $.index.open();
    }
});


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

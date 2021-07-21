global.tabgroup = $.index;

function set_flurry() {
    var Flurry = require('ti.flurry');
    Flurry.debugLogEnabled = true;
    Flurry.eventLoggingEnabled = true;
    if (OS_IOS) {
        Flurry.initializeWithCrashReporting("GPN6DJSR8CMM4ZVV9GBH");
    } else {
        Flurry.initialize('BPHB2T7TNDV6FGZHW233');
    }
}

if (Ti.App.Properties.getBool("flurry", "notset") == true) {
    set_flurry();
}

function check_and_show_flurry() {
    if (Ti.App.Properties.getBool("flurry", "notset") == "notset") {
        var flurry = Ti.UI.createAlertDialog({
            buttonNames: [L("accept"), L("refuse")],
            messageid: "flurry_ask",
            titleid: 'flurry_title'
          });
        flurry.addEventListener('click', function(e) {
            if (e.index == 0) {
                Ti.App.Properties.setBool("flurry", true);
                set_flurry();
                $.index.open();
            } else {
                Ti.App.Properties.setBool("flurry", false);
                $.index.open();
            }
        });
        flurry.show();
    } else {
        $.index.open();
    }
}
var url = 'https://api.github.com/repos/ferdi2005/monumenti/releases/latest';
var xhr = Ti.Network.createHTTPClient({
    onload: function(e) {
        response = JSON.parse(this.responseText);
        if (response.tag_name != 'v' + Ti.App.version ) {
            var dialog = Ti.UI.createAlertDialog({
                message: String.format(L("update_app"), Ti.App.version, response.tag_name),
                okid: "ok",
            });
            dialog.addEventListener('click', function(e) {
                check_and_show_flurry();
            });
            dialog.show();            
        } else { 
            check_and_show_flurry();
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
            buttonNames: [L("read_faq"), L("no_more_faqs"), L("later_faq")],
            messageid: "faq_ask",
        });
        faq.addEventListener('click', function(e) {
            if (e.index == 0) {
                Ti.App.Properties.setBool("faq_dismissed", true);
                var Dialog = require("ti.webdialog");

                var faq_url = "https://app-backend.wikilovesmonuments.it/faq?language=" + Ti.Locale.currentLanguage;

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
            $.tabgroup.close();
        }
    });
    dialog.show();
}
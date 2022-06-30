// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

function do_close() {
    Ti.App.Properties.setInt("onboarding_status", 4);
    $.faq.close();
}

$.read_faq.addEventListener('click', function(e) {
    var Dialog = require("ti.webdialog");

        var faq_url = Alloy.Globals.backend + "/faq?language=" + Ti.Locale.currentLanguage;

        if (Dialog.isSupported()) {
            if (OS_ANDROID || !Dialog.isOpen()) {
                Dialog.open({
                    title: "FAQ",
                    url: faq_url,
                    entersReaderIfAvailable: false
                });
                Dialog.addEventListener('click', function(e) {
                    do_close();
                });
            }
        } else {
            Ti.Platform.openURL(faq_url);
            $.faq.addEventListener("focus", do_close);
        }
});

$.no_more_faq.addEventListener("click", do_close);

// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

$.index.addEventListener("focus", function(e){
    if (Ti.App.Properties.getBool("analytics", "notset") == true) {
        $.tracciamento.value = true;
    } else {
        $.tracciamento.value = false;
    }
    
    if (Ti.App.Properties.getBool("registrato", false) == false || Ti.App.Properties.getBool("autorizzato", false) == false) {
        $.upload_list.hide();
        if (OS_IOS) {
            $.upload_list.height = 0;
        }
    } else {
        $.upload_list.show();
        if (OS_IOS) {
            $.upload_list.height = Ti.UI.SIZE;
        }
    }
});


$.lbl_version.text = String.format(L("app_version"), Ti.App.version);

$.info.addEventListener("click", function(e){
    Alloy.Globals.utils.open("about/info");
});

// Apri le impostazioni degli upload

$.upload_config.addEventListener("click", function(e){
    Alloy.Globals.utils.open("upload/config", "settings");
});

$.upload_list.addEventListener("click", function(e){
    if (Ti.App.Properties.getBool("registrato", false) == true && Ti.App.Properties.getBool("autorizzato", false) == true) {
        Alloy.Globals.utils.open("upload/index");
    }
});

$.tracciamento.addEventListener("change", function(e){
    if (e.value == true) {
       Ti.App.Properties.setBool("analytics", true);
    } else {
        Ti.App.Properties.setBool("analytics", false);
    }
});

$.crediti.addEventListener("click", function(e){
    alert(L("credits_text"));
});

$.faq.addEventListener("click", function(e){
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
});
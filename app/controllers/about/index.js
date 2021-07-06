// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
if (Ti.App.Properties.getBool("flurry", "notset") == true) {
    $.tracciamento.value == false
}

$.lbl_version.text = "Versione " + Ti.App.version;

$.info.addEventListener("click", function(e){
    Ti.Platform.openURL("https://wikilovesmonuments.wikimedia.it");
});

// Apri le impostazioni degli upload
$.upload_config.addEventListener("click", function(e){
    Alloy.Globals.utils.open("upload/config");
});

$.upload_list.addEventListener("click", function(e){
    Alloy.Globals.utils.open("upload/index");
});

$.tracciamento.addEventListener("change", function(e){
    if (e.value == true) {
       Ti.App.Properties.setBool("flurry", true);
    } else {
        Ti.App.Properties.setBool("flurry", false);
    }
});
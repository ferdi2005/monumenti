// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

$.lbl_version.text = "Versione " + Ti.App.version;

$.info.addEventListener("click", function(e){
    Ti.Platform.openURL("https://wikilovesmonuments.wikimedia.it");
});

// Apri le impostazioni degli upload
$.upload_config.addEventListener("click", function(e){
    Alloy.Globals.utils.open("upload/config", "settings");
});
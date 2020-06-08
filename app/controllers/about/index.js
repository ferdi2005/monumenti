// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

$.lbl_version.text = Ti.App.version;

$.info.addEventListener("click", function(e){
    Ti.Platform.openURL("https://wikilovesmonuments.wikimedia.it");
});

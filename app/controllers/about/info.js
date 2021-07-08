// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

$.site.addEventListener("click", function(e){
    Ti.Platform.openURL("https://wikilovesmonuments.it");
});
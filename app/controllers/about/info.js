// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

// Mostra bottone indietro
if (OS_ANDROID) {
    $.info.activity.onCreateOptionsMenu = function(e) { 
            var menu = e.menu; 
            var menuItem = menu.add({ 
                title: "Back", 
                icon: "images/back.png", 
                showAsAction: Ti.Android.SHOW_AS_ACTION_ALWAYS
            }); 
            menuItem.addEventListener("click", function(e) { 
                $.info.close();
            }); 
        };
}

$.site.addEventListener("click", function(e){
    Ti.Platform.openURL("https://wikilovesmonuments.it");
});
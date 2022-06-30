// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

$.button.addEventListener("click", function() { 
    Alloy.Globals.utils.open("onboarding/location");
    Ti.App.Properties.setInt("onboarding_status", 1);
    $.welcome.close();
});
var tabgroup = null;
var utilsService = require('utilsService');
if (OS_IOS) {
    Alloy.Globals.Map = require('ti.map');
}
Alloy.Globals.utils = new utilsService();
if (OS_ANDROID) {
    Alloy.Globals.OSM = require('ti.osm');
} 
Alloy.Globals.backend = "http://7077fd9416c1.ngrok.io";
Alloy.Globals.events = _.clone(Backbone.Events);
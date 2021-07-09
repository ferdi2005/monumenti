var tabgroup = null;
var utilsService = require('utilsService');
Alloy.Globals.Map = require('ti.map');
Alloy.Globals.utils = new utilsService();
if (OS_ANDROID) {
    Alloy.Globals.OSM = require('ti.osm');
} 
Alloy.Globals.backend = "https://app-backend.wikilovesmonuments.it";
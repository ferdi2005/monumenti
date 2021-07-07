




var Alloy=require("/alloy"),
_=Alloy._,
Backbone=Alloy.Backbone;



global.Alloy||(
global.Alloy=Alloy,
global._=_,
global.Backbone=Backbone);var


tabgroup=null,
utilsService=require("utilsService");
Alloy.Globals.Map=require("ti.map"),
Alloy.Globals.utils=new utilsService,

Alloy.Globals.OSM=require("ti.osm"),

Alloy.Globals.backend="https://app-backend.wikilovesmonuments.it",



Ti.UI.addEventListener("sessionbegin",function(){
Alloy.createController("index");
}),(



"undefined"==typeof Ti.UI.hasSession||Ti.UI.hasSession)&&
Alloy.createController("index");
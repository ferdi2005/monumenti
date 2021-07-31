




var Alloy=require("/alloy"),
_=Alloy._,
Backbone=Alloy.Backbone;



global.Alloy||(
global.Alloy=Alloy,
global._=_,
global.Backbone=Backbone);var


tabgroup=null,
utilsService=require("utilsService");!1,



Alloy.Globals.utils=new utilsService,

Alloy.Globals.OSM=require("ti.osm"),

Alloy.Globals.backend="https://app-backend.wikilovesmonuments.it",
Alloy.Globals.events=_.clone(Backbone.Events),



Ti.UI.addEventListener("sessionbegin",function(){
Alloy.createController("index");
}),(



"undefined"==typeof Ti.UI.hasSession||Ti.UI.hasSession)&&
Alloy.createController("index");
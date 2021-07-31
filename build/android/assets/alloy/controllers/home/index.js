var Alloy=require("/alloy"),
Backbone=Alloy.Backbone,
_=Alloy._;




function __processArg(obj,key){
var arg=null;



return obj&&(arg=obj[key]||null),arg;
}

function Controller(){






























































































function findmon(e,type,latkeep,latdelta,londelta,monument_item=null){
if(!0!=latkeep){
if(!1)var
latdelta=.1,
londelta=.1;


if(!0)
var latdelta=14;

}
$.activityIndicator.show();
var args=e;

if("geoloc"==type)
if(Ti.Geolocation.locationServicesEnabled&&(null!=e.coords||void 0)&&(null!=e.coords.latitude||void 0))
lat=args.coords.latitude,
lon=args.coords.longitude,
url="https://cerca.wikilovesmonuments.it/monuments.json?range=30&latitude="+lat+"&longitude="+lon,
$.activityIndicator.show();else



return alert(L("error_geolocation")),void $.activityIndicator.hide();


"city"==type&&(
url="https://cerca.wikilovesmonuments.it/monuments.json?townid="+e);


var xhr=Ti.Network.createHTTPClient({
onload:function(e){
var response=JSON.parse(this.responseText);!1,





$.osm.clearMarker(),


null!=response[1]&&null!=response[1]&&""!=response[1]?(!1,










$.osm.location={
latitude:response[1][0],
longitude:response[1][1],
zoomLevel:latdelta},


"geoloc"==type&&!1):(!1,
















$.osm.location={longitude:41.9109,latitude:12.4818,zoomLevel:14},

alert(L("error_geolocation"))),!1,








































markers=[],

response[0].forEach(function(item){
if(item.item==monument_item){
if(item.tree)
var icon="/images/tree orange android.png";else

var icon="/images/Info orange.png";}else

if(item.noupload)
var icon="/images/Info grey.png";else
if(item.with_photos){
if(item.tree)
var icon="/images/tree blue android.png";else

var icon="/images/Info blue.png";}else


if(item.tree)
var icon="/images/tree red android.png";else

var icon="/images/Info red.png";


markers.push({
latitude:item.latitude,
longitude:item.longitude,
title:item.itemlabel,
icon:icon,
id:item.item});

}),
$.osm.addMarkers(markers),


$.activityIndicator.hide();
},
onerror:function(e){var _Stringformat=
String.format;alert(_Stringformat(L("connection_erorr"),e.error)),
$.activityIndicator.hide();

},
timeout:15e3});

xhr.open("GET",url),
xhr.send();
}


function locate(latkeep,latdelta,londelta){
if(!0!=latkeep){
if(!1)var
latdelta=.1,
londelta=.1;


if(!0)
var latdelta=14;

}

Ti.Geolocation.hasLocationPermissions(Ti.Geolocation.AUTHORIZATION_WHEN_IN_USE)||Ti.Geolocation.hasLocationPermissions(Ti.Geolocation.AUTHORIZATION_ALWAYS)?
Ti.Geolocation.getCurrentPosition(function(e){
e.success?(

findmon(e,"geoloc",latkeep,latdelta),!1):(!1,
















$.osm.location={longitude:41.9109,latitude:12.4818,zoomLevel:14},

alert(L("activate_geolocation")));

}):

Ti.Geolocation.requestLocationPermissions(Ti.Geolocation.AUTHORIZATION_WHEN_IN_USE,function(e){
e.success||3==e.authorizationStatus?
Ti.Geolocation.getCurrentPosition(function(e){

findmon(e,"geoloc",latkeep,latdelta),!1;





}):(!1,














$.osm.location={longitude:41.9109,latitude:12.4818,zoomLevel:14},


alert(L("no_geolocation_permission")));

});

}

































function my_location(){!1,





locate(!0,$.osm.location.zoomLevel),



Ti.UI.Android.hideSoftKeyboard();

}if(require("/alloy/controllers/BaseController").apply(this,Array.prototype.slice.call(arguments)),this.__controllerPath="home/index",this.args=arguments[0]||{},arguments[0])var __parentSymbol=__processArg(arguments[0],"__parentSymbol"),$model=__processArg(arguments[0],"$model"),__itemTemplate=__processArg(arguments[0],"__itemTemplate");var $=this,exports={},__defers={};if($.__views.winmap=Ti.UI.createWindow({layout:"vertical",height:Ti.UI.FILL,windowSoftInputMode:Ti.UI.Android.SOFT_INPUT_ADJUST_PAN,titleid:"winmap",id:"winmap"}),$.__views.winmap&&$.addTopLevelView($.__views.winmap),$.__views.__alloyId4=Ti.UI.createView({height:Ti.UI.SIZE,id:"__alloyId4"}),$.__views.winmap.add($.__views.__alloyId4),!1){var __alloyId5=[];$.__views.mapview=(require("ti.map").createView||Ti.UI.createView)({height:Ti.UI.FILL,userLocation:!0,annotations:__alloyId5,id:"mapview"}),$.__views.__alloyId4.add($.__views.mapview)}if($.__views.osm=(require("ti.osm").createOSMView||Ti.UI.createOSMView)({mapType:Alloy.Globals.OSM.WIKIMEDIA,userLocation:!0,userAgent:"Wiki Loves Monuments Italia app/2.1.2 (https://github.com/ferdi2005/monumenti; ferdinando.traversa@wikimedia.it) ti.osm/1.0.1",id:"osm"}),$.__views.__alloyId4.add($.__views.osm),$.__views.activityIndicator=Ti.UI.createActivityIndicator({hiddenBehavior:Titanium.UI.HIDDEN_BEHAVIOR_GONE,style:Ti.UI.ActivityIndicatorStyle.BIG,indicatorColor:"black",id:"activityIndicator"}),$.__views.__alloyId4.add($.__views.activityIndicator),$.__views.refresh=Ti.UI.createButton({backgroundColor:"transparent",color:"#000",bottom:"10%",left:"5%",width:25,height:25,id:"refresh",backgroundImage:"/images/refresh.png"}),$.__views.__alloyId4.add($.__views.refresh),$.__views.my_location=Ti.UI.createButton({backgroundColor:"transparent",color:"#000",bottom:"10%",right:"5%",width:25,height:25,id:"my_location",backgroundImage:"/images/location.png"}),$.__views.__alloyId4.add($.__views.my_location),exports.destroy=function(){},_.extend($,$.__views),!1){var Map=Alloy.Globals.Map;Ti.UI.userInterfaceStyle==Ti.UI.USER_INTERFACE_STYLE_DARK&&($.refresh.backgroundImage="/images/refresh white.png",$.my_location.backgroundImage="/images/location white.png")}Ti.App.addEventListener("pause",function(e){$.osm.pause()}),Ti.App.addEventListener("resume",function(e){$.osm.resume()}),$.activityIndicator.hide();var defaultZoom=14;if($.osm.height=Ti.UI.FILL,$.osm.location={longitude:41.9109,latitude:12.4818,zoomLevel:14},!1,$.winmap.addEventListener("open",locate),!1,!0){function infoboxClick(e){Alloy.Globals.utils.open("home/show",e.marker.id)}$.osm.addEventListener("infoboxClick",infoboxClick)}$.refresh.addEventListener("click",function(e){!1,findmon({coords:{latitude:$.osm.location.latitude,longitude:$.osm.location.longitude}},"geoloc",!0,$.osm.location.zoomLevel)}),

$.my_location.addEventListener("click",my_location),

Alloy.Globals.events.on("map_close",function(e){

findmon({coords:{latitude:e.latitude,longitude:e.longitude}},"geoloc",!0,17,0,e.monument_item),!1;





}),


Alloy.Globals.events.on("set_city",function(e){!1,





findmon(e.town,"city",!0,$.osm.location.zoomLevel);

}),









_.extend($,exports);
}

module.exports=Controller;
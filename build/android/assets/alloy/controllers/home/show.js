var Alloy=require("/alloy"),
Backbone=Alloy.Backbone,
_=Alloy._;




function __processArg(obj,key){
var arg=null;



return obj&&(arg=obj[key]||null),arg;
}

function Controller(){var _Stringformat=







































































































































































































































































































































































String.format;if(require("/alloy/controllers/BaseController").apply(this,Array.prototype.slice.call(arguments)),this.__controllerPath="home/show",this.args=arguments[0]||{},arguments[0])var __parentSymbol=__processArg(arguments[0],"__parentSymbol"),$model=__processArg(arguments[0],"$model"),__itemTemplate=__processArg(arguments[0],"__itemTemplate");var $=this,exports={},__defers={};if($.__views.show=Ti.UI.createWindow({id:"show",titleid:"placeholder_show_title"}),$.__views.show&&$.addTopLevelView($.__views.show),$.__views.scrollable=Ti.UI.createScrollView({width:Ti.UI.FILL,scrollType:"vertical",layout:"vertical",right:"5dp",left:"5dp",id:"scrollable"}),$.__views.show.add($.__views.scrollable),$.__views.image=Ti.UI.createImageView({top:"5dp",height:"40%",hiddenBehavior:Ti.UI.HIDDEN_BEHAVIOR_GONE,id:"image"}),$.__views.scrollable.add($.__views.image),$.__views.title=Ti.UI.createLabel({width:Ti.UI.SIZE,height:Ti.UI.SIZE,font:{fontSize:30},id:"title"}),$.__views.scrollable.add($.__views.title),$.__views.description=Ti.UI.createLabel({width:Ti.UI.SIZE,height:Ti.UI.SIZE,font:{fontSize:20},top:"10dp",bottom:"5dp",hiddenBehavior:Ti.UI.HIDDEN_BEHAVIOR_GONE,id:"description"}),$.__views.scrollable.add($.__views.description),$.__views.address=Ti.UI.createLabel({width:Ti.UI.SIZE,height:Ti.UI.SIZE,font:{fontSize:18},top:"5dp",bottom:"5dp",id:"address"}),$.__views.scrollable.add($.__views.address),$.__views.Upload=Ti.UI.createButton({backgroundColor:"#006399",color:"#FFFFFF",width:Ti.UI.FILL,top:"5dp",hiddenBehavior:Ti.UI.HIDDEN_BEHAVIOR_GONE,id:"Upload",titleid:"upload_button"}),$.__views.scrollable.add($.__views.Upload),$.__views.Alert=Ti.UI.createLabel({width:Ti.UI.SIZE,height:Ti.UI.SIZE,hiddenBehavior:Ti.UI.HIDDEN_BEHAVIOR_GONE,id:"Alert",textid:"only_september"}),$.__views.scrollable.add($.__views.Alert),$.__views.Osm_button=Ti.UI.createButton({backgroundColor:"#58ce40",color:"#FFFFFF",width:Ti.UI.FILL,top:"5dp",hiddenBehavior:Ti.UI.HIDDEN_BEHAVIOR_GONE,id:"Osm_button",titleid:"osm_text"}),$.__views.scrollable.add($.__views.Osm_button),$.__views.Info=Ti.UI.createButton({backgroundColor:"#8f0000",color:"#FFFFFF",width:Ti.UI.FILL,top:"5dp",hiddenBehavior:Ti.UI.HIDDEN_BEHAVIOR_GONE,id:"Info",titleid:"more_information_button"}),$.__views.scrollable.add($.__views.Info),$.__views.Wikipedia=Ti.UI.createButton({backgroundColor:"#dadbdd",color:"#000000",width:Ti.UI.FILL,top:"5dp",hiddenBehavior:Ti.UI.HIDDEN_BEHAVIOR_GONE,id:"Wikipedia",titleid:"wikipedia_article"}),$.__views.scrollable.add($.__views.Wikipedia),$.__views.allphotos=Ti.UI.createButton({backgroundColor:"#8f0000",color:"#FFFFFF",width:Ti.UI.FILL,top:"5dp",hiddenBehavior:Ti.UI.HIDDEN_BEHAVIOR_GONE,id:"allphotos",titleid:"allphotos"}),$.__views.scrollable.add($.__views.allphotos),!1){var __alloyId15=[];$.__views.mapview=(require("ti.map").createView||Ti.UI.createView)({height:Ti.UI.SIZE,annotations:__alloyId15,id:"mapview"}),$.__views.scrollable.add($.__views.mapview)}if($.__views.osm=(require("ti.osm").createOSMView||Ti.UI.createOSMView)({mapType:Alloy.Globals.OSM.WIKIMEDIA,height:"30%",width:Ti.UI.FILL,top:"3dp",bottom:"5dp",userAgent:"Wiki Loves Monuments Italia app/2.4.1 (https://github.com/ferdi2005/monumenti; ferdinando.traversa@wikimedia.it) ti.osm/1.0.1",id:"osm"}),$.__views.scrollable.add($.__views.osm),$.__views.activityIndicator=Ti.UI.createActivityIndicator({style:Titanium.UI.ActivityIndicatorStyle.DARK,hiddenBehavior:Ti.UI.HIDDEN_BEHAVIOR_GONE,id:"activityIndicator"}),$.__views.scrollable.add($.__views.activityIndicator),exports.destroy=function(){},_.extend($,$.__views),!1)var Map=require("ti.map");var Dialog=require("ti.webdialog"),Identity=require("ti.identity"),args=$.args;Ti.App.addEventListener("pause",function(e){$.osm.pause()}),Ti.App.addEventListener("resume",function(e){$.osm.resume()}),$.Upload.hide(),$.Info.hide(),$.image.hide(),$.image.height=0,$.allphotos.hide(),$.allphotos.height=0,$.Wikipedia.hide(),$.Wikipedia.height=0,$.Osm_button.hide(),$.address.hide(),$.address.height=0,!1,$.osm.hide(),$.show.activity.onCreateOptionsMenu=function(e){var menu=e.menu,menuItem=menu.add({title:"Back",icon:"images/back.png",showAsAction:Ti.Android.SHOW_AS_ACTION_ALWAYS});menuItem.addEventListener("click",function(e){$.show.close()})},$.scrollable.width=Ti.UI.SIZE;var today=new Date;8==today.getMonth()?($.Alert.hide(),$.Alert.height=0):($.Alert.show(),$.Alert.height=Ti.UI.SIZE),$.activityIndicator.show();var url="http://cerca.wikilovesmonuments.it/show_by_wikidata.json?item="+args;$.scrollable.disableBounce=!0;var client=Ti.Network.createHTTPClient({onload:function(e){function startPhotoUpload(){Ti.Media.openPhotoGallery({allowMultiple:!0,mediaTypes:[Titanium.Media.MEDIA_TYPE_PHOTO],cancel:function(e){alert(L("upload_stopped"))},error:function(e){alert(L("no_upload_permission"))},success:function(e){var keychainItem=Identity.createKeychainItem({identifier:"token"});keychainItem.addEventListener("read",function(k){!0==k.success?Alloy.Globals.utils.open("upload/title",[Titanium.Platform.id,k.value,e.images,response.item]):Alloy.Globals.utils.open("upload/config","delete")}),keychainItem.read()}})}function openOSMdialog(response,osm_url){Dialog.isSupported()?Dialog.open({title:response.itemlabel,url:osm_url}):Ti.Platform.openURL(osm_url)}function showOSMalert(response,osm_url){var alert=Ti.UI.createAlertDialog({message:_Stringformat(L("choose_mean"),response.itemlabel),buttonNames:[L("by_car"),L("on_foot"),L("by_bike")]});
alert.addEventListener("click",function(e){
switch(e.index){
case 0:
osm_url+="&engine=graphhopper_car",
openOSMdialog(response,osm_url);
break;
case 1:
osm_url+="&engine=graphhopper_foot",
openOSMdialog(response,osm_url);
break;
case 2:
osm_url+="&engine=graphhopper_bicycle",
openOSMdialog(response,osm_url);}


}),
alert.show();
}var response=JSON.parse(this.responseText);























if($.show.title=response.itemlabel,null!=response.latitude&&null!=response.longitude&&(!1,$.osm.location={latitude:response.latitude,longitude:response.longitude,zoomLevel:15},$.osm.show()),$.osm.addEventListener("markerClick",function(e){tabgroup.activeTab=0,Alloy.Globals.events.trigger("map_close",{latitude:response.latitude,longitude:response.longitude,monument_item:args}),$.show.close()}),null!=response.image&&null!=response.image&&""!=response.image&&($.image.image="https://commons.wikimedia.org/w/thumb.php?f="+response.image+"&w=500",$.image.addEventListener("load",function(e){$.image.height="40%",$.image.show()}),$.image.addEventListener("click",function(e){if(!1)var image_url="https://commons.wikimedia.org/wiki/File"+encodeURI(":")+encodeURI(response.image);else var image_url="https://commons.wikimedia.org/wiki/File:"+response.image;Dialog.isSupported()?Dialog.open({title:response.image,url:image_url,entersReaderIfAvailable:!1}):Ti.Platform.openURL(image_url)})),null!=response.itemdescription&&null!=response.itemdescription&&""!=response.itemdescription?$.description.text=response.itemdescription:($.description.hide(),$.description.height=0),null!=response.wikipedia&&null!=response.wikipedia&&""!=response.wikipedia&&($.Wikipedia.addEventListener("click",function(){Dialog.isSupported()?Dialog.open({title:response.itemlabel,url:response.wikipedia}):Ti.Platform.openURL(response.wikipedia)}),$.Wikipedia.show(),$.Wikipedia.height=Ti.UI.SIZE),$.title.text=response.itemlabel,$.Upload.addEventListener("click",function(e){if(!1==Ti.App.Properties.getBool("registrato",!1)||!1==Ti.App.Properties.getBool("autorizzato",!1)){var window=Alloy.createController("upload/config","show").getView();window.addEventListener("close",function(e){!1==Ti.App.Properties.getBool("registrato",!1)||!1==Ti.App.Properties.getBool("autorizzato",!1)?alert(L("signup_not_completed")):!1==response.noupload&&startPhotoUpload()}),tabgroup.activeTab.open(window,{animated:!0})}else!1==response.noupload&&startPhotoUpload()}),!1==response.noupload?$.Upload.show():$.Alert.textid="authorization_expired",$.Info.addEventListener("click",function(e){var info_url,reasonator_url="http://reasonator.toolforge.org/?q="+response.item+"&lang=it",wikidata_url="http://www.wikidata.org/wiki/"+response.item,message=Ti.UI.createAlertDialog({message:_Stringformat(L("more_information"),response.itemlabel),buttonNames:["Wikidata","Reasonator"]});message.addEventListener("click",function(e){switch(e.index){case 0:info_url=wikidata_url;break;case 1:info_url=reasonator_url;}Dialog.isSupported()?Dialog.open({title:response.itemlabel,url:info_url}):Ti.Platform.openURL(info_url)}),message.show()}),$.Info.show(),$.allphotos.addEventListener("click",function(e){if(Dialog.isSupported()){if(!1)var allphotos_url=encodeURI(response.allphotos);else var allphotos_url=response.allphotos;Dialog.open({title:response.itemlabel,url:allphotos_url})}else Ti.Platform.openURL(response.wikipedia)}),response.with_photos&&($.allphotos.show(),$.allphotos.height=Ti.UI.SIZE),null!=response.latitude&&null!=response.longitude){





























if($.Osm_button.addEventListener("click",function(e){Ti.Geolocation.hasLocationPermissions(Ti.Geolocation.AUTHORIZATION_WHEN_IN_USE)||Ti.Geolocation.hasLocationPermissions(Ti.Geolocation.AUTHORIZATION_ALWAYS)?Ti.Geolocation.getCurrentPosition(function(e){if(e.success){var osm_url="https://www.openstreetmap.org/directions?route="+e.coords.latitude+"%2C"+e.coords.longitude+"%3B"+response.latitude+"%2C"+response.longitude;showOSMalert(response,osm_url)}else alert(L("no_geoloc_no_route"))}):Ti.Geolocation.requestLocationPermissions(Ti.Geolocation.AUTHORIZATION_WHEN_IN_USE,function(e){e.success||3==e.authorizationStatus?Ti.Geolocation.getCurrentPosition(function(e){var osm_url="https://www.openstreetmap.org/directions?route="+e.coords.latitude+"%2C"+e.coords.longitude+"%3B"+response.latitude+"%2C"+response.longitude;showOSMalert(response,osm_url)}):alert(L("no_geoloc_no_route"))})}),$.Osm_button.show(),!1){
var annotation=Map.createAnnotation({
latitude:response.latitude,
longitude:response.longitude,
title:response.itemlabel,
myid:response.id});


response.noupload?
annotation.pincolor=Map.ANNOTATION_PURPLE:
response.tree?
response.with_photos?
annotation.image="/images/tree blue ios.png":

annotation.image="/images/tree red ios.png":


response.with_photos?
annotation.pincolor=Map.ANNOTATION_AZURE:

annotation.pincolor=Map.ANNOTATION_RED,


$.mapview.addAnnotation(annotation);
}

if(!0){
if(response.noupload)
var icon="/images/Info grey.png";else
if(response.with_photos){
if(response.tree)
var icon="/images/tree blue android.png";else

var icon="/images/Info blue.png";}else


if(response.tree)
var icon="/images/tree red android.png";else

var icon="/images/Info red.png";


var markers=[];
markers.push({
latitude:response.latitude,
longitude:response.longitude,
title:response.itemlabel,
id:response.id,
icon:icon}),

$.osm.addMarkers(markers);
}
}


if(null!=response.address&&null!=response.address&&""!=response.address)
$.address.text=response.address,
$.address.show(),
$.address.height=Ti.UI.SIZE,

$.activityIndicator.hide();else
{var










url="http://cerca.wikilovesmonuments.it/address.json?id="+response.id,
client=Ti.Network.createHTTPClient({
onload:function(e){
$.address.text=this.responseText,
$.address.show(),
$.address.height=Ti.UI.SIZE,

$.activityIndicator.hide();
},
onerror:function(e){
$.address.hide(),
$.activityIndicator.hide();

},
timeout:5e3});

client.open("GET",url),
client.send();
}
},
onerror:function(e){
alert(_Stringformat(L("connection_erorr"),e.error)),
$.activityIndicator.hide(),
$.show.close();
},
timeout:5e4});

client.open("GET",url),
client.send(),









_.extend($,exports);
}

module.exports=Controller;
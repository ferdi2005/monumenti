var Alloy=require("/alloy"),
Backbone=Alloy.Backbone,
_=Alloy._;




function __processArg(obj,key){
var arg=null;



return obj&&(arg=obj[key]||null),arg;
}

function Controller(){





if(require("/alloy/controllers/BaseController").apply(this,Array.prototype.slice.call(arguments)),this.__controllerPath="home/show",this.args=arguments[0]||{},arguments[0])var
__parentSymbol=__processArg(arguments[0],"__parentSymbol"),
$model=__processArg(arguments[0],"$model"),
__itemTemplate=__processArg(arguments[0],"__itemTemplate");var

$=this,
exports={},
__defers={};



































































if($.__views.window=Ti.UI.createWindow({backgroundColor:"white",id:"window"}),$.__views.window&&$.addTopLevelView($.__views.window),$.__views.scrollable=Ti.UI.createScrollView({backgroundColor:"white",width:Ti.UI.FILL,scrollType:"vertical",layout:"vertical",right:"5dp",left:"5dp",id:"scrollable"}),$.__views.window.add($.__views.scrollable),$.__views.activityIndicator=Ti.UI.createActivityIndicator({style:Titanium.UI.ActivityIndicatorStyle.DARK,hiddenBehavior:Ti.UI.HIDDEN_BEHAVIOR_GONE,id:"activityIndicator"}),$.__views.scrollable.add($.__views.activityIndicator),$.__views.image=Ti.UI.createImageView({top:"5dp",width:"1000px",id:"image"}),$.__views.scrollable.add($.__views.image),$.__views.title=Ti.UI.createLabel({width:Ti.UI.SIZE,height:Ti.UI.SIZE,color:"#000000",font:{fontSize:30},id:"title"}),$.__views.scrollable.add($.__views.title),$.__views.description=Ti.UI.createLabel({width:Ti.UI.SIZE,height:Ti.UI.SIZE,color:"#000000",font:{fontSize:20},top:"10dp",bottom:"5dp",hiddenBehavior:Ti.UI.HIDDEN_BEHAVIOR_GONE,id:"description"}),$.__views.scrollable.add($.__views.description),$.__views.address=Ti.UI.createLabel({width:Ti.UI.SIZE,height:Ti.UI.SIZE,color:"#000000",font:{fontSize:18},top:"5dp",bottom:"5dp",id:"address"}),$.__views.scrollable.add($.__views.address),$.__views.Upload=Ti.UI.createButton({backgroundColor:"#006399",color:"#FFFFFF",width:Ti.UI.FILL,top:"5dp",hiddenBehavior:Ti.UI.HIDDEN_BEHAVIOR_GONE,title:"Carica le tue foto",id:"Upload"}),$.__views.scrollable.add($.__views.Upload),$.__views.Alert=Ti.UI.createLabel({width:Ti.UI.SIZE,height:Ti.UI.SIZE,color:"#000000",hiddenBehavior:Ti.UI.HIDDEN_BEHAVIOR_GONE,id:"Alert",html:"Partecipano a Wiki Loves Monuments <b>solo</b> le foto caricate dall'1 al 30 settembre."}),$.__views.scrollable.add($.__views.Alert),$.__views.Wikidata=Ti.UI.createButton({backgroundColor:"#8f0000",color:"#FFFFFF",width:Ti.UI.FILL,top:"5dp",hiddenBehavior:Ti.UI.HIDDEN_BEHAVIOR_GONE,title:"Pagina su Wikidata",id:"Wikidata"}),$.__views.scrollable.add($.__views.Wikidata),$.__views.Osm=Ti.UI.createButton({backgroundColor:"#58ce40",color:"#FFFFFF",width:Ti.UI.FILL,top:"5dp",hiddenBehavior:Ti.UI.HIDDEN_BEHAVIOR_GONE,title:"Indicazioni stradali",id:"Osm"}),$.__views.scrollable.add($.__views.Osm),$.__views.Reasonator=Ti.UI.createButton({backgroundColor:"#8f0000",color:"#FFFFFF",width:Ti.UI.FILL,top:"5dp",hiddenBehavior:Ti.UI.HIDDEN_BEHAVIOR_GONE,title:"Pagina su Reasonator",id:"Reasonator"}),$.__views.scrollable.add($.__views.Reasonator),$.__views.Wikipedia=Ti.UI.createButton({backgroundColor:"#dadbdd",color:"#000000",width:Ti.UI.FILL,top:"5dp",hiddenBehavior:Ti.UI.HIDDEN_BEHAVIOR_GONE,title:"Voce su Wikipedia",id:"Wikipedia"}),$.__views.scrollable.add($.__views.Wikipedia),$.__views.indietro=Ti.UI.createLabel({width:Ti.UI.SIZE,height:Ti.UI.SIZE,color:"#000000",font:{fontSize:10},bottom:"5%",right:"5%",text:"Per tornare indietro, premi il tasto indietro relativo sul tuo telefono.",id:"indietro"}),$.__views.scrollable.add($.__views.indietro),!1){
var __alloyId8=[];
$.__views.mapview=(require("ti.map").createView||Ti.UI.createView)(
{height:Ti.UI.SIZE,backgroundColor:"#FFFFFF",annotations:__alloyId8,id:"mapview"}),

$.__views.scrollable.add($.__views.mapview);
}

$.__views.osm=(require("ti.osm").createOSMView||Ti.UI.createOSMView)(
{mapType:Alloy.Globals.OSM.WIKIMEDIA,height:"20%",width:Ti.UI.FILL,top:"3dp",bottom:"5dp",id:"osm"}),

$.__views.scrollable.add($.__views.osm),

exports.destroy=function(){},




_.extend($,$.__views);const



Map=require("ti.map"),
Dialog=require("ti.webdialog"),
Identity=require("ti.identity");

var args=$.args;


$.Upload.hide(),
$.Wikidata.hide(),
$.Wikipedia.hide(),
$.Osm.hide(),
$.Reasonator.hide();

var today=new Date;
$.scrollable.width=Ti.UI.SIZE,
8==today.getMonth()?
$.Alert.hide():

$.Alert.show(),


$.activityIndicator.show();
var url="http://cerca.wikilovesmonuments.it/show.json?id="+args;
$.scrollable.disableBounce=!0;
var client=Ti.Network.createHTTPClient({
onload:function(e){
var response=JSON.parse(this.responseText);


















































































































































if($.window.title=response.itemlabel,$.window.addEventListener("open",function(){$.window.activity.actionBar.title=response.itemlabel}),!1,$.osm.location={latitude:response.latitude,longitude:response.longitude,zoomLevel:15},null!=response.image&&null!=response.image&&""!=response.image&&($.image.image="https://commons.wikimedia.org/w/thumb.php?f="+response.image+"&w=1000"),null!=response.itemdescription&&null!=response.itemdescription&&""!=response.itemdescription?$.description.text=response.itemdescription:$.description.hide(),null!=response.wikipedia&&null!=response.wikipedia&&""!=response.wikipedia&&($.Wikipedia.addEventListener("click",function(){Dialog.isSupported()?Dialog.open({title:response.itemlabel,url:response.wikipedia}):Ti.Platform.openURL(response.wikipedia)}),$.Wikipedia.show()),$.title.text=response.itemlabel,$.Upload.addEventListener("click",function(e){!1==Ti.App.Properties.getBool("registrato",!1)||!1==Ti.App.Properties.getBool("autorizzato",!1)?Alloy.Globals.utils.open("upload/config"):Ti.Media.openPhotoGallery({allowMultiple:!0,mediaTypes:[Titanium.Media.MEDIA_TYPE_PHOTO],cancel:function(e){alert("Hai annullato il caricamento delle foto")},error:function(e){alert("Potresti non aver concesso l'autorizzazione ad accedere alla galleria foto. Verifica.")},success:function(e){var keychainItem=Identity.createKeychainItem({identifier:"token"});keychainItem.addEventListener("read",function(k){!0==k.success?Alloy.Globals.utils.open("upload/title",[Titanium.Platform.id,k.value,e.images,response.item]):alert("Si \xE8 verificato un errore con la lettura del keychain, riprova pi\xF9 tardi.")}),keychainItem.read()}})}),$.Upload.show(),$.Wikidata.addEventListener("click",function(e){Dialog.isSupported()?Dialog.open({title:response.item,url:"http://www.wikidata.org/wiki/"+response.item}):Ti.Platform.openURL("http://www.wikidata.org/wiki/"+response.item)}),$.Wikidata.show(),$.Reasonator.addEventListener("click",function(e){Dialog.isSupported()?Dialog.open({title:response.item,url:"http://reasonator.toolforge.org/?q="+response.item+"&lang=it"}):Ti.Platform.openURL("http://reasonator.toolforge.org/?q="+response.item+"&lang=it")}),$.Reasonator.show(),$.Osm.addEventListener("click",function(e){Ti.Geolocation.hasLocationPermissions(Ti.Geolocation.AUTHORIZATION_WHEN_IN_USE)||Ti.Geolocation.hasLocationPermissions(Ti.Geolocation.AUTHORIZATION_ALWAYS)?Ti.Geolocation.getCurrentPosition(function(e){Dialog.isSupported()?Dialog.open({title:response.item,url:"http://www.openstreetmap.org/directions?route="+e.coords.latitude+"%2C"+e.coords.longitude+"%3B"+response.latitude+"%2C"+response.longitude}):Ti.Platform.openURL("http://www.openstreetmap.org/directions?route="+e.coords.latitude+"%2C"+e.coords.longitude+"%3B"+response.latitude+"%2C"+response.longitude)}):Ti.Geolocation.requestLocationPermissions(Ti.Geolocation.AUTHORIZATION_WHEN_IN_USE,function(e){e.success?Ti.Geolocation.getCurrentPosition(function(e){Dialog.isSupported()?Dialog.open({title:response.item,url:"http://www.openstreetmap.org/directions?route="+e.coords.latitude+"%2C"+e.coords.longitude+"%3B"+response.latitude+"%2C"+response.longitude}):Ti.Platform.openURL("http://www.openstreetmap.org/directions?route="+e.coords.latitude+"%2C"+e.coords.longitude+"%3B"+response.latitude+"%2C"+response.longitude)}):Dialog.isSupported()?Dialog.open({title:response.item,url:"http://www.openstreetmap.org/directions"}):Ti.Platform.openURL("http://www.openstreetmap.org/directions")})}),$.Osm.show(),!1){
var annotation=Map.createAnnotation({
latitude:response.latitude,
longitude:response.longitude,
title:response.itemlabel,
myid:response.id});


$.mapview.addAnnotation(annotation);
}

if(!0){
if(response.with_photos)
var icon="/images/Info blue.png";else

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

null!=response.address&&null!=response.address&&""!=response.address?(
$.address.text=response.address,
$.address.show(),
$.activityIndicator.hide()):

Ti.Geolocation.reverseGeocoder(response.latitude,response.longitude,function(e){
e.success?(
$.address.show(),
$.address.text=e.places[0].address,
$.activityIndicator.hide()):(

$.address.hide(),
$.activityIndicator.hide());

});




















},
onerror:function(e){
alert("Errore di rete, tornare indietro: "+e.error),
$.activityIndicator.hide();
},
timeout:5e4});

client.open("GET",url),
client.send(),









_.extend($,exports);
}

module.exports=Controller;
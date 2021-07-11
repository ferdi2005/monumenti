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

























































if($.__views.show=Ti.UI.createWindow({backgroundColor:"white",id:"show",title:"Monumento"}),$.__views.show&&$.addTopLevelView($.__views.show),$.__views.scrollable=Ti.UI.createScrollView({backgroundColor:"white",width:Ti.UI.FILL,scrollType:"vertical",layout:"vertical",right:"5dp",left:"5dp",id:"scrollable"}),$.__views.show.add($.__views.scrollable),$.__views.activityIndicator=Ti.UI.createActivityIndicator({style:Titanium.UI.ActivityIndicatorStyle.DARK,hiddenBehavior:Ti.UI.HIDDEN_BEHAVIOR_GONE,id:"activityIndicator"}),$.__views.scrollable.add($.__views.activityIndicator),$.__views.image=Ti.UI.createImageView({top:"5dp",width:"1000px",id:"image"}),$.__views.scrollable.add($.__views.image),$.__views.title=Ti.UI.createLabel({width:Ti.UI.SIZE,height:Ti.UI.SIZE,color:"#000000",font:{fontSize:30},id:"title"}),$.__views.scrollable.add($.__views.title),$.__views.description=Ti.UI.createLabel({width:Ti.UI.SIZE,height:Ti.UI.SIZE,color:"#000000",font:{fontSize:20},top:"10dp",bottom:"5dp",hiddenBehavior:Ti.UI.HIDDEN_BEHAVIOR_GONE,id:"description"}),$.__views.scrollable.add($.__views.description),$.__views.address=Ti.UI.createLabel({width:Ti.UI.SIZE,height:Ti.UI.SIZE,color:"#000000",font:{fontSize:18},top:"5dp",bottom:"5dp",id:"address"}),$.__views.scrollable.add($.__views.address),$.__views.Upload=Ti.UI.createButton({backgroundColor:"#006399",color:"#FFFFFF",width:Ti.UI.FILL,top:"5dp",hiddenBehavior:Ti.UI.HIDDEN_BEHAVIOR_GONE,title:"Carica le tue foto",id:"Upload"}),$.__views.scrollable.add($.__views.Upload),$.__views.Alert=Ti.UI.createLabel({width:Ti.UI.SIZE,height:Ti.UI.SIZE,color:"#000000",hiddenBehavior:Ti.UI.HIDDEN_BEHAVIOR_GONE,id:"Alert",html:"Partecipano a Wiki Loves Monuments <b>solo</b> le foto caricate dall'1 al 30 settembre."}),$.__views.scrollable.add($.__views.Alert),$.__views.Osm_button=Ti.UI.createButton({backgroundColor:"#58ce40",color:"#FFFFFF",width:Ti.UI.FILL,top:"5dp",hiddenBehavior:Ti.UI.HIDDEN_BEHAVIOR_GONE,title:"Indicazioni stradali",id:"Osm_button"}),$.__views.scrollable.add($.__views.Osm_button),$.__views.Info=Ti.UI.createButton({backgroundColor:"#8f0000",color:"#FFFFFF",width:Ti.UI.FILL,top:"5dp",hiddenBehavior:Ti.UI.HIDDEN_BEHAVIOR_GONE,title:"Maggiori informazioni",id:"Info"}),$.__views.scrollable.add($.__views.Info),$.__views.Wikipedia=Ti.UI.createButton({backgroundColor:"#dadbdd",color:"#000000",width:Ti.UI.FILL,top:"5dp",hiddenBehavior:Ti.UI.HIDDEN_BEHAVIOR_GONE,title:"Voce su Wikipedia",id:"Wikipedia"}),$.__views.scrollable.add($.__views.Wikipedia),!1){
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
$.Info.hide(),
$.Wikipedia.hide(),
$.Osm_button.hide(),
$.address.hide(),!1,




$.osm.hide(),




$.show.activity.onCreateOptionsMenu=function(e){var
menu=e.menu,
menuItem=menu.add({
title:"Back",
icon:"images/back.png",
showAsAction:Ti.Android.SHOW_AS_ACTION_ALWAYS});

menuItem.addEventListener("click",function(e){
$.show.close();
});
},


$.scrollable.width=Ti.UI.SIZE;


var today=new Date;
8==today.getMonth()?
$.Alert.hide():

$.Alert.show(),


$.activityIndicator.show();
var url="http://cerca.wikilovesmonuments.it/show.json?id="+args;
$.scrollable.disableBounce=!0;
var client=Ti.Network.createHTTPClient({
onload:function(e){

























































function startPhotoUpload(){
Ti.Media.openPhotoGallery({
allowMultiple:!0,
mediaTypes:[Titanium.Media.MEDIA_TYPE_PHOTO],
cancel:function(e){
alert("Hai annullato il caricamento delle foto");
},
error:function(e){
alert("Potresti non aver concesso l'autorizzazione ad accedere alla galleria foto. Verifica.");
},
success:function(e){

var keychainItem=Identity.createKeychainItem({identifier:"token"});
keychainItem.addEventListener("read",function(k){
!0==k.success?
Alloy.Globals.utils.open("upload/title",[Titanium.Platform.id,k.value,e.images,response.item]):

alert("Si \xE8 verificato un errore con la lettura del keychain, riprova pi\xF9 tardi.");

}),
keychainItem.read();
}});

}













































function showOSMalert(response,osm_url){
var alert=Ti.UI.createAlertDialog({message:"Come vuoi raggiungere "+response.itemlabel+"?",buttonNames:["In auto","A piedi","In bici"]});
alert.addEventListener("click",function(e){
switch(e.index){
case 0:
osm_url+="&engine=graphhopper_car";
break;
case 1:
osm_url+="&engine=graphhopper_foot";
break;
case 2:
osm_url+="&engine=graphhopper_bicycle";}



Dialog.isSupported()?
Dialog.open({
title:response.itemlabel,
url:osm_url}):


Ti.Platform.openURL(osm_url);

}),
alert.show();
}var response=JSON.parse(this.responseText);

if($.show.title=response.itemlabel,$.show.addEventListener("open",function(){$.window.activity.actionBar.title=response.itemlabel}),null!=response.latitude&&null!=response.longitude&&(!1,$.osm.location={latitude:response.latitude,longitude:response.longitude,zoomLevel:15},$.osm.show()),null!=response.image&&null!=response.image&&""!=response.image&&($.image.image="https://commons.wikimedia.org/w/thumb.php?f="+response.image+"&w=1000"),null!=response.itemdescription&&null!=response.itemdescription&&""!=response.itemdescription?$.description.text=response.itemdescription:$.description.hide(),null!=response.wikipedia&&null!=response.wikipedia&&""!=response.wikipedia&&($.Wikipedia.addEventListener("click",function(){Dialog.isSupported()?Dialog.open({title:response.itemlabel,url:response.wikipedia}):Ti.Platform.openURL(response.wikipedia)}),$.Wikipedia.show()),$.title.text=response.itemlabel,$.Upload.addEventListener("click",function(e){if(!1==Ti.App.Properties.getBool("registrato",!1)||!1==Ti.App.Properties.getBool("autorizzato",!1)){var window=Alloy.createController("upload/config","show").getView();window.addEventListener("close",function(e){!1==Ti.App.Properties.getBool("registrato",!1)||!1==Ti.App.Properties.getBool("autorizzato",!1)?alert("Non hai completato la registrazione! Effettua il login con Wikimedia Commons per caricare le fotografie."):startPhotoUpload()}),tabgroup.activeTab.open(window,{modal:!0,animated:!0})}else startPhotoUpload()}),$.Upload.show(),$.Info.addEventListener("click",function(e){var info_url,reasonator_url="http://reasonator.toolforge.org/?q="+response.item+"&lang=it",wikidata_url="http://www.wikidata.org/wiki/"+response.item,alert=Ti.UI.createAlertDialog({message:"Maggiori informazioni su "+response.itemlabel,buttonNames:["Wikidata","Reasonator"]});alert.addEventListener("click",function(e){switch(e.index){case 0:info_url=wikidata_url;break;case 1:info_url=reasonator_url;}Dialog.isSupported()?Dialog.open({title:response.itemlabel,url:info_url}):Ti.Platform.openURL(info_url)}),alert.show()}),$.Info.show(),null!=response.latitude&&null!=response.longitude){
































if($.Osm_button.addEventListener("click",function(e){var osm_url;Ti.Geolocation.hasLocationPermissions(Ti.Geolocation.AUTHORIZATION_WHEN_IN_USE)||Ti.Geolocation.hasLocationPermissions(Ti.Geolocation.AUTHORIZATION_ALWAYS)?Ti.Geolocation.getCurrentPosition(function(e){e.success?(osm_url="https://www.openstreetmap.org/directions?route="+e.coords.latitude+"%2C"+e.coords.longitude+"%3B"+response.latitude+"%2C"+response.longitude,showOSMalert(response,osm_url)):alert("Senza geolocalizzazione attiva non sono in grado di tracciare un percorso!")}):Ti.Geolocation.requestLocationPermissions(Ti.Geolocation.AUTHORIZATION_WHEN_IN_USE,function(e){e.success?Ti.Geolocation.getCurrentPosition(function(e){osm_url="https://www.openstreetmap.org/directions?route="+e.coords.latitude+"%2C"+e.coords.longitude+"%3B"+response.latitude+"%2C"+response.longitude,showOSMalert(response,osm_url)}):alert("Senza autorizzazione alla posizione non sono in grado di tracciare un percorso!")})}),$.Osm_button.show(),!1){
var annotation=Map.createAnnotation({
latitude:response.latitude,
longitude:response.longitude,
title:response.itemlabel,
myid:response.id});


$.mapview.addAnnotation(annotation);
}

if(!0){
if(response.with_photos){
if(response.tree)
var icon="/images/tree blue.png";else

var icon="/images/Info blue.png";}else


if(response.tree)
var icon="/images/tree red.png";else

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
$.activityIndicator.hide();else
{var










url="http://cerca.wikilovesmonuments.it/address.json?id="+response.id,
client=Ti.Network.createHTTPClient({
onload:function(e){
$.address.text=this.responseText,
$.address.show(),
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
alert("Errore di rete, tornare indietro: "+e.error),
$.activityIndicator.hide();
},
timeout:5e4});

client.open("GET",url),
client.send(),









_.extend($,exports);
}

module.exports=Controller;
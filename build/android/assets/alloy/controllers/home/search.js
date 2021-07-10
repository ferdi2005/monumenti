var Alloy=require("/alloy"),
Backbone=Alloy.Backbone,
_=Alloy._;




function __processArg(obj,key){
var arg=null;



return obj&&(arg=obj[key]||null),arg;
}

function Controller(){


























































function getDistance(lat1,lon1,lat2,lon2){var _Mathacos=





Math.acos,_Mathcos=Math.cos,_Mathsin=Math.sin,_MathPI=Math.PI,radlat1=_MathPI*lat1/180,radlat2=_MathPI*lat2/180,theta=lon1-lon2,radtheta=_MathPI*theta/180,dist=_Mathsin(radlat1)*_Mathsin(radlat2)+_Mathcos(radlat1)*_Mathcos(radlat2)*_Mathcos(radtheta);




return dist=_Mathacos(dist),dist=180*dist/_MathPI,dist=1.1515*(60*dist),dist*=1.609344,dist=dist.toFixed(2),dist;
}

function search(value,user_initiated){
$.activityIndicator.show();var

url="http://cerca.wikilovesmonuments.it/namesearch.json?search="+encodeURI(value),
xhr=Ti.Network.createHTTPClient({
onload:function(e){var
location,
located;

response=JSON.parse(this.responseText),

Ti.Geolocation.hasLocationPermissions(Ti.Geolocation.AUTHORIZATION_WHEN_IN_USE)||Ti.Geolocation.hasLocationPermissions(Ti.Geolocation.AUTHORIZATION_ALWAYS)?
Ti.Geolocation.getCurrentPosition(function(e){
e.success?(
location=e,
located=!0):

located=!1;

}):

Ti.Geolocation.requestLocationPermissions(Ti.Geolocation.AUTHORIZATION_WHEN_IN_USE,function(e){
e.success?
Ti.Geolocation.getCurrentPosition(function(e){
e.success?(
location=e,
located=!0):

located=!1;

}):

located=!1;

}),


0<response.length?(
data=[],
response.forEach(function(item){
var title;



title=located?item.itemlabel+" ("+getDistance(location.coords.latitude,location.coords.longitude,item.latitude,item.longitude)+" km)":

item.itemlabel,


itemdata={
properties:{
itemId:item.id,
title:title,
accessoryType:Ti.UI.LIST_ACCESSORY_TYPE_NONE,
color:"#000000",
backgroundColor:"#FFFFFF",
latitude:item.latitude,
longitude:item.longitude}},


data.push(itemdata);
}),

$.listsection.items!=data&&(
data=data.sort(function(a,b){
return getDistance(location.coords.latitude,location.coords.longitude,a.properties.latitude,a.properties.longitude)-getDistance(location.coords.latitude,location.coords.longitude,b.properties.latitude,b.properties.longitude);
}),
$.listsection.setItems(data)),

$.listview.show(),
$.activityIndicator.hide()):(

user_initiated&&
alert("Nessun risultato trovato! Prova a fare un'altra ricerca"),

$.activityIndicator.hide());


},
onerror:function(e){
alert("Errore di connessione"+e.error),
$.activityIndicator.hide();
},
timeout:5e4});

xhr.open("GET",url),
xhr.send();
}if(require("/alloy/controllers/BaseController").apply(this,Array.prototype.slice.call(arguments)),this.__controllerPath="home/search",this.args=arguments[0]||{},arguments[0])var __parentSymbol=__processArg(arguments[0],"__parentSymbol"),$model=__processArg(arguments[0],"$model"),__itemTemplate=__processArg(arguments[0],"__itemTemplate");var $=this,exports={},__defers={};$.__views.winsearch=Ti.UI.createWindow({backgroundColor:"#fff",layout:"vertical",id:"winsearch",title:"Ricerca per nome"}),$.__views.winsearch&&$.addTopLevelView($.__views.winsearch),$.__views.__alloyId5=Ti.UI.createView({height:Ti.UI.SIZE,backgroundColor:"#FFFFFF",layout:"vertical",id:"__alloyId5"}),$.__views.winsearch.add($.__views.__alloyId5),$.__views.searchfield=Ti.UI.createTextField({returnKeyType:Ti.UI.RETURNKEY_SEARCH,top:"5px",borderStyle:Ti.UI.INPUT_BORDERSTYLE_LINE,hintTextColor:"#A0A0A0",color:"black",borderColor:"black",borderWidth:"0.5",id:"searchfield",hintText:"Inserisci il nome del monumento che vuoi cercare e premi invio..."}),$.__views.__alloyId5.add($.__views.searchfield),$.__views.activityIndicator=Ti.UI.createActivityIndicator({style:Titanium.UI.ActivityIndicatorStyle.DARK,hiddenBehavior:Ti.UI.HIDDEN_BEHAVIOR_GONE,id:"activityIndicator"}),$.__views.__alloyId5.add($.__views.activityIndicator),$.__views.listsection=Ti.UI.createListSection({id:"listsection",headerTitle:"Monumenti trovati"});var __alloyId7=[];__alloyId7.push($.__views.listsection),$.__views.listview=Ti.UI.createListView({separatorStyle:Titanium.UI.TABLE_VIEW_SEPARATOR_STYLE_SINGLE_LINE,sections:__alloyId7,id:"listview"}),$.__views.__alloyId5.add($.__views.listview),exports.destroy=function(){},_.extend($,$.__views);var args=$.args;$.listview.hide(),$.activityIndicator.hide(),

$.listview.addEventListener("itemclick",function(e){
var window=Alloy.createController("home/show",e.itemId).getView();
tabgroup.activeTab.open(window);
}),

$.winsearch.addEventListener("open",function(){
$.searchfield.addEventListener("return",function(e){
3>e.value.length?
alert("Inserisci minimo 3 caratteri per effettuare una ricerca."):
5>e.value.length&&
search(e.value,!0),

$.searchfield.blur(),

Ti.UI.Android.hideSoftKeyboard();

}),

$.searchfield.addEventListener("change",function(e){
5<=e.value.length&&
search(e.value,!1);

});
}),


$.winsearch.addEventListener("blur",function(){
$.searchfield.blur(),
Ti.UI.Android.hideSoftKeyboard();
}),










_.extend($,exports);
}

module.exports=Controller;
var Alloy=require("/alloy"),
Backbone=Alloy.Backbone,
_=Alloy._;




function __processArg(obj,key){
var arg=null;



return obj&&(arg=obj[key]||null),arg;
}

function Controller(){var _Stringformat=










































































































































































String.format;function getDistance(lat1,lon1,lat2,lon2){var _Mathacos=Math.acos,_Mathcos=Math.cos,_Mathsin=Math.sin,_MathPI=Math.PI,radlat1=_MathPI*lat1/180,radlat2=_MathPI*lat2/180,theta=lon1-lon2,radtheta=_MathPI*theta/180,dist=_Mathsin(radlat1)*_Mathsin(radlat2)+_Mathcos(radlat1)*_Mathcos(radlat2)*_Mathcos(radtheta);return dist=_Mathacos(dist),dist=180*dist/_MathPI,dist=1.1515*(60*dist),dist*=1.609344,dist=dist.toFixed(2),dist}function setMonumentsData(response,user_initiated,located=!1,location){0<response.length?(data=[],response.forEach(function(item){var title;title=!0==located&&null!=item.latitude&&null!=item.longitude?item.itemlabel+" ("+getDistance(location.coords.latitude,location.coords.longitude,item.latitude,item.longitude)+" km)":item.itemlabel,itemdata={properties:{itemId:"monument"+item.item,title:title,accessoryType:Ti.UI.LIST_ACCESSORY_TYPE_NONE,latitude:item.latitude,longitude:item.longitude}},data.push(itemdata)}),$.listsection.items!=data&&(data=data.sort(function(a,b){return getDistance(location.coords.latitude,location.coords.longitude,a.properties.latitude,a.properties.longitude)-getDistance(location.coords.latitude,location.coords.longitude,b.properties.latitude,b.properties.longitude)}),$.listsection.setItems(data)),$.listview.show(),$.activityIndicator.hide()):(user_initiated&&alert(L("no_results_found")),$.listsection.setItems([]),$.activityIndicator.hide())}function searchTowns(value,user_initiated){$.activityIndicator.show();var url="http://cerca.wikilovesmonuments.it/towns/search.json?query="+encodeURI(value)+"&locale="+Titanium.Locale.currentLanguage,xhr=Ti.Network.createHTTPClient({onload:function(e){response=JSON.parse(this.responseText),0<response.length?(data=[],response.forEach(function(town){if("it"==Titanium.Locale.currentLanguage)var town_name=town.visible_name;else var town_name=town.english_name;itemdata={properties:{itemId:"town"+town.item,title:town_name,accessoryType:Ti.UI.LIST_ACCESSORY_TYPE_NONE,town_name:town.name}},data.push(itemdata)}),$.listsection.items!=data&&(data=data.sort(function(a,b){return a.properties.town_name.length-b.properties.town_name.length}),$.listsection.setItems(data)),$.listview.show(),$.activityIndicator.hide()):(user_initiated&&alert(L("no_results_found")),$.listsection.setItems([]),$.activityIndicator.hide())},onerror:function(e){alert(_Stringformat(L("connection_erorr"),e.error)),
$.activityIndicator.hide();
},
timeout:5e4});

xhr.open("GET",url),
xhr.send();
}

function searchMonuments(value,user_initiated){
$.activityIndicator.show();var

url="http://cerca.wikilovesmonuments.it/namesearch.json?search="+encodeURI(value),
xhr=Ti.Network.createHTTPClient({
onload:function(e){
response=JSON.parse(this.responseText),

Ti.Geolocation.hasLocationPermissions(Ti.Geolocation.AUTHORIZATION_WHEN_IN_USE)||Ti.Geolocation.hasLocationPermissions(Ti.Geolocation.AUTHORIZATION_ALWAYS)?
Ti.Geolocation.getCurrentPosition(function(e){
e.success?
setMonumentsData(response,user_initiated,!0,e):

setMonumentsData(response,user_initiated);

}):

Ti.Geolocation.requestLocationPermissions(Ti.Geolocation.AUTHORIZATION_WHEN_IN_USE,function(e){
e.success||3==e.authorizationStatus?
Ti.Geolocation.getCurrentPosition(function(e){
e.success?
setMonumentsData(response,user_initiated,!0,e):

setMonumentsData(response,user_initiated);

}):

setMonumentsData(response,user_initiated);

});


},
onerror:function(e){
alert(_Stringformat(L("connection_erorr"),e.error)),
$.activityIndicator.hide();
},
timeout:5e4});

xhr.open("GET",url),
xhr.send();
}






























































function setFields(){
0==$.optionbar.index?(
$.listsection.headerTitle=L("list_section_monuments_header"),
$.searchfield.hintText=L("monument_searchfield")):(

$.listsection.headerTitle=L("list_section_towns_header"),
$.searchfield.hintText=L("town_searchfield")),

$.activityIndicator.hide(),
$.searchfield.value="",
$.searchfield.blur(),

Ti.UI.Android.hideSoftKeyboard();

}if(require("/alloy/controllers/BaseController").apply(this,Array.prototype.slice.call(arguments)),this.__controllerPath="home/search",this.args=arguments[0]||{},arguments[0])var __parentSymbol=__processArg(arguments[0],"__parentSymbol"),$model=__processArg(arguments[0],"$model"),__itemTemplate=__processArg(arguments[0],"__itemTemplate");var $=this,exports={},__defers={};$.__views.winsearch=Ti.UI.createWindow({layout:"vertical",id:"winsearch",titleid:"winsearch"}),$.__views.winsearch&&$.addTopLevelView($.__views.winsearch),$.__views.__alloyId6=Ti.UI.createView({height:Ti.UI.SIZE,layout:"vertical",id:"__alloyId6"}),$.__views.winsearch.add($.__views.__alloyId6);var __alloyId8=[],__alloyId11={title:L("monuments"),selected:!0};__alloyId8.push(__alloyId11);var __alloyId12={title:L("towns")};__alloyId8.push(__alloyId12),$.__views.optionbar=Ti.UI.createOptionBar({labels:__alloyId8,id:"optionbar"}),$.__views.__alloyId6.add($.__views.optionbar),$.__views.searchfield=Ti.UI.createTextField({returnKeyType:Ti.UI.RETURNKEY_SEARCH,top:"5px",borderStyle:Ti.UI.INPUT_BORDERSTYLE_LINE,borderWidth:"0.5",width:Ti.UI.FILL,id:"searchfield"}),$.__views.__alloyId6.add($.__views.searchfield),$.__views.activityIndicator=Ti.UI.createActivityIndicator({style:Titanium.UI.ActivityIndicatorStyle.DARK,hiddenBehavior:Ti.UI.HIDDEN_BEHAVIOR_GONE,id:"activityIndicator"}),$.__views.__alloyId6.add($.__views.activityIndicator),$.__views.listsection=Ti.UI.createListSection({id:"listsection"});var __alloyId14=[];__alloyId14.push($.__views.listsection),$.__views.listview=Ti.UI.createListView({separatorStyle:Titanium.UI.TABLE_VIEW_SEPARATOR_STYLE_SINGLE_LINE,sections:__alloyId14,id:"listview"}),$.__views.__alloyId6.add($.__views.listview),exports.destroy=function(){},_.extend($,$.__views);var args=$.args;$.listview.hide(),$.activityIndicator.hide(),$.listview.addEventListener("itemclick",function(e){if(e.itemId.startsWith("monument")){var items=$.listsection.items,value=$.searchfield.value,window=Alloy.createController("home/show",e.itemId.replace("monument","")).getView();window.addEventListener("close",function(e){$.listsection.setItems(items),$.listview.show(),$.searchfield.value=value}),tabgroup.activeTab.open(window)}else e.itemId.startsWith("town")&&(tabgroup.activeTab=0,Alloy.Globals.events.trigger("set_city",{town:e.itemId.replace("town","")}))}),$.winsearch.addEventListener("open",function(){$.listsection.headerTitle=L("list_section_monuments_header"),$.searchfield.hintText=L("monument_searchfield"),$.optionbar.index=0,$.searchfield.addEventListener("return",function(e){3>e.value.length?alert(L("minimum_char")):0==$.optionbar.index?searchMonuments(e.value,!0):searchTowns(e.value,!0),$.searchfield.blur(),Ti.UI.Android.hideSoftKeyboard()}),$.searchfield.addEventListener("change",function(e){5<=e.value.length&&(0==$.optionbar.index?searchMonuments(e.value,!1):searchTowns(e.value,!1))}),setFields()}),$.winsearch.addEventListener("blur",function(){$.searchfield.blur(),Ti.UI.Android.hideSoftKeyboard(),$.listview.hide()}),

$.optionbar.addEventListener("click",setFields),

$.winsearch.addEventListener("focus",setFields),









_.extend($,exports);
}

module.exports=Controller;
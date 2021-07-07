var Alloy=require("/alloy"),
Backbone=Alloy.Backbone,
_=Alloy._;




function __processArg(obj,key){
var arg=null;



return obj&&(arg=obj[key]||null),arg;
}

function Controller(){























































function search(value){
$.activityIndicator.show();var

url="http://cerca.wikilovesmonuments.it/namesearch.json?search="+encodeURI(value),
xhr=Ti.Network.createHTTPClient({
onload:function(e){

response=JSON.parse(this.responseText),

0<response.length?(
data=[],
response.forEach(function(item){
itemdata={
properties:{
itemId:item.id,
title:item.itemlabel,
accessoryType:Ti.UI.LIST_ACCESSORY_TYPE_NONE,
color:"#000000",
backgroundColor:"#FFFFFF"}},


data.push(itemdata);
}),

$.listsection.setItems(data),
$.listview.show(),
$.activityIndicator.hide()):(

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
}if(require("/alloy/controllers/BaseController").apply(this,Array.prototype.slice.call(arguments)),this.__controllerPath="home/search",this.args=arguments[0]||{},arguments[0])var __parentSymbol=__processArg(arguments[0],"__parentSymbol"),$model=__processArg(arguments[0],"$model"),__itemTemplate=__processArg(arguments[0],"__itemTemplate");var $=this,exports={},__defers={};$.__views.winsearch=Ti.UI.createWindow({backgroundColor:"#fff",layout:"vertical",id:"winsearch",title:"Ricerca per nome"}),$.__views.winsearch&&$.addTopLevelView($.__views.winsearch),$.__views.__alloyId6=Ti.UI.createView({height:Ti.UI.SIZE,backgroundColor:"#FFFFFF",layout:"vertical",id:"__alloyId6"}),$.__views.winsearch.add($.__views.__alloyId6),$.__views.searchfield=Ti.UI.createTextField({returnKeyType:Ti.UI.RETURNKEY_SEARCH,top:"5px",borderStyle:Ti.UI.INPUT_BORDERSTYLE_LINE,hintTextColor:"#A0A0A0",color:"black",borderColor:"black",borderWidth:"0.5",id:"searchfield",hintText:"Inserisci il nome del monumento che vuoi cercare e premi invio..."}),$.__views.__alloyId6.add($.__views.searchfield),$.__views.activityIndicator=Ti.UI.createActivityIndicator({style:Titanium.UI.ActivityIndicatorStyle.DARK,hiddenBehavior:Ti.UI.HIDDEN_BEHAVIOR_GONE,id:"activityIndicator"}),$.__views.__alloyId6.add($.__views.activityIndicator),$.__views.listsection=Ti.UI.createListSection({id:"listsection",headerTitle:"Monumenti trovati"});var __alloyId8=[];__alloyId8.push($.__views.listsection),$.__views.listview=Ti.UI.createListView({separatorStyle:Titanium.UI.TABLE_VIEW_SEPARATOR_STYLE_SINGLE_LINE,sections:__alloyId8,id:"listview"}),$.__views.__alloyId6.add($.__views.listview),exports.destroy=function(){},_.extend($,$.__views);var args=$.args;$.listview.hide(),$.activityIndicator.hide(),

$.listview.addEventListener("itemclick",function(e){
var window=Alloy.createController("home/show",e.itemId).getView();
tabgroup.activeTab.open(window);
}),

$.winsearch.addEventListener("open",function(){
$.searchfield.focus(),
$.searchfield.addEventListener("return",function(e){
search(e.value),

Ti.UI.Android.hideSoftKeyboard();

});
}),


$.winsearch.addEventListener("close",function(){
Ti.UI.Android.hideSoftKeyboard();
}),










_.extend($,exports);
}

module.exports=Controller;
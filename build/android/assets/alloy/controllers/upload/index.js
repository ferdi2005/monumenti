var Alloy=require("/alloy"),
Backbone=Alloy.Backbone,
_=Alloy._;




function __processArg(obj,key){
var arg=null;



return obj&&(arg=obj[key]||null),arg;
}

function Controller(){
































































































































function openPhoto(e){
Dialog.isSupported()?
Dialog.open({
title:e.source.text,
url:e.source.id}):


Ti.Platform.openURL(e.source.id);

}if(require("/alloy/controllers/BaseController").apply(this,Array.prototype.slice.call(arguments)),this.__controllerPath="upload/index",this.args=arguments[0]||{},arguments[0])var __parentSymbol=__processArg(arguments[0],"__parentSymbol"),$model=__processArg(arguments[0],"$model"),__itemTemplate=__processArg(arguments[0],"__itemTemplate");var $=this,exports={},__defers={};$.__views.index=Ti.UI.createWindow({backgroundColor:"#fff",layout:"vertical",title:"Elenco foto caricate",id:"index"}),$.__views.index&&$.addTopLevelView($.__views.index),$.__views.activityIndicator=Ti.UI.createActivityIndicator({id:"activityIndicator"}),$.__views.index.add($.__views.activityIndicator);var __alloyId18={},__alloyId21=[],__alloyId23={type:"Ti.UI.View",childTemplates:function(){var __alloyId24=[],__alloyId26={type:"Ti.UI.ImageView",bindId:"photo",properties:{top:"5dp",left:0,width:"100dp",bindId:"photo"}};__alloyId24.push(__alloyId26);var __alloyId28={type:"Ti.UI.Label",bindId:"errorlabel",properties:{width:Ti.UI.SIZE,height:Ti.UI.SIZE,color:"#000000",top:"5dp",bottom:"5dp",left:"5dp",right:"5dp",bindId:"errorlabel"}};return __alloyId24.push(__alloyId28),__alloyId24}(),properties:{height:Ti.UI.SIZE,backgroundColor:"#FFFFFF",layout:"horizontal"}};__alloyId21.push(__alloyId23);var __alloyId20={properties:{name:"error"},childTemplates:__alloyId21};__alloyId18.error=__alloyId20;var __alloyId31=[],__alloyId33={type:"Ti.UI.View",childTemplates:function(){var __alloyId34=[],__alloyId36={type:"Ti.UI.ImageView",bindId:"photo",properties:{top:"5dp",left:0,width:"100dp",bindId:"photo"}};__alloyId34.push(__alloyId36);var __alloyId38={type:"Ti.UI.Label",properties:{width:Ti.UI.SIZE,height:Ti.UI.SIZE,color:"#000000",top:"5dp",bottom:"5dp",left:"5dp",right:"5dp",text:"Immagine ancora in caricamento."}};return __alloyId34.push(__alloyId38),__alloyId34}(),properties:{height:Ti.UI.SIZE,backgroundColor:"#FFFFFF",layout:"horizontal"}};__alloyId31.push(__alloyId33);var __alloyId30={properties:{name:"waiting"},childTemplates:__alloyId31};__alloyId18.waiting=__alloyId30;var __alloyId41=[],__alloyId43={type:"Ti.UI.View",childTemplates:function(){var __alloyId44=[],__alloyId46={type:"Ti.UI.ImageView",bindId:"photo",properties:{top:"5dp",left:0,width:"100dp",bindId:"photo"},events:{click:openPhoto}};__alloyId44.push(__alloyId46);var __alloyId48={type:"Ti.UI.Label",bindId:"title",properties:{width:Ti.UI.SIZE,height:Ti.UI.SIZE,color:"#0645AD",top:"5dp",bottom:"5dp",left:"5dp",right:"5dp",bindId:"title"},events:{click:openPhoto}};return __alloyId44.push(__alloyId48),__alloyId44}(),properties:{height:Ti.UI.SIZE,backgroundColor:"#FFFFFF",layout:"horizontal"}};__alloyId41.push(__alloyId43);var __alloyId40={properties:{name:"success"},childTemplates:__alloyId41};__alloyId18.success=__alloyId40,$.__views.imagespace=Ti.UI.createListSection({id:"imagespace",headerTitle:"Immagini inviate"});var __alloyId50=[];__alloyId50.push($.__views.imagespace),$.__views.listview=Ti.UI.createListView({separatorColor:"#000000",separatorStyle:Titanium.UI.TABLE_VIEW_SEPARATOR_STYLE_SINGLE_LINE,height:Ti.UI.SIZE,layout:"vertical",sections:__alloyId50,templates:__alloyId18,id:"listview"}),$.__views.index.add($.__views.listview),exports.destroy=function(){},_.extend($,$.__views);const Identity=require("ti.identity"),Dialog=require("ti.webdialog");var args=$.args;$.activityIndicator.show();const UUID=Titanium.Platform.id;var keychainItem=Identity.createKeychainItem({identifier:"token"});keychainItem.addEventListener("read",function(k){if(!0==k.success){var url=Alloy.Globals.backend+"/photolist.json?uuid="+UUID+"&token="+k.value,client=Ti.Network.createHTTPClient({onload:function(e){var photos=JSON.parse(this.responseText);items=[],photos.forEach(function(photo){if(!1==photo.uploaded){if(null==photo.errorinfo||null==photo.errorinfo)var errortext="Immagine non caricata a causa di un errore.";else var errortext="Immagine non caricata a causa di un errore: "+photo.errorinfo;itemdata={photo:{image:photo.serverurl},errorlabel:{text:errortext},template:"error"}}else null==photo.uploaded?itemdata={photo:{image:photo.serverurl},template:"waiting"}:!0==photo.uploaded&&(itemdata={photo:{image:photo.url,id:photo.descriptionurl},title:{text:photo.canonicaltitle,id:photo.descriptionurl},template:"success"});items.push(itemdata)}),$.imagespace.setItems(items),$.activityIndicator.hide(),$.activityIndicator.height=0},onerror:function(e){var alert=Ti.UI.createAlertDialog({message:"Si \xE8 verificato un errore: "+e.error,buttonNames:["Ok"]});alert.addEventListener("click",function(e){$.index.close()}),alert.show()},timeout:5e3});client.open("GET",url),client.send()}else{var alert=Ti.UI.createAlertDialog({message:"Si \xE8 verificato un errore, riprova pi\xF9 tardi",buttonNames:["Ok"]});alert.addEventListener("click",function(e){$.index.close()}),alert.show()}}),keychainItem.read(),









_.extend($,exports);
}

module.exports=Controller;
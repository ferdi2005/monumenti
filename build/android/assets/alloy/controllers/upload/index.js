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

}if(require("/alloy/controllers/BaseController").apply(this,Array.prototype.slice.call(arguments)),this.__controllerPath="upload/index",this.args=arguments[0]||{},arguments[0])var __parentSymbol=__processArg(arguments[0],"__parentSymbol"),$model=__processArg(arguments[0],"$model"),__itemTemplate=__processArg(arguments[0],"__itemTemplate");var $=this,exports={},__defers={};$.__views.index=Ti.UI.createWindow({backgroundColor:"#fff",layout:"vertical",title:"Elenco foto caricate",id:"index"}),$.__views.index&&$.addTopLevelView($.__views.index),$.__views.activityIndicator=Ti.UI.createActivityIndicator({id:"activityIndicator"}),$.__views.index.add($.__views.activityIndicator);var __alloyId17={},__alloyId20=[],__alloyId22={type:"Ti.UI.View",childTemplates:function(){var __alloyId23=[],__alloyId25={type:"Ti.UI.ImageView",bindId:"photo",properties:{top:"5dp",left:0,width:"100dp",bindId:"photo"}};__alloyId23.push(__alloyId25);var __alloyId27={type:"Ti.UI.Label",bindId:"errorlabel",properties:{width:Ti.UI.SIZE,height:Ti.UI.SIZE,color:"#000000",top:"5dp",bottom:"5dp",left:"5dp",right:"5dp",bindId:"errorlabel"}};return __alloyId23.push(__alloyId27),__alloyId23}(),properties:{height:Ti.UI.SIZE,backgroundColor:"#FFFFFF",layout:"horizontal"}};__alloyId20.push(__alloyId22);var __alloyId19={properties:{name:"error"},childTemplates:__alloyId20};__alloyId17.error=__alloyId19;var __alloyId30=[],__alloyId32={type:"Ti.UI.View",childTemplates:function(){var __alloyId33=[],__alloyId35={type:"Ti.UI.ImageView",bindId:"photo",properties:{top:"5dp",left:0,width:"100dp",bindId:"photo"}};__alloyId33.push(__alloyId35);var __alloyId37={type:"Ti.UI.Label",properties:{width:Ti.UI.SIZE,height:Ti.UI.SIZE,color:"#000000",top:"5dp",bottom:"5dp",left:"5dp",right:"5dp",text:"Immagine ancora in caricamento."}};return __alloyId33.push(__alloyId37),__alloyId33}(),properties:{height:Ti.UI.SIZE,backgroundColor:"#FFFFFF",layout:"horizontal"}};__alloyId30.push(__alloyId32);var __alloyId29={properties:{name:"waiting"},childTemplates:__alloyId30};__alloyId17.waiting=__alloyId29;var __alloyId40=[],__alloyId42={type:"Ti.UI.View",childTemplates:function(){var __alloyId43=[],__alloyId45={type:"Ti.UI.ImageView",bindId:"photo",properties:{top:"5dp",left:0,width:"100dp",bindId:"photo"},events:{click:openPhoto}};__alloyId43.push(__alloyId45);var __alloyId47={type:"Ti.UI.Label",bindId:"title",properties:{width:Ti.UI.SIZE,height:Ti.UI.SIZE,color:"#0645AD",top:"5dp",bottom:"5dp",left:"5dp",right:"5dp",bindId:"title"},events:{click:openPhoto}};return __alloyId43.push(__alloyId47),__alloyId43}(),properties:{height:Ti.UI.SIZE,backgroundColor:"#FFFFFF",layout:"horizontal"}};__alloyId40.push(__alloyId42);var __alloyId39={properties:{name:"success"},childTemplates:__alloyId40};__alloyId17.success=__alloyId39,$.__views.imagespace=Ti.UI.createListSection({id:"imagespace",headerTitle:"Immagini inviate"});var __alloyId49=[];__alloyId49.push($.__views.imagespace),$.__views.listview=Ti.UI.createListView({separatorColor:"#000000",separatorStyle:Titanium.UI.TABLE_VIEW_SEPARATOR_STYLE_SINGLE_LINE,height:Ti.UI.SIZE,layout:"vertical",sections:__alloyId49,templates:__alloyId17,id:"listview"}),$.__views.index.add($.__views.listview),exports.destroy=function(){},_.extend($,$.__views);const Identity=require("ti.identity"),Dialog=require("ti.webdialog");var args=$.args;$.index.activity.onCreateOptionsMenu=function(e){var menu=e.menu,menuItem=menu.add({title:"Back",icon:"images/back.png",showAsAction:Ti.Android.SHOW_AS_ACTION_ALWAYS});menuItem.addEventListener("click",function(e){$.index.close()})},$.index.addEventListener("open",function(e){$.activityIndicator.show();const UUID=Titanium.Platform.id;var keychainItem=Identity.createKeychainItem({identifier:"token"});keychainItem.addEventListener("read",function(k){if(!0==k.success){var url=Alloy.Globals.backend+"/photolist.json?uuid="+UUID+"&token="+k.value,client=Ti.Network.createHTTPClient({onload:function(e){var photos=JSON.parse(this.responseText);items=[],photos.forEach(function(photo){var serverurl=photo.serverurl.replace("http","https");if(!1==photo.uploaded){if(null==photo.errorinfo||null==photo.errorinfo)var errortext="Immagine non caricata a causa di un errore.";else var errortext="Immagine non caricata a causa di un errore: "+photo.errorinfo;itemdata={photo:{image:serverurl},errorlabel:{text:errortext},template:"error"}}else null==photo.uploaded?itemdata={photo:{image:serverurl},template:"waiting"}:!0==photo.uploaded&&(itemdata={photo:{image:photo.url,id:photo.descriptionurl},title:{text:photo.canonicaltitle,id:photo.descriptionurl},template:"success"});items.push(itemdata)}),$.imagespace.setItems(items),$.activityIndicator.hide(),$.activityIndicator.height=0},onerror:function(e){var alert=Ti.UI.createAlertDialog({message:"Si \xE8 verificato un errore: "+e.error,buttonNames:["Ok"]});alert.addEventListener("click",function(e){$.index.close()}),alert.show()},timeout:5e3});client.open("GET",url),client.send()}else{var alert=Ti.UI.createAlertDialog({message:"Si \xE8 verificato un errore, riprova pi\xF9 tardi",buttonNames:["Ok"]});alert.addEventListener("click",function(e){$.index.close()}),alert.show()}}),keychainItem.read()}),









_.extend($,exports);
}

module.exports=Controller;
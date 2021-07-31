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

}























































function openShow(e){
Alloy.Globals.utils.open("home/show",e.source.id);
}
















function reload(e){




if($.activityIndicator.show(),$.imagespace.removeAllChildren(),0==$.optionbar.index)
var order="date";else

var order="title";


const UUID=Titanium.Platform.id;
var keychainItem=Identity.createKeychainItem({identifier:"token"});
keychainItem.addEventListener("read",function(k){var _Stringformat=












String.format;if(!0==k.success){var url=Alloy.Globals.backend+"/photolist.json?uuid="+UUID+"&token="+k.value+"&order="+order,client=Ti.Network.createHTTPClient({onload:function(e){var photos=JSON.parse(this.responseText);items=[],photos.forEach(function(photo){var serverurl=photo.serverurl;if(!1==photo.uploaded){if(null==photo.errorinfo||null==photo.errorinfo)var errortext=_Stringformat(L("photo_not_uploaded"),photo.title+"");else

var errortext=_Stringformat(L("photo_not_uploaded_with_reason"),photo.title+"",photo.errorinfo);var


main_view=Ti.UI.createView({
layout:"vertical",
width:Ti.UI.FILL,
height:Ti.UI.SIZE}),


view=Ti.UI.createView({
layout:"horizontal",
width:Ti.UI.FILL,
height:Ti.UI.SIZE}),


image=Ti.UI.createImageView({
image:serverurl,
top:"5dp",
left:"5dp",
width:"30%"});


view.add(image);

var errorlabel=Ti.UI.createLabel({
text:errortext,
left:"5dp"});


view.add(errorlabel);

var showButton=Ti.UI.createButton({
id:photo.item,
titleid:"show_monument",
backgroundColor:"#8f0000",
color:"#FFFFFF",
top:"3dp",
left:"5dp"});


showButton.addEventListener("click",openShow),

main_view.add(view),
main_view.add(showButton),

$.imagespace.add(main_view),

$.imagespace.add(Titanium.UI.createView({
height:"2dp",
left:"0dp",
right:"0dp",
top:"2dp",
borderWidth:"1",
borderColor:"#aaa"}));


}else if(null==photo.uploaded){var
main_view=Ti.UI.createView({
layout:"vertical",
width:Ti.UI.FILL,
height:Ti.UI.SIZE}),


view=Ti.UI.createView({
layout:"horizontal",
width:Ti.UI.FILL,
height:Ti.UI.SIZE}),


image=Ti.UI.createImageView({
image:serverurl,
top:"5dp",
left:"5dp",
width:"30%"});


view.add(image);

var errorlabel=Ti.UI.createLabel({
text:_Stringformat(L("image_uploading"),photo.title),
left:"5dp"});


view.add(errorlabel);

var showButton=Ti.UI.createButton({
id:photo.item,
titleid:"show_monument",
backgroundColor:"#8f0000",
color:"#FFFFFF",
top:"3dp",
left:"5dp"});


showButton.addEventListener("click",openShow),

main_view.add(view),
main_view.add(showButton),

$.imagespace.add(main_view),

$.imagespace.add(Titanium.UI.createView({
height:"2dp",
left:"0dp",
right:"0dp",
top:"2dp",
borderWidth:"1",
borderColor:"#aaa"}));


}else if(!0==photo.uploaded){var
main_view=Ti.UI.createView({
layout:"vertical",
width:Ti.UI.FILL,
height:Ti.UI.SIZE}),


view=Ti.UI.createView({
layout:"horizontal",
width:Ti.UI.FILL,
height:Ti.UI.SIZE}),


image=Ti.UI.createImageView({
image:photo.url,
top:"5dp",
width:"30%",
left:"5dp",
id:photo.descriptionurl});


image.addEventListener("click",openPhoto),

view.add(image);

var label=Ti.UI.createLabel({
text:photo.canonicaltitle,
id:photo.descriptionurl,
color:"#16ABFD",
left:"5dp"});


label.addEventListener("click",openPhoto),

view.add(label);

var showButton=Ti.UI.createButton({
id:photo.item,
titleid:"show_monument",
backgroundColor:"#8f0000",
color:"#FFFFFF",
top:"3dp",
left:"5dp"});


showButton.addEventListener("click",openShow),

main_view.add(view),
main_view.add(showButton),

$.imagespace.add(main_view),

$.imagespace.add(Titanium.UI.createView({
height:"2dp",
left:"0dp",
right:"0dp",
top:"2dp",
borderWidth:"1",
borderColor:"#aaa"}));

}
}),
$.activityIndicator.hide(),
$.activityIndicator.height=0;
},
onerror:function(e){
var message=Ti.UI.createAlertDialog({message:_Stringformat(L("generic_error"),e.error),okid:"ok"});
message.addEventListener("click",function(e){
$.index.close();
}),
message.show();
},
timeout:5e3});

client.open("GET",url),
client.send();
}else{
var alert=Ti.UI.createAlertDialog({message:_Stringformat(L("generic_error"),k.error),buttonNames:[L("ok")]});
alert.addEventListener("click",function(e){
$.index.close();
}),
alert.show();
}
}),
keychainItem.read();
}if(require("/alloy/controllers/BaseController").apply(this,Array.prototype.slice.call(arguments)),this.__controllerPath="upload/index",this.args=arguments[0]||{},arguments[0])var __parentSymbol=__processArg(arguments[0],"__parentSymbol"),$model=__processArg(arguments[0],"$model"),__itemTemplate=__processArg(arguments[0],"__itemTemplate");var $=this,exports={},__defers={};$.__views.index=Ti.UI.createWindow({layout:"vertical",titleid:"photo_list",id:"index"}),$.__views.index&&$.addTopLevelView($.__views.index),$.__views.activityIndicator=Ti.UI.createActivityIndicator({id:"activityIndicator"}),$.__views.index.add($.__views.activityIndicator),$.__views.photos_on_commons=Ti.UI.createButton({backgroundColor:"#006399",color:"#FFFFFF",width:"80%",left:"10%",hiddenBehavior:Ti.UI.HIDDEN_BEHAVIOR_GONE,top:"3dp",bottom:"3dp",id:"photos_on_commons",titleid:"photos_on_commons"}),$.__views.index.add($.__views.photos_on_commons);var __alloyId25=[],__alloyId28={title:L("by_date"),selected:!0};__alloyId25.push(__alloyId28);var __alloyId29={title:L("by_name")};__alloyId25.push(__alloyId29),$.__views.optionbar=Ti.UI.createOptionBar({labels:__alloyId25,id:"optionbar"}),$.__views.index.add($.__views.optionbar),$.__views.imagespace=Ti.UI.createScrollView({width:Ti.UI.FILL,scrollType:"vertical",layout:"vertical",id:"imagespace"}),$.__views.index.add($.__views.imagespace),exports.destroy=function(){},_.extend($,$.__views);var Identity=require("ti.identity"),Dialog=require("ti.webdialog"),args=$.args;$.photos_on_commons.height=0,$.photos_on_commons.hide();var keychainItem=Identity.createKeychainItem({identifier:"token"});keychainItem.addEventListener("read",function(k){if(!0==k.success){var url=Alloy.Globals.backend+"/userinfo.json?uuid="+Titanium.Platform.id+"&token="+k.value,client=Ti.Network.createHTTPClient({onload:function(e){var userInfo=JSON.parse(this.responseText);if(userInfo.testuser)var user_url="https://ferdi.host/wiki/Special:ListFiles/"+userInfo.username;else var user_url="https://commons.wikimedia.org/wiki/Special:ListFiles/"+userInfo.username;if(!1)var user_url=encodeURI(user_url);$.photos_on_commons.addEventListener("click",function(e){Dialog.isSupported()?Dialog.open({title:userInfo.username,url:user_url}):Ti.Platform.openURL(user_url)}),$.photos_on_commons.show(),$.photos_on_commons.height=Ti.UI.SIZE},onerror:function(e){$.photos_on_commons.height=0,$.photos_on_commons.hide()},timeout:5e3});client.open("GET",url),client.send()}else $.index.close(),Alloy.Globals.utils.open("upload/config","delete")}),keychainItem.read(),$.index.activity.onCreateOptionsMenu=function(e){var menu=e.menu,menuItem=menu.add({title:"Back",icon:"images/back.png",showAsAction:Ti.Android.SHOW_AS_ACTION_ALWAYS});menuItem.addEventListener("click",function(e){$.index.close()})},

$.index.addEventListener("open",reload),

$.optionbar.addEventListener("click",reload),

Alloy.Globals.events.on("map_close",function(e){
$.index.close();
}),









_.extend($,exports);
}

module.exports=Controller;
var Alloy=require("/alloy"),
Backbone=Alloy.Backbone,
_=Alloy._;




function __processArg(obj,key){
var arg=null;



return obj&&(arg=obj[key]||null),arg;
}

function Controller(){var _Stringformat=
































































































































































































































































String.format;function triggerDeletion(uuid,user_initiated=!1){var keychainItem=Identity.createKeychainItem({identifier:"token"});keychainItem.addEventListener("read",function(k){if(!0==k.success){keychainItem.reset(),Ti.App.Properties.setBool("registrato",!1),Ti.App.Properties.setBool("autorizzato",!1);var url=Alloy.Globals.backend+"/deleteuser.json?uuid="+uuid+"&token="+k.value,client=Ti.Network.createHTTPClient({onload:function(e){var text_of_message;text_of_message=user_initiated?"registration_deleted_by_user":"registration_deleted_by_error";var message=Ti.UI.createAlertDialog({messageid:text_of_message,okid:"ok"});message.addEventListener("click",function(e){$.config.close()}),message.show()},onerror:function(e){if(user_initiated){var message=Ti.UI.createAlertDialog({message:L("server_deletion_not_possible")+e.error,okid:"ok"});message.addEventListener("click",function(e){$.config.close()}),message.show()}},timeout:5e3});client.open("GET",url),client.send()}else{keychainItem.fetchExistence(function(e){!0==e.exists&&keychainItem.reset()}),Ti.App.Properties.setBool("registrato",!1),Ti.App.Properties.setBool("autorizzato",!1);var message=Ti.UI.createAlertDialog({messageid:"server_deletion_not_possible",okid:"ok"});message.addEventListener("click",function(e){$.config.close()}),message.show()}}),keychainItem.read()}function showUserInfo(userInfo){$.login_delete.show(),$.login_delete.height=Ti.UI.SIZE,$.login_delete.addEventListener("click",function(e){triggerDeletion(UUID,!0)});var wiki;wiki=userInfo.testuser?"Test wiki":"Wikimedia Commons",$.mediawiki_data.text=_Stringformat(L("login_info"),userInfo.username,wiki),

$.mediawiki_data.show(),
$.mediawiki_data.height=Ti.UI.SIZE;
}


function startLogin(uuid,token,wiki="mediawiki"){

var url=Alloy.Globals.backend+"/start_login?language="+Ti.Locale.currentLanguage+"&wiki="+wiki+"&uuid="+uuid+"&token="+token;
Dialog.isSupported()?(

Dialog.open({
title:L("start_commons_login"),
url:url,
dismissButtonStyle:Dialog.DISMISS_BUTTON_STYLE_DONE}),

Dialog.addEventListener("close",function(e){
$.login_update.hide(),
retrieveUserData(uuid,token),
$.activityIndicator.show(),
$.activityIndicator.height=Ti.UI.SIZE;
})):



Ti.Platform.openURL(url);

}


function retrieveUserData(uuid,token,user_initiated=!1){var
url=Alloy.Globals.backend+"/userinfo.json?uuid="+uuid+"&token="+token,
client=Ti.Network.createHTTPClient({
onload:function(e){
if("User not found."==JSON.parse(this.responseText).error)
triggerDeletion(UUID);else
{
var userInfo=JSON.parse(this.responseText);

!0==userInfo.authorized?(
Ti.App.Properties.setBool("autorizzato",!0),
$.login_start.hide(),
$.login_start.height=0,

$.login_update.hide(),
$.login_update.height=0,

$.commento_login_start.hide(),
$.commento_login_start.height=0,

$.activityIndicator.hide(),
$.activityIndicator.height=0,

"show"==args?
$.config.close():

showUserInfo(userInfo)):(


Ti.App.Properties.setBool("autorizzato",!1),
$.login_start.show(),
$.login_start.height=Ti.UI.SIZE,

$.login_update.show(),
$.login_update.height=Ti.UI.SIZE,

$.commento_login_start.show(),
$.commento_login_start.height=Ti.UI.SIZE,

$.activityIndicator.hide(),
$.activityIndicator.height=0,
user_initiated&&
alert(L("login_not_done")));


}
},
onerror:function(e){
alert(_Stringformat(L("connection_erorr"),e.error)),
$.config.close;
},
timeout:5e3});

client.open("GET",url),
client.send();
}

function readInformation(uuid,user_initiated=!1){

var keychainItem=Identity.createKeychainItem({identifier:"token"});
keychainItem.addEventListener("read",function(e){
if(!0==e.success)
retrieveUserData(uuid,e.value,user_initiated);else
{
var message=Ti.UI.createAlertDialog({messageid:"problem_do_logout",buttonNames:[L("close"),L("login_delete")]});
message.addEventListener("click",function(e){
0==e.index?
$.config.close():

triggerDeletion(UUID,!1);

}),
message.show();
}

}),
keychainItem.read();
}if(require("/alloy/controllers/BaseController").apply(this,Array.prototype.slice.call(arguments)),this.__controllerPath="upload/config",this.args=arguments[0]||{},arguments[0])var __parentSymbol=__processArg(arguments[0],"__parentSymbol"),$model=__processArg(arguments[0],"$model"),__itemTemplate=__processArg(arguments[0],"__itemTemplate");var $=this,exports={},__defers={};$.__views.config=Ti.UI.createWindow({layout:"vertical",id:"config",titleid:"upload_settings"}),$.__views.config&&$.addTopLevelView($.__views.config),$.__views.__alloyId22=Ti.UI.createView({height:Ti.UI.SIZE,layout:"vertical",id:"__alloyId22"}),$.__views.config.add($.__views.__alloyId22),$.__views.__alloyId23=Ti.UI.createLabel({width:Ti.UI.SIZE,height:Ti.UI.SIZE,top:"5dp",bottom:"5dp",left:"5dp",right:"5dp",textid:"upload_settings_welcome",id:"__alloyId23"}),$.__views.__alloyId22.add($.__views.__alloyId23),$.__views.login_start=Ti.UI.createButton({backgroundColor:"#006499",color:"#FFF",top:"5dp",width:Ti.UI.FILL,left:"5dp",right:"5dp",hiddenBehavior:Ti.UI.HIDDEN_BEHAVIOR_GONE,id:"login_start",titleid:"login_start"}),$.__views.__alloyId22.add($.__views.login_start),$.__views.login_update=Ti.UI.createButton({backgroundColor:"#EEE",color:"#000",top:"5dp",width:Ti.UI.FILL,left:"5dp",right:"5dp",hiddenBehavior:Ti.UI.HIDDEN_BEHAVIOR_GONE,id:"login_update",titleid:"login_update"}),$.__views.__alloyId22.add($.__views.login_update),$.__views.login_delete=Ti.UI.createButton({backgroundColor:"#EEE",color:"#000",top:"5dp",width:Ti.UI.FILL,left:"5dp",right:"5dp",hiddenBehavior:Ti.UI.HIDDEN_BEHAVIOR_GONE,id:"login_delete",titleid:"login_delete"}),$.__views.__alloyId22.add($.__views.login_delete),$.__views.mediawiki_data=Ti.UI.createLabel({width:Ti.UI.SIZE,height:Ti.UI.SIZE,top:"5dp",bottom:"5dp",left:"5dp",right:"5dp",hiddenBehavior:Ti.UI.HIDDEN_BEHAVIOR_GONE,id:"mediawiki_data"}),$.__views.__alloyId22.add($.__views.mediawiki_data),$.__views.commento_login_start=Ti.UI.createLabel({width:Ti.UI.SIZE,height:Ti.UI.SIZE,top:"5dp",bottom:"5dp",left:"5dp",right:"5dp",hiddenBehavior:Ti.UI.HIDDEN_BEHAVIOR_GONE,id:"commento_login_start",textid:"login_instructions"}),$.__views.__alloyId22.add($.__views.commento_login_start),$.__views.activityIndicator=Ti.UI.createActivityIndicator({hiddenBehavior:Titanium.UI.HIDDEN_BEHAVIOR_GONE,style:Ti.UI.ActivityIndicatorStyle.BIG,indicatorColor:"black",id:"activityIndicator"}),$.__views.__alloyId22.add($.__views.activityIndicator),exports.destroy=function(){},_.extend($,$.__views);var Identity=require("ti.identity"),Dialog=require("ti.webdialog"),args=$.args;const UUID=Titanium.Platform.id,USERNAME=Titanium.Platform.username+"";$.activityIndicator.show(),$.activityIndicator.height=Ti.UI.SIZE,$.login_start.hide(),$.login_start.height=0,$.commento_login_start.hide(),$.commento_login_start.height=0,$.login_delete.hide(),$.login_delete.height=0,$.mediawiki_data.hide(),$.mediawiki_data.height=0,$.login_update.hide(),$.login_update.height=0,$.login_start.addEventListener("click",function(e){var keychainItem=Identity.createKeychainItem({identifier:"token"});keychainItem.addEventListener("read",function(e){if(!0==e.success)startLogin(UUID,e.value);else{var message=Ti.UI.createAlertDialog({messageid:"problem_do_logout",buttonNames:[L("close"),L("login_delete")]});message.addEventListener("click",function(e){0==e.index?$.config.close():triggerDeletion(UUID,!1)}),message.show()}}),keychainItem.read()}),$.login_start.addEventListener("longpress",function(e){var keychainItem=Identity.createKeychainItem({identifier:"token"});keychainItem.addEventListener("read",function(k){if(!0==k.success){var dialog=Ti.UI.createAlertDialog({message:L("test_login_start"),buttonNames:[L("ok"),L("cancel")]});dialog.addEventListener("click",function(z){0==z.index&&startLogin(UUID,k.value,"wikitest")}),dialog.show()}else{var message=Ti.UI.createAlertDialog({messageid:"problem_do_logout",buttonNames:[L("close"),L("login_delete")]});message.addEventListener("click",function(z){0==z.index?$.config.close():triggerDeletion(UUID,!1)}),message.show()}}),keychainItem.read()}),"show"==args&&($.config.hidesBackButton=!0),"settings"==args&&($.config.activity.onCreateOptionsMenu=function(e){var menu=e.menu,menuItem=menu.add({title:"Back",icon:"images/back.png",showAsAction:Ti.Android.SHOW_AS_ACTION_ALWAYS});menuItem.addEventListener("click",function(e){$.config.close()})}),$.login_update.addEventListener("click",function(e){readInformation(UUID,!0)}),

$.config.addEventListener("open",function(e){
if("show"==args){
var dialog=Ti.UI.createAlertDialog({
messageid:"no_upload_until_commons",
okid:"ok"});

dialog.show();
}

if(!1==Ti.App.Properties.getBool("registrato",!1)){

var keychainItem=Identity.createKeychainItem({identifier:"token"});
keychainItem.fetchExistence(function(e){
!0==e.exists&&
keychainItem.reset();

});

const GENERATED_TOKEN=Titanium.Platform.createUUID();var
credentials={
uuid:UUID,
device_name:USERNAME,
token:GENERATED_TOKEN},


url=Alloy.Globals.backend+"/set_credentials.json",

client=Ti.Network.createHTTPClient({
onload:function(e){
if(202==this.status){
var keychainItem=Identity.createKeychainItem({
identifier:"token"});


keychainItem.addEventListener("save",function(e){
if(!0==e.success)
Ti.App.Properties.setBool("registrato",!0),
retrieveUserData(UUID,GENERATED_TOKEN);else
{
var message=Ti.UI.createAlertDialog({message:_Stringformat(L("generic_error"),e.error),okid:"ok"});
message.addEventListener("click",function(e){
$.config.close();
}),
message.show();
}
}),

keychainItem.save(GENERATED_TOKEN);
}else
alert(_Stringformat(L("generic_error"),this.status)),
$.config.close();

},
onerror:function(e){
alert(_Stringformat(L("connection_erorr"),e.error));
},
timeout:5e3});

client.open("POST",url),
client.send(credentials);
}else
readInformation(UUID);

}),









_.extend($,exports);
}

module.exports=Controller;
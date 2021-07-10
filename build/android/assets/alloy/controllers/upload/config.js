var Alloy=require("/alloy"),
Backbone=Alloy.Backbone,
_=Alloy._;




function __processArg(obj,key){
var arg=null;



return obj&&(arg=obj[key]||null),arg;
}

function Controller(){

























































































function triggerDeletion(uuid){
var keychainItem=Identity.createKeychainItem({identifier:"token"});
keychainItem.addEventListener("read",function(k){
if(!0==k.success){

var keychainItem=Identity.createKeychainItem({identifier:"token"});
keychainItem.reset(),
Ti.App.Properties.setBool("registrato",!1),
Ti.App.Properties.setBool("autorizzato",!1);var

url=Alloy.Globals.backend+"/deleteuser.json?uuid="+uuid+"&token="+k.value,
client=Ti.Network.createHTTPClient({
onload:function(e){
var alert=Ti.UI.createAlertDialog({message:"\xC8 stata cancellata la tua registrazione su tua richiesta o a causa di un errore. Riapri questa scheda per crearne una nuova e caricare le tue fotografie.",buttonNames:["Ok"]});
alert.addEventListener("click",function(e){
$.config.close();
}),
alert.show();
},
onerror:function(e){
var alert=Ti.UI.createAlertDialog({message:"Non \xE8 stato possibile cancellare i tuoi dati dal server. Assicurati di revocare l'autorizzazione oAuth. "+e.error,buttonNames:["Ok"]});
alert.addEventListener("click",function(e){
$.config.close();
}),
alert.show();
},
timeout:5e3});

client.open("GET",url),
client.send();
}else{
Ti.App.Properties.setBool("registrato",!1),
Ti.App.Properties.setBool("autorizzato",!1);

var alert=Ti.UI.createAlertDialog({message:"Non \xE8 stato possibile cancellare i tuoi dati dal server. Assicurati di revocare l'autorizzazione oAuth. ",buttonNames:["Ok"]});
alert.addEventListener("click",function(e){
$.config.close();
}),
alert.show();
}
}),
keychainItem.read();

}


function showUserInfo(userInfo){
$.login_delete.show(),

$.login_delete.addEventListener("click",function(e){
triggerDeletion(UUID);
}),


$.mediawiki_data.text=!0==userInfo.testuser?"Hai eseguito l'accesso alla Wiki di test. Da ora puoi tornare indietro e caricare le tue fotografie tramite l'apposito tasto nella scheda di ogni monumento. Le tue foto non verranno caricate davvero.":

"Hai eseguito l'accesso a Wikimedia Commons. Da ora puoi tornare indietro e caricare le tue fotografie tramite l'apposito tasto nella scheda di ogni monumento.",

!0==userInfo.ready&&(
$.mediawiki_data.text=$.mediawiki_data.text+=" Il tuo nome utente \xE8 "+userInfo.username),

$.mediawiki_data.show();
}


function startLogin(userInfo){
var url=Alloy.Globals.backend+"/start_login?uuid="+userInfo.uuid+"&token="+userInfo.token;
Dialog.isSupported()?(
Dialog.open({
title:"Esegui il login a Commons",
url:url,
dismissButtonStyle:Dialog.DISMISS_BUTTON_STYLE_DONE}),

Dialog.addEventListener("close",function(e){
retrieveUserData(userInfo.uuid,userInfo.token),
$.activityIndicator.show();
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
$.login_update.hide(),
$.commento_login_start.hide(),
$.activityIndicator.hide(),

"show"==args?
$.config.close():

showUserInfo(userInfo)):(


Ti.App.Properties.setBool("autorizzato",!1),
$.login_start.show(),
$.login_update.show(),
$.commento_login_start.show(),
$.login_start.addEventListener("click",function(e){
startLogin(userInfo);
}),
$.activityIndicator.hide(),
user_initiated&&
alert("Non hai ancora effettuato il login. Clicca su Accedi a Wikimedia Commons per farlo."));


}
},
onerror:function(e){
alert("Si \xE8 verificato un errore. Riprova pi\xF9 tardi: "+e.error),
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
var alert=Ti.UI.createAlertDialog({message:"Si \xE8 verificato un problema, riprova pi\xF9 tardi. Se si ripresenta, fai il logout.",buttonNames:["Ok"]});
alert.addEventListener("click",function(e){
$.config.close();
}),
alert.show();
}

}),
keychainItem.read();
}if(require("/alloy/controllers/BaseController").apply(this,Array.prototype.slice.call(arguments)),this.__controllerPath="upload/config",this.args=arguments[0]||{},arguments[0])var __parentSymbol=__processArg(arguments[0],"__parentSymbol"),$model=__processArg(arguments[0],"$model"),__itemTemplate=__processArg(arguments[0],"__itemTemplate");var $=this,exports={},__defers={};$.__views.config=Ti.UI.createWindow({backgroundColor:"#fff",layout:"vertical",id:"config",title:"Gestioni impostazioni upload"}),$.__views.config&&$.addTopLevelView($.__views.config),$.__views.__alloyId15=Ti.UI.createView({height:Ti.UI.SIZE,backgroundColor:"#FFFFFF",layout:"vertical",id:"__alloyId15"}),$.__views.config.add($.__views.__alloyId15),$.__views.activityIndicator=Ti.UI.createActivityIndicator({hiddenBehavior:Titanium.UI.HIDDEN_BEHAVIOR_GONE,style:Ti.UI.ActivityIndicatorStyle.BIG,indicatorColor:"black",id:"activityIndicator"}),$.__views.__alloyId15.add($.__views.activityIndicator),$.__views.__alloyId16=Ti.UI.createLabel({width:Ti.UI.SIZE,height:Ti.UI.SIZE,color:"#000000",top:"5dp",bottom:"5dp",left:"5dp",right:"5dp",text:"Da qui puoi controllare le impostazioni relative al tuo account Wikimedia con particolare riferimento alla funzionalit\xE0 di upload foto da app.",id:"__alloyId16"}),$.__views.__alloyId15.add($.__views.__alloyId16),$.__views.login_start=Ti.UI.createButton({backgroundColor:"#006499",color:"#FFF",top:"5dp",width:Ti.UI.FILL,left:"5dp",right:"5dp",hiddenBehavior:Ti.UI.HIDDEN_BEHAVIOR_GONE,title:"Accedi a Wikimedia Commons",id:"login_start"}),$.__views.__alloyId15.add($.__views.login_start),$.__views.login_update=Ti.UI.createButton({backgroundColor:"#EEE",color:"#000",top:"5dp",width:Ti.UI.FILL,left:"5dp",right:"5dp",hiddenBehavior:Ti.UI.HIDDEN_BEHAVIOR_GONE,title:"Verifica avvenuto accesso",id:"login_update"}),$.__views.__alloyId15.add($.__views.login_update),$.__views.login_delete=Ti.UI.createButton({backgroundColor:"#EEE",color:"#000",top:"5dp",width:Ti.UI.FILL,left:"5dp",right:"5dp",hiddenBehavior:Ti.UI.HIDDEN_BEHAVIOR_GONE,title:"Logout",id:"login_delete"}),$.__views.__alloyId15.add($.__views.login_delete),$.__views.mediawiki_data=Ti.UI.createLabel({width:Ti.UI.SIZE,height:Ti.UI.SIZE,color:"#000000",top:"5dp",bottom:"5dp",left:"5dp",right:"5dp",hiddenBehavior:Ti.UI.HIDDEN_BEHAVIOR_GONE,id:"mediawiki_data"}),$.__views.__alloyId15.add($.__views.mediawiki_data),$.__views.commento_login_start=Ti.UI.createLabel({width:Ti.UI.SIZE,height:Ti.UI.SIZE,color:"#000000",top:"5dp",bottom:"5dp",left:"5dp",right:"5dp",hiddenBehavior:Ti.UI.HIDDEN_BEHAVIOR_GONE,id:"commento_login_start",text:"Per proseguire, effettua il login o crea un account su Wikimedia Commons cliccando il tasto blu qui sopra. Se hai gi\xE0 fatto il login, clicca il tasto per verificare l'avvenuto accesso."}),$.__views.__alloyId15.add($.__views.commento_login_start),exports.destroy=function(){},_.extend($,$.__views);const Identity=require("ti.identity"),Dialog=require("ti.webdialog");var args=$.args;$.activityIndicator.show(),$.login_start.hide(),$.commento_login_start.hide(),$.login_delete.hide(),$.mediawiki_data.hide(),$.login_update.hide(),$.login_update.addEventListener("click",function(e){readInformation(UUID,!0)});const UUID=Titanium.Platform.id,USERNAME=Titanium.Platform.username+"";

$.config.addEventListener("open",function(e){




if("show"==args&&alert("Prima di poter caricare le fotografie, devi effettuare l'accesso a Wikimedia Commons."),!1==Ti.App.Properties.getBool("registrato",!1)){
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
!0==e.success?(
Ti.App.Properties.setBool("registrato",!0),
retrieveUserData(UUID,GENERATED_TOKEN)):

alert("Si \xE8 verificato un errore. Riprova pi\xF9 tardi: "+e.error);

}),

keychainItem.save(GENERATED_TOKEN);
}else
alert("Si \xE8 verificato un errore. Riprova pi\xF9 tardi."),
$.config.close();

},
onerror:function(e){
alert("Si \xE8 verificato un errore di connessione: "+e.error);
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
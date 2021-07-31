var Alloy=require("/alloy"),
Backbone=Alloy.Backbone,
_=Alloy._;




function __processArg(obj,key){
var arg=null;



return obj&&(arg=obj[key]||null),arg;
}

function Controller(){var _Stringformat=
































































































String.format;if(require("/alloy/controllers/BaseController").apply(this,Array.prototype.slice.call(arguments)),this.__controllerPath="about/index",this.args=arguments[0]||{},arguments[0])var __parentSymbol=__processArg(arguments[0],"__parentSymbol"),$model=__processArg(arguments[0],"$model"),__itemTemplate=__processArg(arguments[0],"__itemTemplate");var $=this,exports={},__defers={};$.__views.index=Ti.UI.createWindow({layout:"vertical",title:"Impostazioni",id:"index"}),$.__views.index&&$.addTopLevelView($.__views.index),$.__views.__alloyId0=Ti.UI.createScrollView({layout:"vertical",width:Ti.UI.FILL,scrollType:"vertical",id:"__alloyId0"}),$.__views.index.add($.__views.__alloyId0),$.__views.upload_config=Ti.UI.createButton({backgroundColor:"#8f0000",color:"#FFFFFF",hiddenBehavior:Ti.UI.HIDDEN_BEHAVIOR_GONE,top:"6dp",width:"80%",left:"10%",id:"upload_config",titleid:"upload_config"}),$.__views.__alloyId0.add($.__views.upload_config),$.__views.upload_list=Ti.UI.createButton({backgroundColor:"#8f0000",color:"#FFFFFF",hiddenBehavior:Ti.UI.HIDDEN_BEHAVIOR_GONE,top:"6dp",width:"80%",left:"10%",id:"upload_list",titleid:"upload_list"}),$.__views.__alloyId0.add($.__views.upload_list),$.__views.__alloyId1=Ti.UI.createView({height:Ti.UI.SIZE,layout:"horizontal",id:"__alloyId1"}),$.__views.__alloyId0.add($.__views.__alloyId1),$.__views.__alloyId2=Ti.UI.createLabel({width:Ti.UI.SIZE,height:Ti.UI.SIZE,top:"5dp",bottom:"5dp",left:"5dp",right:"5dp",textid:"analytics_ask",id:"__alloyId2"}),$.__views.__alloyId1.add($.__views.__alloyId2),$.__views.tracciamento=Ti.UI.createSwitch({value:!1,id:"tracciamento"}),$.__views.__alloyId1.add($.__views.tracciamento),$.__views.info=Ti.UI.createButton({backgroundColor:"#8f0000",color:"#FFFFFF",hiddenBehavior:Ti.UI.HIDDEN_BEHAVIOR_GONE,top:"6dp",width:"80%",left:"10%",id:"info",titleid:"info"}),$.__views.__alloyId0.add($.__views.info),$.__views.crediti=Ti.UI.createButton({backgroundColor:"#8f0000",color:"#FFFFFF",hiddenBehavior:Ti.UI.HIDDEN_BEHAVIOR_GONE,top:"6dp",width:"80%",left:"10%",id:"crediti",titleid:"credits"}),$.__views.__alloyId0.add($.__views.crediti),$.__views.faq=Ti.UI.createButton({backgroundColor:"#8f0000",color:"#FFFFFF",hiddenBehavior:Ti.UI.HIDDEN_BEHAVIOR_GONE,top:"6dp",width:"80%",left:"10%",id:"faq",titleid:"faq"}),$.__views.__alloyId0.add($.__views.faq),$.__views.lbl_version=Ti.UI.createLabel({width:Ti.UI.SIZE,height:Ti.UI.SIZE,top:"5dp",bottom:"5dp",left:"5dp",right:"5dp",id:"lbl_version"}),$.__views.__alloyId0.add($.__views.lbl_version),exports.destroy=function(){},_.extend($,$.__views);var args=$.args;$.index.addEventListener("focus",function(e){$.tracciamento.value=!0==Ti.App.Properties.getBool("analytics","notset"),!1==Ti.App.Properties.getBool("registrato",!1)||!1==Ti.App.Properties.getBool("autorizzato",!1)?($.upload_list.hide(),!1):($.upload_list.show(),!1)}),$.lbl_version.text=_Stringformat(L("app_version"),"2.4.2"),

$.info.addEventListener("click",function(e){
Alloy.Globals.utils.open("about/info");
}),



$.upload_config.addEventListener("click",function(e){
Alloy.Globals.utils.open("upload/config","settings");
}),

$.upload_list.addEventListener("click",function(e){
!0==Ti.App.Properties.getBool("registrato",!1)&&!0==Ti.App.Properties.getBool("autorizzato",!1)&&
Alloy.Globals.utils.open("upload/index");

}),

$.tracciamento.addEventListener("change",function(e){
!0==e.value?
Ti.App.Properties.setBool("analytics",!0):

Ti.App.Properties.setBool("analytics",!1);

}),

$.crediti.addEventListener("click",function(e){
alert(L("credits_text"));
}),

$.faq.addEventListener("click",function(e){var
Dialog=require("ti.webdialog"),

faq_url="https://app-backend.wikilovesmonuments.it/faq?language="+Ti.Locale.currentLanguage;

Dialog.isSupported()?

Dialog.open({
title:"FAQ",
url:faq_url,
entersReaderIfAvailable:!1}):



Ti.Platform.openURL(faq_url);

}),









_.extend($,exports);
}

module.exports=Controller;
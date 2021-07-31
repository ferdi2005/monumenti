var Alloy=require("/alloy"),
Backbone=Alloy.Backbone,
_=Alloy._;




function __processArg(obj,key){
var arg=null;



return obj&&(arg=obj[key]||null),arg;
}

function Controller(){














































function set_analytics(){
Ti.App.addEventListener("uncaughtException",function(e){
JSON.stringify(e);
var url=Alloy.Globals.backend+"/analytics/crash.json?data="+JSON.stringify(e);

!0==Ti.App.Properties.getBool("analytics","notset")&&(
url+="&uuid="+Titanium.Platform.id+"&device_name="+(Titanium.Platform.username+"&os=android&os_version=")+Titanium.Platform.version+"&model="+Titanium.Platform.model);


var xhr=Ti.Network.createHTTPClient({
onload:function(){
Ti.API.info("Analytics sent");
},
onerror:function(){
Ti.API.error("Analytics error");
},
timeout:5e3});

xhr.open("GET",url),
xhr.send();
});
}
function check_and_show_analytics(){
if("notset"==Ti.App.Properties.getBool("analytics","notset")){
var analytics=Ti.UI.createAlertDialog({
buttonNames:[L("accept"),L("refuse")],
messageid:"analytics_ask",
titleid:"analytics_title"});

analytics.addEventListener("click",function(e){
0==e.index?(
Ti.App.Properties.setBool("analytics",!0),
set_analytics(),
$.index.open()):(

Ti.App.Properties.setBool("analytics",!1),
$.index.open());

}),
analytics.show();
}else
$.index.open();

}if(require("/alloy/controllers/BaseController").apply(this,Array.prototype.slice.call(arguments)),this.__controllerPath="index",this.args=arguments[0]||{},arguments[0])var __parentSymbol=__processArg(arguments[0],"__parentSymbol"),$model=__processArg(arguments[0],"$model"),__itemTemplate=__processArg(arguments[0],"__itemTemplate");var $=this,exports={},__defers={},__alloyId16=[];$.__views.__alloyId17=Alloy.createController("home/index",{id:"__alloyId17"}),$.__views.map=Ti.UI.createTab({window:$.__views.__alloyId17.getViewEx({recurse:!0}),id:"map",titleid:"winmap",icon:"/images/Map Solid.png"}),__alloyId16.push($.__views.map),$.__views.__alloyId18=Alloy.createController("home/search",{id:"__alloyId18"}),$.__views.search=Ti.UI.createTab({window:$.__views.__alloyId18.getViewEx({recurse:!0}),id:"search",titleid:"search_tab",icon:"/images/search.png"}),__alloyId16.push($.__views.search),$.__views.__alloyId20=Alloy.createController("about/index",{id:"__alloyId20"}),$.__views.__alloyId19=Ti.UI.createTab({window:$.__views.__alloyId20.getViewEx({recurse:!0}),titleid:"settings_tab",icon:"/images/Info.png",id:"__alloyId19"}),__alloyId16.push($.__views.__alloyId19),$.__views.index=Ti.UI.createTabGroup({swipeable:!1,theme:"Theme.Titanium.DayNight.NoTitleBar",activeTintColor:"tabColor",activeTitleColor:"tabColor",tabs:__alloyId16,id:"index"}),$.__views.index&&$.addTopLevelView($.__views.index),exports.destroy=function(){},_.extend($,$.__views),global.tabgroup=$.index;

var url=Alloy.Globals.backend+"/analytics/version.json?old_version=2.4.2";

!0==Ti.App.Properties.getBool("analytics","notset")&&(
url+="&uuid="+Titanium.Platform.id+"&device_name="+(Titanium.Platform.username+"&os=android&os_version=")+Titanium.Platform.version+"&model="+Titanium.Platform.model);


var xhr=Ti.Network.createHTTPClient({
onload:function(e){var _Stringformat=



String.format;if(response=JSON.parse(this.responseText),!response.updated){var dialog=Ti.UI.createAlertDialog({message:_Stringformat(L("update_app"),"2.4.2",response.app_version),
okid:"ok"});

dialog.addEventListener("click",function(e){
check_and_show_analytics();
}),
dialog.show();
}else
check_and_show_analytics();

},
onerror:function(e){
$.index.open();
},
timeout:5e3});

xhr.open("GET",url),
xhr.send(),

$.index.addEventListener("open",function(e){
if("notset"==Ti.App.Properties.getBool("faq_dismissed","notset")){
var faq=Ti.UI.createAlertDialog({
buttonNames:[L("read_faq"),L("no_more_faq"),L("later_faq")],
messageid:"faq_ask"});

faq.addEventListener("click",function(e){
if(0==e.index){
Ti.App.Properties.setBool("faq_dismissed",!0);var
Dialog=require("ti.webdialog"),

faq_url=Alloy.Globals.backend+"/faq?language="+Ti.Locale.currentLanguage;

Dialog.isSupported()?

Dialog.open({
title:"FAQ",
url:faq_url,
entersReaderIfAvailable:!1}):



Ti.Platform.openURL(faq_url);

}else 1==e.index&&
Ti.App.Properties.setBool("faq_dismissed",!0);

}),
faq.show();
}else
$.index.open();

}),



$.index.onBack=function(e){
var dialog=Ti.UI.createAlertDialog({
buttonNames:[L("no"),L("yes")],
messageid:"close_app_ask"});

dialog.addEventListener("click",function(e){
1==e.index&&
$.index.close();

}),
dialog.show();
},









_.extend($,exports);
}

module.exports=Controller;
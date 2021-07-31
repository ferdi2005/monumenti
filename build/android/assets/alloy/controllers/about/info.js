var Alloy=require("/alloy"),
Backbone=Alloy.Backbone,
_=Alloy._;




function __processArg(obj,key){
var arg=null;



return obj&&(arg=obj[key]||null),arg;
}

function Controller(){





if(require("/alloy/controllers/BaseController").apply(this,Array.prototype.slice.call(arguments)),this.__controllerPath="about/info",this.args=arguments[0]||{},arguments[0])var
__parentSymbol=__processArg(arguments[0],"__parentSymbol"),
$model=__processArg(arguments[0],"$model"),
__itemTemplate=__processArg(arguments[0],"__itemTemplate");var

$=this,
exports={},
__defers={};







$.__views.info=Ti.UI.createWindow(
{layout:"vertical",id:"info",titleid:"info"}),

$.__views.info&&$.addTopLevelView($.__views.info),
$.__views.__alloyId3=Ti.UI.createScrollView(
{width:Ti.UI.FILL,scrollType:"vertical",layout:"vertical",id:"__alloyId3"}),

$.__views.info.add($.__views.__alloyId3),
$.__views.infocors=Ti.UI.createLabel(
{width:Ti.UI.SIZE,height:Ti.UI.SIZE,top:"5dp",bottom:"5dp",left:"5dp",right:"5dp",id:"infocors",textid:"infocors"}),

$.__views.__alloyId3.add($.__views.infocors),
$.__views.site=Ti.UI.createButton(
{backgroundColor:"#8f0000",color:"#FFFFFF",width:"80%",left:"10%",id:"site",titleid:"site"}),

$.__views.__alloyId3.add($.__views.site),
exports.destroy=function(){},




_.extend($,$.__views);



var args=$.args;



$.info.activity.onCreateOptionsMenu=function(e){var
menu=e.menu,
menuItem=menu.add({
title:"Back",
icon:"images/back.png",
showAsAction:Ti.Android.SHOW_AS_ACTION_ALWAYS});

menuItem.addEventListener("click",function(e){
$.info.close();
});
},


$.site.addEventListener("click",function(e){
Ti.Platform.openURL("https://wikilovesmonuments.it");
}),









_.extend($,exports);
}

module.exports=Controller;
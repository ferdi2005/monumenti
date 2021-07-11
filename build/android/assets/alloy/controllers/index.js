var Alloy=require("/alloy"),
Backbone=Alloy.Backbone,
_=Alloy._;




function __processArg(obj,key){
var arg=null;



return obj&&(arg=obj[key]||null),arg;
}

function Controller(){





if(require("/alloy/controllers/BaseController").apply(this,Array.prototype.slice.call(arguments)),this.__controllerPath="index",this.args=arguments[0]||{},arguments[0])var
__parentSymbol=__processArg(arguments[0],"__parentSymbol"),
$model=__processArg(arguments[0],"$model"),
__itemTemplate=__processArg(arguments[0],"__itemTemplate");var

$=this,
exports={},
__defers={},







__alloyId9=[];























if($.__views.__alloyId10=Alloy.createController("home/index",{id:"__alloyId10"}),$.__views.map=Ti.UI.createTab({window:$.__views.__alloyId10.getViewEx({recurse:!0}),id:"map",title:"Mappa",icon:"/images/Map Solid.png"}),__alloyId9.push($.__views.map),$.__views.__alloyId11=Alloy.createController("home/search",{id:"__alloyId11"}),$.__views.search=Ti.UI.createTab({window:$.__views.__alloyId11.getViewEx({recurse:!0}),id:"search",title:"Per nome",icon:"/images/search.png"}),__alloyId9.push($.__views.search),$.__views.__alloyId13=Alloy.createController("about/index",{id:"__alloyId13"}),$.__views.__alloyId12=Ti.UI.createTab({window:$.__views.__alloyId13.getViewEx({recurse:!0}),title:"Impostazioni",icon:"/images/Info.png",id:"__alloyId12"}),__alloyId9.push($.__views.__alloyId12),$.__views.index=Ti.UI.createTabGroup({theme:"Theme.AppCompat.NoTitleBar",swipeable:!1,tabs:__alloyId9,id:"index"}),$.__views.index&&$.addTopLevelView($.__views.index),exports.destroy=function(){},_.extend($,$.__views),!0==Ti.App.Properties.getBool("flurry","notset")){
var Flurry=require("ti.flurry");
Flurry.debugLogEnabled=!0,
Flurry.eventLoggingEnabled=!0,
Flurry.initialize("BPHB2T7TNDV6FGZHW233");
}

global.tabgroup=$.index;var

url="https://api.github.com/repos/ferdi2005/monumenti/releases/latest",
xhr=Ti.Network.createHTTPClient({
onload:function(e){
response=JSON.parse(this.responseText),
"v2.1.2"!=response.tag_name&&
alert("Attenzione! Stai usando una versione non aggiornata dell'applicazione (2.1.2) vai sullo store a scaricare la nuova versione "+response.tag_name+".");

},
onerror:function(e){
},
timeout:5e3});

xhr.open("GET","https://api.github.com/repos/ferdi2005/monumenti/releases/latest"),
xhr.send(),

$.index.open(),









_.extend($,exports);
}

module.exports=Controller;
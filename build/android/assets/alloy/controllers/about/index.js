var Alloy=require("/alloy"),
Backbone=Alloy.Backbone,
_=Alloy._;




function __processArg(obj,key){
var arg=null;



return obj&&(arg=obj[key]||null),arg;
}

function Controller(){





if(require("/alloy/controllers/BaseController").apply(this,Array.prototype.slice.call(arguments)),this.__controllerPath="about/index",this.args=arguments[0]||{},arguments[0])var
__parentSymbol=__processArg(arguments[0],"__parentSymbol"),
$model=__processArg(arguments[0],"$model"),
__itemTemplate=__processArg(arguments[0],"__itemTemplate");var

$=this,
exports={},
__defers={};







$.__views.index=Ti.UI.createWindow(
{backgroundColor:"#fff",layout:"vertical",title:"Impostazioni",id:"index"}),

$.__views.index&&$.addTopLevelView($.__views.index),
$.__views.__alloyId0=Ti.UI.createScrollView(
{backgroundColor:"#FFFFFF",layout:"vertical",width:Ti.UI.FILL,scrollType:"vertical",id:"__alloyId0"}),

$.__views.index.add($.__views.__alloyId0),
$.__views.upload_config=Ti.UI.createButton(
{backgroundColor:"#8f0000",color:"#FFFFFF",top:"5dp",width:"80%",left:"10%",title:"Gestione impostazioni upload",id:"upload_config"}),

$.__views.__alloyId0.add($.__views.upload_config),
$.__views.upload_list=Ti.UI.createButton(
{backgroundColor:"#006399",color:"#FFFFFF",top:"5dp",width:"80%",left:"10%",hiddenBehavior:Ti.UI.HIDDEN_BEHAVIOR_GONE,title:"Foto caricate",id:"upload_list"}),

$.__views.__alloyId0.add($.__views.upload_list),
$.__views.__alloyId1=Ti.UI.createView(
{height:Ti.UI.SIZE,backgroundColor:"#FFFFFF",layout:"horizontal",id:"__alloyId1"}),

$.__views.__alloyId0.add($.__views.__alloyId1),
$.__views.__alloyId2=Ti.UI.createLabel(
{width:Ti.UI.SIZE,height:Ti.UI.SIZE,color:"#000000",top:"5dp",bottom:"5dp",left:"5dp",right:"5dp",text:"Vuoi condividere con lo sviluppatore di quest'applicazione alcuni dati di utilizzo e in particolare di crash, in modo da poter contribuire al miglioramento della stessa, tramite la piattaforma Flurry?",id:"__alloyId2"}),

$.__views.__alloyId1.add($.__views.__alloyId2),
$.__views.tracciamento=Ti.UI.createSwitch(
{id:"tracciamento"}),

$.__views.__alloyId1.add($.__views.tracciamento),
$.__views.info=Ti.UI.createButton(
{backgroundColor:"#8f0000",color:"#FFFFFF",top:"5dp",width:"80%",left:"10%",title:"Informazioni su Wiki Loves Monuments",id:"info"}),

$.__views.__alloyId0.add($.__views.info),
$.__views.crediti=Ti.UI.createButton(
{backgroundColor:"#EEE",color:"#000",top:"5dp",title:"Crediti e significato dei colori",id:"crediti"}),

$.__views.__alloyId0.add($.__views.crediti),
$.__views.lbl_version=Ti.UI.createLabel(
{width:Ti.UI.SIZE,height:Ti.UI.SIZE,color:"#000000",top:"5dp",bottom:"5dp",left:"5dp",right:"5dp",id:"lbl_version"}),

$.__views.__alloyId0.add($.__views.lbl_version),
exports.destroy=function(){},




_.extend($,$.__views);



var args=$.args;

$.index.addEventListener("focus",function(e){
!0==Ti.App.Properties.getBool("flurry","notset")?
!0==$.tracciamento.value:

!1==$.tracciamento.value,


!1==Ti.App.Properties.getBool("registrato",!1)||!1==Ti.App.Properties.getBool("autorizzato",!1)?(
$.upload_list.hide(),!1):(




$.upload_list.show(),!1);




}),


$.lbl_version.text="Versione 2.1.2",

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
Ti.App.Properties.setBool("flurry",!0):

Ti.App.Properties.setBool("flurry",!1);

}),

$.crediti.addEventListener("click",function(e){
alert("Applicazione sviluppata da Ferdinando Traversa per il concorso Wiki Loves Monuments.\n Il pin azzurro indica un monumento che ha fotografie, il pin rosso indica un monumento che non ha ancora fotografie.\n Icona dell'albero modificata da Symbolon, licenza CC-BY 3.0\n Icone della barra di navigazione modificate da FontAwesome, licenza CC-BY-SA 4.0 ");
}),









_.extend($,exports);
}

module.exports=Controller;
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
{backgroundColor:"#fff",layout:"vertical",title:"Informazioni",id:"index"}),

$.__views.index&&$.addTopLevelView($.__views.index),
$.__views.__alloyId0=Ti.UI.createScrollView(
{backgroundColor:"#FFFFFF",layout:"vertical",width:Ti.UI.FILL,scrollType:"vertical",id:"__alloyId0"}),

$.__views.index.add($.__views.__alloyId0),
$.__views.upload_config=Ti.UI.createButton(
{backgroundColor:"#8f0000",color:"#FFFFFF",top:"5dp",width:"80%",left:"10%",title:"Gestione impostazioni upload",id:"upload_config"}),

$.__views.__alloyId0.add($.__views.upload_config),
$.__views.upload_list=Ti.UI.createButton(
{backgroundColor:"#006399",color:"#FFFFFF",top:"5dp",width:"80%",left:"10%",title:"Foto caricate",id:"upload_list"}),

$.__views.__alloyId0.add($.__views.upload_list),
$.__views.__alloyId1=Ti.UI.createView(
{height:Ti.UI.SIZE,backgroundColor:"#FFFFFF",layout:"horizontal",id:"__alloyId1"}),

$.__views.__alloyId0.add($.__views.__alloyId1),
$.__views.__alloyId2=Ti.UI.createLabel(
{width:Ti.UI.SIZE,height:Ti.UI.SIZE,color:"#000000",top:"5dp",bottom:"5dp",left:"5dp",right:"5dp",text:"Vuoi condividere con lo sviluppatore di quest'applicazione alcuni dati di utilizzo e in particolare di crash, in modo da poter contribuire al miglioramento della stessa, tramite la piattaforma Flurry?",id:"__alloyId2"}),

$.__views.__alloyId1.add($.__views.__alloyId2),
$.__views.tracciamento=Ti.UI.createSwitch(
{value:!0,id:"tracciamento"}),

$.__views.__alloyId1.add($.__views.tracciamento),
$.__views.__alloyId3=Ti.UI.createLabel(
{width:Ti.UI.SIZE,height:Ti.UI.SIZE,color:"#000000",top:"5dp",bottom:"5dp",left:"5dp",right:"5dp",text:"Applicazione sviluppata da Ferdinando Traversa per il concorso Wiki Loves Monuments.\nIl pin azzurro indica un monumento che ha fotografie, il pin rosso indica un monumento che non ha ancora fotografie, quindi affrettati a scattarne!",id:"__alloyId3"}),

$.__views.__alloyId0.add($.__views.__alloyId3),

$.__views.infocors=Ti.UI.createLabel(
{width:Ti.UI.SIZE,height:Ti.UI.SIZE,color:"#000000",top:"6dp",bottom:"6dp",left:"5dp",right:"5dp",id:"infocors",html:"<b>Wiki Loves Monuments</b> \xE8 un concorso internazionale che ha lo scopo di illustrare le voci di Wikipedia e dei progetti Wikimedia attraverso fotografie di beni culturali scattate dai cittadini stessi, risultando quindi anche una grande opportunit\xE0 di promozione turistica.\n\xC8 nato nel 2010 e viene organizzato annualmente in tutto il mondo, in pi\xF9 di 50 Paesi, <b>dall\u20191 al 30 settembre.</b>\nNel 2012 \xE8 entrato nel Guinness dei primati come pi\xF9 grande concorso fotografico al mondo. Ogni anno vengono caricate pi\xF9 di 130.000 fotografie.\nOggetto delle immagini ammesse a partecipare al concorso sono i monumenti, un insieme molto ampio che include edifici, sculture, siti archeologici, strutture architettoniche ma anche siti naturali e beni paesaggistici. Tutte le fotografie sono rilasciate con licenza libera e pubblicate su Wikimedia Commons, il grande database che illustra Wikipedia (il 5\xBA sito pi\xF9 visitato in Italia) e tutti gli altri progetti con contenuti multimediali (foto e video). Wiki Loves Monuments \xE8 aperto alla partecipazione di tutti, fotografi professionisti o amatori, senza limiti di et\xE0. L'edizione italiana \xE8 organizzata dal 2012 da Wikimedia Italia, associazione che si occupa dal 2005 di diffondere la conoscenza e la cultura libera in Italia, in qualit\xE0 di capitolo di Wikimedia Foundation."}),

$.__views.__alloyId0.add($.__views.infocors),

$.__views.info=Ti.UI.createButton(
{backgroundColor:"#8f0000",color:"#FFFFFF",top:"5dp",width:"80%",left:"10%",title:"Ulteriori informazioni",id:"info"}),

$.__views.__alloyId0.add($.__views.info),
$.__views.lbl_version=Ti.UI.createLabel(
{width:Ti.UI.SIZE,height:Ti.UI.SIZE,color:"#000000",top:"5dp",bottom:"5dp",left:"5dp",right:"5dp",id:"lbl_version"}),

$.__views.__alloyId0.add($.__views.lbl_version),
exports.destroy=function(){},




_.extend($,$.__views);



var args=$.args;
!0!=Ti.App.Properties.getBool("flurry","notset")||
!1!=$.tracciamento.value,


$.lbl_version.text="Versione 2.0.0",

$.info.addEventListener("click",function(e){
Ti.Platform.openURL("https://wikilovesmonuments.wikimedia.it");
}),


$.upload_config.addEventListener("click",function(e){
Alloy.Globals.utils.open("upload/config");
}),

$.upload_list.addEventListener("click",function(e){
Alloy.Globals.utils.open("upload/index");
}),

$.tracciamento.addEventListener("change",function(e){
!0==e.value?
Ti.App.Properties.setBool("flurry",!0):

Ti.App.Properties.setBool("flurry",!1);

}),









_.extend($,exports);
}

module.exports=Controller;
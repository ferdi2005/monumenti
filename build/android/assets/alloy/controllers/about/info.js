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
{backgroundColor:"#fff",layout:"vertical",id:"info",title:"Informazioni sul concorso"}),

$.__views.info&&$.addTopLevelView($.__views.info),

$.__views.infocors=Ti.UI.createLabel(
{width:Ti.UI.SIZE,height:Ti.UI.SIZE,color:"#000000",top:"5dp",bottom:"5dp",left:"5dp",right:"5dp",id:"infocors",html:"<b>Wiki Loves Monuments</b> \xE8 un concorso internazionale che ha lo scopo di illustrare le voci di Wikipedia e dei progetti Wikimedia attraverso fotografie di beni culturali scattate dai cittadini stessi, risultando quindi anche una grande opportunit\xE0 di promozione turistica.\n\t\t\xC8 nato nel 2010 e viene organizzato annualmente in tutto il mondo, in pi\xF9 di 50 Paesi, <b>dall\u20191 al 30 settembre.</b>\n\t\tNel 2012 \xE8 entrato nel Guinness dei primati come pi\xF9 grande concorso fotografico al mondo. Ogni anno vengono caricate pi\xF9 di 130.000 fotografie.\n\t\tOggetto delle immagini ammesse a partecipare al concorso sono i monumenti, un insieme molto ampio che include edifici, sculture, siti archeologici, strutture architettoniche ma anche siti naturali e beni paesaggistici. Tutte le fotografie sono rilasciate con licenza libera e pubblicate su Wikimedia Commons, il grande database che illustra Wikipedia (il 5\xBA sito pi\xF9 visitato in Italia) e tutti gli altri progetti con contenuti multimediali (foto e video). Wiki Loves Monuments \xE8 aperto alla partecipazione di tutti, fotografi professionisti o amatori, senza limiti di et\xE0. L'edizione italiana \xE8 organizzata dal 2012 da Wikimedia Italia, associazione che si occupa dal 2005 di diffondere la conoscenza e la cultura libera in Italia, in qualit\xE0 di capitolo di Wikimedia Foundation."}),

$.__views.info.add($.__views.infocors),

$.__views.site=Ti.UI.createButton(
{backgroundColor:"#8f0000",color:"#FFFFFF",title:"Visita il sito del concorso",id:"site"}),

$.__views.info.add($.__views.site),
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
var Alloy=require("/alloy"),
Backbone=Alloy.Backbone,
_=Alloy._;




function __processArg(obj,key){
var arg=null;



return obj&&(arg=obj[key]||null),arg;
}

function Controller(){





if(require("/alloy/controllers/BaseController").apply(this,Array.prototype.slice.call(arguments)),this.__controllerPath="upload/title",this.args=arguments[0]||{},arguments[0])var
__parentSymbol=__processArg(arguments[0],"__parentSymbol"),
$model=__processArg(arguments[0],"$model"),
__itemTemplate=__processArg(arguments[0],"__itemTemplate");var

$=this,
exports={},
__defers={};







$.__views.title=Ti.UI.createWindow(
{backgroundColor:"#fff",layout:"vertical",title:"Caricamento foto",id:"title"}),

$.__views.title&&$.addTopLevelView($.__views.title),
$.__views.activityIndicator=Ti.UI.createActivityIndicator(
{hiddenBehavior:Titanium.UI.HIDDEN_BEHAVIOR_GONE,style:Ti.UI.ActivityIndicatorStyle.BIG,indicatorColor:"black",id:"activityIndicator"}),

$.__views.title.add($.__views.activityIndicator);
var __alloyId50=[];$.__views.imagespace=Ti.UI.createTableViewSection(
{id:"imagespace",headerTitle:"Immagini da caricare"}),

__alloyId50.push($.__views.imagespace),$.__views.tableview=Ti.UI.createTableView(
{height:Ti.UI.SIZE,disableBounce:!0,separatorColor:"#000000",layout:"vertical",data:__alloyId50,id:"tableview"}),

$.__views.title.add($.__views.tableview),
$.__views.license=Ti.UI.createLabel(
{width:Ti.UI.SIZE,height:Ti.UI.SIZE,color:"#000000",top:"5dp",bottom:"5dp",left:"5dp",right:"5dp",text:"Accetto di rilasciare irrevocabilmente queste immagini sotto la licenza Creative Commons-Attribuzione-Condividi allo stesso modo 4.0. Sono consapevole che verranno pubblicate su Wikimedia Commons e saranno riutilizzabili in perpetuo secondo i termini di detta licenza. Dichiaro altres\xEC di essere l'autore delle immagini. Sono consapevole che la responsabilit\xE0 penale e civile per quanto caricato \xE8 a mio carico.",id:"license"}),

$.__views.title.add($.__views.license),
$.__views.conferma=Ti.UI.createButton(
{backgroundColor:"#006399",color:"#FFFFFF",top:"5dp",width:Ti.UI.FILL,left:"5dp",right:"5dp",title:"Conferma e carica",id:"conferma"}),

$.__views.title.add($.__views.conferma),
$.__views.annulla=Ti.UI.createButton(
{backgroundColor:"#8f0000",color:"#FFFFFF",top:"5dp",width:Ti.UI.FILL,left:"5dp",right:"5dp",title:"Annulla",id:"annulla"}),

$.__views.title.add($.__views.annulla),
exports.destroy=function(){},




_.extend($,$.__views);



var args=$.args;

$.conferma.hide(),

$.activityIndicator.show();const

UUID=args[0],
TOKEN=args[1];var
images=args[2],
monument=args[3],

fieldtext={},
data=[],
uploaded=[],

today=new Date;

Array(images)[0].forEach(
function(photo){var
url=Alloy.Globals.backend+"/photoupload.json",
client=Ti.Network.createHTTPClient({
onload:function(e){
if("User not found."==JSON.parse(this.responseText).error){
var alert=Ti.UI.createAlertDialog({message:"Si \xE8 verificato un errore. Esegui il logout dalla Gestione impostazioni upload nella scheda impostazioni.",buttonNames:["Ok"]});
alert.addEventListener("click",function(e){
$.title.close();
}),
alert.show();
}else if("Photo upload not succedeed."==JSON.parse(this.responseText).error){var
row=Titanium.UI.createTableViewRow({layout:"horizontal"}),
image=Titanium.UI.createImageView({
image:photo.media,
top:"5dp",
left:"5dp",
width:"100dp",
left:0}),


label=Titanium.UI.createLabel({
text:"Errore nel caricamento di quest'immagine, riprova pi\xF9 tardi."});


row.add(image),
row.add(label),

$.imagespace.add(row);
}else{var
response=JSON.parse(this.responseText),
id=response.id,

row=Titanium.UI.createTableViewRow({layout:"horizontal"}),
image=Titanium.UI.createImageView({
image:photo.media,
top:"5dp",
left:"5dp",
width:"100dp",
left:0}),


view=Titanium.UI.createView({
layout:"vertical",
height:Ti.UI.SIZE}),


pretitolo=response.city+" - "+response.label+" - "+response.timestamp,

title=Titanium.UI.createTextField({
hintText:"Titolo dell'immagine",
id:"title"+id,
inputType:Titanium.UI.INPUT_TYPE_CLASS_TEXT,
width:Ti.UI.FILL,
height:Ti.UI.SIZE,
left:"5dp",
borderStyle:Ti.UI.INPUT_BORDERSTYLE_LINE,
hintTextColor:"#A0A0A0",
color:"black",
borderColor:"black",
borderWidth:"0.3",
value:pretitolo});


fieldtext["title"+id]=title,

view.add(title);var

predescrizione=response.city+" - "+response.label,

description=Titanium.UI.createTextField({
hintText:"Descrizione dell'immagine",
id:"description"+id,
inputType:Titanium.UI.INPUT_TYPE_CLASS_TEXT,
width:Ti.UI.FILL,
height:Ti.UI.SIZE,
left:"5dp",
borderStyle:Ti.UI.INPUT_BORDERSTYLE_LINE,
hintTextColor:"#A0A0A0",
color:"black",
borderColor:"black",
borderWidth:"0.3",
value:predescrizione});


fieldtext["description"+id]=description,

view.add(description);

var date=Titanium.UI.createTextField({
hintText:"Data della foto (gg/mm/aaaa)",
id:"date"+id,
inputType:Titanium.UI.INPUT_TYPE_CLASS_TEXT,
width:Ti.UI.FILL,
height:Ti.UI.SIZE,
left:"5dp",
borderStyle:Ti.UI.INPUT_BORDERSTYLE_LINE,
hintTextColor:"#A0A0A0",
color:"black",
borderColor:"black",
borderWidth:"0.3",
value:response.today});


fieldtext["date"+id]=date,

view.add(date),

row.add(image),
row.add(view),
uploaded.push(id),

$.imagespace.add(row),
$.activityIndicator.hide(),
$.activityIndicator.height=0,
$.conferma.show();
}
},
onerror:function(e){var
row=Titanium.UI.createTableViewRow({layout:"horizontal"}),
image=Titanium.UI.createImageView({
image:photo.media,
top:"5dp",
left:"5dp",
width:"100dp",
left:0}),


label=Titanium.UI.createLabel({
text:"Errore nel caricamento di quest'immagine, riprova pi\xF9 tardi."});


row.add(image),
row.add(label),

$.imagespace.add(row),

$.activityIndicator.hide(),
$.activityIndicator.height=0;
},
timeout:6e5});

client.open("POST",url);
var content={
file:photo.media,
uuid:UUID,
token:TOKEN,
monument:monument};

client.send(content);
});


const DATEREGEX=/\d{2}\/\d{2}\/\d{4}/;

$.conferma.addEventListener("click",function(e){var

photos={},
campi_pieni=!0;




















if(uploaded.forEach(function(id){var title=fieldtext["title"+id].value.trim(),description=fieldtext["description"+id].value.trim(),date=fieldtext["date"+id].value.trim();photos[id]=[title,description,date],date.match(DATEREGEX)||(alert("Attenzione: il formato della data deve essere gg/mm/aaaa come per esempio 11/05/2005."),campi_pieni=!1),(""==title||""==description||""==date)&&(alert("I campi sono obbligatori! Compilali tutti prima di procedere all'upload (o premi invio sulla tastiera se l'hai fatto)."),campi_pieni=!1)}),campi_pieni){var
url=Alloy.Globals.backend+"/set_title.json",
client=Ti.Network.createHTTPClient({
onload:function(e){
var alert=Ti.UI.createAlertDialog({message:"Foto messe in coda per il caricamento con successo! Puoi verificare il loro stato nelle impostazioni.",buttonNames:["Ok"]});
alert.addEventListener("click",function(e){
$.title.close();
}),
alert.show();
},
onerror:function(e){
var alert=Ti.UI.createAlertDialog({message:"Qualcosa \xE8 andato storto e il caricamento non \xE8 riuscito. Riprova pi\xF9 tardi: "+e.error,buttonNames:["Ok"]});
alert.addEventListener("click",function(e){
$.title.close();
});
},
timeout:2e4});

client.open("POST",url);
var content={
uuid:UUID,
token:TOKEN,
photos:JSON.stringify(photos)};

client.send(content);
}
}),

$.annulla.addEventListener("click",function(e){
if(0<uploaded.length){
$.activityIndicator.show();var

url=Alloy.Globals.backend+"/photocancel.json",
client=Ti.Network.createHTTPClient({
onload:function(e){
$.activityIndicator.hide(),
$.activityIndicator.height=0,
$.title.close();
},
onerror:function(e){
$.activityIndicator.hide(),
$.activityIndicator.height=0,
$.title.close();
},
timeout:2e4});

client.open("POST",url);
var content={
uuid:UUID,
token:TOKEN,
ids:JSON.stringify(uploaded)};

client.send(content);
}else
$.title.close();

}),









_.extend($,exports);
}

module.exports=Controller;
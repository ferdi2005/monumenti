// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

if (Ti.App.Properties.getBool("flurry", "notset") == true) {
    $.tracciamento.value == true;
} else {
    $.tracciamento.value == false;
}

$.lbl_version.text = "Versione " + Ti.App.version;

$.info.addEventListener("click", function(e){
    Alloy.Globals.utils.open("about/info");
});

// Apri le impostazioni degli upload
$.upload_config.addEventListener("click", function(e){
    Alloy.Globals.utils.open("upload/config");
});

$.upload_list.addEventListener("click", function(e){
    Alloy.Globals.utils.open("upload/index");
});

$.tracciamento.addEventListener("change", function(e){
    Ti.API.log(Ti.App.Properties.getBool("flurry", "notset"));
    if (e.value == true) {
       Ti.App.Properties.setBool("flurry", true);
    } else {
        Ti.App.Properties.setBool("flurry", false);
    }
    Ti.API.log(Ti.App.Properties.getBool("flurry", "notset"));
});

$.crediti.addEventListener("click", function(e){
    alert("Applicazione sviluppata da Ferdinando Traversa per il concorso Wiki Loves Monuments. Il pin azzurro indica un monumento che ha fotografie, il pin rosso indica un monumento che non ha ancora fotografie, quindi affrettati a scattarne! Icona dell'albero modificata da Symbolon, licenza CC-BY 3.0");
});
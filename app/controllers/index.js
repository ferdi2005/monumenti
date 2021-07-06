if (Ti.App.Properties.getBool("flurry", "notset") == "notset") {
    var dialog = Ti.UI.createAlertDialog({
        buttonNames: ['Accetta', 'Rifiuta'],
        message: "Vuoi condividere con lo sviluppatore di quest'applicazione alcuni dati di utilizzo e in particolare di crash, in modo da poter contribuire al miglioramento della stessa, tramite la piattaforma Flurry?",
        title: 'Dati di utilizzo e crash'
      });
      dialog.addEventListener('click', function(e) {
        if (e.index == 0) {
            Ti.App.Properties.setBool("flurry", true);
        } else {
            Ti.App.Properties.setBool("flurry", false);
        }
      });
      dialog.show();    
} else if (Ti.App.Properties.getBool("flurry", "notset") == true) {
    var Flurry = require('ti.flurry');
    Flurry.debugLogEnabled = true;
    Flurry.eventLoggingEnabled = true;
    Flurry.initialize('BPHB2T7TNDV6FGZHW233');
}

global.tabgroup = $.index;

var url = 'https://api.github.com/repos/ferdi2005/monumenti/releases/latest';
var xhr = Ti.Network.createHTTPClient({
    onload: function(e) {
        response = JSON.parse(this.responseText);
        if (response.tag_name != 'v' + Ti.App.version ) {
            alert("Attenzione! Stai usando una versione non aggiornata dell'applicazione (" + Ti.App.version + ") vai sullo store a scaricare la nuova versione " + response.tag_name + ".");
        }
    },
    onerror: function(e) {
    },
    timeout: 5000
});
xhr.open('GET', url);
xhr.send();

$.index.open();
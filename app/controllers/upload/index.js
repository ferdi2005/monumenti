const Identity = require("ti.identity");
const Dialog = require('ti.webdialog');

// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

$.index.addEventListener("open", function(e){
    if (Ti.App.Properties.getBool("registrato", false) == false || Ti.App.Properties.getBool("autorizzato", false) == false ) {
        var alert = Ti.UI.createAlertDialog({message: "Non hai ancora provveduto alla registrazione o al caricamento di fotografie.", buttonNames: ["Ok"]});
        alert.addEventListener("click", function(e){
            $.index.close();
        });
        alert.show();
    } else {
        $.activityIndicator.show();

        const UUID = Titanium.Platform.id; // identificativo univoco del device
        var keychainItem = Identity.createKeychainItem({ identifier: "token" });
        keychainItem.addEventListener("read", function(k){
            if (k.success == true) {
                var url = Alloy.Globals.backend + "/photolist.json?uuid=" + UUID + "&token=" + k.value
                var client = Ti.Network.createHTTPClient({
                    onload: function(e) {
                        var photos = JSON.parse(this.responseText);
                        
                        items = [];

                        photos.forEach(function(photo) {
                            if (photo["uploaded"] == false) {
                                if (photo["errorinfo"] == null || photo["errorinfo"] == undefined) {
                                var errortext = "Immagine non caricata a causa di un errore."
                                } else {
                                var errortext= "Immagine non caricata a causa di un errore: " + photo["errorinfo"]
                                }
                                itemdata =  { 
                                    photo: {
                                        image: photo["serverurl"]
                                    },
                                    errorlabel: {
                                        text: errortext
                                    },
                                    template: "error",
                                }    
                            } else if (photo["uploaded"] == null) {
                                itemdata =  { 
                                    photo: {
                                        image: photo["serverurl"]
                                    },
                                    template: "waiting",
                                }
                            } else if (photo["uploaded"] == true) {
                                itemdata =  { 
                                    photo: {
                                        image: photo["url"],
                                        id: photo["descriptionurl"]
                                    },
                                    title: {
                                        text: photo["canonicaltitle"],
                                        id: photo["descriptionurl"]
                                    },
                                    template: "success",
                                }
                            }

                            items.push(itemdata);
                        });
                        
                        $.imagespace.setItems(items);
                        $.activityIndicator.hide();
                        $.activityIndicator.height = 0;
                    },
                    onerror: function(e) {
                        var alert = Ti.UI.createAlertDialog({message: "Si è verificato un errore: " + e.error, buttonNames: ["Ok"]});
                        alert.addEventListener("click", function(e){
                            $.index.close();
                        });
                        alert.show();
                    },
                    timeout: 5000
                });
                client.open("GET", url);
                client.send();
            } else {
                var alert = Ti.UI.createAlertDialog({message: "Si è verificato un errore, riprova più tardi", buttonNames: ["Ok"]});
                alert.addEventListener("click", function(e){
                    $.index.close();
                });
                alert.show();
            }
        });
        keychainItem.read();
    }
});

function openPhoto(e) {
    if (Dialog.isSupported()) {
        Dialog.open({
            title: e.source.text,
            url: e.source.id
        })
    } else {
        Ti.Platform.openURL(e.source.id);
    }
} 
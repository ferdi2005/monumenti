const Identity = require("ti.identity");
const Dialog = require('ti.webdialog');

var args = $.args;

// Mostra activity indicator
$.activityIndicator.show();

// Nascondo tutti gli elementi (verranno mostrati successivamente)
$.login_start.hide();
$.commento_login_start.hide();
$.login_delete.hide();
$.mediawiki_data.hide();
$.login_update.hide();

// Dati utili
const UUID = Titanium.Platform.id; // identificativo univoco del device
const USERNAME = String(Titanium.Platform.username); // username del device (a scopi statistici)

// In caso di errori o richiesta, cancella la registrazione
function triggerDeletion(uuid){
    var keychainItem = Identity.createKeychainItem({ identifier: "token" });
    keychainItem.addEventListener("read", function(k){
        if (k.success == true) {
            // Cancella la registrazione
            var keychainItem = Identity.createKeychainItem({ identifier: "token" });
            keychainItem.reset();
            Ti.App.Properties.setBool("registrato", false);
            Ti.App.Properties.setBool("autorizzato", false);
            // Invia la cancellazione della registrazione al server per cancellare l'utente
            var url = Alloy.Globals.backend + "/deleteuser.json?uuid=" + uuid + "&token=" + k.value
            var client = Ti.Network.createHTTPClient({
                onload: function(e) {
                    var alert = Ti.UI.createAlertDialog({message: "È stata cancellata la tua registrazione su tua richiesta o a causa di un errore. Riapri questa scheda per crearne una nuova e caricare le tue fotografie.", buttonNames: ["Ok"]});
                    alert.addEventListener("click", function(e){
                        $.config.close();
                    });
                    alert.show();
                },
                onerror: function(e) {
                    var alert = Ti.UI.createAlertDialog({message: "Non è stato possibile cancellare i tuoi dati dal server. Assicurati di revocare l'autorizzazione oAuth. " + e.error, buttonNames: ["Ok"]});
                    alert.addEventListener("click", function(e){
                        $.config.close();
                    });
                    alert.show();
                },
                timeout: 5000
            });
            client.open("GET", url);
            client.send();
        } else {
            Ti.App.Properties.setBool("registrato", false);
            Ti.App.Properties.setBool("autorizzato", false);

            var alert = Ti.UI.createAlertDialog({message: "Non è stato possibile cancellare i tuoi dati dal server. Assicurati di revocare l'autorizzazione oAuth. ", buttonNames: ["Ok"]});
            alert.addEventListener("click", function(e){
                $.config.close();
            });
            alert.show();
        }
    });
    keychainItem.read();
    
}

// Mostra i dati dell'utente
function showUserInfo(userInfo) {
    $.login_delete.show();

    $.login_delete.addEventListener("click", function(e){
        triggerDeletion(UUID);
    });

    if (userInfo.testuser == true) {
        $.mediawiki_data.text = "Hai eseguito l'accesso alla Wiki di test. Da ora puoi tornare indietro e caricare le tue fotografie tramite l'apposito tasto sulla scheda di ogni monumento sulla mappa. Le tue foto non verranno caricate davvero."
    } else {
        $.mediawiki_data.text = "Hai eseguito l'accesso a Wikimedia Commons. Da ora puoi tornare indietro e caricare le tue fotografie tramite l'apposito tasto sulla scheda di ogni monumento sulla mappa."
    }
    if (userInfo.ready == true) {
        $.mediawiki_data.text = $.mediawiki_data.text += " Il tuo nome utente è " + userInfo.username
    }
    $.mediawiki_data.show();
}

// Svolge le operazioni per aprire la finestra di login
function startLogin(userInfo) {
    var url = Alloy.Globals.backend + "/start_login?uuid=" + userInfo.uuid + "&token=" + userInfo.token;
    if (Dialog.isSupported()) {
        Dialog.open({
            title: "Esegui il login a Commons",
            url: url,
            dismissButtonStyle: Dialog.DISMISS_BUTTON_STYLE_DONE
        });
        Dialog.addEventListener("close", function(e){
            retrieveUserData(userInfo.uuid, userInfo.token);
            $.activityIndicator.show();
        });
    } else {
        // Fallback nel caso in cui non sia supportato il webdialog
        Ti.Platform.openURL(url);
    }
}

// Funzione per recuperare le informazioni dell'utente e mostrare in seguito tutto
function retrieveUserData(uuid, token) {
    var url = Alloy.Globals.backend + "/userinfo.json?uuid=" + uuid + "&token=" + token
    var client = Ti.Network.createHTTPClient({
        onload: function(e) {
            if (JSON.parse(this.responseText).error == "User not found.") {
                triggerDeletion(UUID);
            } else {
                var userInfo = JSON.parse(this.responseText);
                
                if (userInfo.authorized == true) {
                    showUserInfo(userInfo);
                    Ti.App.Properties.setBool("autorizzato", true);
                    $.login_start.hide();
                    $.login_update.hide();
                    $.commento_login_start.hide();
                    $.activityIndicator.hide();
                } else {
                    Ti.App.Properties.setBool("autorizzato", false);
                    $.login_start.show();
                    $.login_update.show();
                    $.commento_login_start.show();
                    $.login_start.addEventListener("click", function(e){
                        startLogin(userInfo);
                    });
                    $.login_update.addEventListener("click", function(e){
                        readInformation(UUID);
                    });
                    $.activityIndicator.hide();
                }
            }
        },
        onerror: function(e) {
            alert("Si è verificato un errore. Riprova più tardi: " + e.error)
            $.config.close;
        },
        timeout: 5000
    });
    client.open("GET", url);
    client.send();
}

function readInformation(uuid) {
// Recupero token salvato nel keychain e procedo con la lettura delle informazioni
    var keychainItem = Identity.createKeychainItem({ identifier: "token" });
    keychainItem.addEventListener("read", function(e){
        if (e.success == true) {
            retrieveUserData(uuid, e.value); // Il token è contenuto in e.value
        } else {
            var alert = Ti.UI.createAlertDialog({message: "Si è verificato un problema, riprova più tardi. Se si ripresenta, fai il logout.", buttonNames: ["Ok"]});
            alert.addEventListener("click", function(e){
                $.config.close();
            });
            alert.show();    
        }
        
    });
    keychainItem.read();
}

$.config.addEventListener("open", function(e) {
    // Nel caso in cui non sia stata effettuata la registrazione, procede ad effettuarla
    if (Ti.App.Properties.getBool("registrato", false) == false) {
        const GENERATED_TOKEN = Titanium.Platform.createUUID();
        var credentials = {
            uuid: UUID,
            device_name: USERNAME,
            token: GENERATED_TOKEN
        };

        var url = Alloy.Globals.backend + "/set_credentials.json"

        var client = Ti.Network.createHTTPClient({
            onload: function(e) {
                if (this.status == 202) {
                    var keychainItem = Identity.createKeychainItem({
                        identifier: "token"
                    });

                    keychainItem.addEventListener("save", function(e){
                        if (e.success == true) {
                            Ti.App.Properties.setBool("registrato", true); // Imposta l'avvenuta registrazione con successo
                            retrieveUserData(UUID, GENERATED_TOKEN);
                        } else {
                            alert("Si è verificato un errore. Riprova più tardi: " + e.error)
                        }
                    });

                    keychainItem.save(GENERATED_TOKEN);
                } else {
                    alert("Si è verificato un errore. Riprova più tardi.")
                    $.config.close();        
                }
            },
            onerror: function(e) {
                alert("Si è verificato un errore di connessione: " + e.error);
            },
            timeout: 5000
        });
        client.open("POST", url);
        client.send(credentials);
    } else {
        readInformation(UUID);
    }
});
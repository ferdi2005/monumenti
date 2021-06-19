var args = $.args;
var Identity = require("ti.identity");
var Dialog = require('ti.webdialog');

// Mostra activity indicator
$.activityIndicator.show();

// Titolo della finestra su Android
if (OS_ANDROID) {
    $.config.addEventListener("open", function(){
        $.config.activity.actionBar.title = $.config.title;
    });
}

// Nascondo tutti gli elementi (verranno mostrati successivamente)
$.login_start.hide();
$.commento_login_start.hide();
$.login_delete.hide();
$.mediawiki_data.hide();

// Dati utili
const UUID = Titanium.Platform.id; // identificativo univoco del device
const USERNAME = String(Titanium.Platform.username); // username del device (a scopi statistici)

// In caso di errori, cancella la registrazione
function triggerDeletion(){
    // TODO: Aggiungere chiamata API con cancellazione dell'UUID (solo qualora il devicename corrisponda)
    var keychainItem = Identity.createKeychainItem({ identifier: "token" });
    keychainItem.reset();
    Ti.App.Properties.setBool("registrato", false);
    $.config.close();
}

// Mostra i dati dell'utente
function showUserInfo(userInfo) {
    // TODO: mostrare dati utili all'utente nel label
    $.login_delete.show();
}

// Svolge le operazioni per aprire la finestra di login
function startLogin(userInfo) {
    var url = Alloy.Globals.backend + "/start_login?uuid=" + userInfo.uuid + "&token=" + userInfo.token;
    if (Dialog.isSupported()) {
        Dialog.open({
            title: "Esegui il login a Commons",
            url: url
        })
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
            if (JSON.parse(this.responseText).error == "User not found") {
                triggerDeletion();
            } else {
                var userInfo = JSON.parse(this.responseText);
                
                if (userInfo.authorized == true) {
                    showUserInfo(userInfo);
                } else {
                    $.login_start.show();
                    $.commento_login_start.show();
                    $.activityIndicator.hide();
                    $.login_start.addEventListener("click", function(e){
                        startLogin(userInfo);
                    });
                }
            }
        },
        onerror: function(e) {
            alert("Si è verificato un errore. Riprova più tardi: " + e.error)
        },
        timeout: 5000
    });
    client.open("GET", url);
    client.send();
}

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
            Ti.API.log(this.status);
            if (this.status == 202) {
                var keychainItem = Identity.createKeychainItem({
                    identifier: "token"
                });

                keychainItem.addEventListener("save", function(e){
                    if (e.success == true) {
                        Ti.App.Properties.setBool("registrato", true); // Imposta l'avvenuta registrazione con successo
                    } else {
                        alert("Si è verificato un errore. Riprova più tardi: " + e.error)
                    }
                });

                keychainItem.save(GENERATED_TOKEN);

                // TODO: rendere visibile testo introduttivo e nascondere loader
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
}

// Recupero token salvato nel keychain e procedo con la lettura delle informazioni
var keychainItem = Identity.createKeychainItem({ identifier: "token" });
keychainItem.addEventListener("read", function(e){
    Ti.API.log(JSON.stringify(e));
    if (e.success == true) {
        retrieveUserData(UUID, e.value); // Il token è contenuto in e.value
    } else {
        triggerDeletion();
    }
    
});
keychainItem.read();
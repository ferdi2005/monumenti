const Identity = require("ti.identity");
const Dialog = require('ti.webdialog');

var args = $.args;

// Mostra activity indicator
$.activityIndicator.show();
$.activityIndicator.height = Ti.UI.SIZE;

// Nascondo tutti gli elementi (verranno mostrati successivamente)
$.login_start.hide();
$.login_start.height = 0;

$.commento_login_start.hide();
$.commento_login_start.height = 0;

$.login_delete.hide();
$.login_delete.height = 0;

$.mediawiki_data.hide();
$.mediawiki_data.height = 0;

$.login_update.hide();
$.login_update.height = 0;
    
// Non mostrare il bottone indietro su iOS se arriva da un passaggio obbligatorio
if (args == "show") {
    $.config.hidesBackButton = true;
}

// Mostra bottone indietro
if (args == "settings") {
    if (OS_ANDROID) {
        $.config.activity.onCreateOptionsMenu = function(e) { 
                var menu = e.menu; 
                var menuItem = menu.add({ 
                    title: "Back", 
                    icon: "images/back.png", 
                    showAsAction: Ti.Android.SHOW_AS_ACTION_ALWAYS
                }); 
                menuItem.addEventListener("click", function(e) { 
                    $.config.close();
                }); 
            };
    }
}

// Dati utili
const UUID = Titanium.Platform.id; // identificativo univoco del device
const USERNAME = String(Titanium.Platform.username); // username del device (a scopi statistici)

// Cancella in caso di problemi
if (args == "delete") {
    var alert = Ti.UI.createAlertDialog({messageid: "problem_do_logout", buttonNames: [L("close"), L("login_delete")]});
    alert.addEventListener("click", function(e){
        if (e.index == 0) {
            $.config.close();
        } else {
            triggerDeletion(UUID, false);
            $.config.close();
        }
    });
    alert.show();

}
// Event listener su Login update
$.login_update.addEventListener("click", function(e){
    readInformation(UUID, true);
});

// In caso di errori o richiesta, cancella la registrazione
function triggerDeletion(uuid, user_initiated = false){
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
                    var message;

                    if (user_initiated) {
                        message = "registration_deleted_by_user";
                    } else {
                        message = "registration_deleted_by_error";
                    }
                    var alert = Ti.UI.createAlertDialog({messageid: message, okid: "ok"});
                    alert.addEventListener("click", function(e){
                        $.config.close();
                    });
                    alert.show();
                },
                onerror: function(e) {
                    if (user_initiated) {
                        var alert = Ti.UI.createAlertDialog({message: L("server_deletion_not_possible") + e.error, okid: "ok"});
                        alert.addEventListener("click", function(e){
                            $.config.close();
                        });
                        alert.show();
                    }
                },
                timeout: 5000
            });
            client.open("GET", url);
            client.send();
        } else {
            Ti.App.Properties.setBool("registrato", false);
            Ti.App.Properties.setBool("autorizzato", false);

            var alert = Ti.UI.createAlertDialog({messageid: "server_deletion_not_possible", okid: "ok"});
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
    $.login_delete.height = Ti.UI.SIZE;

    $.login_delete.addEventListener("click", function(e){
        triggerDeletion(UUID, true);
    });

    if (userInfo.testuser == true) {
        $.mediawiki_data.text = L("test_wiki_login");
    } else {
        $.mediawiki_data.text = L("commons_login");
    }
    if (userInfo.ready == true) {
        $.mediawiki_data.text = $.mediawiki_data.text += String.format(L("your_username"), userInfo.username);
    }
    $.mediawiki_data.show();
    $.mediawiki_data.height = Ti.UI.SIZE;
}

// Svolge le operazioni per aprire la finestra di login
function startLogin(userInfo) {
    var url = Alloy.Globals.backend + "/start_login?uuid=" + userInfo.uuid + "&token=" + userInfo.token;
    if (Dialog.isSupported()) {
        Dialog.open({
            title: L("start_commons_login"),
            url: url,
            dismissButtonStyle: Dialog.DISMISS_BUTTON_STYLE_DONE
        });
        Dialog.addEventListener("close", function(e){
            retrieveUserData(userInfo.uuid, userInfo.token);
            $.activityIndicator.show();
            $.activityIndicator.height = Ti.UI.SIZE;
        });
    } else {
        // Fallback nel caso in cui non sia supportato il webdialog
        Ti.Platform.openURL(url);
    }
}

// Funzione per recuperare le informazioni dell'utente e mostrare in seguito tutto
function retrieveUserData(uuid, token, user_initiated = false) {
    var url = Alloy.Globals.backend + "/userinfo.json?uuid=" + uuid + "&token=" + token
    var client = Ti.Network.createHTTPClient({
        onload: function(e) {
            if (JSON.parse(this.responseText).error == "User not found.") {
                triggerDeletion(UUID);
            } else {
                var userInfo = JSON.parse(this.responseText);
                
                if (userInfo.authorized == true) {
                    Ti.App.Properties.setBool("autorizzato", true);
                    $.login_start.hide();
                    $.login_start.height = 0;

                    $.login_update.hide();
                    $.login_update.height = 0;

                    $.commento_login_start.hide();
                    $.commento_login_start.height = 0;

                    $.activityIndicator.hide();
                    $.activityIndicator.height = 0;
                    // In caso di arrivo dalla finestra di caricamento
                    if (args == "show") {
                        $.config.close();
                    } else {
                        showUserInfo(userInfo);
                    }
                } else {
                    Ti.App.Properties.setBool("autorizzato", false);
                    $.login_start.show();
                    $.login_start.height = Ti.UI.SIZE;

                    $.login_update.show();
                    $.login_update.height = Ti.UI.SIZE;

                    $.commento_login_start.show();
                    $.commento_login_start.height = Ti.UI.SIZE;

                    $.login_start.addEventListener("click", function(e){
                        startLogin(userInfo);
                    });
                    $.activityIndicator.hide();
                    $.activityIndicator.height = 0;
                    if (user_initiated) {
                        alert(L("login_not_done"));
                    }
                }
            }
        },
        onerror: function(e) {
            alert(String.format(L("connection_erorr"), e.error));
            $.config.close;
        },
        timeout: 5000
    });
    client.open("GET", url);
    client.send();
}

function readInformation(uuid, user_initiated = false) {
// Recupero token salvato nel keychain e procedo con la lettura delle informazioni
    var keychainItem = Identity.createKeychainItem({ identifier: "token" });
    keychainItem.addEventListener("read", function(e){
        if (e.success == true) {
            retrieveUserData(uuid, e.value, user_initiated); // Il token è contenuto in e.value
        } else {
            var alert = Ti.UI.createAlertDialog({messageid: "problem_do_logout", buttonNames: [L("close"), L("login_delete")]});
            alert.addEventListener("click", function(e){
                if (e.index == 0) {
                    $.config.close();
                } else {
                    triggerDeletion(UUID, false);
                }
            });
            alert.show();
        }
        
    });
    keychainItem.read();
}

$.config.addEventListener("open", function(e) {
    if (args == "show") {
        var dialog = Ti.UI.createAlertDialog({
            messageid: 'no_upload_until_commons',
            okid: "ok",
          });
    dialog.show();        
    }
    // Nel caso in cui non sia stata effettuata la registrazione, procede ad effettuarla
    if (Ti.App.Properties.getBool("registrato", false) == false) {
        // Elimina un eventuale token già presente (risolve un bug su iOS per cui alla reinstallazione dell'app persisteva il keychainItem
        var keychainItem = Identity.createKeychainItem({ identifier: "token" });
        keychainItem.reset();
    
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
                            var alert = Ti.UI.createAlertDialog({messageid: "problem_do_logout", buttonNames: [L("close"), L("login_delete")]});
                            alert.addEventListener("click", function(e){
                                if (e.index == 0) {
                                    $.config.close();
                                } else {
                                    triggerDeletion(UUID, false);
                                }
                            });
                            alert.show();                                        
                        }
                    });

                    keychainItem.save(GENERATED_TOKEN);
                } else {
                    alert(String.format(L("generic_error"), this.status));
                    $.config.close();  
                }
            },
            onerror: function(e) {
                alert(String.format(L("connection_erorr"), e.error));
            },
            timeout: 5000
        });
        client.open("POST", url);
        client.send(credentials);
    } else {
        readInformation(UUID);
    }
});
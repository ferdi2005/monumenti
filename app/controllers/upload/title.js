// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

$.conferma.hide();

// Titolo della finestra su Android
if (OS_ANDROID) {
    $.title.addEventListener("open", function(){
        $.title.activity.actionBar.title = $.title.title;
    });
}

$.activityIndicator.show();

const UUID = args[0];
const TOKEN = args[1];
var images = args[2];
var monument = args[3];

var fieldtext = {};
var data = [];
var uploaded = []

Array(images)[0].forEach(
    function(photo) {
        var url = Alloy.Globals.backend + "/photoupload.json"
        var client = Ti.Network.createHTTPClient({
            onload: function(e) {
                if (JSON.parse(this.responseText).error == "User not found.") {
                    Alloy.Globals.utils.open('upload/config', false);
                    return false;
                } else if(JSON.parse(this.responseText).error == "Photo upload not succedeed.") {
                    itemdata =  { 
                        photo: {
                            image: photo[0].media
                        },
                        template: "error",
                    }
                    data.push(itemdata);
                    $.imagespace.setItems(data);
                } else {
                    var id = JSON.parse(this.responseText).id;
                    itemdata =  { 
                        title: {
                            id: "title" + id,
                        },
                        commonsdescription: {
                            id: "description" + id,
                        },
                        date: {
                            id: "date" + id,
                        },
                        photo: {
                            image: photo.media
                        },
                        properties: {
                            itemId: id,
                        },
                        template: "template",
                    }
                    data.push(itemdata); // Array delle cose da mostrare nel listitem
                    uploaded.push(itemdata); // Array delle immagini caricate correttamente
                    $.imagespace.setItems(data);
                    $.activityIndicator.hide();
                    $.conferma.show();
                }
            },
            onerror: function(e) {
                itemdata =  { 
                    photo: {
                        image: photo.media
                    },
                    template: "error",
                }
                data.push(itemdata);
                $.imagespace.setItems(data);
                $.activityIndicator.hide();
            },
            timeout: 600000
        });
        client.open("POST", url);
        var content = {
            file: photo.media,
            uuid: UUID,
            token: TOKEN,
            monument: monument
        }
        client.send(content);   
    }
);

const DATEREGEX = /\d{2}\/\d{2}\/\d{4}/ // Regex del formato della data
// Funzione invocata onBlur
function saveText(e) {
    fieldtext[e.source.id] = e.value;
    if (e.source.id.startsWith("date") && !e.value.match(DATEREGEX)) {
        alert("Attenzione: il formato della data dovrebbe essere gg/mm/aaaa come per esempio 11/05/2005. Altri formati potrebbero essere interpretati non correttamente, sebbene accettati.");
    }
}

function bluronReturn(e) {
    e.source.blur();
}

$.conferma.addEventListener("click", function(e){
    var photos = {};
    var campi_pieni = true;

    uploaded.forEach(function(photo){
        // Recupera da fieldtext i valori dei campi.
        photos[photo.properties.itemId] = [fieldtext["title"+photo.properties.itemId], fieldtext["description"+photo.properties.itemId], fieldtext["date"+photo.properties.itemId]]

        if (fieldtext["title"+photo.properties.itemId] == undefined || fieldtext["title"+photo.properties.itemId] == "" || fieldtext["description"+photo.properties.itemId] == undefined || fieldtext["description"+photo.properties.itemId] == "" || fieldtext["date"+photo.properties.itemId] == undefined || fieldtext["date"+photo.properties.itemId] == "") {
            alert("I campi sono obbligatori! Compilali tutti prima di procedere all'upload (o premi invio sulla tastiera se l'hai fatto).");
            campi_pieni = false;
        }
    })

    if (campi_pieni) {
        var url = Alloy.Globals.backend + "/set_title.json";
        var client = Ti.Network.createHTTPClient({
            onload: function(e){
                var alert = Ti.UI.createAlertDialog({message: "Foto messe in coda per il caricamento con successo! Puoi verificare il loro stato nelle impostazioni.", buttonNames: ["Ok"]});
                alert.addEventListener("click", function(e){
                    $.title.close();
                });
                alert.show();
            },
            onerror: function(e){
                var alert = Ti.UI.createAlertDialog({message: "Qualcosa è andato storto e il caricamento non è riuscito. Riprova più tardi: " + e.error, buttonNames: ["Ok"]});
                alert.addEventListener("click", function(e){
                    $.title.close();
                });
            },
            timeout: 20000
        });
        client.open("POST", url);
        var content = {
            uuid: UUID,
            token: TOKEN,
            photos: JSON.stringify(photos)
        };
        client.send(content);
    }
});

$.annulla.addEventListener("click", function(e){
    if(uploaded.length > 0) {
        $.activityIndicator.show();
        var ids = [];

        uploaded.forEach(function(photo){
            ids.push(photo.properties.itemId);
        })
        var url = Alloy.Globals.backend + "/photocancel.json";
        var client = Ti.Network.createHTTPClient({
            onload: function(e){
                $.activityIndicator.hide();
                $.title.close();
            },
            onerror: function(e){
                $.activityIndicator.hide();
                $.title.close();
            },
            timeout: 20000
        });
        client.open("POST", url);
        var content = {
            uuid: UUID,
            token: TOKEN,
            ids: JSON.stringify(ids)
        };
        client.send(content);
    } else {
        $.title.close();
    }
});
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
                    var row = Titanium.UI.createTableViewRow({layout: "horizontal"});
                    var image = Titanium.UI.createImageView({
                        image: photo.media,
                        top: "5dp",
                        left: "5dp",
                        width: "100dp",
                        left: 0
                    });

                    var label = Titanium.UI.createLabel({
                        text: "Errore nel caricamento di quest'immagine, riprova più tardi."
                    });

                    row.add(image);
                    row.add(label);

                    $.imagespace.add(row);
                } else {
                    var id = JSON.parse(this.responseText).id;
                    var row = Titanium.UI.createTableViewRow({layout: "horizontal"});
                    var image = Titanium.UI.createImageView({
                        image: photo.media,
                        top: "5dp",
                        left: "5dp",
                        width: "100dp",
                        left: 0
                    });

                    var view = Titanium.UI.createView({
                        layout: "vertical"
                    });

                    var title = Titanium.UI.createTextField({
                        hintText: "Titolo dell'immagine",
                        id: "title" + id,
                        inputType: Titanium.UI.INPUT_TYPE_CLASS_TEXT,
                        width: Ti.UI.FILL,
                        left: "5dp",
                        borderStyle: Ti.UI.INPUT_BORDERSTYLE_LINE,
                        hintTextColor: '#A0A0A0',
                        color: 'black',
                        borderColor: 'black',
                        borderWidth: '0.3'                    
                    });
                    
                    fieldtext["title" + id] = title;

                    view.add(title);

                    var description = Titanium.UI.createTextField({
                        hintText: "Descrizione dell'immagine",
                        id: "description" + id,
                        inputType: Titanium.UI.INPUT_TYPE_CLASS_TEXT,
                        width: Ti.UI.FILL,
                        left: "5dp",
                        borderStyle: Ti.UI.INPUT_BORDERSTYLE_LINE,
                        hintTextColor: '#A0A0A0',
                        color: 'black',
                        borderColor: 'black',
                        borderWidth: '0.3'                    
                    });

                    fieldtext["description" + id] = description;

                    view.add(description);

                    var date = Titanium.UI.createTextField({
                        hintText: "Data della foto (gg/mm/aaaa)",
                        id: "date" + id,
                        inputType: Titanium.UI.INPUT_TYPE_CLASS_TEXT,
                        width: Ti.UI.FILL,
                        left: "5dp",
                        borderStyle: Ti.UI.INPUT_BORDERSTYLE_LINE,
                        hintTextColor: '#A0A0A0',
                        color: 'black',
                        borderColor: 'black',
                        borderWidth: '0.3'                    
                    });

                    fieldtext["date" + id] = date;

                    view.add(date);

                    row.add(image);
                    row.add(view);
                    uploaded.push(id); // Array delle immagini caricate correttamente

                    $.imagespace.add(row);
                    $.activityIndicator.hide();
                    $.activityIndicator.height = 0;
                    $.conferma.show();
                }
            },
            onerror: function(e) {
                var row = Titanium.UI.createTableViewRow({layout: "horizontal"});
                var image = Titanium.UI.createImageView({
                    image: photo.media,
                    top: "5dp",
                    left: "5dp",
                    width: "100dp",
                    left: 0
                });

                var label = Titanium.UI.createLabel({
                    text: "Errore nel caricamento di quest'immagine, riprova più tardi."
                });

                row.add(image);
                row.add(label);

                $.imagespace.add(row);

                $.activityIndicator.hide();
                $.activityIndicator.height = 0;
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

const DATEREGEX = /\d{2}\/\d{2}\/\d{4}/; // Regex del formato della data

$.conferma.addEventListener("click", function(e){

    var photos = {};
    var campi_pieni = true;

    uploaded.forEach(function(id){
        var title = fieldtext["title"+id].value.trim();
        var description = fieldtext["description"+id].value.trim();
        var date = fieldtext["date"+id].value.trim();

        photos[id] = [title, description, date];

        if (!date.match(DATEREGEX)) {
            alert("Attenzione: il formato della data deve essere gg/mm/aaaa come per esempio 11/05/2005.");
            campi_pieni = false;
        }
        if (title == "" || description == "" || date == "") {
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

        var url = Alloy.Globals.backend + "/photocancel.json";
        var client = Ti.Network.createHTTPClient({
            onload: function(e){
                $.activityIndicator.hide();
                $.activityIndicator.height = 0;
                $.title.close();
            },
            onerror: function(e){
                $.activityIndicator.hide();
                $.activityIndicator.height = 0;
                $.title.close();
            },
            timeout: 20000
        });
        client.open("POST", url);
        var content = {
            uuid: UUID,
            token: TOKEN,
            ids: JSON.stringify(uploaded)
        };
        client.send(content);
    } else {
        $.title.close();
    }
});
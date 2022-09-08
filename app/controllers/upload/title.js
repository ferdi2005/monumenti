// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var Dialog = require("ti.webdialog");

$.conferma.hide();

$.activityIndicator.show();

const UUID = args[0];
const TOKEN = args[1];
var images = args[2];
var monument = args[3];

var fieldtext = {};
var data = [];
var uploaded = []

var today = new Date();

// Inizializzo il timestamp da prendere dal server
var timestamp = null;

var counter = 0;

var images = Array(images)[0];

var length = images.length; // Per mostrare la sbarra solo se necessario

function photo_delete(fired){
    $.activityIndicator.show();
    var fired = fired;

    var url = Alloy.Globals.backend + "/photocancel.json";
    var client = Ti.Network.createHTTPClient({
        onload: function(e){
            $.photospace.remove($.photospace.children.find((item) => {return item.id == fired.source.id}));

            uploaded = uploaded.filter((id) => {return id != fired.source.id});

            if (uploaded.length == 0) {
                $.conferma.hide();
            }

            alert(L("success_in_deleting_image"));
            $.activityIndicator.hide();
            $.activityIndicator.height = 0;
        },
        onerror: function(e){
            alert(String.format(L("error_in_deleting_image"), e.error));
            $.activityIndicator.hide();
            $.activityIndicator.height = 0;
        },
            timeout: 20000
        });
        client.open("POST", url);
    var content = {
        uuid: UUID,
        token: TOKEN,
        ids: JSON.stringify([fired.source.id]) // fa eliminare solo la foto indicata
    };
    client.send(content);
}

function do_next_upload(){
    images.shift(); // Rimuove l'immagine che è stata già caricata
    if (images.length > 0){
        upload(images[0]);
    } else {
        $.activityIndicator.hide();
        $.activityIndicator.height = 0;
        if (counter > 0) {
            $.conferma.show();
        }
    }
}

function upload(photo) {
    var url = Alloy.Globals.backend + "/photoupload.json"
    var client = Ti.Network.createHTTPClient({
        onload: function(e) {
            if (JSON.parse(this.responseText).error == "User not found.") {
                var message = Ti.UI.createAlertDialog({messageid: "error_please_logout", okid: "ok"});
                message.addEventListener("click", function(e){
                    $.title.close();
                });
                message.show();    
            } else if(JSON.parse(this.responseText).error == "Photo upload not succedeed.") {
                var view = Titanium.UI.createView({
                    layout: "horizontal",
                    width: Ti.UI.FILL,
                    height: Ti.UI.SIZE
                });

                var image = Titanium.UI.createImageView({
                    image: photo.media,
                    top: "5dp",
                    left: "5dp",
                    width: "100dp",
                    left: 0
                });

                var label = Titanium.UI.createLabel({
                    textid: "error_image_upload",
                });

                view.add(image);
                view.add(label);

                $.photospace.add(view);
            
                if (length > 1) {
                    $.photospace.add(Titanium.UI.createView({
                        height: '2dp',
                        left: '0dp',
                        right: '0dp',
                        borderWidth: '1',
                        borderColor:'#aaa',
                    }));
                }
            } else {
                var response = JSON.parse(this.responseText);
                var id = response.id;
                
                var container = Titanium.UI.createView({
                    layout: "horizontal",
                    width: Ti.UI.FILL,
                    height: Ti.UI.SIZE,
                    id: id
                });

                var container_image = Titanium.UI.createView({
                    layout: "vertical",
                    width: Ti.UI.SIZE,
                    height: Ti.UI.SIZE
                }); // creo container per mostrare il bottone trash sotto il bottone immagine

                var image = Titanium.UI.createImageView({
                    image: photo.media,
                    top: "5dp",
                    left: "5dp",
                    width: "100dp"
                });
                
                var trash_params = {
                    top: "5dp",
                    left: "5dp",
                    width: "20dp",
                    height: "22.6dp",
                    id: id,
                    backgroundImage: "/images/trash-solid.png"
                }

                if (OS_IOS) {
                    trash_params.systemButton = Ti.UI.iOS.SystemButton.TRASH;
                } else if (OS_ANDROID) {
                    trash_params.backgroundImage = "/images/trash-solid.png";
                }
                
                var trash = Ti.UI.createButton(trash_params);

                trash.addEventListener("click", photo_delete);                

                var view = Titanium.UI.createView({
                    layout: "vertical",
                    height: Ti.UI.SIZE,
                });

                counter += 1;

                // Salva il timestamp dalla risposta o usa quello che già c'è
                if (timestamp == null) {
                   timestamp = response.timestamp;
                }

                if (counter == 1) {
                    var pretitolo = response.city + " - " + response.label + " - " + timestamp;
                } else {
                    var pretitolo = response.city + " - " + response.label + " - " + timestamp + " " + counter;
                }

                var title_label = Titanium.UI.createLabel({
                    textid: "image_title",
                    font: {fontSize: 12, fontWeight: "bold"},
                });

                var title = Titanium.UI.createTextArea({
                    hintText: L("image_title"),
                    id: "title" + id,
                    inputType: Titanium.UI.INPUT_TYPE_CLASS_TEXT,
                    height: Ti.UI.SIZE,
                    width: Ti.UI.FILL,
                    font: {fontSize: 16 },
                    left: "5dp",
                    borderStyle: Titanium.UI.INPUT_BORDERSTYLE_BEZEL,
                    borderWidth: 0.3,
                    value: pretitolo                 
                });
                
                fieldtext["title" + id] = title;

                view.add(title_label);
                view.add(title);

                var predescrizione = response.city + " - " + response.label;

                var description_label = Titanium.UI.createLabel({
                    textid: "image_description",
                    font: {fontSize: 12, fontWeight: "bold"},
                });

                var description = Titanium.UI.createTextArea({
                    hintText: L("image_description"),
                    id: "description" + id,
                    inputType: Titanium.UI.INPUT_TYPE_CLASS_TEXT,
                    height: Ti.UI.SIZE,
                    width: Ti.UI.FILL,
                    left: "5dp",
                    font: {fontSize: 16 },
                    enableReturnKey: true,
                    borderStyle: Titanium.UI.INPUT_BORDERSTYLE_BEZEL,
                    borderWidth: 0.3,
                    value: predescrizione               
                });

                fieldtext["description" + id] = description;

                view.add(description_label);
                view.add(description);

                var date_label = Titanium.UI.createLabel({
                    textid: "image_date",
                    font: {fontSize: 12, fontWeight: "bold"},
                });
                var date = Titanium.UI.createTextArea({
                    hintText: L("image_date"),
                    id: "date" + id,
                    inputType: Titanium.UI.INPUT_TYPE_CLASS_TEXT,
                    width: Ti.UI.FILL,
                    height: Ti.UI.SIZE,
                    left: "5dp",
                    font: {fontSize: 16 },
                    borderStyle: Titanium.UI.INPUT_BORDERSTYLE_BEZEL,
                    borderWidth: 0.3,
                    value: response.today // In realtà corrisponde ad oggi solo se la data exif della foto non è reperibile
                });

                fieldtext["date" + id] = date;
                view.add(date_label);
                view.add(date);

                uploaded.push(id); // Array delle immagini caricate correttamente

                container_image.add(image);
                container_image.add(trash); // aggiungo button per cancellare l'immagine in un container dedicato, in modo che sia verticale con l'immagine
                container.add(container_image);
                container.add(view);

                $.photospace.add(container);
            
                $.photospace.add(Titanium.UI.createView({
                    height: '2dp',
                    top: "5dp",
                    left: '0dp',
                    right: '0dp',
                    borderWidth: '1',
                    borderColor:'#aaa',
                }));
            }
            // Prosegue coi caricamenti
            do_next_upload();
        },
        onerror: function(e) {
            var view = Titanium.UI.createView({
                layout: "horizontal",
                width: Ti.UI.FILL,
                height: Ti.UI.SIZE
            });

            var image = Titanium.UI.createImageView({
                image: photo.media,
                top: "5dp",
                left: "5dp",
                width: "100dp",
                left: 0
            });

            var label = Titanium.UI.createLabel({
                textid: "error_image_upload",
            });

            view.add(image);
            view.add(label);

            $.photospace.add(view);
            
            $.photospace.add(Titanium.UI.createView({
                height: '2dp',
                left: '0dp',
                right: '0dp',
                borderWidth: '1',
                borderColor:'#aaa',
            }));
            do_next_upload();
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

upload(images[0]);

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
            alert(L("error_date_format"));
            campi_pieni = false;
        }
        if (title == "" || description == "" || date == "") {
            alert(L("fields_are_mandatory"));
            campi_pieni = false;
        }


    })

    if (campi_pieni) {
        var url = Alloy.Globals.backend + "/set_title.json";
        var client = Ti.Network.createHTTPClient({
            onload: function(e){
                var message = Ti.UI.createAlertDialog({messageid: "image_queue_success", buttonNames: [L("ok")]});
                message.addEventListener("click", function(e){
                    $.title.close();
                });
                message.show();
            },
            onerror: function(e){
                var message = Ti.UI.createAlertDialog({message: String.format("image_queue_error", e.error), okid: "ok"});
                message.addEventListener("click", function(e){
                    $.title.close();
                });
                message.show();
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

function photo_cancel(){
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
}
$.annulla.addEventListener("click", photo_cancel);

// Cancellazione anche alla pressione del tasto indietro
$.title.onBack = photo_cancel;

$.license_link.addEventListener("click", function(e){
    if (Dialog.isSupported()) {
        if (OS_ANDROID || !Dialog.isOpen()) {
            Dialog.open({
                title: "CC-BY-SA 4.0",
                url: "https://creativecommons.org/licenses/by-sa/4.0/deed." + Ti.Locale.currentLanguage
            });
        }
    } else {
        Ti.Platform.openURL(response.wikipedia);
    }
});
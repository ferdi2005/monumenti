// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

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

var counter = 0;

Array(images)[0].forEach(
    function(photo) {
        var url = Alloy.Globals.backend + "/photoupload.json"
        var client = Ti.Network.createHTTPClient({
            onload: function(e) {
                if (JSON.parse(this.responseText).error == "User not found.") {
                    var alert = Ti.UI.createAlertDialog({messageid: "error_please_logout", buttonNames: [L("ok")]});
                    alert.addEventListener("click", function(e){
                        $.title.close();
                    });
                    alert.show();    
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
                    
                    $.photospace.add(Titanium.UI.createView({
                        height: '2dp',
                        left: '0dp',
                        right: '0dp',
                        borderWidth: '1',
                        borderColor:'#aaa',
                    }));
                } else {
                    var response = JSON.parse(this.responseText);
                    var id = response.id;
                    
                    var container = Titanium.UI.createView({
                        layout: "horizontal",
                        width: Ti.UI.FILL,
                        height: Ti.UI.SIZE
                    });

                    var image = Titanium.UI.createImageView({
                        image: photo.media,
                        top: "5dp",
                        left: "5dp",
                        width: "100dp"
                    });

                    var view = Titanium.UI.createView({
                        layout: "vertical",
                        height: Ti.UI.SIZE
                    });

                    counter += 1;

                    if (counter == 1) {
                        var pretitolo = response.city + " - " + response.label + " - " + response.timestamp;
                    } else {
                        var pretitolo = response.city + " - " + response.label + " - " + response.timestamp + " " + counter;
                    }

                    var title = Titanium.UI.createTextField({
                        hintText: L("image_title"),
                        id: "title" + id,
                        inputType: Titanium.UI.INPUT_TYPE_CLASS_TEXT,
                        height: Ti.UI.SIZE,
                        width: Ti.UI.FILL,
                        left: "5dp",
                        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_BEZEL,
                        borderWidth: '0.3',
                        value: pretitolo                 
                    });
                    
                    fieldtext["title" + id] = title;

                    view.add(title);

                    var predescrizione = response.city + " - " + response.label;

                    var description = Titanium.UI.createTextArea({
                        hintText: L("image_description"),
                        id: "description" + id,
                        inputType: Titanium.UI.INPUT_TYPE_CLASS_TEXT,
                        height: Ti.UI.SIZE,
                        width: Ti.UI.FILL,
                        left: "5dp",
                        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_BEZEL,
                        borderWidth: '0.3',
                        value: predescrizione               
                    });

                    fieldtext["description" + id] = description;

                    view.add(description);

                    var date = Titanium.UI.createTextField({
                        hintText: L("image_date"),
                        id: "date" + id,
                        inputType: Titanium.UI.INPUT_TYPE_CLASS_TEXT,
                        width: Ti.UI.FILL,
                        height: Ti.UI.SIZE,
                        left: "5dp",
                        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_BEZEL,
                        borderWidth: '0.3',
                        value: response.today // In realtà corrisponde ad oggi solo se la data exif della foto non è reperibile
                    });

                    fieldtext["date" + id] = date;

                    view.add(date);

                    container.add(image);
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
                    uploaded.push(id); // Array delle immagini caricate correttamente

                    $.activityIndicator.hide();
                    $.activityIndicator.height = 0;
                    $.conferma.show();
                }
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
                var alert = Ti.UI.createAlertDialog({messageid: "image_queue_success", buttonNames: [L("ok")]});
                alert.addEventListener("click", function(e){
                    $.title.close();
                });
                alert.show();
            },
            onerror: function(e){
                var alert = Ti.UI.createAlertDialog({message: String.format("image_queue_error", e.error), buttonNames: [L("ok")]});
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
// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

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

var data = [];
var uploaded = []

Array(images).forEach(
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
                        description: {
                            id: "description" + id,
                        },
                        date: {
                            id: "date" + id,
                        },
                        photo: {
                            image: photo[0].media
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
                }
            },
            onerror: function(e) {
                itemdata =  { 
                    photo: {
                        image: photo[0].media
                    },
                    template: "error",
                }
                data.push(itemdata);
                $.imagespace.setItems(data);
                $.activityIndicator.hide();
            },
            timeout: 500000
        });
        client.open("POST", url);
        var content = {
            file: photo[0].media,
            uuid: UUID,
            token: TOKEN,
            monument: monument
        }
        client.send(content);   
    }
);

$.conferma.addEventListener("click", function(e){
    var photos = {};

    uploaded.forEach(function(photo){
      /*  var title = photo.title.id;
        var description = photo.description.id;
        var date = photo.date.id;
        photos[photo.properties.itemId] = [$.title.value, $.description.value, $.date.value]; */
        
        // TODO: photos[photo.properties.itemId] = [titolo, descrizione, data] 
    })

    var url = Alloy.Globals.backend + "/photocancel.json";
    var client = Ti.Network.createHTTPClient({
        onload: function(e){
            var alert = alert("Foto caricate con successo!");
            alert.addEventListener("click", function(e){
                $.title.close();
            });
        },
        onerror: function(e){
            var alert = alert("Qualcosa è andato storto e il caricamento non è riuscito. Riprova più tardi: " + e.error);
            alert.addEventListener("click", function(e){
                $.title.close();
            });
        },
        timeout: 5000
    });
    client.open("POST", url);
    var content = {
        uuid: UUID,
        token: TOKEN,
        photos: JSON.stringify(photos)
    };
    client.send(content);
});

$.annulla.addEventListener("click", function(e){
    var ids = [];

    uploaded.forEach(function(photo){
        ids.push(photo.properties.itemId);
    })
    var url = Alloy.Globals.backend + "/photocancel.json";
    var client = Ti.Network.createHTTPClient({
        onload: function(e){
            $.title.close();
        },
        onerror: function(e){
            $.title.close();
        },
        timeout: 5000
    });
    client.open("POST", url);
    var content = {
        uuid: UUID,
        token: TOKEN,
        ids: ids
    };
    client.send(content);
});
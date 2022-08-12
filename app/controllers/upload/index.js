var Identity = require("ti.identity");
var Dialog = require('ti.webdialog');

// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

// Usata nell'index.xml (view alloy) per il click sulle foto o sul titolo delle foto
function openPhoto(e) {
    if (Dialog.isSupported()) {
        if (OS_ANDROID || !Dialog.isOpen()) {
            Dialog.open({
                title: e.source.text,
                url: e.source.id
            })
        }
    } else {
        Ti.Platform.openURL(e.source.id);
    }
} 

$.photos_on_commons.height = 0;
$.photos_on_commons.hide();

var keychainItem = Identity.createKeychainItem({ identifier: "token" });
keychainItem.addEventListener("read", function(k){
    if (k.success == true) {
        var url = Alloy.Globals.backend + "/userinfo.json?uuid=" + Titanium.Platform.id + "&token=" + k.value;
        var client = Ti.Network.createHTTPClient({
            onload: function(e) {
                var userInfo = JSON.parse(this.responseText);

                if (userInfo.testuser) {
                    var user_url = "https://app-test.ferdinando.me/wiki/Special:ListFiles/" + userInfo.username;
                } else {
                    var user_url = "https://commons.wikimedia.org/wiki/Special:ListFiles/" + userInfo.username;
                }

                $.photos_on_commons.addEventListener("click", function(e) {
                    if (Dialog.isSupported()) {
                        if (OS_ANDROID || !Dialog.isOpen()) {
                            Dialog.open({
                                title: userInfo.username,
                                url: user_url
                            });
                        }
                    } else {
                        Ti.Platform.openURL(user_url);
                    }    
                });

                $.photos_on_commons.show();
                $.photos_on_commons.height = Ti.UI.SIZE;
            },
            onerror: function(e) {
                $.photos_on_commons.height = 0;
                $.photos_on_commons.hide();                    
            },
            timeout: 5000
        });   
        client.open("GET", url);
        client.send();   

    } else {
        $.index.close();
        Alloy.Globals.utils.open("upload/config", "delete");
    }
});
keychainItem.read();

// Usata nell'index.xml (view alloy) per il click sul bottone della scheda monumento
function openShow(e) {
    Alloy.Globals.utils.open("home/show", e.source.id);
}

// Mostra bottone indietro
if (OS_ANDROID) {
    $.index.activity.onCreateOptionsMenu = function(e) { 
            var menu = e.menu; 
            var menuItem = menu.add({ 
                title: "Back", 
                icon: "images/back.png", 
                showAsAction: Ti.Android.SHOW_AS_ACTION_ALWAYS
            }); 
            menuItem.addEventListener("click", function(e) { 
                $.index.close();
            }); 
        };
}

function reload(e){
    $.activityIndicator.show();
    
    $.imagespace.removeAllChildren();
    
    if ($.optionbar.index == 0) {
        var order = "date";
    } else {
        var order = "title";
    }

    const UUID = Titanium.Platform.id; // identificativo univoco del device
    var keychainItem = Identity.createKeychainItem({ identifier: "token" });
    keychainItem.addEventListener("read", function(k){
        if (k.success == true) {
            var url = Alloy.Globals.backend + "/photolist.json?uuid=" + UUID + "&token=" + k.value + "&order=" + order;
            var client = Ti.Network.createHTTPClient({
                onload: function(e) {
                    var photos = JSON.parse(this.responseText);

                    items = [];

                    photos.forEach(function(photo) {
                        var serverurl = photo["serverurl"];
                        if (photo["uploaded"] == false) {
                            if (photo["errorinfo"] == null || photo["errorinfo"] == undefined) {
                                var errortext = String.format(L("photo_not_uploaded"), String(photo.title));
                            } else {
                                var errortext = String.format(L("photo_not_uploaded_with_reason"), String(photo.title), photo["errorinfo"]);
                            }

                            var main_view =  Ti.UI.createView({
                                layout: "vertical",
                                width: Ti.UI.FILL,
                                height: Ti.UI.SIZE        
                            });

                            var view = Ti.UI.createView({
                                layout: "horizontal",
                                width: Ti.UI.FILL,
                                height: Ti.UI.SIZE        
                            });

                            var image = Ti.UI.createImageView({
                                image: serverurl,
                                top: "5dp",
                                left: "5dp",
                                width: "30%"                     
                            });

                            view.add(image);

                            var errorlabel = Ti.UI.createLabel({
                                text: errortext,
                                left: "5dp"
                            });

                            view.add(errorlabel);

                            var showButton = Ti.UI.createButton({
                                id: photo["item"],
                                titleid: "show_monument",
                                backgroundColor: "#8f0000",
                                color: "#FFFFFF",
                                top: "3dp",
                                left: "5dp"                            
                            });

                            showButton.addEventListener("click", openShow);
                        
                            main_view.add(view)
                            main_view.add(showButton);

                            $.imagespace.add(main_view);

                            $.imagespace.add(Titanium.UI.createView({
                                height: '2dp',
                                left: '0dp',
                                right: '0dp',
                                top: "2dp",
                                borderWidth: '1',
                                borderColor:'#aaa',
                            }));
    
                        } else if (photo["uploaded"] == null) {
                            var main_view =  Ti.UI.createView({
                                layout: "vertical",
                                width: Ti.UI.FILL,
                                height: Ti.UI.SIZE        
                            });

                            var view = Ti.UI.createView({
                                layout: "horizontal",
                                width: Ti.UI.FILL,
                                height: Ti.UI.SIZE        
                            });

                            var image = Ti.UI.createImageView({
                                image: serverurl,
                                top: "5dp",
                                left: "5dp",
                                width: "30%"                            
                            });

                            view.add(image);

                            var errorlabel = Ti.UI.createLabel({
                                text: String.format(L("image_uploading"), photo.title),
                                left: "5dp"
                            });

                            view.add(errorlabel);

                            var showButton = Ti.UI.createButton({
                                id: photo["item"],
                                titleid: "show_monument",
                                backgroundColor: "#8f0000",
                                color: "#FFFFFF",
                                top: "3dp",
                                left: "5dp"                            
                            });

                            showButton.addEventListener("click", openShow);

                            main_view.add(view)
                            main_view.add(showButton);

                            $.imagespace.add(main_view);

                            $.imagespace.add(Titanium.UI.createView({
                                height: '2dp',
                                left: '0dp',
                                right: '0dp',
                                top: "2dp",
                                borderWidth: '1',
                                borderColor:'#aaa',
                            }));

                        } else if (photo["uploaded"] == true) {
                            var main_view =  Ti.UI.createView({
                                layout: "vertical",
                                width: Ti.UI.FILL,
                                height: Ti.UI.SIZE        
                            });

                            var view = Ti.UI.createView({
                                layout: "horizontal",
                                width: Ti.UI.FILL,
                                height: Ti.UI.SIZE        
                            });

                            var image = Ti.UI.createImageView({
                                image: photo["url"],
                                top: "5dp",
                                width: "30%", 
                                left: "5dp",
                                id: photo["descriptionurl"]                 
                            });

                            image.addEventListener("click", openPhoto); 

                            view.add(image);

                            var label = Ti.UI.createLabel({
                                text: photo["canonicaltitle"],
                                id: photo["descriptionurl"],
                                color: "#16ABFD",
                                left: "5dp"
                            });
                            
                            label.addEventListener("click", openPhoto);

                            view.add(label);

                            var showButton = Ti.UI.createButton({
                                id: photo["item"],
                                titleid: "show_monument",
                                backgroundColor: "#8f0000",
                                color: "#FFFFFF",
                                top: "3dp",
                                left: "5dp"                     
                            });

                            showButton.addEventListener("click", openShow);
                        
                            main_view.add(view)
                            main_view.add(showButton);

                            $.imagespace.add(main_view);

                            $.imagespace.add(Titanium.UI.createView({
                                height: '2dp',
                                left: '0dp',
                                right: '0dp',
                                top: "2dp",
                                borderWidth: '1',
                                borderColor:'#aaa',
                            }));
                        }
                    });
                    $.activityIndicator.hide();
                    $.activityIndicator.height = 0;
                },
                onerror: function(e) {
                    var message = Ti.UI.createAlertDialog({message:String.format(L("generic_error"), e.error), okid: "ok"});
                    message.addEventListener("click", function(e){
                        $.index.close();
                    });
                    message.show();
                },
                timeout: 5000
            });
            client.open("GET", url);
            client.send();
        } else {
            var alert = Ti.UI.createAlertDialog({message:String.format(L("generic_error"), k.error), buttonNames: [L("ok")]});
            alert.addEventListener("click", function(e){
                $.index.close();
            });
            alert.show();
        }
    });
    keychainItem.read();
}

$.index.addEventListener("open", reload);

$.optionbar.addEventListener("click", reload);

Alloy.Globals.events.on("map_close", function(e) {
    $.index.close();
});
// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
$.listview.hide();
$.activityIndicator.hide();
function search(value, user_initiated) {
    $.activityIndicator.show();

    var url = 'http://cerca.wikilovesmonuments.it/namesearch.json?search=' + encodeURI(value);
    var xhr = Ti.Network.createHTTPClient({
        onload: function(e) {
            
            response = JSON.parse(this.responseText);

            if (response.length > 0) {
                data = []
                response.forEach(function (item) {
                    itemdata =  { 
                        properties: {
                            itemId: item.id,
                            title: item.itemlabel,
                            accessoryType: Ti.UI.LIST_ACCESSORY_TYPE_NONE,
                            color: '#000000',
                            backgroundColor: '#FFFFFF'
                        }
                    }
                    data.push(itemdata);
                });
                
                if ($.listsection.items != data) {
                    $.listsection.setItems(data);
                }
                $.listview.show();
                $.activityIndicator.hide();
            } else {
                if (user_initiated) {
                    alert("Nessun risultato trovato! Prova a fare un'altra ricerca");
                }
                $.activityIndicator.hide();
            }

        },
        onerror: function(e) {
            alert('Errore di connessione' + e.error);
            $.activityIndicator.hide();
        },
        timeout: 50000
    });
    xhr.open('GET', url);
    xhr.send();
}

$.listview.addEventListener('itemclick', function(e){
    var window = Alloy.createController('home/show', e.itemId).getView();
    tabgroup.activeTab.open(window);
});

$.winsearch.addEventListener('open', function(){
    $.searchfield.addEventListener('return', function (e) {
        if (e.value.length < 5) {
            search(e.value, true);
        }
        $.searchfield.blur();
        if (OS_ANDROID) {
            Ti.UI.Android.hideSoftKeyboard();
        }
    });

    $.searchfield.addEventListener("change", function(e){
        if (e.value.length >= 5) {
            search(e.value, false)
        }
    })
 });

if (OS_ANDROID) {
    $.winsearch.addEventListener('blur', function(){
        $.searchfield.blur();
        Ti.UI.Android.hideSoftKeyboard();
    });
}

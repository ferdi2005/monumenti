// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

var url = "https://wlm.puglia.wiki/show.json?id=" + args;
Ti.API.log(url);
var client = Ti.Network.createHTTPClient({
    onload: function(e) {
        var response = JSON.parse(this.responseText);
        if (response.image != null && response.image != undefined && response.image != "") {
            $.image.image = "https://commons.wikimedia.org/w/thumb.php?f=" + response.image + "&w=1000";
        }
        if (response.itemDescription != null && response.itemDescription != undefined && response.itemDescription != "") {
            $.description.text = response.itemDescription;
        }
        $.title.text = response.itemLabel;
        $.Wikidata.addEventListener('click', function(e){
            Ti.Platform.openURL("https://www.wikidata.org/wiki/" + response.item); 
        });
        $.Commons.addEventListener('click', function(e){
            var today = new Date();
            Ti.Platform.openURL("https://commons.wikimedia.org/w/index.php?title=Special:UploadWizard&campaign=wlm-it&id=" + response.wlmid + "&uselang=it&descriptionlang=it&lat=" + response.latitude + "&lon=" + response.longitude + "&categories=Images+from+Wiki+Loves+Monuments+" + today.getFullYear() + "+in+Italy"); 
        });
    },
    onerror : function(e) {
        alert('Errore di rete: ' + e.error);
    },
    timeout: 5000
});
client.open("GET", url);
client.send();
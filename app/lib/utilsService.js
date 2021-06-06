// utilsService

function Utils(){
  this.open = function(path, args){
    var window = Alloy.createController(path, args).getView();
    tabgroup.activeTab.open(window);
  }
  this.openmodal = function(path, args){
    var window = Alloy.createController(path, args).getView();
    tabgroup.activeTab.open(window, {modal: true, animated: true});
  }
}

module.exports = Utils;
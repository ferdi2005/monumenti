// utilsService

function Utils(){
  this.open = function(path, args){
    var window = Alloy.createController(path, args).getView();
    if (args != undefined && args != NaN && args.animated == false) {
      tabgroup.activeTab.open(window, {animated: false});
    } else {
      tabgroup.activeTab.open(window, {animated: true});
    }
  }
  this.openmodal = function(path, args){
    var window = Alloy.createController(path, args).getView();
    tabgroup.activeTab.open(window, {modal: true, animated: true});
  }
}

module.exports = Utils;
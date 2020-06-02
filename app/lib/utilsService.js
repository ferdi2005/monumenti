// utilsService

function Utils(){
  this.open = function(path, args){
    var window = Alloy.createController(path, args).getView();
    tabgroup.getActiveTab().open(window);
  }
}

module.exports = Utils;


function Utils(){
this.open=function(path,args){
var window=Alloy.createController(path,args).getView();
tabgroup.activeTab.open(window);
},
this.openmodal=function(path,args){
var window=Alloy.createController(path,args).getView();
tabgroup.activeTab.open(window,{modal:!0,animated:!0});
};
}

module.exports=Utils;
var Alloy=require("/alloy"),





widgets={};

function ucfirst(text){return(
text?
text[0].toUpperCase()+text.substr(1):text);
}

module.exports=function(widgetId){
var self=this;return(


widgets[widgetId]?
widgets[widgetId]:void(



this.widgetId=widgetId,
this.Collections={},
this.Models={},
this.Shared={},


this.createController=function(name,args){
return new(require("/alloy/widgets/"+widgetId+"/controllers/"+name))(args);
},
this.createCollection=function(name,args){
return new(require("/alloy/widgets/"+widgetId+"/models/"+ucfirst(name)).Collection)(args);
},
this.createModel=function(name,args){
return new(require("/alloy/widgets/"+widgetId+"/models/"+ucfirst(name)).Model)(args);
},
this.createWidget=Alloy.createWidget,
this.Collections.instance=function(name){
return self.Collections[name]||(self.Collections[name]=self.createCollection(name));
},
this.Models.instance=function(name){
return self.Models[name]||(self.Models[name]=self.createModel(name));
},


widgets[widgetId]=this));
};
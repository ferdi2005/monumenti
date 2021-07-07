var Alloy=require("/alloy"),
Backbone=Alloy.Backbone,
_=Alloy._,












Controller=function(){



function getControllerParam(){
return self.__widgetId?{
widgetId:self.__widgetId,
name:self.__controllerPath}:
self.__controllerPath;
}var roots=[],self=this;

this.__iamalloy=!0,
_.extend(this,Backbone.Events,{
__views:{},
__events:[],
__proxyProperties:{},
setParent:function(parent){
var len=roots.length;

if(len){


this.parent=parent.__iamalloy?parent.parent:

parent;


for(var i=0;i<len;i++)
roots[i].__iamalloy?
roots[i].setParent(this.parent):

this.parent.add(roots[i])}


},
addTopLevelView:function(view){
roots.push(view);
},
addProxyProperty:function(key,value){
this.__proxyProperties[key]=value;
},
removeProxyProperty:function(key){
delete this.__proxyProperties[key];
},




















getTopLevelViews:function(){
return roots;
},

















getView:function(id){return(
"undefined"==typeof id||null===id?
roots[0]:

this.__views[id]);
},
removeView:function(id){
delete this[id],
delete this.__views[id];
},

getProxyProperty:function(name){
return this.__proxyProperties[name];
},











































getViews:function(){
return this.__views;
},



















destroy:function(){


},


getViewEx:function(opts){
var recurse=opts.recurse||!1;
if(recurse){
var view=this.getView();return(
view?

view.__iamalloy?
view.getViewEx({recurse:!0}):

view:null);

}
return this.getView();

},


getProxyPropertyEx:function(name,opts){
var recurse=opts.recurse||!1;
if(recurse){
var view=this.getProxyProperty(name);return(
view?

view.__iamalloy?
view.getProxyProperty(name,{recurse:!0}):

view:null);

}
return this.getView(name);

},







































createStyle:function(opts){
return Alloy.createStyle(getControllerParam(),opts);
},




UI:{
create:function(apiName,opts){
return Alloy.UI.create(getControllerParam(),apiName,opts);
}},


































addClass:function(proxy,classes,opts){
return Alloy.addClass(getControllerParam(),proxy,classes,opts);
},




















removeClass:function(proxy,classes,opts){
return Alloy.removeClass(getControllerParam(),proxy,classes,opts);
},





















resetClass:function(proxy,classes,opts){
return Alloy.resetClass(getControllerParam(),proxy,classes,opts);
},







































updateViews:function(args){
var views=this.getViews();









return _.isObject(args)&&_.each(_.keys(args),function(key){var elem=views[key.substring(1)];0===key.indexOf("#")&&"#"!==key&&_.isObject(elem)&&"function"==typeof elem.applyProperties&&elem.applyProperties(args[key])}),this;
},

















addListener:function(proxy,type,callback){return(
!proxy.id&&(
proxy.id=_.uniqueId("__trackId"),

_.has(this.__views,proxy.id))?void
Ti.API.error("$.addListener: "+proxy.id+" was conflict."):(




proxy.addEventListener(type,callback),
this.__events.push({
id:proxy.id,
view:proxy,
type:type,
handler:callback}),


proxy.id));
},



















getListener:function(proxy,type){
return _.filter(this.__events,function(event,index){return!(
proxy&&proxy.id!==event.id||
type&&type!==event.type);




});
},


























removeListener:function(proxy,type,callback){








return this.__events.forEach(function(event,index){proxy&&proxy.id!==event.id||type&&type!==event.type||callback&&callback!==event.handler||(event.view.removeEventListener(event.type,event.handler),delete self.__events[index])}),this;
}});

};
module.exports=Controller;

























var _=require("/alloy/underscore")._,
Backbone=require("/alloy/backbone"),
CONST=require("/alloy/constants");

exports.version="1.16.0",
exports._=_,
exports.Backbone=Backbone;var

DEFAULT_WIDGET="widget",
MW320_CHECK=!1,
IDENTITY_TRANSFORM=!0?Ti.UI.createMatrix2D?Ti.UI.createMatrix2D():Ti.UI.create2DMatrix():void 0,
RESET={
bottom:null,
left:null,
right:null,
top:null,
height:null,
width:null,
shadowColor:null,
shadowOffset:null,
backgroundImage:null,
backgroundRepeat:null,
center:null,
layout:null,
backgroundSelectedColor:null,
backgroundSelectedImage:null,


opacity:1,
touchEnabled:!0,
enabled:!0,
horizontalWrap:!0,
zIndex:0,





backgroundColor:!0?"transparent":null,



font:null,



visible:!0,



color:!0?"#000":null,








transform:!0?IDENTITY_TRANSFORM:null,



backgroundGradient:!0?null:{},



borderColor:!0?null:"transparent",


borderRadius:!1?0:null,


borderWidth:!1?0:null};



RESET=1?




_.extend(RESET,{
backgroundDisabledColor:null,
backgroundDisabledImage:null,
backgroundFocusedColor:null,
backgroundFocusedImage:null,
focusable:!1,
keepScreenOn:!1}):_.extend(RESET,{backgroundLeftCap:0,backgroundTopCap:0});



function ucfirst(text){return(
text?
text[0].toUpperCase()+text.substr(1):text);
}

function addNamespace(apiName){
return(CONST.IMPLICIT_NAMESPACES[apiName]||CONST.NAMESPACE_DEFAULT)+
"."+apiName;
}

exports.M=function(name,modelDesc,migrations){var




mod,config=(modelDesc||{}).config||{},adapter=config.adapter||{},extendObj={},extendClass={};

adapter.type?(
mod=require("/alloy/sync/"+adapter.type),
extendObj.sync=function(method,model,opts){
return mod.sync(method,model,opts);
}):

extendObj.sync=function(method,model,opts){
Ti.API.warn("Execution of "+method+"#sync() function on a model that does not support persistence"),
Ti.API.warn("model: "+JSON.stringify(model.toJSON()));
},

extendObj.defaults=config.defaults,


migrations&&(extendClass.migrations=migrations),


mod&&_.isFunction(mod.beforeModelCreate)&&(
config=mod.beforeModelCreate(config,name)||config);



var Model=Backbone.Model.extend(extendObj,extendClass);












return Model.prototype.config=config,_.isFunction(modelDesc.extendModel)&&(Model=modelDesc.extendModel(Model)||Model),mod&&_.isFunction(mod.afterModelCreate)&&mod.afterModelCreate(Model,name),Model;
},

exports.C=function(name,modelDesc,model){var


mod,extendObj={model:model},config=(model?model.prototype.config:{})||{};

config.adapter&&config.adapter.type?(
mod=require("/alloy/sync/"+config.adapter.type),
extendObj.sync=function(method,model,opts){
return mod.sync(method,model,opts);
}):

extendObj.sync=function(method,model,opts){
Ti.API.warn("Execution of "+method+"#sync() function on a collection that does not support persistence"),
Ti.API.warn("model: "+JSON.stringify(model.toJSON()));
};


var Collection=Backbone.Collection.extend(extendObj);












return Collection.prototype.config=config,_.isFunction(modelDesc.extendCollection)&&(Collection=modelDesc.extendCollection(Collection)||Collection),mod&&_.isFunction(mod.afterCollectionCreate)&&mod.afterCollectionCreate(Collection),Collection;
},

exports.UI={},
exports.UI.create=function(controller,apiName,opts){
opts=opts||{};var


baseName,ns,
parts=apiName.split(".");
if(1===parts.length)
baseName=apiName,
ns=opts.ns||CONST.IMPLICIT_NAMESPACES[baseName]||CONST.NAMESPACE_DEFAULT;else
if(1<parts.length)
baseName=parts[parts.length-1],
ns=parts.slice(0,parts.length-1).join(".");else

throw"Alloy.UI.create() failed: No API name was given in the second parameter";

opts.apiName=ns+"."+baseName,
baseName=baseName[0].toUpperCase()+baseName.substr(1);


var style=exports.createStyle(controller,opts);


return eval(ns)["create"+baseName](style);
},

exports.createStyle=function(controller,opts,defaults){
var classes,apiName;



if(!opts)return{};



classes=_.isArray(opts.classes)?opts.classes.slice(0):
_.isString(opts.classes)?
opts.classes.split(/\s+/):

[],



apiName=opts.apiName,
apiName&&-1===apiName.indexOf(".")&&(
apiName=addNamespace(apiName));





var styleArray;

styleArray=controller&&_.isObject(controller)?require("/alloy/widgets/"+controller.widgetId+
"/styles/"+controller.name):

require("/alloy/styles/"+controller);var




i,len,styleFinal={};
for(i=0,len=styleArray.length;i<len;i++){var
style=styleArray[i],


styleApi=style.key;






if(style.isApi&&-1===styleApi.indexOf(".")&&(styleApi=(CONST.IMPLICIT_NAMESPACES[styleApi]||CONST.NAMESPACE_DEFAULT)+"."+styleApi),style.isId&&opts.id&&style.key===opts.id||
style.isClass&&_.contains(classes,style.key));else

if(!style.isApi)






continue;else if(-1===style.key.indexOf(".")&&(style.key=addNamespace(style.key)),style.key!==apiName)continue;



style.queries&&style.queries.formFactor&&
!exports[style.queries.formFactor]||




style.queries&&style.queries.if&&(
"false"===style.queries.if.trim().toLowerCase()||
-1!==style.queries.if.indexOf("Alloy.Globals")&&
!1===exports.Globals[style.queries.if.split(".")[2]])||




exports.deepExtend(!0,styleFinal,style.style);
}




var extraStyle=_.omit(opts,[
CONST.CLASS_PROPERTY,
CONST.APINAME_PROPERTY]);







return exports.deepExtend(!0,styleFinal,extraStyle),styleFinal[CONST.CLASS_PROPERTY]=classes,styleFinal[CONST.APINAME_PROPERTY]=apiName,MW320_CHECK&&delete styleFinal[CONST.APINAME_PROPERTY],defaults?_.defaults(styleFinal,defaults):styleFinal;
};

function processStyle(controller,proxy,classes,opts,defaults){
opts=opts||{},
opts.classes=classes,
proxy.apiName&&(opts.apiName=proxy.apiName),
proxy.id&&(opts.id=proxy.id),
proxy.applyProperties(exports.createStyle(controller,opts,defaults)),
proxy.classes=classes;
}

exports.addClass=function(controller,proxy,classes,opts){


if(!classes)




return void(opts&&(MW320_CHECK&&delete opts.apiName,proxy.applyProperties(opts)));var


pClasses=proxy[CONST.CLASS_PROPERTY]||[],
beforeLen=pClasses.length;
classes=_.isString(classes)?classes.split(/\s+/):classes;
var newClasses=_.union(pClasses,classes||[]);return(


beforeLen===newClasses.length?void(
opts&&(
MW320_CHECK&&delete opts.apiName,
proxy.applyProperties(opts))):void



processStyle(controller,proxy,newClasses,opts));


},

exports.removeClass=function(controller,proxy,classes,opts){
classes=classes||[];var
pClasses=proxy[CONST.CLASS_PROPERTY]||[],
beforeLen=pClasses.length;


if(!beforeLen||!classes.length)




return void(opts&&(MW320_CHECK&&delete opts.apiName,proxy.applyProperties(opts)));


classes=_.isString(classes)?classes.split(/\s+/):classes;
var newClasses=_.difference(pClasses,classes);return(


beforeLen===newClasses.length?void(
opts&&(
MW320_CHECK&&delete opts.apiName,
proxy.applyProperties(opts))):void



processStyle(controller,proxy,newClasses,opts,RESET));


},

exports.resetClass=function(controller,proxy,classes,opts){
classes=classes||[],
classes=_.isString(classes)?classes.split(/\s+/):classes,
processStyle(controller,proxy,classes,opts,RESET);
},










exports.createWidget=function(id,name,args){





return"undefined"!=typeof name&&null!==name&&_.isObject(name)&&!_.isString(name)&&(args=name,name=DEFAULT_WIDGET),new(require("/alloy/widgets/"+id+"/controllers/"+(name||DEFAULT_WIDGET)))(args);
},









exports.createController=function(name,args){
return new(require("/alloy/controllers/"+name))(args);
},












exports.createModel=function(name,args){
return new(require("/alloy/models/"+ucfirst(name)).Model)(args);
},













exports.createCollection=function(name,args){
return new(require("/alloy/models/"+ucfirst(name)).Collection)(args);
};

function isTabletFallback(){
return(


700<=Math.min(Ti.Platform.displayCaps.platformHeight,Ti.Platform.displayCaps.platformWidth));
}






exports.isTablet=function(){var _Mathmax=



















Math.max,_Mathmin=Math.min;if(!1)return!1;if(!0){var psc=Ti.Platform.Android.physicalSizeCategory;return psc===Ti.Platform.Android.PHYSICAL_SIZE_CATEGORY_LARGE||psc===Ti.Platform.Android.PHYSICAL_SIZE_CATEGORY_XLARGE}return 1?1?




isTabletFallback():1024<=_Mathmax(Ti.Platform.displayCaps.platformHeight,Ti.Platform.displayCaps.platformWidth):400<=_Mathmin(Ti.Platform.displayCaps.platformHeight,Ti.Platform.displayCaps.platformWidth);

}(),






exports.isHandheld=!exports.isTablet,















exports.Globals={},















exports.Models={},






exports.Models.instance=function(name){
return exports.Models[name]||(exports.Models[name]=exports.createModel(name));
},















exports.Collections={},






exports.Collections.instance=function(name){
return exports.Collections[name]||(exports.Collections[name]=exports.createCollection(name));
},






























exports.CFG=require("/alloy/CFG"),


exports.Android={},
exports.Android.menuItemCreateArgs=["itemId","groupId","title","order","actionView","checkable","checked","enabled","icon","showAsAction","titleCondensed","visible"],















exports.deepExtend=function(){var




options,name,src,copy,copy_is_array,clone,target=arguments[0]||{},i=1,length=arguments.length,deep=!1;














for("boolean"==typeof target&&(deep=target,target=arguments[1]||{},i=2),"object"==typeof target||_.isFunction(target)||(target={});i<length;i++)


if(options=arguments[i],null!=options)




for(name in"string"==typeof options&&(options=options.split("")),options)(
src=target[name],
copy=options[name],


target!==copy)&&(



deep&&copy&&!_.isFunction(copy)&&_.isObject(copy)&&((copy_is_array=_.isArray(copy))||!_.has(copy,"apiName"))?(

copy_is_array?(
copy_is_array=!1,
clone=src&&_.isArray(src)?src:[]):
_.isDate(copy)?
clone=new Date(copy.valueOf()):

clone=src&&_.isObject(src)?src:{},



target[name]=exports.deepExtend(deep,clone,copy)):

target[name]=copy);






return target;
};
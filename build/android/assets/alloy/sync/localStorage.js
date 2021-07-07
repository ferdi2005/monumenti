


var _=require("/alloy/underscore")._;

function S4(){
return(0|65536*(1+Math.random())).toString(16).substring(1);
}

function guid(){
return S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4();
}

function InitAdapter(){
if(!0)
throw"localStorage persistence supported only with MobileWeb.";

}

function Sync(method,model,opts){




function storeModel(data){
localStorage.setItem(name,JSON.stringify(data));
}var name=model.config.adapter.collection_name,data=model.config.data,resp=null;

switch(method){

case"create":
model.id||(
model.id=guid(),
model.set(model.idAttribute,model.id)),

data[model.id]=model,
storeModel(data),
resp=model.toJSON();
break;

case"read":var
store=localStorage.getItem(name),
store_data=store&&JSON.parse(store)||{},

len=0;
for(var key in store_data){
var m=new model.config.Model(store_data[key]);
model.models.push(m),
len++;
}

model.length=len,

resp=1===len?model.models[0]:

model.models;

break;

case"update":
data[model.id]=model,
storeModel(data),
resp=model.toJSON();
break;

case"delete":
delete data[model.id],
storeModel(data),
resp=model.toJSON();}




resp?(
_.isFunction(opts.success)&&opts.success(resp),
"read"===method&&model.trigger("fetch")):

_.isFunction(opts.error)&&opts.error(resp);

}

module.exports.sync=Sync,

module.exports.beforeModelCreate=function(config){






return config=config||{},config.data={},InitAdapter(),config;
},

module.exports.afterModelCreate=function(Model){




return Model=Model||{},Model.prototype.config.Model=Model,Model;
};
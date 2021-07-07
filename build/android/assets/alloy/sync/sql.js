var _=require("/alloy/underscore")._,
backbone=require("/alloy/backbone"),



ALLOY_DB_DEFAULT="_alloy_",
ALLOY_ID_DEFAULT="alloy_id";

function S4(){
return(0|65536*(1+Math.random())).toString(16).substring(1);
}

function guid(){
return S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4();
}

var cache={
config:{},
Model:{},
db:{}};


function getDatabase(name){



return cache.db[name]||(cache.db[name]=Ti.Database.open(name)),cache.db[name];
}












function Migrator(config,transactionDb){
this.db=transactionDb,
this.dbname=config.adapter.db_name,
this.table=config.adapter.collection_name,
this.idAttribute=config.adapter.idAttribute,


this.column=function(name){var


parts=name.split(/\s+/),
type=parts[0];
switch(type.toLowerCase()){
case"string":
case"varchar":
case"date":
case"datetime":
Ti.API.warn("\""+type+"\" is not a valid sqlite field, using TEXT instead");
case"text":
type="TEXT";
break;
case"int":
case"tinyint":
case"smallint":
case"bigint":
case"boolean":
Ti.API.warn("\""+type+"\" is not a valid sqlite field, using INTEGER instead");
case"integer":
type="INTEGER";
break;
case"double":
case"float":
case"decimal":
case"number":
Ti.API.warn("\""+name+"\" is not a valid sqlite field, using REAL instead");
case"real":
type="REAL";
break;
case"blob":
type="BLOB";
break;
case"null":
type="NULL";
break;
default:
type="TEXT";}



return parts[0]=type,parts.join(" ");
},

this.createTable=function(config){var

columns=[],
found=!1;
for(var k in config.columns)
k===this.idAttribute&&(found=!0),
columns.push(k+" "+this.column(config.columns[k]));



found||this.idAttribute!==ALLOY_ID_DEFAULT||
columns.push(ALLOY_ID_DEFAULT+" TEXT UNIQUE");

var sql="CREATE TABLE IF NOT EXISTS "+this.table+" ( "+columns.join(",")+")";


this.db.execute(sql);
},

this.dropTable=function(){
this.db.execute("DROP TABLE IF EXISTS "+this.table);
},

this.insertRow=function(columnValues){var
columns=[],
values=[],
qs=[],


found=!1;
for(var key in columnValues)
key===this.idAttribute&&(found=!0),
columns.push(key),
values.push(columnValues[key]),
qs.push("?");



found||this.idAttribute!==ALLOY_ID_DEFAULT||(
columns.push(this.idAttribute),
values.push(guid()),
qs.push("?")),



this.db.execute("INSERT INTO "+this.table+" ("+columns.join(",")+") VALUES ("+qs.join(",")+");",values);
},

this.deleteRow=function(columns){var
sql="DELETE FROM "+this.table,
keys=_.keys(columns),
len=keys.length,
conditions=[],
values=[];


len&&(sql+=" WHERE ");
for(var i=0;i<len;i++)
conditions.push(keys[i]+" = ?"),
values.push(columns[keys[i]]);

sql+=conditions.join(" AND "),


this.db.execute(sql,values);
};
}

function Sync(method,model,opts){
var



db,sql,table=model.config.adapter.collection_name,columns=model.config.columns,dbName=model.config.adapter.db_name||ALLOY_DB_DEFAULT,resp=null;

switch(method){
case"create":
case"update":
resp=function(){
var attrObj={};

model.id||(
model.id=model.idAttribute===ALLOY_ID_DEFAULT?guid():null,
attrObj[model.idAttribute]=model.id,
"0.9.2"===backbone.VERSION?model.set(attrObj,{silent:!0}):model.set(attrObj));



var names=[],values=[],q=[];
for(var k in columns)
names.push(k),
values.push(model.get(k)),
q.push("?");














return sql="REPLACE INTO "+table+" ("+names.join(",")+") VALUES ("+q.join(",")+");",db=getDatabase(dbName),db.execute(sql,values),null===model.id&&(model.id=db.lastInsertRowId,attrObj[model.idAttribute]=model.id,"0.9.2"===backbone.VERSION?model.set(attrObj,{silent:!0}):model.set(attrObj)),model.toJSON();
}();
break;

case"read":

opts.query&&opts.id&&
Ti.API.warn("Both \"query\" and \"id\" options were specified for model.fetch(). \"id\" will be ignored."),



sql="SELECT * FROM "+table,
opts.query?
sql=opts.query:
opts.id&&(
sql+=" WHERE "+(model.idAttribute?model.idAttribute:ALLOY_ID_DEFAULT)+" = "+(_.isString(opts.id)?"\""+opts.id+"\"":opts.id)),



db=getDatabase(dbName);
var rs;



rs=_.isString(sql)?db.execute(sql):

db.execute(sql.statement,sql.params);







for(var values=[],fieldNames=[],fieldCount=_.isFunction(rs.fieldCount)?rs.fieldCount():rs.fieldCount,i=0;i<fieldCount;i++)
fieldNames.push(rs.fieldName(i));for(;



rs.isValidRow();){
var o={};
for(i=0;i<fieldCount;i++)
o[fieldNames[i]]=rs.field(i);

values.push(o),
rs.next();
}
rs.close();


var len=values.length;

"0.9.2"===backbone.VERSION&&(
model.length=len),


resp=1===len?values[0]:values;
break;

case"delete":
sql="DELETE FROM "+table+" WHERE "+model.idAttribute+"=?",


db=getDatabase(dbName),
db.execute(sql,model.id),

resp=model.toJSON();}




resp?(
_.isFunction(opts.success)&&opts.success(resp),
"read"===method&&!opts.silent&&model.trigger("fetch",{fromAdapter:!0})):

_.isFunction(opts.error)&&opts.error(resp);


}


function GetMigrationFor(dbname,table){var
mid=null,
db=getDatabase(dbname);
db.execute("CREATE TABLE IF NOT EXISTS migrations (latest TEXT, model TEXT);");
var rs=db.execute("SELECT latest FROM migrations where model = ?;",table);




return rs.isValidRow()&&(mid=rs.field(0)+""),rs.close(),mid;
}

function Migrate(Model){var

migrations=Model.migrations||[],


lastMigration={};
migrations.length&&migrations[migrations.length-1](lastMigration);


var config=Model.prototype.config;


config.adapter.db_name=config.adapter.db_name||ALLOY_DB_DEFAULT;var
migrator=new Migrator(config),





targetNumber="undefined"==typeof config.adapter.migration||
null===config.adapter.migration?lastMigration.id:config.adapter.migration;
if("undefined"==typeof targetNumber||null===targetNumber){
var tmpDb=getDatabase(config.adapter.db_name);


return migrator.db=tmpDb,void migrator.createTable(config);
}
targetNumber+="";var







direction,currentNumber=GetMigrationFor(config.adapter.db_name,config.adapter.collection_name);
if(currentNumber!==targetNumber){

currentNumber&&currentNumber>targetNumber?(
direction=0,
migrations.reverse()):

direction=1;



var db=getDatabase(config.adapter.db_name);





if(migrator.db=db,db.execute("BEGIN;"),migrations.length)
for(var i=0;i<migrations.length;i++){var

migration=migrations[i],
context={};




if(migration(context),direction){
if(context.id>targetNumber)break;
if(context.id<=currentNumber)continue;
}else{
if(context.id<=targetNumber)break;
if(context.id>currentNumber)continue;
}


var funcName=direction?"up":"down";
_.isFunction(context[funcName])&&
context[funcName](migrator,config);

}else

migrator.createTable(config);



db.execute("DELETE FROM migrations where model = ?",config.adapter.collection_name),
db.execute("INSERT INTO migrations VALUES (?,?)",targetNumber,config.adapter.collection_name),


db.execute("COMMIT;"),
migrator.db=null}
}

function installDatabase(config){var

dbFile=_.isFunction(config.adapter.db_file)?config.adapter.db_file(config):config.adapter.db_file,
table=config.adapter.collection_name,

rx=/(^|.*\/)([^\/]+)\.[^\/]+$/,
match=dbFile.match(rx);
if(null===match)
throw"Invalid sql database filename \""+dbFile+"\"";


config.adapter.db_name=config.adapter.db_name||match[2];
var dbName=config.adapter.db_name;


Ti.API.debug("Installing sql database \""+dbFile+"\" with name \""+dbName+"\"");
var db=Ti.Database.install(dbFile,dbName);
cache.db[dbName]=db,


!1!==config.adapter.remoteBackup||1||(
Ti.API.debug("iCloud \"do not backup\" flag set for database \""+dbFile+"\""),
db.file.setRemoteBackup(!1));var




cName,cType,rs=db.execute("pragma table_info(\""+table+"\");"),columns={};
if(rs){for(;
rs.isValidRow();)
cName=rs.fieldByName("name"),
cType=rs.fieldByName("type"),
columns[cName]=cType,


cName!==ALLOY_ID_DEFAULT||config.adapter.idAttribute||(
config.adapter.idAttribute=ALLOY_ID_DEFAULT),


rs.next();

rs.close();
}
if(0===Object.keys(columns).length){
var idAttribute=config.adapter.idAttribute?config.adapter.idAttribute:ALLOY_ID_DEFAULT;
for(var k in config.columns)
cName=k,
cType=config.columns[k],


cName!==ALLOY_ID_DEFAULT||config.adapter.idAttribute?

k===config.adapter.idAttribute&&(
cType+=" UNIQUE"):config.adapter.idAttribute=ALLOY_ID_DEFAULT,

columns[cName]=cType;

}



if(config.columns=columns,!config.adapter.idAttribute)




{
Ti.API.info("No config.adapter.idAttribute specified for table \""+table+"\""),
Ti.API.info("Adding \""+ALLOY_ID_DEFAULT+"\" to uniquely identify rows");

var fullStrings=[],
colStrings=[];
_.each(config.columns,function(type,name){
colStrings.push(name),
fullStrings.push(name+" "+type);
});
var colsString=colStrings.join(",");
db.execute("ALTER TABLE "+table+" RENAME TO "+table+"_temp;"),
db.execute("CREATE TABLE "+table+"("+fullStrings.join(",")+","+ALLOY_ID_DEFAULT+" TEXT UNIQUE);"),
db.execute("INSERT INTO "+table+"("+colsString+","+ALLOY_ID_DEFAULT+") SELECT "+colsString+",CAST(_ROWID_ AS TEXT) FROM "+table+"_temp;"),
db.execute("DROP TABLE "+table+"_temp;"),
config.columns[ALLOY_ID_DEFAULT]="TEXT UNIQUE",
config.adapter.idAttribute=ALLOY_ID_DEFAULT;
}else if(!_.contains(_.keys(config.columns),config.adapter.idAttribute))throw"config.adapter.idAttribute \""+config.adapter.idAttribute+"\" not found in list of columns for table \""+table+"\"\ncolumns: ["+_.keys(config.columns).join(",")+"]";
}

module.exports.beforeModelCreate=function(config,name){

if(cache.config[name])
return cache.config[name];



if("undefined"==typeof Ti.Database)
throw"No support for Titanium.Database in MobileWeb environment.";














return config.adapter.db_file&&installDatabase(config),config.adapter.idAttribute||(Ti.API.info("No config.adapter.idAttribute specified for table \""+config.adapter.collection_name+"\""),Ti.API.info("Adding \""+ALLOY_ID_DEFAULT+"\" to uniquely identify rows"),config.columns[ALLOY_ID_DEFAULT]="TEXT UNIQUE",config.adapter.idAttribute=ALLOY_ID_DEFAULT),cache.config[name]=config,config;
},

module.exports.afterModelCreate=function(Model,name){return(

cache.Model[name]?
cache.Model[name]:(



Model=Model||{},
Model.prototype.idAttribute=Model.prototype.config.adapter.idAttribute,
Migrate(Model),


cache.Model[name]=Model,

Model));
},

module.exports.sync=Sync;





(function(){var _Mathfloor=





































































































































































































































































































































































































































































































































































































































































































Math.floor,_Mathmin=Math.min,_Mathmax=Math.max,root="object"==typeof self&&self.self===self&&self||"object"==typeof global&&global.global===global&&global||this||{},previousUnderscore=root._,ArrayProto=Array.prototype,ObjProto=Object.prototype,SymbolProto="undefined"==typeof Symbol?null:Symbol.prototype,push=ArrayProto.push,slice=ArrayProto.slice,toString=ObjProto.toString,hasOwnProperty=ObjProto.hasOwnProperty,nativeIsArray=Array.isArray,nativeKeys=Object.keys,nativeCreate=Object.create,Ctor=function(){},_=function(obj){return obj instanceof _?obj:this instanceof _?void(this._wrapped=obj):new _(obj)};"undefined"==typeof exports||exports.nodeType?root._=_:("undefined"!=typeof module&&!module.nodeType&&module.exports&&(exports=module.exports=_),exports._=_),_.VERSION="1.9.1";var builtinIteratee,optimizeCb=function(func,context,argCount){if(void 0===context)return func;switch(null==argCount?3:argCount){case 1:return function(value){return func.call(context,value)};case 3:return function(value,index,collection){return func.call(context,value,index,collection)};case 4:return function(accumulator,value,index,collection){return func.call(context,accumulator,value,index,collection)};}return function(){return func.apply(context,arguments)}},cb=function(value,context,argCount){return _.iteratee===builtinIteratee?null==value?_.identity:_.isFunction(value)?optimizeCb(value,context,argCount):_.isObject(value)&&!_.isArray(value)?_.matcher(value):_.property(value):_.iteratee(value,context)};_.iteratee=builtinIteratee=function(value,context){return cb(value,context,1/0)};var restArguments=function(func,startIndex){return startIndex=null==startIndex?func.length-1:+startIndex,function(){for(var length=_Mathmax(arguments.length-startIndex,0),rest=Array(length),index=0;index<length;index++)rest[index]=arguments[index+startIndex];switch(startIndex){case 0:return func.call(this,rest);case 1:return func.call(this,arguments[0],rest);case 2:return func.call(this,arguments[0],arguments[1],rest);}var args=Array(startIndex+1);for(index=0;index<startIndex;index++)args[index]=arguments[index];return args[startIndex]=rest,func.apply(this,args)}},baseCreate=function(prototype){if(!_.isObject(prototype))return{};if(nativeCreate)return nativeCreate(prototype);Ctor.prototype=prototype;var result=new Ctor;return Ctor.prototype=null,result},shallowProperty=function(key){return function(obj){return null==obj?void 0:obj[key]}},has=function(obj,path){return null!=obj&&hasOwnProperty.call(obj,path)},deepGet=function(obj,path){for(var length=path.length,i=0;i<length;i++){if(null==obj)return;obj=obj[path[i]]}return length?obj:void 0},MAX_ARRAY_INDEX=Math.pow(2,53)-1,getLength=shallowProperty("length"),isArrayLike=function(collection){var length=getLength(collection);return"number"==typeof length&&0<=length&&length<=MAX_ARRAY_INDEX};_.each=_.forEach=function(obj,iteratee,context){iteratee=optimizeCb(iteratee,context);var i,length;if(isArrayLike(obj))for(i=0,length=obj.length;i<length;i++)iteratee(obj[i],i,obj);else{var keys=_.keys(obj);for(i=0,length=keys.length;i<length;i++)iteratee(obj[keys[i]],keys[i],obj)}return obj},_.map=_.collect=function(obj,iteratee,context){iteratee=cb(iteratee,context);for(var currentKey,keys=!isArrayLike(obj)&&_.keys(obj),length=(keys||obj).length,results=Array(length),index=0;index<length;index++)currentKey=keys?keys[index]:index,results[index]=iteratee(obj[currentKey],currentKey,obj);return results};var createReduce=function(dir){var reducer=function(obj,iteratee,memo,initial){var keys=!isArrayLike(obj)&&_.keys(obj),length=(keys||obj).length,index=0<dir?0:length-1;for(initial||(memo=obj[keys?keys[index]:index],index+=dir);0<=index&&index<length;index+=dir){var currentKey=keys?keys[index]:index;memo=iteratee(memo,obj[currentKey],currentKey,obj)}return memo};return function(obj,iteratee,memo,context){var initial=3<=arguments.length;return reducer(obj,optimizeCb(iteratee,context,4),memo,initial)}};_.reduce=_.foldl=_.inject=createReduce(1),_.reduceRight=_.foldr=createReduce(-1),_.find=_.detect=function(obj,predicate,context){var keyFinder=isArrayLike(obj)?_.findIndex:_.findKey,key=keyFinder(obj,predicate,context);if(void 0!==key&&-1!==key)return obj[key]},_.filter=_.select=function(obj,predicate,context){var results=[];return predicate=cb(predicate,context),_.each(obj,function(value,index,list){predicate(value,index,list)&&results.push(value)}),results},_.reject=function(obj,predicate,context){return _.filter(obj,_.negate(cb(predicate)),context)},_.every=_.all=function(obj,predicate,context){predicate=cb(predicate,context);for(var currentKey,keys=!isArrayLike(obj)&&_.keys(obj),length=(keys||obj).length,index=0;index<length;index++)if(currentKey=keys?keys[index]:index,!predicate(obj[currentKey],currentKey,obj))return!1;return!0},_.some=_.any=function(obj,predicate,context){predicate=cb(predicate,context);for(var currentKey,keys=!isArrayLike(obj)&&_.keys(obj),length=(keys||obj).length,index=0;index<length;index++)if(currentKey=keys?keys[index]:index,predicate(obj[currentKey],currentKey,obj))return!0;return!1},_.contains=_.includes=_.include=function(obj,item,fromIndex,guard){return isArrayLike(obj)||(obj=_.values(obj)),("number"!=typeof fromIndex||guard)&&(fromIndex=0),0<=_.indexOf(obj,item,fromIndex)},_.invoke=restArguments(function(obj,path,args){var contextPath,func;return _.isFunction(path)?func=path:_.isArray(path)&&(contextPath=path.slice(0,-1),path=path[path.length-1]),_.map(obj,function(context){var method=func;if(!method){if(contextPath&&contextPath.length&&(context=deepGet(context,contextPath)),null==context)return;method=context[path]}return null==method?method:method.apply(context,args)})}),_.pluck=function(obj,key){return _.map(obj,_.property(key))},_.where=function(obj,attrs){return _.filter(obj,_.matcher(attrs))},_.findWhere=function(obj,attrs){return _.find(obj,_.matcher(attrs))},_.max=function(obj,iteratee,context){var value,computed,result=-Infinity,lastComputed=-Infinity;if(null==iteratee||"number"==typeof iteratee&&"object"!=typeof obj[0]&&null!=obj){obj=isArrayLike(obj)?obj:_.values(obj);for(var i=0,length=obj.length;i<length;i++)value=obj[i],null!=value&&value>result&&(result=value)}else iteratee=cb(iteratee,context),_.each(obj,function(v,index,list){computed=iteratee(v,index,list),(computed>lastComputed||computed===-Infinity&&result===-Infinity)&&(result=v,lastComputed=computed)});return result},_.min=function(obj,iteratee,context){var value,computed,result=1/0,lastComputed=1/0;if(null==iteratee||"number"==typeof iteratee&&"object"!=typeof obj[0]&&null!=obj){obj=isArrayLike(obj)?obj:_.values(obj);for(var i=0,length=obj.length;i<length;i++)value=obj[i],null!=value&&value<result&&(result=value)}else iteratee=cb(iteratee,context),_.each(obj,function(v,index,list){computed=iteratee(v,index,list),(computed<lastComputed||computed===1/0&&result===1/0)&&(result=v,lastComputed=computed)});return result},_.shuffle=function(obj){return _.sample(obj,1/0)},_.sample=function(obj,n,guard){if(null==n||guard)return isArrayLike(obj)||(obj=_.values(obj)),obj[_.random(obj.length-1)];var sample=isArrayLike(obj)?_.clone(obj):_.values(obj),length=getLength(sample);n=_Mathmax(_Mathmin(n,length),0);for(var last=length-1,index=0;index<n;index++){var rand=_.random(index,last),temp=sample[index];sample[index]=sample[rand],sample[rand]=temp}return sample.slice(0,n)},_.sortBy=function(obj,iteratee,context){var index=0;return iteratee=cb(iteratee,context),_.pluck(_.map(obj,function(value,key,list){return{value:value,index:index++,criteria:iteratee(value,key,list)}}).sort(function(left,right){var a=left.criteria,b=right.criteria;if(a!==b){if(a>b||void 0===a)return 1;if(a<b||void 0===b)return-1}return left.index-right.index}),"value")};var group=function(behavior,partition){return function(obj,iteratee,context){var result=partition?[[],[]]:{};return iteratee=cb(iteratee,context),_.each(obj,function(value,index){var key=iteratee(value,index,obj);behavior(result,value,key)}),result}};_.groupBy=group(function(result,value,key){has(result,key)?result[key].push(value):result[key]=[value]}),_.indexBy=group(function(result,value,key){result[key]=value}),_.countBy=group(function(result,value,key){has(result,key)?result[key]++:result[key]=1});var reStrSymbol=/[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;_.toArray=function(obj){return obj?_.isArray(obj)?slice.call(obj):_.isString(obj)?obj.match(reStrSymbol):isArrayLike(obj)?_.map(obj,_.identity):_.values(obj):[]},_.size=function(obj){return null==obj?0:isArrayLike(obj)?obj.length:_.keys(obj).length},_.partition=group(function(result,value,pass){result[pass?0:1].push(value)},!0),_.first=_.head=_.take=function(array,n,guard){return null==array||1>array.length?null==n?void 0:[]:null==n||guard?array[0]:_.initial(array,array.length-n)},_.initial=function(array,n,guard){return slice.call(array,0,_Mathmax(0,array.length-(null==n||guard?1:n)))},_.last=function(array,n,guard){return null==array||1>array.length?null==n?void 0:[]:null==n||guard?array[array.length-1]:_.rest(array,_Mathmax(0,array.length-n))},_.rest=_.tail=_.drop=function(array,n,guard){return slice.call(array,null==n||guard?1:n)},_.compact=function(array){return _.filter(array,Boolean)};var flatten=function(input,shallow,strict,output){output=output||[];for(var value,idx=output.length,i=0,length=getLength(input);i<length;i++)if(value=input[i],!(isArrayLike(value)&&(_.isArray(value)||_.isArguments(value))))strict||(output[idx++]=value);else if(shallow)for(var j=0,len=value.length;j<len;)output[idx++]=value[j++];else flatten(value,shallow,strict,output),idx=output.length;return output};_.flatten=function(array,shallow){return flatten(array,shallow,!1)},_.without=restArguments(function(array,otherArrays){return _.difference(array,otherArrays)}),_.uniq=_.unique=function(array,isSorted,iteratee,context){_.isBoolean(isSorted)||(context=iteratee,iteratee=isSorted,isSorted=!1),null!=iteratee&&(iteratee=cb(iteratee,context));for(var result=[],seen=[],i=0,length=getLength(array);i<length;i++){var value=array[i],computed=iteratee?iteratee(value,i,array):value;isSorted&&!iteratee?((!i||seen!==computed)&&result.push(value),seen=computed):iteratee?!_.contains(seen,computed)&&(seen.push(computed),result.push(value)):!_.contains(result,value)&&result.push(value)}return result},_.union=restArguments(function(arrays){return _.uniq(flatten(arrays,!0,!0))}),_.intersection=function(array){for(var item,result=[],argsLength=arguments.length,i=0,length=getLength(array);i<length;i++)if(item=array[i],!_.contains(result,item)){var j;for(j=1;j<argsLength&&!!_.contains(arguments[j],item);j++);j===argsLength&&result.push(item)}return result},_.difference=restArguments(function(array,rest){return rest=flatten(rest,!0,!0),_.filter(array,function(value){return!_.contains(rest,value)})}),_.unzip=function(array){for(var length=array&&_.max(array,getLength).length||0,result=Array(length),index=0;index<length;index++)result[index]=_.pluck(array,index);return result},_.zip=restArguments(_.unzip),_.object=function(list,values){for(var result={},i=0,length=getLength(list);i<length;i++)values?result[list[i]]=values[i]:result[list[i][0]]=list[i][1];return result};var createPredicateIndexFinder=function(dir){return function(array,predicate,context){predicate=cb(predicate,context);for(var length=getLength(array),index=0<dir?0:length-1;0<=index&&index<length;index+=dir)if(predicate(array[index],index,array))return index;return-1}};_.findIndex=createPredicateIndexFinder(1),_.findLastIndex=createPredicateIndexFinder(-1),_.sortedIndex=function(array,obj,iteratee,context){iteratee=cb(iteratee,context,1);for(var value=iteratee(obj),low=0,high=getLength(array);low<high;){var mid=_Mathfloor((low+high)/2);
iteratee(array[mid])<value?low=mid+1:high=mid;
}
return low;
};


var createIndexFinder=function(dir,predicateFind,sortedIndex){
return function(array,item,idx){
var i=0,length=getLength(array);
if("number"==typeof idx)
0<dir?
i=0<=idx?idx:_Mathmax(idx+length,i):

length=0<=idx?_Mathmin(idx+1,length):idx+length+1;else

if(sortedIndex&&idx&&length)

return idx=sortedIndex(array,item),array[idx]===item?idx:-1;

if(item!==item)

return idx=predicateFind(slice.call(array,i,length),_.isNaN),0<=idx?idx+i:-1;

for(idx=0<dir?i:length-1;0<=idx&&idx<length;idx+=dir)
if(array[idx]===item)return idx;

return-1;
};
};





_.indexOf=createIndexFinder(1,_.findIndex,_.sortedIndex),
_.lastIndexOf=createIndexFinder(-1,_.findLastIndex),




_.range=function(start,stop,step){
null==stop&&(
stop=start||0,
start=0),

step||(
step=stop<start?-1:1);





for(var length=_Mathmax(Math.ceil((stop-start)/step),0),range=Array(length),idx=0;idx<length;idx++,start+=step)
range[idx]=start;


return range;
},



_.chunk=function(array,count){
if(null==count||1>count)return[];for(var
result=[],
i=0,length=array.length;
i<length;)
result.push(slice.call(array,i,i+=count));

return result;
};






var executeBound=function(sourceFunc,boundFunc,context,callingContext,args){
if(!(callingContext instanceof boundFunc))return sourceFunc.apply(context,args);var
self=baseCreate(sourceFunc.prototype),
result=sourceFunc.apply(self,args);return(
_.isObject(result)?result:
self);
};




_.bind=restArguments(function(func,context,args){
if(!_.isFunction(func))throw new TypeError("Bind must be called on a function");
var bound=restArguments(function(callArgs){
return executeBound(func,bound,context,this,args.concat(callArgs));
});
return bound;
}),





_.partial=restArguments(function(func,boundArgs){var
placeholder=_.partial.placeholder,
bound=function(){


for(var position=0,length=boundArgs.length,args=Array(length),i=0;i<length;i++)
args[i]=boundArgs[i]===placeholder?arguments[position++]:boundArgs[i];for(;

position<arguments.length;)args.push(arguments[position++]);
return executeBound(func,bound,this,this,args);
};
return bound;
}),

_.partial.placeholder=_,




_.bindAll=restArguments(function(obj,keys){
keys=flatten(keys,!1,!1);
var index=keys.length;
if(1>index)throw new Error("bindAll must be passed function names");for(;
index--;){
var key=keys[index];
obj[key]=_.bind(obj[key],obj);
}
}),


_.memoize=function(func,hasher){
var memoize=function(key){var
cache=memoize.cache,
address=""+(hasher?hasher.apply(this,arguments):key);

return has(cache,address)||(cache[address]=func.apply(this,arguments)),cache[address];
};

return memoize.cache={},memoize;
},



_.delay=restArguments(function(func,wait,args){
return setTimeout(function(){
return func.apply(null,args);
},wait);
}),



_.defer=_.partial(_.delay,_,1),






_.throttle=function(func,wait,options){var
timeout,context,args,result,
previous=0;
options||(options={});var

later=function(){
previous=!1===options.leading?0:_.now(),
timeout=null,
result=func.apply(context,args),
timeout||(context=args=null);
},

throttled=function(){
var now=_.now();
previous||!1!==options.leading||(previous=now);
var remaining=wait-(now-previous);













return context=this,args=arguments,0>=remaining||remaining>wait?(timeout&&(clearTimeout(timeout),timeout=null),previous=now,result=func.apply(context,args),!timeout&&(context=args=null)):!timeout&&!1!==options.trailing&&(timeout=setTimeout(later,remaining)),result;
};







return throttled.cancel=function(){clearTimeout(timeout),previous=0,timeout=context=args=null},throttled;
},





_.debounce=function(func,wait,immediate){var
timeout,result,

later=function(context,args){
timeout=null,
args&&(result=func.apply(context,args));
},

debounced=restArguments(function(args){

if(timeout&&clearTimeout(timeout),immediate){
var callNow=!timeout;
timeout=setTimeout(later,wait),
callNow&&(result=func.apply(this,args));
}else
timeout=_.delay(later,wait,this,args);


return result;
});






return debounced.cancel=function(){clearTimeout(timeout),timeout=null},debounced;
},




_.wrap=function(func,wrapper){
return _.partial(wrapper,func);
},


_.negate=function(predicate){
return function(){
return!predicate.apply(this,arguments);
};
},



_.compose=function(){var
args=arguments,
start=args.length-1;
return function(){for(var
i=start,
result=args[start].apply(this,arguments);
i--;)result=args[i].call(this,result);
return result;
};
},


_.after=function(times,func){
return function(){
if(1>--times)
return func.apply(this,arguments);

};
},


_.before=function(times,func){
var memo;
return function(){




return 0<--times&&(memo=func.apply(this,arguments)),1>=times&&(func=null),memo;
};
},



_.once=_.partial(_.before,2),

_.restArguments=restArguments;var





hasEnumBug=!{toString:null}.propertyIsEnumerable("toString"),
nonEnumerableProps=["valueOf","isPrototypeOf","toString",
"propertyIsEnumerable","hasOwnProperty","toLocaleString"],

collectNonEnumProps=function(obj,keys){var
nonEnumIdx=nonEnumerableProps.length,
constructor=obj.constructor,
proto=_.isFunction(constructor)&&constructor.prototype||ObjProto,


prop="constructor";for(
has(obj,prop)&&!_.contains(keys,prop)&&keys.push(prop);

nonEnumIdx--;)
prop=nonEnumerableProps[nonEnumIdx],
prop in obj&&obj[prop]!==proto[prop]&&!_.contains(keys,prop)&&
keys.push(prop);


};



_.keys=function(obj){
if(!_.isObject(obj))return[];
if(nativeKeys)return nativeKeys(obj);
var keys=[];
for(var key in obj)has(obj,key)&&keys.push(key);


return hasEnumBug&&collectNonEnumProps(obj,keys),keys;
},


_.allKeys=function(obj){
if(!_.isObject(obj))return[];
var keys=[];
for(var key in obj)keys.push(key);


return hasEnumBug&&collectNonEnumProps(obj,keys),keys;
},


_.values=function(obj){



for(var keys=_.keys(obj),length=keys.length,values=Array(length),i=0;i<length;i++)
values[i]=obj[keys[i]];

return values;
},



_.mapObject=function(obj,iteratee,context){
iteratee=cb(iteratee,context);



for(var
currentKey,keys=_.keys(obj),length=keys.length,results={},index=0;index<length;index++)currentKey=keys[index],
results[currentKey]=iteratee(obj[currentKey],currentKey,obj);

return results;
},



_.pairs=function(obj){



for(var keys=_.keys(obj),length=keys.length,pairs=Array(length),i=0;i<length;i++)
pairs[i]=[keys[i],obj[keys[i]]];

return pairs;
},


_.invert=function(obj){


for(var result={},keys=_.keys(obj),i=0,length=keys.length;i<length;i++)
result[obj[keys[i]]]=keys[i];

return result;
},



_.functions=_.methods=function(obj){
var names=[];
for(var key in obj)
_.isFunction(obj[key])&&names.push(key);

return names.sort();
};


var createAssigner=function(keysFunc,defaults){
return function(obj){
var length=arguments.length;

if(defaults&&(obj=Object(obj)),2>length||null==obj)return obj;
for(var index=1;index<length;index++)



for(var
key,source=arguments[index],keys=keysFunc(source),l=keys.length,i=0;i<l;i++)key=keys[i],
defaults&&void 0!==obj[key]||(obj[key]=source[key]);


return obj;
};
};


_.extend=createAssigner(_.allKeys),



_.extendOwn=_.assign=createAssigner(_.keys),


_.findKey=function(obj,predicate,context){
predicate=cb(predicate,context);

for(var key,keys=_.keys(obj),i=0,length=keys.length;i<length;i++)

if(key=keys[i],predicate(obj[key],key,obj))return key;

};


var keyInObj=function(value,key,obj){
return key in obj;
};


_.pick=restArguments(function(obj,keys){
var result={},iteratee=keys[0];
if(null==obj)return result;
_.isFunction(iteratee)?(
1<keys.length&&(iteratee=optimizeCb(iteratee,keys[1])),
keys=_.allKeys(obj)):(

iteratee=keyInObj,
keys=flatten(keys,!1,!1),
obj=Object(obj));

for(var i=0,length=keys.length;i<length;i++){var
key=keys[i],
value=obj[key];
iteratee(value,key,obj)&&(result[key]=value);
}
return result;
}),


_.omit=restArguments(function(obj,keys){
var context,iteratee=keys[0];









return _.isFunction(iteratee)?(iteratee=_.negate(iteratee),1<keys.length&&(context=keys[1])):(keys=_.map(flatten(keys,!1,!1),String),iteratee=function(value,key){return!_.contains(keys,key)}),_.pick(obj,iteratee,context);
}),


_.defaults=createAssigner(_.allKeys,!0),




_.create=function(prototype,props){
var result=baseCreate(prototype);

return props&&_.extendOwn(result,props),result;
},


_.clone=function(obj){return(
_.isObject(obj)?
_.isArray(obj)?obj.slice():_.extend({},obj):obj);
},




_.tap=function(obj,interceptor){

return interceptor(obj),obj;
},


_.isMatch=function(object,attrs){
var keys=_.keys(attrs),length=keys.length;
if(null==object)return!length;

for(var
key,obj=Object(object),i=0;i<length;i++)
if(key=keys[i],attrs[key]!==obj[key]||!(key in obj))return!1;

return!0;
};



var eq,deepEq;
eq=function(a,b,aStack,bStack){


if(a===b)return 0!==a||1/a==1/b;

if(null==a||null==b)return!1;

if(a!==a)return b!==b;

var type=typeof a;return(
"function"==type||"object"===type||"object"==typeof b)&&
deepEq(a,b,aStack,bStack);
},


deepEq=function(a,b,aStack,bStack){

a instanceof _&&(a=a._wrapped),
b instanceof _&&(b=b._wrapped);

var className=toString.call(a);
if(className!==toString.call(b))return!1;
switch(className){

case"[object RegExp]":

case"[object String]":


return""+a==""+b;
case"[object Number]":return(


+a==+a?

0==+a?1/+a==1/b:+a==+b:+b!=+b);
case"[object Date]":
case"[object Boolean]":



return+a==+b;
case"[object Symbol]":
return SymbolProto.valueOf.call(a)===SymbolProto.valueOf.call(b);}


var areArrays="[object Array]"===className;
if(!areArrays){
if("object"!=typeof a||"object"!=typeof b)return!1;



var aCtor=a.constructor,bCtor=b.constructor;
if(aCtor!==bCtor&&!(_.isFunction(aCtor)&&aCtor instanceof aCtor&&
_.isFunction(bCtor)&&bCtor instanceof bCtor)&&
"constructor"in a&&"constructor"in b)
return!1;

}





aStack=aStack||[],
bStack=bStack||[];for(
var length=aStack.length;
length--;)


if(aStack[length]===a)return bStack[length]===b;







if(aStack.push(a),bStack.push(b),areArrays){


if(length=a.length,length!==b.length)return!1;for(;

length--;)
if(!eq(a[length],b[length],aStack,bStack))return!1;

}else{

var key,keys=_.keys(a);


if(length=keys.length,_.keys(b).length!==length)return!1;for(;
length--;)


if(key=keys[length],!(has(b,key)&&eq(a[key],b[key],aStack,bStack)))return!1;

}



return aStack.pop(),bStack.pop(),!0;
},


_.isEqual=function(a,b){
return eq(a,b);
},



_.isEmpty=function(obj){return!(
null!=obj)||(
isArrayLike(obj)&&(_.isArray(obj)||_.isString(obj)||_.isArguments(obj))?0===obj.length:
0===_.keys(obj).length);
},


_.isElement=function(obj){
return!!(obj&&1===obj.nodeType);
},



_.isArray=nativeIsArray||function(obj){
return"[object Array]"===toString.call(obj);
},


_.isObject=function(obj){
var type=typeof obj;
return"function"==type||"object"===type&&!!obj;
},


_.each(["Arguments","Function","String","Number","Date","RegExp","Error","Symbol","Map","WeakMap","Set","WeakSet"],function(name){
_["is"+name]=function(obj){
return toString.call(obj)==="[object "+name+"]";
};
}),



_.isArguments(arguments)||(
_.isArguments=function(obj){
return has(obj,"callee");
});




var nodelist=root.document&&root.document.childNodes;
"function"!=typeof /./&&"object"!=typeof Int8Array&&"function"!=typeof nodelist&&(
_.isFunction=function(obj){
return"function"==typeof obj||!1;
}),



_.isFinite=function(obj){
return!_.isSymbol(obj)&&isFinite(obj)&&!isNaN(parseFloat(obj));
},


_.isNaN=function(obj){
return _.isNumber(obj)&&isNaN(obj);
},


_.isBoolean=function(obj){
return!0===obj||!1===obj||"[object Boolean]"===toString.call(obj);
},


_.isNull=function(obj){
return null===obj;
},


_.isUndefined=function(obj){
return void 0===obj;
},



_.has=function(obj,path){
if(!_.isArray(path))
return has(obj,path);


for(var
key,length=path.length,i=0;i<length;i++){
if(key=path[i],null==obj||!hasOwnProperty.call(obj,key))
return!1;

obj=obj[key];
}
return!!length;
},






_.noConflict=function(){

return root._=previousUnderscore,this;
},


_.identity=function(value){
return value;
},


_.constant=function(value){
return function(){
return value;
};
},

_.noop=function(){},



_.property=function(path){return(
_.isArray(path)?


function(obj){
return deepGet(obj,path);
}:shallowProperty(path));
},


_.propertyOf=function(obj){return(
null==obj?
function(){}:

function(path){
return _.isArray(path)?deepGet(obj,path):obj[path];
});
},



_.matcher=_.matches=function(attrs){

return attrs=_.extendOwn({},attrs),function(obj){
return _.isMatch(obj,attrs);
};
},


_.times=function(n,iteratee,context){
var accum=Array(_Mathmax(0,n));
iteratee=optimizeCb(iteratee,context,1);
for(var i=0;i<n;i++)accum[i]=iteratee(i);
return accum;
},


_.random=function(min,max){




return null==max&&(max=min,min=0),min+_Mathfloor(Math.random()*(max-min+1));
},


_.now=Date.now||function(){
return new Date().getTime();
};var


escapeMap={
"&":"&amp;",
"<":"&lt;",
">":"&gt;",
'"':"&quot;",
"'":"&#x27;",
"`":"&#x60;"},

unescapeMap=_.invert(escapeMap),


createEscaper=function(map){var
escaper=function(match){
return map[match];
},

source="(?:"+_.keys(map).join("|")+")",
testRegexp=RegExp(source),
replaceRegexp=RegExp(source,"g");
return function(string){

return string=null==string?"":""+string,testRegexp.test(string)?string.replace(replaceRegexp,escaper):string;
};
};
_.escape=createEscaper(escapeMap),
_.unescape=createEscaper(unescapeMap),




_.result=function(obj,path,fallback){
_.isArray(path)||(path=[path]);
var length=path.length;
if(!length)
return _.isFunction(fallback)?fallback.call(obj):fallback;

for(var
prop,i=0;i<length;i++)prop=null==obj?void 0:obj[path[i]],
void 0===prop&&(
prop=fallback,
i=length),

obj=_.isFunction(prop)?prop.call(obj):prop;

return obj;
};



var idCounter=0;
_.uniqueId=function(prefix){
var id=++idCounter+"";
return prefix?prefix+id:id;
},



_.templateSettings={
evaluate:/<%([\s\S]+?)%>/g,
interpolate:/<%=([\s\S]+?)%>/g,
escape:/<%-([\s\S]+?)%>/g};var





noMatch=/(.)^/,



escapes={
"'":"'",
"\\":"\\",
"\r":"r",
"\n":"n",
"\u2028":"u2028",
"\u2029":"u2029"},


escapeRegExp=/\\|'|\r|\n|\u2028|\u2029/g,

escapeChar=function(match){
return"\\"+escapes[match];
};





_.template=function(text,settings,oldSettings){
!settings&&oldSettings&&(settings=oldSettings),
settings=_.defaults({},settings,_.templateSettings);var


matcher=RegExp([
(settings.escape||noMatch).source,
(settings.interpolate||noMatch).source,
(settings.evaluate||noMatch).source].
join("|")+"|$","g"),


index=0,
source="__p+='";
text.replace(matcher,function(match,escape,interpolate,evaluate,offset){












return source+=text.slice(index,offset).replace(escapeRegExp,escapeChar),index=offset+match.length,escape?source+="'+\n((__t=("+escape+"))==null?'':_.escape(__t))+\n'":interpolate?source+="'+\n((__t=("+interpolate+"))==null?'':__t)+\n'":evaluate&&(source+="';\n"+evaluate+"\n__p+='"),match;
}),
source+="';\n",


settings.variable||(source="with(obj||{}){\n"+source+"}\n"),

source="var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+

source+"return __p;\n";

var render;
try{
render=new Function(settings.variable||"obj","_",source);
}catch(e){

throw e.source=source,e;
}var

template=function(data){
return render.call(this,data,_);
},


argument=settings.variable||"obj";


return template.source="function("+argument+"){\n"+source+"}",template;
},


_.chain=function(obj){
var instance=_(obj);

return instance._chain=!0,instance;
};








var chainResult=function(instance,obj){
return instance._chain?_(obj).chain():obj;
};


_.mixin=function(obj){








return _.each(_.functions(obj),function(name){var func=_[name]=obj[name];_.prototype[name]=function(){var args=[this._wrapped];return push.apply(args,arguments),chainResult(this,func.apply(_,args))}}),_;
},


_.mixin(_),


_.each(["pop","push","reverse","shift","sort","splice","unshift"],function(name){
var method=ArrayProto[name];
_.prototype[name]=function(){
var obj=this._wrapped;


return method.apply(obj,arguments),("shift"===name||"splice"===name)&&0===obj.length&&delete obj[0],chainResult(this,obj);
};
}),


_.each(["concat","join","slice"],function(name){
var method=ArrayProto[name];
_.prototype[name]=function(){
return chainResult(this,method.apply(this._wrapped,arguments));
};
}),


_.prototype.value=function(){
return this._wrapped;
},



_.prototype.valueOf=_.prototype.toJSON=_.prototype.value,

_.prototype.toString=function(){
return this._wrapped+"";
},








"function"==typeof define&&define.amd&&
define("underscore",[],function(){
return _;
});

})();
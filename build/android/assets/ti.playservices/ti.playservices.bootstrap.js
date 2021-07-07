




function showUI(finished){
try{
const PlayServices=require("ti.playservices");


let isUpdateNeeded=!1;
const resultCode=PlayServices.isGooglePlayServicesAvailable();
if(resultCode===PlayServices.RESULT_SUCCESS){

const versionString=PlayServices.GOOGLE_PLAY_SERVICES_VERSION_CODE;
Ti.API.info(`ti.playservices: Google Play Services is available. (version: ${versionString})`),
isUpdateNeeded=!1;
}else{


const errorString=PlayServices.getErrorString(resultCode);
Ti.API.info(`ti.playservices: Google Play Services is unavailable. (${errorString})`),
isUpdateNeeded=resultCode!==PlayServices.RESULT_SERVICE_INVALID;
}


if(!isUpdateNeeded)

return void finished();



PlayServices.makeGooglePlayServicesAvailable(e=>{
if(e.success)

finished();else
if(e.code===PlayServices.RESULT_SERVICE_INVALID)

finished();else
{

const activity=Ti.Android.currentActivity;
activity&&
activity.finish();

}
});
}catch(err){
Ti.API.error(err),
finished();
}
}






Ti.App.Properties.getBool("ti.playservices.validate.on.startup",!0)&&(
Ti.UI.hasSession===void 0?





exports.execute=showUI:exports.showUI=showUI);
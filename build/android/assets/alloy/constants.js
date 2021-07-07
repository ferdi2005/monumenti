var
_,generatePlatformArray,isTitanium="undefined"!=typeof Titanium;

if(isTitanium)
_=require("/alloy/underscore")._;else
{
var platforms=require("../../platforms/index");
_=require("../lib/alloy/underscore")._,


generatePlatformArray=function(key){
var ret=[];



return _.each(_.keys(platforms),function(p){ret.push(platforms[p][key])}),ret;
},


exports.PLATFORMS=generatePlatformArray("platform"),
exports.PLATFORM_FOLDERS_ALLOY=generatePlatformArray("alloyFolder"),
exports.PLATFORM_FOLDERS=generatePlatformArray("titaniumFolder");
}


exports.ALLOY_DIR="app",
exports.ALLOY_RUNTIME_DIR="alloy",
exports.RESOURCES_DIR="Resources",
exports.NAME_DEFAULT="index",
exports.NAME_WIDGET_DEFAULT="widget",
exports.NPM_WIDGET_PREFIX="alloy-widget-",
exports.NPM_WIDGET_KEYWORDS=["appcelerator","titanium","alloy","widget"],
exports.GLOBAL_STYLE="app.tss",
exports.ROOT_NODE="Alloy",
exports.NAMESPACE_DEFAULT="Ti.UI",
exports.REQUIRE_TYPE_DEFAULT="view",
exports.PLUGIN_NAME="ti.alloy",
exports.EXPR_PREFIX="#",
exports.PLUGIN_FILE="plugin.py",
exports.HOOK_FILE="alloy.js",
exports.HOOK_FILE_CLEAN="deepclean.js",
exports.MINIMUM_TI_SDK="3.0.0",
exports.ITEM_TEMPLATE_VAR="__itemTemplate",
exports.PARENT_SYMBOL_VAR="__parentSymbol",
exports.WIDGET_OBJECT="Widget",
exports.SKIP_EVENT_HANDLING=["Ti.UI.ListItem","Alloy.Abstract.ItemTemplate"],
exports.ADAPTERS=["localStorage","properties","sql"],
exports.CONTROLLER_NODES=["Alloy.Require","Alloy.Widget"],
exports.DEFAULT_BACKBONE_VERSION="0.9.2",
exports.SUPPORTED_BACKBONE_VERSIONS=["0.9.2","1.1.2","1.3.3","1.4.0"],


exports.CLASS_PROPERTY="classes",
exports.APINAME_PROPERTY="apiName",
exports.AUTOSTYLE_PROPERTY="autoStyle",
exports.DOCROOT_MODULE_PROPERTY="module",
exports.DOCROOT_BASECONTROLLER_PROPERTY="baseController",


exports.BIND_PROPERTIES=["dataCollection","dataFilter","dataTransform","dataFunction"],
exports.BIND_COLLECTION="dataCollection",
exports.BIND_WHERE="dataFilter",
exports.BIND_TRANSFORM="dataTransform",
exports.BIND_FUNCTION="dataFunction",
exports.BIND_TRANSFORM_VAR="__transform",
exports.BIND_MODEL_VAR="$model",
exports.MODEL_ELEMENTS=["Alloy.Collection","Alloy.Model"],
exports.MODEL_BINDING_EVENTS="fetch change destroy",
exports.COLLECTION_BINDING_EVENTS="fetch destroy change add remove reset sort",
exports.COLLECTION_BINDING_EVENTS_092="fetch destroy change add remove reset",


exports.BACKGROUND_IMAGE="backgroundImage",
exports.DISPLAY_HOME_AS_UP="displayHomeAsUp",
exports.HOME_BUTTON_ENABLED="homeButtonEnabled",
exports.NAVIGATION_MODE="navigationMode",
exports.ON_HOME_ICON_ITEM_SELECTED="onHomeIconItemSelected",


exports.INSTALL_TYPES=["plugin"],
exports.GENERATE_TARGETS=["controller","jmk","model","migration","view","widget","style"],
exports.DEPLOY_TYPES=[
{key:"ENV_DEV",value:"development"},
{key:"ENV_DEVELOPMENT",value:"development"},
{key:"ENV_TEST",value:"test"},
{key:"ENV_PROD",value:"production"},
{key:"ENV_PRODUCTION",value:"production"}],

exports.DIST_TYPES=[
{key:"DIST_ADHOC",value:["dist-adhoc"]},
{key:"DIST_STORE",value:["dist-appstore","dist-playstore"]}],



exports.FILE_EXT={
VIEW:"xml",
STYLE:"tss",
MODEL:"js",
MODELCODE:"js",
MIGRATION:"js",
CONTROLLER:"js",
COMPONENT:"js",
CONFIG:"json",
JMK:"jmk",
MAP:"map"},

exports.DIR={
VIEW:"views",
STYLE:"styles",
RUNTIME_STYLE:"styles",
CONTROLLER:"controllers",
MODEL:"models",
MODELCODE:"models",
MIGRATION:"migrations",
CONFIG:"config",
ASSETS:"assets",
WIDGET:"widgets",
LIB:"lib",
COMPONENT:"controllers",
MAP:"build/map",
VENDOR:"vendor",
THEME:"themes",
BUILD:"build/alloy",
I18N:"i18n",
PLATFORM:"platform"},



exports.EXCLUDED_FILES=[
"\\.svn","\\.git"],



exports.JS_RESERVED=[
"break","case","catch","continue","debugger","default","delete",
"do","else","finally","for","function","if","in","instanceof",
"new","return","switch","this","throw","try","typeof","var",
"void","while","with"],

exports.JS_RESERVED_FUTURE=[
"class","enum","export","extends","import","super","implements",
"interface","let","package","private","protected","public",
"static","yield"],

exports.JS_RESERVED_ALL=_.union(exports.JS_RESERVED,exports.JS_RESERVED_FUTURE);


var NS_ALLOY="Alloy",
NS_ALLOY_ABSTRACT="Alloy.Abstract",
NS_TI_ANDROID="Ti.Android",
NS_TI_MAP="Ti.Map",
NS_TI_MEDIA="Ti.Media",
NS_TI_UI_IOS="Ti.UI.iOS",
NS_TI_UI_IPAD="Ti.UI.iPad",
NS_TI_UI_IPHONE="Ti.UI.iPhone",
NS_TI_UI_MOBILEWEB="Ti.UI.MobileWeb",
NS_TI_UI_WINDOWS="Ti.UI.Windows";

exports.IMPLICIT_NAMESPACES={

Collection:"Alloy",
Model:"Alloy",
Module:"Alloy",
Require:"Alloy",
Widget:"Alloy",


ButtonNames:"Alloy.Abstract",
ButtonName:"Alloy.Abstract",
BarItemTypes:"Alloy.Abstract",
BarItemType:"Alloy.Abstract",
CoverFlowImageTypes:"Alloy.Abstract",
CoverFlowImageType:"Alloy.Abstract",
FlexSpace:"Alloy.Abstract",
FixedSpace:"Alloy.Abstract",
Images:"Alloy.Abstract",
Item:"Alloy.Abstract",
Items:"Alloy.Abstract",
ItemTemplate:"Alloy.Abstract",
Labels:"Alloy.Abstract",
Option:"Alloy.Abstract",
Options:"Alloy.Abstract",
Templates:"Alloy.Abstract",
Preview:"Alloy.Abstract",
Actions:"Alloy.Abstract",


Menu:"Ti.Android",
MenuItem:"Ti.Android",
ActionBar:"Ti.Android",


CardView:"Ti.UI.Android",


Annotation:"Ti.Map",


VideoPlayer:"Ti.Media",
MusicPlayer:"Ti.Media",
AudioPlayer:"Ti.Media",


AdView:"Ti.UI.iOS",
BlurView:"Ti.UI.iOS",
CoverFlowView:"Ti.UI.iOS",
DocumentViewer:"Ti.UI.iOS",
LivePhotoView:"Ti.UI.iOS",
SplitWindow:"Ti.UI.iOS",
PreviewContext:"Ti.UI.iOS",
PreviewAction:"Ti.UI.iOS",
PreviewActionGroup:"Ti.UI.iOS",
MenuPopup:"Ti.UI.iOS",
Stepper:"Ti.UI.iOS",


Popover:"Ti.UI.iPad",


NavigationGroup:isTitanium&&!1?"Ti.UI.MobileWeb":"Ti.UI.iPhone",

StatusBar:"Ti.UI.iPhone",


CommandBar:"Ti.UI.Windows",
AppBarButton:"Ti.UI.Windows",
AppBarToggleButton:"Ti.UI.Windows",
AppBarSeparator:"Ti.UI.Windows",


LeftNavButton:"Ti.UI.Window",
RightNavButton:"Ti.UI.Window",
LeftNavButtons:"Ti.UI.Window",
RightNavButtons:"Ti.UI.Window",
TitleControl:"Ti.UI.Window",
WindowToolbar:"Ti.UI.Window",


ContentView:"Ti.UI.iPad.Popover",

DrawerLayout:"Ti.UI.Android",
LeftView:"Ti.UI.Android.DrawerLayout",
CenterView:"Ti.UI.Android.DrawerLayout",
RightView:"Ti.UI.Android.DrawerLayout",


FooterView:"_ProxyProperty._Lists",
HeaderView:"_ProxyProperty._Lists",
HeaderPullView:"_ProxyProperty._Lists",
PullView:"_ProxyProperty._Lists",
Search:"_ProxyProperty._Lists",
SearchView:"_ProxyProperty._Lists",


RightButton:"_ProxyProperty",
LeftButton:"_ProxyProperty",
KeyboardToolbar:"_ProxyProperty",
ActionView:"_ProxyProperty"},




exports.SPECIAL_PROPERTY_NAMES=[
"onHomeIconItemSelected",
"onTintColor",
"onCreateOptionsMenu",
"onPrepareOptionsMenu"],


exports.COMMANDS={
GENERATE:"generate"};
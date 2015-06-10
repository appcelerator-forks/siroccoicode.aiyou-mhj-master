// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};



Alloy.Globals.Device = {
  version: Ti.Platform.version,
  versionMajor: parseInt(Ti.Platform.version.split(".")[0], 10),
  versionMinor: parseInt(Ti.Platform.version.split(".")[1], 10),
  width: (Ti.Platform.displayCaps.platformWidth > Ti.Platform.displayCaps.platformHeight) ? Ti.Platform.displayCaps.platformHeight : Ti.Platform.displayCaps.platformWidth,
  height: (Ti.Platform.displayCaps.platformWidth > Ti.Platform.displayCaps.platformHeight) ? Ti.Platform.displayCaps.platformWidth : Ti.Platform.displayCaps.platformHeight,
  dpi: Ti.Platform.displayCaps.dpi,
  orientation: Ti.Gesture.orientation == Ti.UI.LANDSCAPE_LEFT || Ti.Gesture.orientation == Ti.UI.LANDSCAPE_RIGHT ? "landscape" : "portrait"
};

if(OS_ANDROID) {
  Alloy.Globals.Device.width = (Alloy.Globals.Device.width / (Alloy.Globals.Device.dpi / 160));
  Alloy.Globals.Device.height = (Alloy.Globals.Device.height / (Alloy.Globals.Device.dpi / 160));
}

Alloy.Globals.dpToPx = function(dp) {
  Ti.API.info("px is",dp * (Ti.Platform.displayCaps.platformHeight / Alloy.Globals.Device.height));
  return dp * (Ti.Platform.displayCaps.platformHeight / Alloy.Globals.Device.height);
};

Alloy.Globals.pxToDp = function(px) {
  return px * (Alloy.Globals.Device.height / Ti.Platform.displayCaps.platformHeight);
};


Alloy.Globals.isLogin=function(){
    if(Ti.App.Properties.getString(Alloy.CFG.kUSERID,'0') != '0'){
        return true;
    }
    else{
        return false;
    }
};

Alloy.Globals.translateForGET=function(params){
      if(typeof params != 'object'){
          return;
      }
      else{
          var string='';
          _.each(params,function(value,key,list){
              string = string+key+"="+value+"&";
          });
          Ti.API.info("拼接字符串",string);
          return string;
      }
      
};
//全App页面栈
Alloy.Globals.Navigator = {};
Alloy.Globals.LoginNavi={};
Alloy.Globals.initNavigation = function() {   
  // Require in the navigation module
    Alloy.Globals.Navigator = require("navigation")({
        parent: Alloy.Globals.navigationWindow || null
    });
};

Alloy.Globals.checkURL=function(element){
    if(typeof element.author_pic != 'undefined')
    {
        
    }  
};
//XX年XX月XX日
Alloy.Globals.stamptotime=function(timestamp,type){
  if (type =='/') {
    var date=new Date(parseInt(timestamp) * 1000);
    return date.getFullYear()+"/"+date.getMonth()+"/"+date.getDay();
  };
    var date=new Date(parseInt(timestamp) * 1000);
    return date.getFullYear()+"年"+date.getMonth()+"月"+date.getDay()+"日"+date.getHours()+":"+date.getMinutes();
};
Alloy.Globals.encodeContentWithURL=function(){

};
Alloy.Globals.blobToByte=function(blob){
  var blobStream = Ti.Stream.createStream({
    source:blob,
    mode:Ti.Stream.MODE_READ
  });
  var newBuffer = Ti.createBuffer({ length: blob.length });
  blobStream.read(newBuffer);
  newBuffer.setType(Ti.Codec.CHARSET_UTF8);
  Ti.API.info("newbuffer",blob.data);
};
Alloy.Globals.arrayToDict=function(array,key){
  var dict={};
  _.each(array,function(element,index,list){
    dict[key+"["+index+"]"] = element;
  });
  return dict;
}
Alloy.Globals.genBoundary=function(){
  return Math.random().toString(36).substring(2);
};
Alloy.Globals.translateContentHtml=function(contentdict){
  var htmlContent="";
  var htmlString={
    start:"<Html><head><meta name='viewport' content='width=device-width,initial-scale=1, maximum-scale=1,user-scalable=no;'/><style type='text/css'> body {background-color:#312f2f;font-size:13px;}</style></head><Body>",
    end:"</Body></Html>"
  };
  var wordsProperties={
    start:"<p style='margin:10px'><font color='#aea399'>",
    end:"</font></p>"
  };
  var picProperties={
    start:"<p style='text-align:center;' ><img style='display:block;width:100%;'src='",
    end:"'></p>"
  };
  htmlContent =htmlContent+htmlString.start;
  _.each(contentdict,function(element,index,list){
      if (element.indexOf("http")==0||element.indexOf("HTTP")==0) {
        htmlContent = htmlContent + picProperties.start+element+picProperties.end;
      }else{
        htmlContent = htmlContent + wordsProperties.start+element+wordsProperties.end;
      }
  });
  htmlContent = htmlContent+htmlString.end;
  Ti.API.info("htmlContent",htmlContent);
  return htmlContent;

};

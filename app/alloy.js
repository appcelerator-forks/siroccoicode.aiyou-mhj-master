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

Alloy.Globals.checkURL=function(element){
    if(typeof element.author_pic != 'undefined')
    {
        
    }  
};

Alloy.Globals.stamptotime=function(timestamp){
    var date=new Date(parseInt(timestamp) * 1000);
    return date.getFullYear()+"年"+date.getMonth()+"月"+date.getDay()+"日"+date.getHours()+":"+date.getMinutes();
};

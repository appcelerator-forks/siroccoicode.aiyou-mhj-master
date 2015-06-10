var args = arguments[0] || {};
var that =this;
var HTTP = require("mhjHttpMethod");
var navwindow=null;
$.warn.hideWarnText();

function login(){
	HTTP.HttpPOST('login',{pwd:$.password.getValue(),flag:$.username.getValue()},success,error,false);
}
function success(e){
	var result =JSON.parse(e);
	if(result.status==200){
		Ti.App.Properties.setObject(Alloy.CFG.PLKEYS.USERINFO,result.data);
		Ti.App.fireEvent('logined');
	}
}

function error(e){
	$.warn.showWarnText("请检查网络连接后重试");
}

function closemodal(){
	Alloy.Globals.Navigator.closeModal(that);
}

function register(){
	var reg=Alloy.createController("regstepzero");
	if (OS_IOS) {
    var navWindow = Ti.UI.iOS.createNavigationWindow({
      window: reg.window
    });
      navwindow = navWindow;
      Alloy.Globals.LoginNavi=require("navigation")({
        parent: navwindow || null
    });
      navwindow.open();
  } else {
	Alloy.Globals.LoginNavi=require("navigation")({
        parent: null
    });    
    Alloy.Globals.LoginNavi.push(reg);
  }
}
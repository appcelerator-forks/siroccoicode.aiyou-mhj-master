//取得APP信息
// var HTTP =require("nhjHttpMethod");
// HTTP.HttpGET("appInfo");

Ti.App.Properties.setString(Alloy.CFG.kAPIHOST,"http://openapi.aiyou.com");
Ti.App.Properties.setString(Alloy.CFG.kAPIVERSION,"v1");





















//页面初始化
var firstpage=Alloy.createController("firstpage");
if (OS_IOS) {
    var navWindow = Ti.UI.iOS.createNavigationWindow({
      window: firstpage.window
    });
      Alloy.Globals.navigationWindow = navWindow;
      Alloy.Globals.initNavigation();
      Alloy.Globals.navigationWindow.open();
  } else {
    Alloy.Globals.initNavigation();
    Alloy.Globals.Navigator.push(firstpage);
  }

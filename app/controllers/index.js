var firstpage=Alloy.createController("firstpage");
if (OS_IOS) {
    var navWindow = Ti.UI.iOS.createNavigationWindow({
      window: firstpage.window
    });
    Ti.API.info("导航栏",navWindow);
      Alloy.Globals.navigationWindow = navWindow;
      Alloy.Globals.initNavigation();
      Alloy.Globals.navigationWindow.open();
  } else {
    Alloy.Globals.initNavigation();
    Alloy.Globals.Navigator.push(firstpage);
  }

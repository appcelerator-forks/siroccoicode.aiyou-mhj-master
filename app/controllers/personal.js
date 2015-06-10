var args = arguments[0] || {};
var HTTP = require('mhjHttpMethod');
var lib = require("mhjLib");

$.navbar.getView('titlelabel').text="个人中心";
$.navbar.getView('backimage').hide();
if(lib.isLogin()){
		var userinfo=lib.getUserInfo();
		var list=Alloy.CFG.AIYOUAUTH;
		var item={
			template:"usertemplate",
			usericon:{image:userinfo.pic},
			username:{text:userinfo.nickname},
			rank:{text:list[parseInt(userinfo.aiyou_auth)]},
			aiyou:{text:" "+userinfo.points},
			isLogin:true
		};
		$.usersection.updateItemAt(0,item);
}else{
	var item={
		template:"usertemplate",
		username:{text:"点击登录"},
		aiyou:{text:" 0"},
		isLogin:false
	};
	$.usersection.updateItemAt(0,item);
}
$.settinglist.addEventListener('itemclick',function(e){

	 var item = e.section.getItemAt(e.itemIndex);
	 if(e.sectionIndex !=0){
	 switch (item.properties.eventKey){
	 	case Alloy.CFG.EVENTKEYS.COLLECTKEY:
	 		var articleinfo=Alloy.createController("articleinfo");
			Alloy.Globals.Navigator.push(articleinfo);
	 		break;
	 	case Alloy.CFG.EVENTKEYS.PACKKEY:
	 		var login=Alloy.createController("login");
	 		Alloy.Globals.Navigator.push(login);
	 	
	 	break;
	 	case Alloy.CFG.EVENTKEYS.SETTINGKEY:
	 		var setting=Alloy.createController("settinglist");
	 		Alloy.Globals.Navigator.push(setting);
	 	
	 	break;
	 	default:
	 	return;
	 }}
	 else{
	 	if(!item.isLogin){
	 		lib.displayLogin();
	 	}
	 }
});

Ti.App.addEventListener("logined",function(e){
	if(lib.isLogin()){
		var userinfo=lib.getUserInfo();
		var list=Alloy.CFG.AIYOUAUTH;
		var item={
			template:"usertemplate",
			usericon:{image:userinfo.pic},
			username:{text:userinfo.nickname},
			rank:{text:list[parseInt(userinfo.aiyou_auth)]},
			aiyou:{text:" "+userinfo.points},
			isLogin:true
		};
		$.usersection.updateItemAt(0,item);
}
});
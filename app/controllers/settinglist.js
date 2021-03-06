var args = arguments[0] || {};
var toast=Alloy.createWidget("net.beyondlink.toast");
var HTTP= require("mhjHttpMethod");
$.navbar.getView('titlelabel').text="设置";
$.navbar.getView('backimage').addEventListener('click',function(e){
	Alloy.Globals.Navigator.pop();
});
$.window.add(toast.getView());
var versionitem=$.settingList.sections[2].getItemAt(1);
versionitem.settingtitle.text=versionitem.settingtitle.text+" "+Ti.App.version;
$.settingList.sections[2].updateItemAt(1,versionitem);



function isLoadPic(e){
	var value=e.source.value;
	if (value) {
		Ti.App.Properties.setBool(Alloy.CFG.PLKEYS.LOADPIC,true);
	}else{
		Ti.App.Properties.setBool(Alloy.CFG.PLKEYS.LOADPIC,false);
	}
}

$.settingList.addEventListener('itemclick',function(e){
	 var item = e.section.getItemAt(e.itemIndex);
	 switch(item.properties.eventKey){
	 	// case Alloy.CFG.EVENTKEYS.BINDPHONE:
	 	// 	var bindphone=Alloy.createController('bindphone');
	 	// 	Alloy.Globals.Navigator.push(bindphone);
	 	// break;
	 	case Alloy.CFG.EVENTKEYS.CHANGEPASSWORD:
	 	 	var changepwd=Alloy.createController('changepwd');
	 	 	Alloy.Globals.Navigator.push(changepwd);
	 	break;
	 	case Alloy.CFG.EVENTKEYS.ABOUTAPP:
	 		var aboutapp=Alloy.createController('aboutapp');
	 		Alloy.Globals.Navigator.push(aboutapp);
	 	break;
	 	default:
	 	return;
	 }
});

function logout(){
	HTTP.HttpDEL("login",{},success,error,true);
}
function success(e){
	var result=JSON.parse(e);
	if(result.status==200){
		Ti.App.Properties.setObject(Alloy.CFG.PLKEYS.USERINFO,null);
		Ti.App.fireEvent("login");
		Alloy.Globals.Navigator.pop();
	}
	else{
		toast.info(result.msg);
	}
}
function error(e){
	toast.info("请检查网络连接后重试");
}
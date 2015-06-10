/**
 * @author dongjiawei
 */
exports.switchView=function(parent,views,index,preIndex){
	if(index>views.length) return;
	if(index !== preIndex)
	{
		_.each(views,function(element,listindex,list){
			if (listindex==index) {
				element.show();
			}else{
				element.hide();
			}
			
		});
		
	}
	
};

exports.isLoadPic=function(){
	var isLoadPic=Ti.App.Properties.getBool(Alloy.CFG.PLKEYS.LOADPIC,true);
	return isLoadPic;
}

exports.isLogin=function(){
	var userInfo= Ti.App.Properties.getObject(Alloy.CFG.PLKEYS.USERINFO,null);
	Ti.API.info("loginuserInfo",userInfo);
	if (userInfo != null) {
		return true;
	}else{
		return false;
	}
}

exports.isAppCheck=function(){
	return Ti.App.Properties.getBool(Alloy.CFG.PLKEYS.APPCHECKED,false);
}

exports.getUserInfo=function(key){
	var userInfo=Ti.App.Properties.getObject(Alloy.CFG.PLKEYS.USERINFO,null);
	Ti.API.info("userInfo",userInfo);
	if (userInfo != null) {
		return userInfo[key];
	};
}

exports.getExtUserInfo=function(key){
	var extUserInfo=Ti.App.Properties.getObject(Alloy.CFG.PLKEYS.EXTUSERINFO,null);
	Ti.API.info("userInfo",extUserInfo);
	if (extUserInfo != null) {
		return extUserInfo[key];
	};
}

exports.displayLogin=function(){
		var alertdialog=Ti.UI.createAlertDialog({
			cancel:0,
			buttonNames:["取消","登录"],
			message:"您还没有登录，现在登录么？",
			title:'登录'
		});
		alertdialog.addEventListener("click",function(e){
			if(e.index==1){
				Alloy.Globals.Navigator.openModal("login");
			}
		});
		alertdialog.show();
};



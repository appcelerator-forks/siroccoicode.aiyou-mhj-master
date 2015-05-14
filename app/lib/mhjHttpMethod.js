/**
 * @author dongjiawei
 */
var requestUrlList={
	articleList:"/article/list?",
	packList:"",
	packInfo:"",
	articleInfo:"",
	login:"/user/login",
	getPack:"",
	postArticle:"",
	topArticleList:"",
	register:"",
	appInfo:Alloy.CFG.APPINFO
};

exports.HttpPOST=function(request,data,params,success,error,isAsync){
	var client=Ti.Network.createHTTPClient({
	    onload:function(e){
	        success(this.responseText);
	    },
	    onerror:function(e){
            error(e);
        },
	    timeout:5000
	});
	if(params.hasOwnProperty("ContentType")){
	    client.setRequestHeader("Content-Type",params.ContentType);
	}else{
	    client.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	}
	client.open("POST",Ti.App.Properties.getString(Alloy.CFG.kAPIHOST)+"/"+Ti.App.Properties.getString(Alloy.CFG.kAPIVERSION)+requestUrlList[request]);
    client.setRequestHeader("AY-APPID",Alloy.CFG.APP_KEY);
    if(Alloy.Globals.isLogin()){
        client.setRequestHeader("AY-UserToken",Ti.App.Properties.getString(Alloy.CFG.kUSERTOKEN));
    }
    client.send(data,isAsync);
};

exports.HttpGET=function(request,params,success,error,isAsync){
	var client=Ti.Network.createHTTPClient({
        onload:function(e){
            success(this.responseText);
        },
        onerror:function(e){
            error(e);
        },
        timeout:5000
    });
    var url=Ti.App.Properties.getString(Alloy.CFG.kAPIHOST)+"/"+Ti.App.Properties.getString(Alloy.CFG.kAPIVERSION)+requestUrlList[request]+Alloy.Globals.translateForGET(params);
    //Ti.API.info("url "+url);
    client.open("GET",url);
   // Ti.API.info(Alloy.CFG.APP_KEY);
    client.setRequestHeader("AY-APPID",Alloy.CFG.APP_KEY);
    if(Alloy.Globals.isLogin()){
        client.setRequestHeader("AY-UserToken",Ti.App.Properties.getString(Alloy.CFG.kUSERTOKEN));
    }
    client.send('',isAsync);
};

exports.HttpDEL=function(request,params,success,error,isAsync){
	var client=Ti.Network.createHTTPClient({
        onload:function(e){
            success(e);
        },
        onerror:function(e){
            error(e);
        },
        timeout:5000
    });
    client.open("DELETE",Ti.App.Properties.getString(Alloy.CFG.kAPIHOST)+"/"+Ti.App.Properties.getString(Alloy.CFG.kAPIVERSION)+requestUrlList[request]);
    client.setRequestHeader("AY-APPID",Alloy.CFG.APP_KEY);
    if(Alloy.Globals.isLogin()){
        client.setRequestHeader("AY-UserToken",Ti.App.Properties.getString(Alloy.CFG.kUSERTOKEN));
    }
    client.send(params,isAsync);
};
exports.HttpError=function(e,toast){
    toast.info("请检查您的网络连接");
};

/**
 * @author dongjiawei
 */
var requestUrlList={
	articleList:"/article/list?",
	packList:"/gift/list?",
	packInfo:"/gift/entity?",
	articleInfo:"/article/entity?",
	login:"/user/login",
    comment:"/comment/list?",
	postArticle:"/article/entity",
	topArticleList:"",
	register:"",
	appInfo:Alloy.CFG.APPINFO
};
var lib=require("mhjLib");
exports.HttpPOST=function(request,data,success,error,isAsync){
	var client=Ti.Network.createHTTPClient({
	    onload:function(e){
	        success(this.responseText);
	    },
	    onerror:function(e){
            error(e);
        },
	    timeout:5000
	});
	// if(params.hasOwnProperty("ContentType")){
	//     //client.setRequestHeader("Content-Type",params.ContentType);
	// }else{
	//     client.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	// }
	client.open("POST",Ti.App.Properties.getString(Alloy.CFG.kAPIHOST)+"/"+Ti.App.Properties.getString(Alloy.CFG.kAPIVERSION)+requestUrlList[request]);
    client.setRequestHeader("AY-APPID",Alloy.CFG.APP_KEY);
    if(lib.isLogin()){
        client.setRequestHeader("AY-User-Token",lib.getUserInfo("token"));
    }
    client.send(data,isAsync);
};

exports.HttpGET=function(request,params,success,error,isAsync,type){
	var client=Ti.Network.createHTTPClient({
        onload:function(e){
            success(this.responseText,type);
        },
        onerror:function(e){
            error(e,type);
        },
        timeout:5000
    });
    var url=Ti.App.Properties.getString(Alloy.CFG.kAPIHOST)+"/"+Ti.App.Properties.getString(Alloy.CFG.kAPIVERSION)+requestUrlList[request]+Alloy.Globals.translateForGET(params);
    Ti.API.info("url "+url);
    client.open("GET",url);
   // Ti.API.info(Alloy.CFG.APP_KEY);
    client.setRequestHeader("AY-APPID",Alloy.CFG.APP_KEY);
    if(lib.isLogin()){
        client.setRequestHeader("AY-User-Token",lib.getUserInfo("token"));
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
        client.setRequestHeader("AY-User-Token",Ti.App.Properties.getString(Alloy.CFG.kUSERTOKEN));
    }
    client.send(params,isAsync);
};
exports.HttpError=function(e,toast){
    toast.info("请检查您的网络连接");
};
/*
* 默认
* dataList中的元素结构形式如下{
*   type:"application/octet-stream"
*   name:"image1"
*   filename:""
*   data:"" （可能需要URL编码）
*                       
*/
exports.POSTMultiPartData=function(datalist,boundary){
    var content="";
    var CRLF="\r\n";
    content +="--"+boundary+CRLF; //header终止
    _.each(datalist,function(element,index,list){
        content +="Content-Disposition: form-data; name='"+element.name+"'";
        if (element.filename) {
            content +=" filename='"+element.filename+"'"+CRLF;
        }else{
            content +=CRLF;
        }
        if(element.type){
            content +="Content-Type: "+element.type+CRLF;
        }
        content +=CRLF; //空白行
        content +=element.data;
        content +=CRLF;
        content +="--"+boundary;
        if (index!=list.length-1) {
            content +=CRLF;
        }else{
            content +='--';
        }
    });
    Ti.API.info(content);
    return content;
}


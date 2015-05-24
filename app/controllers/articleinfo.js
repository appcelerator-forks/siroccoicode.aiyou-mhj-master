var args      = arguments[0] || {};
var articleid = '173323';
var HTTP      = require("mhjHttpMethod");


HTTP.HttpGET(
	"articleInfo",
	{
		nid:articleid
	},
	success,
	error,
	true
	);

//HTTP.HttpGET("",);
function success(e,type){
	var result=JSON.parse(e);
	if (result.status==200) {
		bindViewForArticleHeader(result.data);
	};
}


function error(){

}
$.articlecontent.addEventListener("load",function(){
	var height=$.articlecontent.evalJS("document.documentElement.scrollHeight");
	//var height=$.articlecontent.evalJS("document.height");
	Ti.API.info("Height",Alloy.Globals.pxToDp(height));
	$.articlecontent.setHeight(height+"dp");
	//$.articlecontent.setHeight("100dp");
	if(OS_IOS){
	// $.articlecontent.removeEventListener('load');
	// $.article.setHeaderView($.articlecontent);
	
	var headerHeight=Alloy.Globals.pxToDp(height)+95;
	$.headerBack.setHeight("2000dp");
}
	//$.headerBack.setHeight(Alloy.Globals.pxToDp(height)+95);
	//$.article.setHeaderView($.articlecontent);
});

$.headerBack.addEventListener('postlayout',function(){
	var height=$.headerBack.size.height;
	Ti.API.info("headerView Height",height);
});



function bindViewForArticleHeader(dict){
	$.articletitle.text=dict.title;
	//TODO:没有该参数$.articletype.text=Alloy.CFG.COLORS[dict]
	$.author.text=dict.nickname;
	$.posttime.text=Alloy.Globals.stamptotime(dict.created);
	$.articlecontent.setHtml(Alloy.Globals.translateContentHtml(dict.body));
}
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
function loadHtml(e){
	var height=e.source.evalJS("document.documentElement.scrollHeight");
	//var height=$.articlecontent.evalJS("document.height");
	Ti.API.info("Height",Alloy.Globals.pxToDp(height));
	e.source.setHeight(height+"dp");
	//$.articlecontent.setHeight("100dp");
	if(OS_IOS||OS_ANDROID){
	// $.articlecontent.removeEventListener('load');
	// $.article.setHeaderView($.articlecontent);
	
	var headerHeight=Alloy.Globals.pxToDp(height)+95;
	var item=$.article.sections[0].getItemAt(0);
   	Ti.API.info("更改前item",item);
	item.properties.height=height;
	Ti.API.info("更改后item",item);
	$.article.sections[0].updateItemAt(0,item);
}
	//$.headerBack.setHeight(Alloy.Globals.pxToDp(height)+95);
	//$.article.setHeaderView($.articlecontent);
}

// $.headerBack.addEventListener('postlayout',function(){
// 	var height=$.headerBack.size.height;
// 	Ti.API.info("headerView Height",height);
// });

function block(){
	return false;
}

function bindViewForArticleHeader(dict){
	var item={
		articletitle:{text:dict.title},
		posttime:{text:Alloy.Globals.stamptotime(dict.created)},
		articlecontent:{html:Alloy.Globals.translateContentHtml(dict.body)},
		template:"web",
		properties:{
			height:"50dp"
		}
	};
	$.article.sections[0].updateItemAt(0,item);
}
	//TODO:没有该参数$.articletype.text=Alloy.CFG.COLORS[dict]
var args      = arguments[0] || {};
var articleid = '178780';
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
	Ti.API.info("woshipingtai",height);
	var item=$.article.sections[0].getItemAt(0);

	if(OS_ANDROID){
		var headerHeight=Math.round(height)+95;
		// Ti.API.info("wochawew",headerHeight);
		e.source.removeEventListener('load',loadHtml);
		e.source.setHeight(Math.round(height));	
		item.properties.height=headerHeight; 
	}else{
		var headerHeight=Alloy.Globals.pxToDp(height)+95;
		Ti.API.info("wochawew",headerHeight);
		e.source.setHeight(Alloy.Globals.pxToDp(height)); 
		e.source.removeEventListener('load',loadHtml);
		item.properties.height=headerHeight+"dp";//ios default unit is dip
	}
	$.article.sections[0].updateItemAt(0,item);
	
}



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
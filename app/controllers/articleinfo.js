var args      = arguments[0] || {};
var articleid = '10855';
var HTTP      = require("mhjHttpMethod");
var lastflag ="";
//获取文章
HTTP.HttpGET(
	"articleInfo",
	{
		nid:articleid
	},
	success,
	error,
	true
	);
//获取文章评论
HTTP.HttpGET("comment",
	{
		nid:articleid,
		last_flag:lastflag,
		limit:Alloy.CFG.LIMITS
	},
	getCommentSuccess,
	error,
	true
);

function success(e,type){
	var result=JSON.parse(e);
	if (result.status==200) {
		bindViewForArticleHeader(result.data);
	};
}
function getCommentSuccess(e,type){
	var result=JSON.parse(e);
	if (result.status==200) {
		lastflag=result.data.last_flag;
		
		$.article.appendSection(bindViewForCommentList(result.data.comments));
	}
}

function error(){

}
function loadHtml(e){
	var height=e.source.evalJS("document.documentElement.scrollHeight");
	var item=$.article.sections[0].getItemAt(0);

	if(OS_ANDROID){
		var headerHeight=Math.round(height)+95;
		// Ti.API.info("wochawew",headerHeight);
		e.source.removeEventListener('load',loadHtml);
		e.source.setHeight(Math.round(height));	
		item.properties.height=headerHeight; 
	}else{
		var headerHeight=Alloy.Globals.pxToDp(height)+95;
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

function bindViewForCommentList(comments){
	var sections=[];
	
	_.each(comments,function(element,index,list){
		var list=[];
		var item={
			usericon:{image:element.user_pic},
			userName:{text:element.nickname},
			replytime:{text:Alloy.Globals.stamptotime(element.created,'/')},
			mcLabel:{text:element.content},
			template:"mastercomment",
			id:element.id
		};
		list.push(item);
		if (element.children.length>0) {

			var childitems =bindViewForDetailCommentList(element.children);
			Array.prototype.push.apply(list,childitems);
		}
		if(element.child_more==1){
			list.push(bindDetailDropdown(element));
		}
		
		var section=Ti.UI.createListSection({
			items:list
		});

		sections.push(section);
	});
	return sections;
}

function bindViewForDetailCommentList(comments){
	var listitems=[];
	_.each(comments,function(element,index,list){
		var item={
			template:"detailcomment",
			dcLabel:{attributedString:attributedStringForDetailComment(element)}
		};
		listitems.push(item);
	});
	return listitems;
}
function attributedStringForDetailComment(element){
	var text=element.nickname+" "+element.content;
	var attriString = Titanium.UI.createAttributedString({
		text:text,
		attributes:[ 
        {
            type: Titanium.UI.ATTRIBUTE_FOREGROUND_COLOR,
            value: Alloy.CFG.COLORS.LightBrown,
            range: [0, text.length]
        },
        {
            type: Titanium.UI.ATTRIBUTE_FOREGROUND_COLOR,
            value: Alloy.CFG.COLORS.DarkBlack,
            range: [0,  element.nickname.length]
        },
        {
        	type:Titanium.UI.ATTRIBUTE_FONT,
        	value:{
        		fontSize:"12sp"
        	},
        	range:[0,text.length]
        }]
	});

	return attriString;
}
function bindDetailDropdown(element){
	var item={
		template:"detailDropdown",
		last_flag:element.child_last_flag,
		id:element.id
	};
	return item;
}
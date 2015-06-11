var args      = arguments[0] || {};
var articleid = args.nid||'10855';
var HTTP      = require("mhjHttpMethod");
var lib  = require("mhjLib");
var lastflag ="";
var spid="";
var sending=false;
var toast  =Alloy.createWidget("net.beyondlink.toast");
var updating=false;

$.is.init($.article);
$.window.add(toast.getView());
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
$.article.addEventListener("itemclick",function(e){

	if(e.sectionIndex==0)return;
	var item=e.section.getItemAt(e.itemIndex);
	if(item.hasOwnProperty('nickname')){
	$.inputHint.setText("回复给@"+item.nickname);
	spid=item.id;
	}
});
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
		updating=false;
		if(result.data.more !=0){
			$.is.state(1);
		}else{
			$.is.state(-1);
		}
		$.article.appendSection(bindViewForCommentList(result.data.comments));
	}else{
		if(type=="loadMore")
    {
        updating=false;
        $.is.state(0);
    }
		toast.info(result.msg);
	}
}
$.comment.addEventListener("change",function(e){
	if(e.value.length !=0){
		$.inputHint.setText("");
	}
});
function error(e,type){
	if(type=="loadMore"){
		updating=false;
		$.is.state(0);
	}
	toast.info("请检查网络连接后重试");
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
		author:{text:dict.nickname},
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
			nickname:element.nickname,
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
			dcLabel:{attributedString:attributedStringForDetailComment(element)},
			id:element.id,
			nickname:element.nickname
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
            value: Alloy.CFG.COLORS.DarkBrown,
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
function postComment(){
	if(lib.isLogin()){
		if(!sending){
			sending=true;
			HTTP.HttpPOST("postcomment",{
				nid:articleid,
				uid:lib.getUserInfo("uid"),
				content:encodeURI($.comment.getValue()),
				pid:spid
			},commentsuccess,error,true);
		}
	}else{
		lib.displayLogin();
	}
}
function commentsuccess(e){
	Ti.API.info("commentsuccess",e);
	var result=JSON.parse(e);
	if(result.status==200){
		toast.info("回复成功");
		sending=false;
	}else{
		toast.info(result.msg);
	}
}
function loadmoredetail(e){
	var item=e.section.getItemAt(e.itemIndex);
	HTTP.HttpGET("comment",
	{
		pid:item.id,
		last_flag:item.last_flag,
		limit:Alloy.CFG.LIMITS
	},
	getDetailCommentSuccess,
	error,
	true,
	e
);
}
function getDetailCommentSuccess(e,source){
	var result=JSON.parse(e);
	if(result.status==200){
		var itemlist=bindViewForDetailCommentList(result.data.comments);
		if(result.data.more==0){
			source.section.replaceItemsAt(source.itemIndex,1,itemlist);
		}
		else{
			var sourceitem=source.section.getItemAt(source.itemIndex);
			var item={
				template:"detailDropdown",
				last_flag:result.data.last_flag,
				id:sourceitem.id
			};
			itemlist.push(item);
			source.section.replaceItemsAt(source.itemIndex,1,itemlist);
		}
	}else{
		toast.info(result.msg);
	}
}
function loadMore(e){
	if(updating){
		e.success();
		return;
	}
	updating=true;
	HTTP.HttpGET("comment",
	{
		nid:articleid,
		last_flag:lastflag,
		limit:Alloy.CFG.LIMITS
	},
	getCommentSuccess,
	error,
	true,
	"loadMore"
);
}
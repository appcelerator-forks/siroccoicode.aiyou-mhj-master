var args = arguments[0] || {};
var lastflag="";
var HTTP=require("mhjHttpMethod");
$.is.init($.packlist);

HTTP.HttpGET("packList",{
	limit:Alloy.CFG.LIMITS,
	gid:Alloy.CFG.GroupID,
	last_flag:lastflag,
	type:"user_got"
},myPackSuccess,myPackError,true,'refresh');

$.packlist.addEventListener("itemclick",function(e){
	// switch (e.bindId){
	// 	case "copytoclip":{

	// 	}
	// 	break;
	// 	case "masterindicator":{
	// 		alert("master有反应了");
	// 	}
	// 	break;
	// 	case "detailindicator":{
	// 		alert("detail有反应了");
	// 	}
	// 	break;
	// 	default:
	// 	break;
	// }
});

function myPackSuccess(e,type){
	var result= JSON.parse(e);
	if(result.status==200){
		lastflag=result.data.last_flag;
		var list=bindViewForMasterPack(result.data.gifts);

		if(type=="refresh"){
			$.packlistsection.setItems(list);
		}else if(type=="loadmore"){
			$.packlistsection.appendItems(list);
		}
	}else{

	}
}
function myPackError(e,type){

}
function bindViewForMasterPack(itemlists){
	
	var items=[];
	_.each(itemlists,function(element,index,list){
		Ti.API.info("mypack1",element);
		var item=bindViewForPackItem(element);
		Ti.API.info("mypack2",item);
		item=bindViewForMasterPackItem(item);
		items.push(item);
	});
	
	return items;
}
function bindViewForPackItem(element){
		var item={
			icon:{image:element.icon},
			title:{text:element.title},
			packcode:{text:element.sid},
			expiredate:{text:Alloy.Globals.stamptotime(element.expired,'/')},
			usemethods:{text:element.use_method},
			packgoods:{text:element.description},
			giftid:element.gift_id
		};
	return item;
}
function bindViewForMasterPackItem(item){
	item.template="packmaster";
	return item;
}
function bindViewForDetailPackItem(item){
	item.template="packdetail";
	return item;
}
function dropdown(e){
	switch (e.bindId){
		case "masterindicator":{
			var item = e.section.getItemAt(e.itemIndex);
			item = bindViewForDetailPackItem(item);
			Ti.API.info("master",item);
			$.packlistsection.updateItemAt(e.itemIndex,item);
		}
		break;
		case "detailindicator":{
			var item = e.section.getItemAt(e.itemIndex);
			item = bindViewForMasterPackItem(item);
			$.packlistsection.updateItemAt(e.itemIndex,item);
		}
		break;
	}
}

function loadMore(){

}
function myrefresh(){

}
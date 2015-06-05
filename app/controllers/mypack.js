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
	switch (e.bindId){
		case "copytoclip":{

		}
		break;
		case "masterindicator":{

		}
		break;
		case "detailindicator":{

		}
		break;
		default:
		break;
	}
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
function bindViewForMasterPack(datalist){
	Ti.API.info("maypcak",datalist);
	var items=[];
	_.each(datalist,function(element,index,list){
		var item=bindViewForPackItem(element);
		item=bindViewForMasterPackItem(item);
		items.push(item);
	});
	Ti.API.info("mypack",items);
	return items;
}
function bindViewForPackItem(element){
		var item={
			icon:{image:element.icon},
			title:{text:element.title},
			packcode:{text:element.sid},
			expiredate:{text:Alloy.GLobals.stamptotime(element.expired,'/')},
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
function dropdown(){

}

function loadMore(){

}
function myrefresh(){

}
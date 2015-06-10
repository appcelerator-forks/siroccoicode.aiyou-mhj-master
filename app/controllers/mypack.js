var args = arguments[0] || {};

var lastflag="";
var HTTP=require("mhjHttpMethod");
var toast=Alloy.createWidget("net.beyondlink.toast");
var updating=false;
$.packback.add(toast.getView());
$.ptr.refresh();
$.is.init($.packlist);


$.packlist.addEventListener("itemclick",function(e){

});

function myPackSuccess(e,type){
	var result= JSON.parse(e);
	if(result.status==200){
		lastflag=result.data.last_flag;
		var list=bindViewForMasterPack(result.data.gifts);

		if(type=="refresh"){
			$.packlistsection.setItems(list);
			$.ptr.hide();
		}else if(type=="loadMore"){
			updating=false;
			if(result.data.more != 0){
           $.is.state(1);
       }else{
        $.is.state(-1);
    }
			$.packlistsection.appendItems(list);
		}
	}else{
	if(type=="refresh"){
        $.ptr.hide();
    }
    if(type=="loadMore")
    {
        updating=false;
        $.is.state(0);
    }
    toast.info(result.msg);
	}
}
function myPackError(e,type){
	 if(type=="refresh"){
        $.ptr.hide();
    }
    if(type=="loadMore"){
        updating=false;
        $.is.state(0);
    }
    toast.info("请检查网络连接后重试");
}
function bindViewForMasterPack(itemlists){
	var items=[];
	_.each(itemlists,function(element,index,list){
		var item=bindViewForPackItem(element);
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
function copytoboard(e){
	var item =e.section.getItemAt(e.itemIndex);
	Ti.UI.Clipboard.setText(item.packcode.text);
	toast.info("激活码已复制到剪切板中");
}
function loadMore(e){
	if(updating){
		e.success();
		return;
	}
	updating=true;
	HTTP.HttpGET("packList",{
	limit:Alloy.CFG.LIMITS,
	gid:Alloy.CFG.GroupID,
	last_flag:lastflag,
	type:"user_got"
},myPackSuccess,myPackError,true,'loadMore');
}
function myrefresh(){
	HTTP.HttpGET("packList",{
	limit:Alloy.CFG.LIMITS,
	gid:Alloy.CFG.GroupID,
	last_flag:'',
	type:"user_got"
},myPackSuccess,myPackError,true,'refresh');
}
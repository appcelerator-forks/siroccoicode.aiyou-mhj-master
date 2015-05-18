var args = arguments[0] || {};
var HTTP=require("mhjHttpMethod");
Ti.App.Properties.setString(Alloy.CFG.kAPIHOST,"http://openapi.aiyou.com");
Ti.App.Properties.setString(Alloy.CFG.kAPIVERSION,"v1");
var last_flag='';
var updating=false;
$.is.init($.packlist);
$.packlist.addEventListener("itemclick",function(e){
	Ti.API.info("触发时间",e);
	var item = e.section.getItemAt(e.itemIndex);
	alert(
        "ItemId: " + e.itemId + "\n" +
        "BindId: " + e.bindId + "\n" +
        "Section Index: " + e.sectionIndex + ", Item Index: " + e.itemIndex
    );   

});
function myrefresh(){
    HTTP.HttpGET(
    'packList',{
    limit:Alloy.CFG.LIMITS,
    gid:Alloy.CFG.GroupID,
    last_flag:"",
    type:"new"
    },
    success,
    error,
    true,
    'refresh'
);
}

function success(e,type){
    var result=JSON.parse(e);
    if (result.status == 200) {
        last_flag=result.data.last_flag;
        if(type =="refresh"){
          $.packlistsection.setItems(bindView(result.data.gifts));
        }
        if(type == "loadMore"){
            updating=false;
            if(result.data.more != 0){
                 $.is.state(1);
            }else
            {
                $.is.state(-1);
            }
            $.packlistsection.appendItems(bindView(result.data.gifts));
        }   
       
    }else{
        
    }
}

function error(e,type){
    if(type=="refresh"){
        
    }
    if(type=="loadMore"){
        updating=false;
        $.is.state(0);
    }
}
function bindViewForDetailItem(){

}
function hahaha(e){
	alert(e);
}
function bindView(dataList){
    var itemList=[];
     _.each(dataList,function(element,index,list){
         var item={
                        template:"packmaster",
                    	surplus:{text:"剩余"+parseInt(element.surplus/element.total*100)+"%"},
                        giftid:element.gift_id,
                        icon:{image:element.icon},
                        title:{text:element.title},
                        aiyou:{text:element.price},
            			testButton:{onClick:hahaha}
                  };
                    itemList.push(item);
       });
    return itemList;
}

function loadMore(e){
    if (updating) {
        e.success();
        return;
    };
    updating=true;
    HTTP.HttpGET(
    'packList',{
    limit:Alloy.CFG.LIMITS,
    gid:Alloy.CFG.GroupID,
    last_flag:last_flag,
    type:"new"
    },
    success,
    error,
    true,
    "loadMore"
);
}


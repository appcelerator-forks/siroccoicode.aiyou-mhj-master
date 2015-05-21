var args = arguments[0] || {};
var HTTP=require("mhjHttpMethod");
Ti.App.Properties.setString(Alloy.CFG.kAPIHOST,"http://openapi.aiyou.com");
Ti.App.Properties.setString(Alloy.CFG.kAPIVERSION,"v1");
var last_flag='';
var updating=false;
$.is.init($.packlist);
$.packlist.addEventListener("itemclick",function(e){
	if (e.bindId=='masterindicator'||"detailindiactor") {
        return;
    };
    var item = e.section.getItemAt(e.itemIndex);
    alert(
        item
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
function dropdown(e){
    Ti.API.info("下拉时间",e);
    if (e.source.isExpand!=false) {
       HTTP.HttpGET(
        "packInfo",{
            id:e.source.giftid
        },
        packInfoSuccess,
        error,
        true,
        e
        );
       var item=$.packlistsection.getItemAt(e.itemIndex);
       item.masterindicator.isExpand=false;
       $.packlistsection.updateItemAt(e.itemIndex,item);
   }
}
function packInfoSuccess(e,source){
    var result=JSON.parse(e);
    if (result.status==200) {
        var item={
            template:"packdetail",
            goods:{text:result.data.description},
            methods:{text:result.data.use_method},
            saletime:{text:Alloy.Globals.stamptotime(result.data.sale_start,'/')+'-'+Alloy.Globals.stamptotime(result.data.sale_end,'/')},
            expiretime:{text:Alloy.Globals.stamptotime(result.data.valid,'/')},
            aiyoucoin:{text:"1382"}

        };
        var itemList=[];
        itemList.push(item);
        $.packlistsection.insertItemsAt(source.itemIndex+1,itemList);
    };

    //source.source.giftid +=1;
    

}
function closedetail(e){
	if(e.bindId!='detailindiactor'){
        return;
    }   
    var item=$.packlistsection.getItemAt(e.itemIndex-1);
    item.masterindicator.isExpand=true;
    $.packlistsection.updateItemAt(e.itemIndex-1,item);    
    $.packlistsection.deleteItemsAt(e.itemIndex,1);
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
        masterindicator:{giftid:element.gift_id,isExpand:true,}
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


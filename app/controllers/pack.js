var args = arguments[0] || {};
var HTTP=require("mhjHttpMethod");
var lib=require("mhjLib");
var toast=Alloy.createWidget("net.beyondlink.toast");
var last_flag='';
var updating=false;
var isMore=true;
$.packback.add(toast.getView());
$.is.init($.packlist);
$.ptr.refresh();
$.packlist.addEventListener("itemclick",function(e){


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
            isMore=true;
          $.packlistsection.setItems(bindView(result.data.gifts));
          $.ptr.hide();
      }
      if(type == "loadMore"){
        updating=false;
        if(result.data.more != 0){
           $.is.state(1);
       }else{
        $.is.state(-1);
        isMore=false;
    }
    $.packlistsection.appendItems(bindView(result.data.gifts));
}   

}else{
    if(type=="refresh"){
        isMore=true;
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

function error(e,type){
    if(type=="refresh"){
        $.ptr.hide();
    }
    if(type=="loadMore"){
        updating=false;
        $.is.state(0);
    }
    toast.info("请检查网络连接后重试");
}
function bindViewForDetailItem(){

}
function getpack(e){
    var item=e.section.getItemAt(e.itemIndex);
    HTTP.HttpPUT('getpack',
            {
                type:"lingqu",
                got_token:item.gottoken,
                gift_id:item.giftid
            },
            getPackSuccess,error,true,e
            );
}
function getPackSuccess(e,source){
    var result=JSON.parse(e);
    if (result.status==200) {
        Ti.API.info("sss");
        toast.info('领取成功');
        var item=source.secition.getItemAt(source.itemIndex);
        item.aiyoucoin={text:result.new_points};
        source.section.updateItemAt(source.itemIndex,item);
    }else{
        toast.info(result.msg);
    }
}
function dropdown(e){
    var item=$.packlistsection.getItemAt(e.itemIndex);
    if (item.masterindicator.isExpand!=false) {
       HTTP.HttpGET(
        "packInfo",{
            id:item.giftid
        },
        packInfoSuccess,
        error,
        true,
        e
        );
       
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
            aiyoucoin:{text:(lib.isLogin())?lib.getUserInfo('points'):0},
            gottoken:(typeof result.data.got_token=="undefined")?"":result.data.got_token,
            giftid:result.data.gift_id
        };
        var itemList=[];
        itemList.push(item);
        Ti.API.info("dianji");
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
        masterindicator:{giftid:element.gift_id,isExpand:true}
    };
    itemList.push(item);
});
    return itemList;
}

function loadMore(e){
    if(isMore){
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
}else{
    e.done();
    return;
}
}


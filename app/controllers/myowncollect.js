var args = arguments[0] || {};
var lib=require("mhjLib");
$.navbar.getView('titlelabel').text="我的收藏";
$.navbar.getView('backimage').addEventListener('click',function(e){
	Alloy.Globals.Navigator.pop();
});

var HTTP=require("mhjHttpMethod");
Ti.App.Properties.setString(Alloy.CFG.kAPIHOST,"http://openapi.aiyou.com");
Ti.App.Properties.setString(Alloy.CFG.kAPIVERSION,"v1");
var toast=Alloy.createWidget("net.beyondlink.toast");
$.mycollectback.add(toast.getView());
var lastflag='';
var updating=false;
$.is.init($.gongluelist);
$.ptr.refresh();
function myrefresh(){
    HTTP.HttpGET(
    'articleList',{
    limit:Alloy.CFG.LIMITS,
    uid:lib.getUserInfo('uid'),
    last_flag:"",
    type:"my_fav"
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
        
        if(type =="refresh"){
            lastflag=result.data.last_flag;
            updating=false;
          $.list.setItems(bindView(result.data.articles));
          $.ptr.hide();
        }
        if(type == "loadMore"){
            lastflag=result.data.last_flag;
            updating=false;
            if(result.data.more != 0){
                 $.is.state(1);
            }else
            {
                $.is.state(-1);
            }
            $.list.appendItems(bindView(result.data.articles));
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

function error(e,type){
    if(type=="refresh"){
        $.ptr.hide();
    }
    if(type=="loadMore"){
        updating=false;
        $.is.state(0);
    }
    toast.info("请检查网络连接并稍后重试");
}
function bindView(dataList,type){
    var itemList=[];
    Ti.API.info("mycollect");
     _.each(dataList,function(element,index,list){
          
                 var item={
                        template:"article",
                        nid:element.nid,
                        title:{text:element.title},
                        created:{text:Alloy.Globals.stamptotime(element.created)}
                    };
                     Ti.API.info("mycollect1");
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
    'articleList',{
    limit:Alloy.CFG.LIMITS,
    uid:lib.getUserInfo('uid'),
    last_flag:"",
    type:"my_fav"
    },
    success,
    error,
    true,
    "loadMore"
);
}

$.gongluelist.addEventListener("itemclick",function(e){
    var item=e.section.getItemAt(e.itemIndex);
  var articleinfo=Alloy.createController("articleinfo",{nid:item.nid});
  Alloy.Globals.Navigator.push(articleinfo);
});

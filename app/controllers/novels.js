var args = arguments[0] || {};

var HTTP=require("mhjHttpMethod");
Ti.App.Properties.setString(Alloy.CFG.kAPIHOST,"http://openapi.aiyou.com");
Ti.App.Properties.setString(Alloy.CFG.kAPIVERSION,"v1");
var toast=args.toast;
var last_flag='';
var searchlastflag="";
var updating=false;
var searching=false;
$.is.init($.novellist);
$.ptr.refresh();

function myrefresh(){
    HTTP.HttpGET(
    'articleList',{
    limit:Alloy.CFG.LIMITS,
    tid:Alloy.CFG.XSYD,
    gid:Alloy.CFG.GroupID,
    last_flag:"",
    type:"content_type"
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
        if(type == "search"){
            searching=false;
            searchlastflag=result.data.articles.last_flag;
            updating=true;
            $.list.setItems(bindView(result.data.articles.list,"search"));
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
    if(type=="search"){
           _.each(dataList,function(element,index,list){
                 var item={
                        template:"novel",
                        title:{text:element.title},
                        body:{text:element.body},
                        nid:element.nid
                    };
        itemList.push(item);
           
       });
    }else{
        _.each(dataList,function(element,index,list){
                 var item={
                        template:"novel",
                        title:{text:element.title},
                        body:{text:element.body},
                        nid:element.nid
                    };
        itemList.push(item);
           
       });
    }
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
    tid:Alloy.CFG.XSYD,
    gid:Alloy.CFG.GroupID,
    last_flag:lastflag,
    type:"content_type"
    },
    success,
    error,
    true,
    "loadMore"
);
}

$.searchbar.getView("searchIcon").addEventListener("click",function(e){
    if (!searching) {
        searching=true;
        var searchTF=$.searchbar.getView("search");
        var searchtext=searchTF.getValue();
        HTTP.HttpGET('searchlist',{
            limit:Alloy.CFG.LIMITS,
            tid:Alloy.CFG.XSYD,
            gid:Alloy.CFG.GroupID,
            last_flag:"",
            keyword:encodeURI(searchtext),
            type:"article"
        },
        success,error,true,"search"
        );
    }
});
$.novellist.addEventListener("itemclick",function(e){
    var item=e.section.getItemAt(e.itemIndex);
  var articleinfo=Alloy.createController("articleinfo",{nid:item.nid});
  Alloy.Globals.Navigator.push(articleinfo);
});

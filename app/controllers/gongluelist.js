var args = arguments[0] || {};
var HTTP=require("mhjHttpMethod");
Ti.App.Properties.setString(Alloy.CFG.kAPIHOST,"http://openapi.aiyou.com");
Ti.App.Properties.setString(Alloy.CFG.kAPIVERSION,"v1");
var last_flag='';
var updating=false;
$.is.init($.gongluelist);
if(args.pulltorefresh){
    args.pulltorefresh.setCallback(refresh);
}
function refresh(){
    HTTP.HttpGET(
    'articleList',{
    limit:Alloy.CFG.LIMITS,
    tid:Alloy.CFG.GLXD,
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
        last_flag=result.data.last_flag;
        if(type =="refresh"){
          $.list.setItems(bindView(result.data.articles));
          if(args.pulltorefresh){
                args.pulltorefresh.stop(20,20);
            }
        }
        if(type == "loadMore"){
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
function bindView(dataList){
    var itemList=[];
     _.each(dataList,function(element,index,list){
           if(element.pics.length != 0){
                var item={
                        template:"articlepic",
                        nickname:{text:element.nickname},
                        authorpic:{image:element.author_pic},
                        nid:element.nid,
                        title:{text:element.title},
                        body:{text:element.body},
                        articlepic:{image:element.pics[0]},
                        created:{text:Alloy.Globals.stamptotime(element.created)}
                        };
                    itemList.push(item);
           }
           else{
                 var item={
                        template:"article",
                        nickname:{text:element.nickname},
                        authorpic:{image:element.author_pic},
                        nid:element.nid,
                        title:{text:element.title},
                        body:{text:element.body},
                        created:{text:Alloy.Globals.stamptotime(element.created)}
                    };
                    itemList.push(item);
           }
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
    tid:Alloy.CFG.GLXD,
    gid:Alloy.CFG.GroupID,
    last_flag:last_flag,
    type:"content_type"
    },
    success,
    error,
    true,
    "loadMore"
);
}

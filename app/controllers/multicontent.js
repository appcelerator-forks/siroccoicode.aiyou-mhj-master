var args = arguments[0] || {};

var HTTP=require("mhjHttpMethod");
Ti.App.Properties.setString(Alloy.CFG.kAPIHOST,"http://openapi.aiyou.com");
Ti.App.Properties.setString(Alloy.CFG.kAPIVERSION,"v1");
var toast=args.toast;
var tab=args.tabgroup;
var last_flag='';
var last_flag_toparticle="";
var updating=false;
$.is.init($.multilist);
loadTopPack();
loadTopArticle();
$.ptr.refresh();


$.multilist.addEventListener("itemclick",function(e){
  if(e.sectionIndex==0) return;
  var item=e.section.getItemAt(e.itemIndex);
  var articleinfo=Alloy.createController("articleinfo",{nid:item.nid});
  Alloy.Globals.Navigator.push(articleinfo);
});
$.toppack.getView().addEventListener('click',function(e){
  alert("chufale");
 tab.setIndex(1);
});
function loadTopArticle(){
    HTTP.HttpGET(
    'articleList',{
    limit:3,
    tid:Alloy.CFG.ZHTL,
    gid:Alloy.CFG.GroupID,
    last_flag:last_flag_toparticle,
    type:"content"
    },
    topArticleSuccess,
    topError,
    true
  );
}
function topArticleSuccess(e){
   var result=JSON.parse(e);
    if(result.status==200){
       last_flag_toparticle=result.data.last_flag;
       toast.info("testtesttesttest");
       $.toparticle.appendItems(bindViewForTopArticle(result.data.articles));
    }
    else{
        toast.info(result.msg);
    }
}
function bindViewForTopArticle(dataList){
    var itemList=[];
     _.each(dataList,function(element,index,list){
         var item={
           template:"toparticle",
           title:{text:element.title},
           nid:element.nid  
         };
         itemList.push(item);
     });
     return itemList;
}
function loadTopPack(){
    HTTP.HttpGET(
      'packList',{
          limit:"2",
          gid:Alloy.CFG.GroupID,
          type:"top"
      } , 
      topPackSuccess,
      topError,
      true
    );
}
function topPackSuccess(e){
    var result=JSON.parse(e);
    if(result.status==200){
       bindViewForTopPack(result.data.gifts);
    }
    else{
        toast.info(result.msg);
    }
}
function bindViewForTopPack(dataList){
  $.toppack.getView('pack1').applyProperties({image:dataList[0].cover,giftid:dataList[0].gift_id});
  $.toppack.getView('pack2').applyProperties({image:dataList[1].cover,giftid:dataList[1].gift_id});
}

function topError(e){
    toast.info("请检查网络连接稍后重试");
}
function myrefresh(){
    HTTP.HttpGET(
    'articleList',{
    limit:Alloy.CFG.LIMITS,
    tid:Alloy.CFG.ZHTL,
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
            
          $.article.setItems(bindView(result.data.articles));
          $.ptr.hide();
        }
        if(type == "loadMore"){
            updating=false;
            if(result.data.more != 0){
                 $.is.state(1);
            }else
            {
                $.is.state(-1);
            }
            $.article.appendItems(bindView(result.data.articles));
        }   
       
    }else{
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
    toast.info("请检查网络连接稍后重试");
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
    tid:Alloy.CFG.ZHTL,
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

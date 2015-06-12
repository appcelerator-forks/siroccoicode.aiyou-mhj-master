var args = arguments[0] || {};
var ImageFactory = require('ti.imagefactory');
var toast=Alloy.createWidget("net.beyondlink.toast");
var imageList=[];
var HTTP=require("mhjHttpMethod");
var tidlist=[];
var namelist=[];
var oritid="269";
$.warn.hideWarnText();
$.window.add(toast.getView());
//初始化照片墙
var collectionView = require("de.marcelpociot.collectionview");

// Create a custom template that displays an image on the left, 
// then a title next to it with a subtitle below it.
var imageTemplate = {
    childTemplates: [
        {                            // Title 
            type: 'Ti.UI.ImageView',     // Use a label for the title 
            bindId: 'thumb',          // Maps to a custom info property of the item data
            properties: {            // Sets the label properties
                height:"60dp",
                width:"60dp"
            }
        }
    ]
};

var listView = require("CollectionView").createCollectionView({
    backgroundColor: "white",
    top: 0,
    left: 0,
    width: Ti.UI.FILL,
    height:Ti.UI.FILL,
    templates: { 'template': imageTemplate },
    defaultItemTemplate:"template",

    // ANDROID ONLY
    columnWidth: Alloy.Globals.dpToPx(60),
    verticalSpacing:Alloy.Globals.dpToPx(5),
    horizontalSpacing:Alloy.Globals.dpToPx(5)
});
var sections = [];
var imageSection = collectionView.createCollectionSection();
var addonItem = [
    { thumb:{image:"/imgres/defaultpack.png"},isAddon:true},
];
imageSection.setItems(addonItem);
sections.push(imageSection);
listView.setSections(sections);
$.imageWall.add(listView);

function increase(e){
    var data={
        gid:Alloy.CFG.GroupID,
        tid:oritid,
        title:$.articletitle.getValue(),
        body:$.articlecontent.getValue()
    };
    _.extend(data,Alloy.Globals.arrayToDict(imageList,'images'));
    HTTP.HttpPOST(
        "postArticle",data,
    postSuccess,httperror,true
    );
}
function postSuccess(e){
    var result=JSON.parse(e);
    if(result.status==200){
        toast.info("发表成功");
        Alloy.Globals.Navigator.pop();
    }else{
        toast.info(result.msg);
    }
}
function getImageSuccess(e){
    if(e.mediaType == Ti.Media.MEDIA_TYPE_PHOTO){

        var compressImage=ImageFactory.compress(e.media,0.35);
        var item=[{ thumb:{image:compressImage}}];

        listView.sections[0].insertItemsAt(imageList.length,item);
        //Ti.API.info("items",listView.sections[0].getItems());
         imageList.push(compressImage);
         Ti.API.info("imagelist",imageList);
         if (imageList.length>=10) {
            listView.sections[0].deleteItemsAt(imageList.length,1);
         }
    }
}

function diaglogclick(e){
    if (e.source.opttype=="chooseImage") {
         switch(e.index){
            case 0:
            Ti.Media.showCamera({
                success:getImageSuccess,
                cancel:function(){},
                error:function(){},
                saveToPhotoGalley:true,
                allowEditing:true,
                mediaTyeps:[Ti.Media.MEDIA_TYPE_PHOTO]
            });
            break;
            case 1:
            Ti.Media.openPhotoGallery({
                success:getImageSuccess,
                cancel:function(){},
                error:function(){},
                saveToPhotoGalley:true,
                allowEditing:true,
                mediaTyeps:[Ti.Media.MEDIA_TYPE_PHOTO]
            });         
            break;
        }
    }
    if(e.source.opttype=="chooseCategory"){
        oritid=tidlist[parseInt(e.index)];
        $.topic.setTitle(namelist[parseInt(e.index)]);
    }
}
listView.addEventListener("itemclick",function(e){
    var items=listView.sections[e.sectionIndex].getItems();
    var item=items[e.itemIndex];
    if (item.isAddon==true) {
        //todo弹框选择相册/相机
           var choosedialog=Ti.UI.createOptionDialog({
                cancel:2,
                options:["拍照","从相册选择","取消"],
                selectedIndex:2,
                title:"选取照片",
                opttype:"chooseImage"
           });
           choosedialog.addEventListener("click",diaglogclick);
           choosedialog.show();     
    }
});
function httperror(e){
    toast.info("请检查网络连接后稍后重试");
}
function showTextCategory(){
    HTTP.HttpGET("articleCategory",{gid:Alloy.CFG.GroupID},getCategorySuccess,httperror,true);
}
function getCategorySuccess(e){
    var result=JSON.parse(e);
    if (result.status==200) {
        var itemlist=[];
        _.each(result.data.types,function(element,index,list){
            itemlist.push(element.name);
            tidlist.push(element.tid);
        });
        namelist=itemlist;
        var choosedialog=Ti.UI.createOptionDialog({
                options:itemlist,
                selectedIndex:0,
                title:"选取文章分类",
                opttype:"chooseCategory"
           });
           choosedialog.addEventListener("click",diaglogclick);
           choosedialog.show();     
    }
}
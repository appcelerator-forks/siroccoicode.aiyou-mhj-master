var args = arguments[0] || {};
var ImageFactory = require('ti.imagefactory');
var imageList=[];
var HTTP=require("mhjHttpMethod");

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
    //其他字段
    var datalist=[];
    var boundary=Alloy.Globals.genBoundary();
    var gid = {
        name:"gid",
        data:Alloy.CFG.GroupID
    };
    var tid ={
        name:"tid",
        data:269
    };
    var title ={
        name:"title",
        data:"StandardsTreerequests"
    };
    var body={
        name:"body",
        data:"Standards Tree requests made through IETF
documents will be reviewed and approved by the IESG, while requests made by
other recognized standards organizations will be reviewed by the Designated
Expert in accordance"
    };
    datalist.push(gid,tid,title,body);
    _.each(imageList,function(element,index,list){
        var item={
            type:"application/octet-stream",
            name:"images["+index+"]",
            filename:"upload"+index+".jpg",
            data:Alloy.Globals.blobToByte(element)
        };
        datalist.push(item);
    });
    //var data =HTTP.POSTMultiPartData(datalist,boundary);
    var data={
        gid:Alloy.CFG.GroupID,
        tid:269,
        title:"StandardsTreerequests",
        body:"Standards Tree requests made through IETF
documents will be reviewed and approved by the IESG, while requests made by
other recognized standards organizations will be reviewed by the Designated
Expert in accordance"
    };
    _.extend(data,Alloy.Globals.arrayToDict(imageList,'images'));
    HTTP.HttpPOST(
        "postArticle",data,
    postSuccess,postSuccess,true
    );
}
function postSuccess(e){
    alert(e);
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

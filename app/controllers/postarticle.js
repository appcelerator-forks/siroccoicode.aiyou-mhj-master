var args = arguments[0] || {};
var imageList=[];


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
    $.imageWall.setHeight("100dp");
}
function getImageSuccess(e){
    if(e.mediaType == Ti.Media.MEDIA_TYPE_PHOTO){
        var item=[{ thumb:{image:e.media}}];

        listView.sections[0].insertItemsAt(imageList.length,item);
        //Ti.API.info("items",listView.sections[0].getItems());
         imageList.push(e.media);
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

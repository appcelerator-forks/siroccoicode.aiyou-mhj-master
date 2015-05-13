var arg = arguments[0] || {};

var rootWindow;
var animeOrientation;
var height,width;
var callback;
$.addEventListener('postlayout',function(e){
    if(e.source != rootWindow){
        Ti.API.info("postlayout来源"+e.source);
        return;
    }
    width=$.popBack.size.width;
    height=$.popBack.size.height;
});

if(args.children){
  _.each(args.children,function(child){
      if(!child){
          return ;
      }
      $.popBack.add(child);
  });  
};
$.initMenu=function(args){
    animeOrientation= args.orientation == 'left'?'left':'down';
    rootWindow=args.rootWindow || '';
    callback=args.callback;
    $.popBack.visible=true;
};

$.addEventListener('click',function(e){
    callback(e);   
});
$.animateIn=function(){
  if(animeOrientation == 'left'){
      var matrix =Ti.UI.create2DMatrix();
      matrix=matrix.scale(1,1);
      var animation=Ti.UI.createAnimation({duration:200,transform:matrix});
      $.popBack.animate(animation);
  }
  else{
       var matrix =Ti.UI.create2DMatrix();
      matrix=matrix.scale(1,1);
      var animation=Ti.UI.createAnimation({duration:200,transform:matrix});
      $.popBack.animate(animation);
  }
};
$.animateOut=function(){
    if(animeOrientation=='left'){
     var matrix =Ti.UI.create2DMatrix();
      matrix=matrix.scale(1,0);
      var animation=Ti.UI.createAnimation({duration:200,transform:matrix});
      $.popBack.animate(animation);
    }
    else{
      var matrix =Ti.UI.create2DMatrix();
      matrix=matrix.scale(0,1);
      var animation=Ti.UI.createAnimation({duration:200,transform:matrix});
      $.popBack.animate(animation);
    }
};

$.removeMenu=function(args){
    if(args.rootWindow){
        args.rootWindow.remove(this);
    }
    if(rootWindow){
        rootWindow.remove(this);
    }
    
};

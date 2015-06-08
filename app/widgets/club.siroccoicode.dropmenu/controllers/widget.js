var args = arguments[0]||{};

var items = null;
var callback=null;
var toppostion=args.top || '';
var rightpostion=args.right || '';
var isShown;

$.initDropList=function(dict){
	items=dict.items || [];
	callback=dict.callback || null;
	$.dropsection.setItems(items);
	$.dropmenuback.setTop(toppostion);
	$.dropmenuback.setRight(rightpostion);
	isShown=true;
};

$.droplist.addEventListener("itemclick",function(e){
	if(callback!= null){
		callback(e);
	}
});

$.animateIn=function(){
	$.dropmenuback.animate({opacity:0.9,duration:300},function(){
		isShown=true;
	});
};

$.animateOut=function(){
	$.dropmenuback.animate({opacity:0,duration:300},function(){
		isShown=false;
	})
};
$.checkShown=function(){
	return isShown;
}
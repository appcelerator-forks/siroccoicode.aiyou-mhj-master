var args=arguments[0] || {};
var callback=null;

$.setSeclectedIndex=function(index){
	Ti.API.info("pagesegement",index);
	switch (index) {
		case 0:
		$.floatindictor.setLeft("0dp");
		$.floatindictor.setRight("50%");
		break;
		case 1:
		$.floatindictor.setRight("0dp");
		$.floatindictor.setLeft("50%");
		break;
	}	
}

$.wrapper.addEventListener("click",function(e){
	if(typeof e.source.sectionIndex != 'undefined'){
		$.setSeclectedIndex(parseInt(e.source.sectionIndex));
		if(callback){
			callback(parseInt(e.source.sectionIndex));
		}
	}
});

$.registerCallback=function(func){
	callback=func;
};
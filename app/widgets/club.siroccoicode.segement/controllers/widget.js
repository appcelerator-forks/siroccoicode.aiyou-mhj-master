var args=arguments[0] ||{};


$.setSelectedIndex=function(index){
    var width=$.index0.size.width;
	var anime=Ti.UI.createAnimation();
	//anime.left=index*33+"%";
	anime.left=index*width+"dp";
	Ti.API.info(anime.left);
	anime.duration=200;
	$.float.animate(anime);
	
};
$.back.addEventListener('click',function(e){
	Ti.API.info('触发对象1'+e.source);
	if(typeof e.source.segpostionindex !== 'undefined'){
		$.setSelectedIndex(e.source.segpostionindex);
	}
});

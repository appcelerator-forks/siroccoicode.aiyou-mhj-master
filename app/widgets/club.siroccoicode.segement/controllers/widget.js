var args=arguments[0] ||{};
$.setSelectedIndex=function(index){
	var anime=Ti.UI.createAnimation();
	anime.left=index*33+"%";
	anime.duration=200;
	$.float.animate(anime);
};
$.back.addEventListener('click',function(e){
	Ti.API.info('触发对象'+e.source);
	if(e.source.segpostionindex != 'undefined'){
		Ti.API.info(e.source);
		Ti.API.info(e.source.segpostionindex);
		$.setSelectedIndex(e.source.segpostionindex);
		
	}
});

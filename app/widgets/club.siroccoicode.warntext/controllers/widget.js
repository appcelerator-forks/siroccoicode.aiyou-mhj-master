$.setWarnText=function(string){
	$.warntext.text=string;
};
$.hideWarnText=function(){
	$.warnback.setOpacity(0);
};
$.showWarnText=function(text){
	$.warnback.setOpacity(1.0);
	if(text){
		$.warntext.text=text;
	}
}
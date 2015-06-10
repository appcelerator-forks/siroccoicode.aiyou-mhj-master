var args = arguments[0] || {};
var pack=Alloy.createController("pack").getView();
var mypack=Alloy.createController("mypack").getView();
var lib= require("mhjLib");

$.scroll.setViews([pack,mypack]);
$.scroll.setScrollingEnabled(false);
$.navbar.registerCallback(function(index){
	if(index==1){
		if(lib.isLogin()!= true){
			$.navbar.setSeclectedIndex(0);
			lib.displayLogin();
		}else{
			$.scroll.scrollToView(parseInt(index));
		}
	}
	else{
		$.scroll.scrollToView(parseInt(index));
	}
});
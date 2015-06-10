var args = arguments[0] || {};
var pack=Alloy.createController("pack").getView();
var mypack=Alloy.createController("mypack").getView();
var lib= require("mhjLib.js");

$.scroll.setViews([pack,mypack]);
$.scroll.setScrollingEnabled(false);
$.navbar.registerCallback(function(index){
	if()
	$.scroll.scrollToView(parseInt(index));
});
var args = arguments[0] || {};
var pack=Alloy.createController("pack").getView();
var mypack=Alloy.createController("mypack").getView();


$.scroll.setViews([pack,mypack]);
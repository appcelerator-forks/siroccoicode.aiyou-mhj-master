var args = arguments[0] || {};

var lib=require('mhjLib');
var views=[];
var preIndex=0;
var homeview=Alloy.createController('home',{tab:$.tabGroup}).getView();
var pack=Alloy.createController('packhome').getView();
var personal=Alloy.createController('personal').getView();


views.push(homeview);
views.push(pack);
views.push(personal);
var tabs = [{
  id : 0,
  icon : "/imgres/tab/homepage.png",
  activeIcon:"/imgres/tab/homepage.png"
}, {
  id : 1,
  icon : "/imgres/tab/pack.png",
  activeIcon:"/imgres/tab/pack.png"
}, {
  id : 2,
  icon : "/imgres/tab/personal.png",
  activeIcon:"/imgres/tab/personal.png"
}];

$.tabGroup.init({
	nodes : tabs,
  backgroundColor : "#ffffff",
  backgroundImage :"/imgres/tab/background.png",
  activeBackgroundColor : "#ffffff",
  tabClickCallback : tabClickCallback
});
$.center.add(views[2]);
$.center.add(views[1]);
$.center.add(views[0]);
pack.hide();
personal.hide();
$.tabGroup.setIndex(0);
function tabClickCallback(_index) {
  lib.switchView($.center,views,_index,preIndex);
  Ti.API.info("-- index.js: customized tab clicked, index = " + _index);
  preIndex=_index;
}
var args = arguments[0] || {};

var multiContentView = Alloy.createController('multicontent').getView();
var novelsView = Alloy.createController('novels').getView();
var gonglue=Alloy.createController('gonglue').getView();

$.scroll.views=[multiContentView,gonglue,novelsView];

$.menuWidget.init({
        MenuLinks: menuData,
        buttonId:$.navbar.getView('btnMenu')
    });
    
function loadLinkItem(){
    Ti.API.info("ds");
}

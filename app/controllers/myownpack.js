var args = arguments[0] || {};

var mypack=Alloy.createController("mypack").getView();


$.navbar.getView('titlelabel').text="我的礼包";
$.navbar.getView('backimage').addEventListener('click',function(e){
	Alloy.Globals.Navigator.pop();
});

$.window.add(mypack);
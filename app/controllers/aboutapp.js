var args = arguments[0] || {};

$.navbar.getView('titlelabel').text="关于蛮荒记助手";
$.navbar.getView('backimage').addEventListener('click',function(e){
	Alloy.Globals.Navigator.pop();
});

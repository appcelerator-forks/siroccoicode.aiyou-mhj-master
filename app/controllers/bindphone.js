var args = arguments[0] || {};

$.navbar.getView('titlelabel').text="绑定手机";
$.navbar.getView('backimage').addEventListener('click',function(e){
	Alloy.Globals.Navigator.pop();
});

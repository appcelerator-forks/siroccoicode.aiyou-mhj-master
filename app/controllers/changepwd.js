var args = arguments[0] || {};

$.navbar.getView('titlelabel').text="修改密码";
$.navbar.getView('backimage').addEventListener('click',function(e){
	Alloy.Globals.Navigator.pop();
});

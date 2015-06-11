var args = arguments[0] || {};

$.navbar.getView('titlelabel').text="修改密码";
$.navbar.getView('backimage').addEventListener('click',function(e){
	Alloy.Globals.Navigator.pop();
});
$.warn.hideWarnText();
var getcoding=false;
var HTTP=require("mhjHttpMethod");
var toast=Alloy.createWidget("net.beyondlink.toast");
$.window.add(toast.getView());

function changepwd(){
	HTTP.HttpPOST('changepwd',{phone:$.phonenumber.getValue(),new_pwd:$.newpwd.getValue(),code:$.code.getValue()},success,error,true);
}
function getcode(){
	if(!getcoding){
		getcoding=true;
	HTTP.HttpPOST('smscode',{phone:$.phonenumber.getValue(),msg_type:1},success,error,true);
	var count=0;
	var timer=setInterval(function(){
		count++;
		$.countbutton.title=(60-count)+'秒后重新获取';
		if(count==60){
			clearInterval(timer);
			$.countbutton.title="点击获取验证码";
			getcoding=false;
		}
	},1000);
	}
}
function success(e){
	var result=JSON.parse(e);
	if(result.status==200){
		toast.info("修改成功");
	}else{
		toast.info(result.msg);
	}
}
function error(e){
	toast.info("请检查网络连接后重试");
}
var args = arguments[0] || {};
var HTTP=require("mhjHttpMethod");
var toast=Alloy.createWidget("net.beyondlink.toast");
var phone= args.phonenumber;
var nickname=args.nickname;
var password=args.password;
var getcoding=false;
$.window.add(toast.getView());
$.warn.hideWarnText();
function nextstep(){
	HTTP.HttpPOST('register',{cellphone:phone,nickname:nickname,pwd:password,vcode:$.code.getValue()},success,error,true,'register');
}
function getcode(){
	if(!getcoding){
		getcoding=true;
	HTTP.HttpPOST('smscode',{phone:phone},success,error,true);
	var count=0;
	var timer=setInterval(function(){
		count++;
		$.countdown.title=(60-count)+'秒后重新获取';
		if(count==60){
			clearInterval(timer);
			$.countdown.title="点击获取验证码";
			getcoding=false;
		}
	},1000);
	}
}
function success(e,type){
   var result=JSON.parse(e);
   if (result.status==200) {
   		if(type=="register"){
   			toast.info("注册成功");
   		}
   }else{
   	 toast.info(result.msg);
   }
}
function error(e){
	toast.info("请检查网络连接后重试");
}
var args = arguments[0] || {};
var HTTP=require("mhjHttpMethod");
var phone= args.phonenumber;
var nickname=args.nickname;
var password=args.password;
var getcoding=false;
$.warn.hideWarnText();
function nextstep(){

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
function success(){

}
function error(){

}
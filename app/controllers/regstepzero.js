var args = arguments[0] || {};
$.warn.hideWarnText();
function nextstep(){
	var reg=Alloy.createController("regstepone",{phonenumber:$.phonenumber.getValue(),nickname:$.nickname.getValue(),password:$.password.getValue()});
	Alloy.Globals.LoginNavi.push(reg);
}
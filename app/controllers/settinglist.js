var args = arguments[0] || {};


function isLoadPic(e){
	var value=e.source.value;
	alert(value);
	if (value) {
		Ti.App.Properties.setBool(Alloy.CFG.PLKEYS.LOADPIC,true);
	}else{
		Ti.App.Properties.setBool(Alloy.CFG.PLKEYS.LOADPIC,false);
	}
}

$.settingList.addEventListener('itemclick',function(e){
	 var item = e.section.getItemAt(e.itemIndex);
	 switch(item.properties.eventKey){
	 	case Alloy.CFG.EVENTKEYS.BINDPHONE:
	 		var bindphone=Alloy.createController('bindphone');
	 		Alloy.Globals.Navigator.push(bindphone);
	 	break;
	 	case Alloy.CFG.EVENTKEYS.CHANGEPASSWORD:
	 	break;
	 	case Alloy.CFG.EVENTKEYS.ABOUTAPP:
	 	break;
	 	default:
	 	return;
	 }
});
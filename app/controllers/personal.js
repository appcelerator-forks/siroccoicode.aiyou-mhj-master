var args = arguments[0] || {};
var HTTP = require('mhjHttpMethod');


$.settinglist.addEventListener('itemclick',function(e){

	 var item = e.section.getItemAt(e.itemIndex);
	 Ti.API.info("点击时间",item);
	 switch (item.properties.eventKey){
	 	case Alloy.CFG.EVENTKEYS.COLECTKEY:
	 		var articleinfo=Alloy.createController("articleinfo");
			Alloy.Globals.Navigator.push(articleinfo);
	 		break;
	 	case Alloy.CFG.EVENTKEYS.PACKKEY:

	 	
	 	break;
	 	case Alloy.CFG.EVENTKEYS.SETTINGKEY:
	 		var setting=Alloy.createController("settinglist");
	 		Alloy.Globals.Navigator.push(setting);
	 	
	 	break;
	 	default:
	 	return;
	 }
});
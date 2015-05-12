var args= arguments[0]||{};
var deviceVersion = parseInt(Titanium.Platform.version.split(".")[0], 10);
if(args.children){
	_.each(args.children,function(child){
		if(!child){
			return;
		}
		var role=child.role;
		$[role].add(child);
	});
}
if(OS_IOS && deviceVersion >= 7) {
	$.Wrapper.height = "67dp";
	$.overlay.top = "20dp";
}
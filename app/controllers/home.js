			var args             = arguments[0] || {};
			var multiContentView = Alloy.createController('multicontent').getView();
			var novelsView       = Alloy.createController('novels').getView();
			var gonglue          =Alloy.createController('gonglue').getView();
			var toast            =Alloy.createWidget("net.beyondlink.toast");
			var http             =require("mhjHttpMethod");
			$.back.add(toast.getView());
			Ti.App.Properties.setString(Alloy.CFG.kAPIHOST,"http://openapi.aiyou.com");
			Ti.App.Properties.setString(Alloy.CFG.kAPIVERSION,"v1");
			http.HttpPOST('login',Alloy.Globals.translateForGET({pwd:"6915158x",flag:"18667048968"}),{},success,error,true);
			var scrollAbleView=Ti.UI.createScrollableView({
				views:[multiContentView,gonglue,novelsView]
			});
			//$.scroll.views       =[multiContentView,gonglue,novelsView];
			$.homeback.add(scrollAbleView);
			$.navbar.getView('btnMenu').addEventListener("click",function(e){
			var articleinfo=Alloy.createController("articleinfo");
			Alloy.Globals.Navigator.push(articleinfo);
			
			});
			
			function loadLinkItem(){
			Ti.API.info("ds");
			}
			
			function success(e){
			Ti.API.info(e);
			Ti.API.info(e.responseText);
			}
			function error(e){
			toast.info("shishi");
			Ti.API.info(e);
			}

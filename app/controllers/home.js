			var args             = arguments[0] || {};
			var multiContentView = Alloy.createController('multicontent').getView();
			var novelsView       = Alloy.createController('novels').getView();
			var gonglue          =Alloy.createController('gonglue').getView();
			var toast            =Alloy.createWidget("net.beyondlink.toast");
			var http             =require("mhjHttpMethod");
			var mhjlib           =require("mhjLib");
			$.back.add(toast.getView());
			Ti.App.Properties.setString(Alloy.CFG.kAPIHOST,"http://openapi.aiyou.com");
			Ti.App.Properties.setString(Alloy.CFG.kAPIVERSION,"v1");
			http.HttpPOST('login',{pwd:"6915158x",flag:"18667048968"},success,error,false);
			var scrollAbleView=Ti.UI.createScrollableView({
				views:[multiContentView,gonglue,novelsView],
				cacheSize:10
			});
			//$.scroll.views       =[multiContentView,gonglue,novelsView];
			$.homeback.add(scrollAbleView);
			$.navbar.getView('btnMenu').addEventListener("click",function(e){
			var articleinfo=Alloy.createController("postarticle");
			Alloy.Globals.Navigator.push(articleinfo);
			
			});
			
			function loadLinkItem(){
			Ti.API.info("ds");
			}
			
			function success(e){
				var result =JSON.parse(e);
				
				if(result.status==200){
					alert(result.data);
					Ti.App.Properties.setObject(Alloy.CFG.PLKEYS.USERINFO,result.data);
				}
			}
			function error(e){
			toast.info("shishi");
			Ti.API.info(e);
			}

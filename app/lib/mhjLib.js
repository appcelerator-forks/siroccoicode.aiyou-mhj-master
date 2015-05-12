/**
 * @author dongjiawei
 */
exports.switchView=function(parent,views,index,preIndex){
	if(index>views.length) return;
	if(index !== preIndex)
	{
		if(parent.children.indexOf(views[preIndex])!= -1){
			//Ti.API.info(preIndex);
			parent.remove(views[preIndex]);
			//parent.children.map(function(currentValue,mIndex){
			  //  if(mIndex !== index)
			    //{
			      //  currentValue.visible=false;
			    //}
			    //else
			    //{
			      //  currentValue.visible=true;
			    //}
			//});
		}
		parent.add(views[index]);
	}
	
};

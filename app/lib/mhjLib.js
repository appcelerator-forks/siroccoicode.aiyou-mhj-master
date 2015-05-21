/**
 * @author dongjiawei
 */
exports.switchView=function(parent,views,index,preIndex){
	if(index>views.length) return;
	if(index !== preIndex)
	{
		parent.add(views[index]);
		if(parent.children.indexOf(views[preIndex])!= -1){
			parent.remove(views[preIndex]);

		}

		
	}
	
};

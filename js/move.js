//startMove(obj,{attr1:json[attr]1,attr2:ltarget2},fn)
function startMove(obj,json,fn){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var flag = true;
		for(var attr in json){
			//1.去当前值
			var icur = 0 ;
			if(attr == 'opacity'){
				icur = Math.round(parseFloat(getStyle(obj,attr))*100);
			}else{
				icur = parseInt(getStyle(obj,attr));
			}
			//2.速度
			var speed = (json[attr]-icur)/8;
			speed = speed>0?Math.ceil(speed):Math.floor(speed);
			//3.停止检测
			if(icur != json[attr]){
				flag=false;
				
				if(attr=='opacity'){
					obj.style.filter = 'alpha(opacity:'+(icur+speed)+')';
					obj.style.opacity = (icur+speed)/100;
				}else{
					obj.style[attr] = icur + speed + 'px';
				}	
			}
			if(flag){
				clearInterval(obj.timer);
				if(fn){
					fn();
				}
			}
			
		}
	},30)
}

function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}
	else{
		return getComputedStyle(obj,false)[attr];
	}
}
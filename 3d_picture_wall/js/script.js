//封装获取元素
var get = {
	byId : function(id) { //获取id，传入什么返回什么
		return document.getElementById(id)
	},
	byClass : function(sClass,parent){ //获取class类名，使用正则表达式匹配父元素下的所有的元素的class类名，满足就添加在aClass数组中
		var aClass = [],
			reClass = new RegExp('(^|)'+sClass+'(|$)'),
			aElem = get.byTagName('*',(parent || document));
		for (var i = 0; i < aElem.length; i++) reClass.test(aElem[i].className) && aClass.push(aElem[i]);
		return aClass	
	},
	byTagName : function(elem,obj){ //获取节点名
		return (obj || document).getElementsByTagName(elem)
	}
};
var Event = {
	addEvent : function(elem,sEvent,fn){
		elem.addEventListener　? elem.addEventListener(sEvent,fn,false) : elem.attachEvent('on'+sEvent,fn)
	},
	removeEvent : function(elem,sEvent,fn){
		elem.removeEventListener ? elem.removeEventListener(sEvent,fn,false) : elem.detachEvent('on'+sEvent,fn)
	}
};
var DrawBalls = function(cxt,x,y,vx,vy,r,color){
	this.cxt = cxt;
	this.x = x;
	this.y = y;
	this.vx = vx;
	this.vy = vy;
	this.r = r;
	this.color = color;
}
DrawBalls.prototype = {
	draw : function(){
		var cxt = this.cxt,
			x = this.x,
			y = this.y,
			vx = this.vy,
			r = this.r,
			color = this.color;
		cxt.beginPath();
		cxt.arc(x,y,r,0,Math.PI*2,false);
		cxt.fillStyle = color;
		cxt.fill();
	}
}
window.onload = function(){
	Event.addEvent(document,'mousemove',function(event){
		var zx = event.clientX,
			zy = event.clientY;
		Event.addEvent(document,'mousemove',function(event){
			var dx = event.clientX;
				dy = event.clientY,
				rotateY = rotateX = null;
			zx > dx ?  RotateY= 'rotateY(15deg)'  :  RotateY= 'rotateY(-15deg)' ;
			zy > dy ?  RotateX= 'rotateX(15deg)'  :   RotateX= 'rotateX(-15deg)' ;
			Rotate(RotateX,RotateY);	
		});
	});
	function Rotate(x,y){
		aContainer.style.transform = 'perspective(800px) ' + x + y ;
	}
	var can = get.byId('canvas'),
		cxt = can.getContext('2d'),
		balls = [];
	can.width = window.innerWidth;
	can.height = window.innerHeight;
	for (var i = 0; i < (Math.random()*100)+50; i++) {
			var x = Math.random()*can.width,
			        y = Math.random()*can.height,
			        vx = (Math.random()*-0.05)+0.025,
			        vy = (Math.random()*-15)+5,
			        r = (Math.random()*can.width/550)+can.width/500,
			        color = 'rgba('+Math.round(Math.random()*256)+','+Math.round(Math.random()*256)+','+Math.round(Math.random()*256)+',0.8)';
			 var ball = new DrawBalls(cxt,x,y,vx,vy,r,color);
			 ball.draw();
			 balls.push(ball);       
		}
	setInterval(function(){
		cxt.clearRect(0,0,can.width,can.height);
		can.width = window.innerWidth;
		can.height = window.innerHeight;		
		for (var i = 0; i < balls.length; i++) {
			balls[i].x += balls[i].vx;
			balls[i].y += balls[i].vy;
			balls[i].x < 0 && (balls[i].x = can.width);
			balls[i].y < 0 && (balls[i].y = can.height);
			balls[i].x > can.width && (balls[i].x = 0);
			balls[i].y > can.height && (balls[i].x = 0);
			balls[i].draw();
		}
	},10);	
}	
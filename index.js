$(document).ready(function(){
	web.main();
});

var web={
	main : function(){
		web.init();
		web.touches();
	},
	init : function(){
		this.photo_Id =$("#photo");
		this.radius_Id =$("#radius");
	},
	touches : function(){
		var startX =0, endX = 0, valueX =0, i=0 ,width=$(window).width(), t = "",len=web.photo_Id.children("li").length, list = [];//屏幕的宽度
		//循环小圆点
		for (var d =0; d < len; d++) {
			list.push('<label class="'+(d==0?"on":"")+'" data-num="'+d+'"></label>');
		}
		web.radius_Id.html(list.join(''));

		web.photo_Id.bind({
			touchstart : function(e){//手指初始位置
				startX=e.originalEvent.touches[0].pageX;
				//停止自动轮播
				//判断t是否为空
				if(t){
					clearTimeout(t);
				} 
			},
			touchmove : function(e){//手指移动位置
				e.preventDefault();//阻止滚动条滚动
				endX = e.originalEvent.touches[0].pageX;
				difference = endX-startX;
				valueX = (((difference)/width)*100)/10;//移动的值减初始值/屏幕宽度*100/10
				if ( (i==0 && difference>0) || ( i==len-1 && difference<0)) {
					return;
				}
				$(this).css({"transform":"translate3d("+(-i*10+valueX)+"%,0,0)","transition":"transform 0s"});	

			},
			touchend : function(e){//alert("手指离开位置")
				if ((i==0 && difference>0) || ( i==len-1 && difference<0)) {
					return;
				}
				if(difference<0){//i=0,第一个li的位置
					i++;
				}else if(difference>0){
					i--;
				}
				
				web.radius_Id.find("label").eq(i).addClass("on").siblings().removeClass("on"); 
				$(this).css({"transform":"translate3d("+-i*10+"%,0,0)","transition":"transform 0.5s linear 0s"});
				//开始
				t=setTimeout(play,5000);
			}
		});
		//点击第几个小圆点，停在第几个li
		web.radius_Id.find("label").bind({
			click :function(e){
				i = $(this).data("num");//获取第几个小圆点赋给i
				$(this).addClass("on").siblings().removeClass("on"); 
				web.photo_Id.css({"transform":"translate3d("+-i*10+"%,0,0)","transition":"transform 0.5s linear 0s"});
				console.log(i)
			}

		});
		//轮播
		function play(){
			if(i<len-1){
				i++;
			}else if(i>=len-1){
				i=0;
			}
			web.radius_Id.find("label").eq(i).addClass("on").siblings().removeClass("on");
			web.photo_Id.css({"transform":"translate3d("+-i*10+"%,0,0)","transition":"transform 0.5s linear 0s"});
			t = setTimeout(play,5000);
			console.log(i)
		}

		t = setTimeout(play,5000);
	}
}
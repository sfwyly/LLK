function judgeConnection(block,block_1,block_2){
	//第一个块的坐标
		var x1=parseInt(block_1/8);
		if(block_1%8!=0){
			x1=x1+1;
		}
		var y1=block_1-8*(x1-1);
		//第二个块的坐标
		var x2=parseInt(block_2/8);
		if(block_2%8!=0){
			x2=x2+1;
		}
		var y2=block_2-8*(x2-1);
		var result=0;
		if(JudgeEquality(block,x1,y1,x2,y2)==true) {
			if(directConnected(block,x1,y1,x2,y2,1)==true||JudgeOneInflectionPoint(block,x1,y1,x2,y2,2)==true||JudgeTwoInflectionPoint(block,x1,y1,x2,y2,2)==true) {
				result=1;
			}else {
				result=0;	
			}
		}else {
			result=2;
		}
		return result;
}

//判断选的连个图片是否相同
	function JudgeEquality(block,x1,y1,x2,y2) {
		
		if(block[x1][y1]==block[x2][y2]&&block[x1][y1]!=0) {
			return true;
		}
		
		return false;
	}
	//验证是否直接相连,x1,y1为第一张图片的坐标，下,y2为第二章图片的坐标，f为只需要验证一次是否直接相连用1代替
	function directConnected(block,x1,y1,x2,y2,f) {
		if(x1==x2) {//横线
			var m=0,n=0;
			if(y1>y2) {
				m=y1;
				n=y2;
			}else {
				m=y2;
				n=y1;
			}
			//开始计算
			if(m-n==1) {//相邻
				if(f==1) {
					block[x1][y1]=0;//消除
					block[x2][y2]=0;
				}
				return true;
			}else {
				var flag=true;
				for(var i=n+1;i<m;i++) {
					if(block[x1][i]!=0) {//路径上存在图片
						flag=false;
						break;
					}
				}
				if(flag==true) {
					if(f==1) {
						block[x1][y1]=0;//消除
						block[x2][y2]=0;
					}
					return true;
				}
			}
		}else if(y1==y2) {
			var m=0,n=0;
			if(x1>x2) {
				m=x1;
				n=x2;
			}else {
				m=x2;
				n=x1;
			}
			//开始计算
			if(m-n==1) {//相邻
				if(f==1) {
					block[x1][y1]=0;//消除
					block[x2][y2]=0;
				}
				return true;
			}else {
				var flag=true;
				for(var i=n+1;i<m;i++) {
					if(block[i][y1]!=0) {//路径上存在图片
						flag=false;
						break;
					}
				}
				if(flag==true) {
					if(f==1) {
						block[x1][y1]=0;//消除
						block[x2][y2]=0;
					}
					return true;
				}
			}
		}
		return false;
	}
	//判断是否通过一个拐点相连
	function JudgeOneInflectionPoint( block,x1, y1,x2,y2,f) {
		if(block[x1][y2]==0&&directConnected(block,x1,y1,x1,y2,2)==true&&directConnected(block,x1,y2,x2,y2,2)==true) {
			block[x1][y1]=0;//消除
			block[x2][y2]=0;
			return true;
			
		}else if(block[x2][y1]==0&&directConnected(block,x1,y1,x2,y1,2)==true&&directConnected(block,x2,y1,x2,y2,2)==true) {
			block[x1][y1]=0;//消除
			block[x2][y2]=0;
			return true;
		}
	
		return false;
	}
	//判断是否通过连个拐点相连
	function JudgeTwoInflectionPoint( block, x1, y1,x2,y2,f) {
		//以x1,y1为中心进行四周遍历
		//上下遍历
		for(var i=x1-1;i>=0;i--) {
			if(block[i][y1]==0) {
				
				if(JudgeOneInflectionPoint(block,i,y1,x2,y2,2)==true) {
					block[x1][y1]=0;//消除
					block[x2][y2]=0;
					return true;
				}
			}else {//碰到有图片就放弃这个方向
				break;
			}
		}
		for(var i=x1+1;i<=9;i++) {
			if(block[i][y1]==0) {
				if(JudgeOneInflectionPoint(block,i,y1,x2,y2,2)==true) {
					block[x1][y1]=0;//消除
					block[x2][y2]=0;
					return true;
				}
			}else {//碰到有图片就放弃这个方向
				break;
			}
		}
		//左右遍历
		for(var i=y1-1;i>=0;i--) {
			if(block[x1][i]==0) {
				if(JudgeOneInflectionPoint(block,x1,i,x2,y2,2)==true) {
					block[x1][y1]=0;//消除
					block[x2][y2]=0;
					return true;
				}
			}else {//碰到有图片就放弃这个方向
				break;
			}
		}
		for(var i=y1+1;i<=9;i++) {
			if(block[x1][i]==0) {
				if(JudgeOneInflectionPoint(block,x1,i,x2,y2,2)==true) {
					block[x1][y1]=0;//消除
					block[x2][y2]=0;
					return true;
				}
			}else {//碰到有图片就放弃这个方向
				break;
			}
		}
		return false;
	}

function chooseThis(i){
			var div=document.getElementById("block").getElementsByTagName("table")[0].getElementsByTagName("div");
			var text=document.getElementById("container").getElementsByTagName("span");
			//c1,c2为选中的图片
			if((i==c1||i==c2)&&i!=0){
				if(i==c1){
					c1=0;//选中之后再选就放弃选择
					flag--;
				}
				if(i==c2){
					c2=0;
					flag--;
				}
				div[i-1].style.opacity=1;//恢复正常
			}else if(i!=0){
				if(c1==0){
					c1=i;
				}else if(c2==0){
					c2=i;
				}
				div[i-1].style.opacity=0.3;
				flag++;
				if(flag==2){//选中两个提交
					var reply=judgeConnection(block,c1,c2);
					if(reply==1){
								
								div[c1-1].removeAttribute("onclick");
								div[c2-1].removeAttribute("onclick");
								div[c1-1].style.opacity=0;
								div[c2-1].style.opacity=0;
								num=num-2;
								grade+=10;
								c1=0;
								c2=0;
								flag=0;
								
								text[0].innerText="消除成功！";
								text[1].innerText=""+grade;
								if(num==0){
									text[0].innerText="恭喜您！挑战成功！";
									alert("恭喜您！挑战成功！");
									if(confirm("是否重新开始？")==true){
										stuffImg();
									}
								}
					}else if(reply==0){
								text[0].innerText="选择图片路径不可达！";
								div[c1-1].style.opacity=1;
								div[c2-1].style.opacity=1;
								c1=0;
								c2=0;
								flag=0;
					}
					else if(reply==2){
								text[0].innerText="图片不匹配！";
								div[c1-1].style.opacity=1;
								div[c2-1].style.opacity=1;
								c1=0;
								c2=0;
								flag=0;
					}
					
					
				}
			}
			
		}
//初始化图片
		function stuffImg(){
			var div=document.getElementById("block").getElementsByTagName("table")[0].getElementsByTagName("div");
			var text=document.getElementById("container").getElementsByTagName("span");
			flag=0;num=64;
		 	c1=0;c2=0;
			grade=0;
			text[0].innerText="";
			text[1].innerText=""+grade;
			for(var i=0;i<64;i++){
				div[i].style.opacity=1;
				div[i].style.filter = 'alpha(opacity:'+100+')'; //设置IE的透明度 ,100以内
			}
			
			produceBlock();
			for(var i=1;i<=64;i++){//为每个格子添加背景图片和点击事件
				var x=parseInt(i/8);
				if(i%8!=0){
					x=x+1;
				}
				var y=i-8*(x-1);//格子坐标
				div[i-1].setAttribute("onclick","chooseThis("+i+")");//点击事件
				var url="url('img/"+block[x][y]+".png')";
				div[i-1].style.cssText="background-image:"+url+";"+"background-position:center center;background-size:cover";//显示图片
			}
		}
		
function produceBlock(){
			//初始化图片
		for(var i=1;i<17;i++){
			img[i]=1;//每张图片字少有一组
		}
		//初始化格子
		for(var i=0;i<10;i++){
			block[i]=new Array();
			for(var j=0;j<10;j++){
				block[i][j]=0;//当前格子未填充图片
			}
		}
		//还差16组图片，32张图片，图片成对出现
		for(var i=1;i<=16;i++) {
			var n=Math.round(15*Math.random())+1;//将一组图片分配到图片n
			img[n]++;
		}
		//为每个图片分配位置，图片是成对的
		for(var i=1;i<=16;i++) {
			for(var n=1;n<=img[i]*2;n++) {
				var x=0,y=0;//当前图片分配的位置
				do {
					x=Math.round(7*Math.random())+1;
					y=Math.round(7*Math.random())+1;
				}while(block[x][y]!=0);//存在了图片就继续寻找
				block[x][y]=i;//i号图片
			}
		}
		}
		
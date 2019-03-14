var start = document.getElementsByClassName("start_game")[0];
var change = document.getElementsByClassName("start_game_bg")[0];
var numChange = document.getElementsByClassName("minesnum")[0];
var words = document.getElementsByClassName('start_game_words')[0];
var table = document.getElementsByClassName('table')[0];
var scren = document.getElementsByClassName('screnNum')[0];
var close = document.getElementById('close');
var state = true;
var minesNum ;
var minesOver ;
var block;
var mineMap = new Array();



bindunit();
function bindunit(){
	words.onclick = function(event){
	if(state == true){
		change.style.display = "block";
		numChange.style.display = "block";
		set();
		str();
		state = false;
	}
}
}
/*开始游戏*/
function str(){	
	minesNum = 10;
	var box =  document.getElementsByClassName('box')[0];//这个class选择器是通过js生成，所以此条语句不能作为全局变量
	change.oncontextmenu = function()  {//取消右键的点击
		return false;
	}
	change.onmousedown = function (e){//鼠标的左右点击的判定
		var event = e.target;  
		if(e.which == 1){    //左键的判定为数字1，右键的判定为数字3
			leftClick(event);
		}else if(e.which == 3){
			rightClick(event);  
		}
	}
}
close.onclick = function close(){
	state = true;
	table.style.display = 'none';
	change.style.display = 'none';
	numChange.style.display = 'none';
	change.innerHTML = '0';
	scren.innerHTML = '10';
}
function set(){
	minesNum = 10;
	minesOver = 10;
	for(var i = 0; i < 10; i++){
		for(var j = 0; j < 10; j++){
			var connum = document.createElement('div');//生成一百个格子
			connum.classList.add('box')//将生成的一百个格子统一成一个类名，方便每一个格子的样式的规定
			connum.setAttribute('id',i + '+' + j);
			change.appendChild(connum);
			mineMap.push({mine : 0});//将每一个各自标记
		}
	}
	block = document.getElementsByClassName('box');
	while(minesNum){
		var mineIndex = Math.floor(Math.random()*100);//随机数取整
		if(mineMap[mineIndex].mine === 0){
			mineMap[mineIndex].mine = 1;
			block[mineIndex].classList.add('isLei');
			minesNum --;
		}
	}
}


/*点击鼠标右键与鼠标左键的相应事件的反应*/
/*左键点击实现功能,第一如果点到的是雷,游戏结束,如果点到数字为0,就实现自动扩散.如果数字为1或为2,就需要再次点击*/
function leftClick(dom){  
	var isLei = document.getElementsByClassName('isLei');
	if(dom && dom.classList.contains('isLei')){
		console.log('gameover');
		for(var i = 0 ;i < isLei.length; i++){
			isLei[i].classList.add('show');
		}
		setTimeout(function(){
			table.style.display = 'block';
		},800)
	}else{
		var n = 0;
		var posAttr = dom && dom.getAttribute('id').split('+');
		var posX = posAttr && +posAttr[0];  //隐式类型转化
		var posY = posAttr && +posAttr[1];
		dom && dom.classList.add('num');
		for(var i = posX - 1; i <= posX+1 ; i++){
			for (var j = posY - 1;j <= posY+1 ; j++) {
				var around = document.getElementById(i + '+' + j);
				if(around && around.classList.contains('isLei')){
					n++;
				}
			}
		}
		dom && (dom.innerHTML = n)
		if(n == 0){
			for(var i = posX - 1; i <= posX+1 ; i++){
			for (var j = posY - 1;j <= posY+1 ; j++) {
				var near = document.getElementById(i + '+' + j);
					if(near && near.length != 0){
						if(!near.classList.contains('check'))
						near.classList.add('check');
						leftClick(near);
					}
				}
			}
		}
	}
}
/*点击右键需要实现的功能，插入旗子，点击右键一次，则标记，若标记成功则表示上方显示的雷数减少，如标记不成功则显示的雷数不变*/
function rightClick(dom){
	if(dom.classList.contains('num')){
		return;
	}
	dom.classList.toggle('flag');//切换
	if(dom.classList.contains('isLei') && dom.classList.contains('flag')){
		minesNum--;
	}
	if(dom.classList.contains('isLei')&& !dom.classList.contains('flag')){
		minesNum++;
	}
	scren.innerHTML = minesNum;
	if(minesNum == 0){
		setTimeout(function(){
			table.style.display = 'block';
			table.style.backgroundImage = 'url(img/success.jpg)'
		},800)
	}
}

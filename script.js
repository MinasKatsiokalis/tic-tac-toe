game = {
	player : ["Player 1", "Player 2"],
	toPlay : null,
	toPlayElm : document.getElementById("wrapper").getElementsByTagName("h3")[0],
	boxes : document.getElementsByClassName('box'),
	load : function(){
		this.addClickEvents();
		this.toPlay = this.player[0];
		this.toPlayElm.innerHTML = 	this.player[0]+"\'s Turn";
	},
	addClickEvents : function(){
		for (var i = 0 ;i <  this.boxes.length; i++){
			_this = this;
			this.boxes[i].addEventListener("click", this.clickMe, false);
		}
		console.log("Testing...");
		document.getElementsByTagName("button")[0].addEventListener("click", this.reset, false);
	},
	reset : function(){
		for(var i=0;i<_this.boxes.length;i++){
			_this.boxes[i].innerHTML="";
		}
		_this.toPlay = _this.player[0];
		_this.toPlayElm.innerHTML = _this.player[0]+"\'s Turn";
		_this.drawLine("reset");
	},
	clickMe : function(){
		if (this.innerHTML == ""){
			this.innerHTML =(_this.toPlay == _this.player[0])?"x":"o";
			_this.toPlay = (_this.toPlay == _this.player[0])? _this.player[1]: _this.player[0];
			_this.toPlayElm.innerHTML = _this.toPlay+ "\'s Turn";
		}
		_this.checkGame();
	},
	drawLine : function(draw){
		var aStart,bStart,aEnd,bEnd;
		if(draw == "rl"){
			aStart = (bEnd = 0);
			bStart = (aEnd = 453);
		}else if(draw == "lr"){
			aStart = (bStart = 0);
			bEnd = (aEnd = 453);
		}else if(draw == "r1"){
			aStart = 0;
			aEnd = 453;
			bStart = (bEnd = 76);
		}else if(draw == "r2"){
			aStart = 0;
			aEnd = 453;
			bStart = (bEnd = 226);
		}else if(draw == "r3"){
			aStart = 0;
			aEnd = 453;
			bStart = (bEnd = 376);
		}else if(draw == "c3"){
			bStart = bStart = 0;
			bEnd = 453;
			aStart = (aEnd = 376);
		}else if(draw == "c2"){
			bStart = bStart = 0;
			bEnd = 453;
			aStart = (aEnd = 226);
		}else if(draw == "c1"){
			bStart = bStart = 0;
			bEnd = 453;
			aStart = (aEnd = 76);
		}else if(draw == "none"){
			bStart = bStart=aStart = aStart  = 0;
		}
		else if(draw != "reset")return;
		canvas = document.getElementsByTagName("canvas")[0];
		canvas.style.zIndex = 2;
		var ctx = canvas.getContext("2d");
		ctx.beginPath();
		ctx.moveTo(aStart,bStart);
		ctx.lineTo(aEnd,bEnd);
		ctx.strokeStyle="red";
		ctx.lineWidth = 5;
		ctx.stroke();
		if(draw == "none" ){
			this.toPlayElm.innerHTML = "It's a Draw";
			return;
		}
		if(draw == "reset" ){
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			canvas.style.zIndex = -1;
			return;
		}
		this.toPlayElm.innerHTML = ((this.toPlay == this.player[0])? this.player[1]: this.player[0] )+ " Won";
	},
	checkGame : function(){
		var board = [null,null,null,null,null,null,null,null,null];
		var endGame = 0;
		for(var i = 0; i<board.length ; i++){
			board[i] = i;
			if(this.boxes[i].innerHTML != "")board[i] = this.boxes[i].innerHTML;
			if(board[i] != "o" && board[i] != "x")endGame++;
		}
		if(board[0] == board[1] && board[1] == board[2]){
			this.drawLine("r1");
		}else if(board[3] == board[4] && board[4] == board[5]){
			this.drawLine("r2");
		}else if(board[6] == board[7] && board[7] == board[8]){
			this.drawLine("r3");
		}else if(board[0] == board[3] && board[3] == board[6]){
			this.drawLine("c1");
		}else if(board[1] == board[4] && board[4] == board[7]){
			this.drawLine("c2");
		}else if(board[2] == board[5] && board[5] == board[8]){
			this.drawLine("c3");
		}else if(board[0] == board[4] &&  board[4] == board[8]){
			this.drawLine("lr");
		}else if(board[2] == board[4] &&  board[4] == board[6]){
			this.drawLine("rl");
		}else if(endGame == 0){
			this.drawLine("none");
		}
	}
}


window.onload = game['load']();	





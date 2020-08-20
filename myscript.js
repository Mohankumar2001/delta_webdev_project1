var myGamePiece;
var myObstacle = [];
var myNotobstacle = [];
var myScore;
var mybgmMusic;
var outmusic;
var jumpmusic;
times = 0;
var temparr = [0,0,0,0,0,0];
var highscore = {
	"one" : "0",
	"two" : "0",
	"three" : "0",
	"four" : "0",
	"five" : "0",
}
var myHighScore;
var currentScore;
if(localStorage.length==0) {
	localStorage.setItem("highscore",JSON.stringify(highscore));
}

function startgame() {
	if(times==0){
	myGameArea.start();
	myGamePiece = new component(40,40,"red",220,500);
	myScore = new component("30px", "Consolas", "black", 280, 40, "text");
	myHighScore = new component("10px", "Consolas", "black", 10, 40, "text");
	mybgmMusic = new sound("assets/Happybgm.mp3");
	mybgmMusic.play();
	outmusic = new sound("assets/gameover.mp3");
	jumpmusic = new sound("assets/jump.mp3");
	times+=1;
	}
	else {
		myGamePiece.x = 220;
		myGamePiece.y = 500;
		myGamePiece.speedX = 0;
	    myGamePiece.speedY = 0;
	    myGamePiece.gravity = 0.05;
	    myGamePiece.gravitySpeed = 0;
		myObstacle = [];
		myNotobstacle = [];
		myGameArea.stop();
		myGameArea.clear();
		myGameArea.start();
	    /*myGamePiece = new component(40,40,"assets/blueball1.png",220,500,"image");
	    myScore = new component("30px", "Consolas", "black", 280, 40, "text");
	    myMusic = new sound("assets/Happybgm.mp3");*/
	    mybgmMusic.stop();
        mybgmMusic.play();
        
	}
	}

var myGameArea = {

	canvas: document.createElement("canvas"),
	start: function() {
		this.canvas.height = 600;
		this.canvas.width = 480;
		this.context = this.canvas.getContext("2d");
		this.frameNo = 0;
		this.interval = setInterval(updateGameArea, 20);
		document.body.insertBefore(this.canvas, document.body.childNodes[0]);
	},
	clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
    	clearInterval(this.interval);
    }
}

function component(width ,height ,color ,x , y, type) {
	this.type = type;
	this.height = height;
	this.width = width;
	this.x = x;
	this.y = y;
	this.speedX = 0;
	this.speedY = 0;
	this.gravity = 0.05;
	this.gravitySpeed = 0;
	this.bounce = 0.6;
	this.angle = 0;
	this.maxHeight = 480;
	this.newPos = function() {
		this.gravitySpeed += this.gravity;
		this.x += this.speedX;
		this.y += this.speedY + this.gravitySpeed;
		this.hitBottom();
	}
	this.newPosobst = function() {
		ctx = myGameArea.context;
		/*ctx.save();
		ctx.translate(this.x +100,this.y+100);
		ctx.rotate(myGamePiece.angle);
		this.image = new Image();
		this.image.src = color;
		ctx.drawImage(this.image, this.width/-2,this.height/-1,this.width,this.height);
		ctx.restore();
		this.image = new Image();
		this.image.src = color;
		ctx.drawImage(this.image, this.x-this.y/4,this.y,this.width+this.y/2,this.height);*/
		      ctx.fillStyle = color;
	        ctx.fillRect(this.x-this.y/4,this.y,this.width+this.y/2,this.height);
	}
	this.newPosnotobst = function() {
		ctx = myGameArea.context;
		ctx.save();
		ctx.translate(this.x +100,this.y);
		ctx.rotate(myGamePiece.angle);
		this.image = new Image();
		this.image.src = color;
		ctx.drawImage(this.image, this.width/-2,0,this.width,this.height);
		ctx.restore();
	}
	this.update = function() {
		ctx = myGameArea.context;
		if(this.type == "text") {	
		    
			ctx.font = this.width + " " + this.height;
			ctx.fillStyle = color;
			ctx.fillText(this.text,this.x,this.y);
			
		}
		else if(this.type == "image") {
			this.image = new Image();
			this.image.src = color;
			ctx.drawImage(this.image, this.x+150,this.y,this.width,this.height);
		}
		else {
	        ctx.fillStyle = color;
	        ctx.fillRect(this.x,this.y,this.width,this.height);
            
		}
		
	}
	/*this.crashWith = function(otherObj) {
		var myLeft = this.x;
		var myRight = this.x + this.width;
		var myTop = this.y;
		var myBottom = this.y + this.height;
		var otherLeft = otherObj.x;
		var otherRight = otherObj.x + otherObj.width;
		var otherTop = otherObj.y;
		var otherBottom = otherObj.y + otherObj.height;
		var crash = true;
        if ((myLeft>otherRight)||(myRight<otherLeft)||(myTop>(otherTop+10))||(myBottom<otherTop)) {
        	    crash = false;
        }
        else if(Math.abs(Math.PI-(myGamePiece.angle%(Math.PI*2)))<Math.PI*0.5) {
        	//alert(Math.abs(Math.PI-(myGamePiece.angle%(Math.PI*2)))*56)
        	crash = false;
        }
        return crash;
	}
	this.crashWith1 = function(otherObj) {
		var myLeft = this.x;
		var myRight = this.x + this.width;
		var myTop = this.y;
		var myBottom = this.y + this.height;
		var otherLeft = otherObj.x;
		var otherRight = otherObj.x + otherObj.width;
		var otherTop = otherObj.y;
		var otherBottom = otherObj.y + otherObj.height;
		var crash = true;
        if ((myLeft>otherRight)||(myRight<otherLeft)||(myTop>otherBottom)||(myBottom<(otherBottom-10))) {
        	    crash = false;
        }
        else if(Math.abs(Math.PI-(myGamePiece.angle%(Math.PI*2)))>Math.PI*0.5) {
        	//alert(Math.abs(Math.PI-(myGamePiece.angle%(Math.PI*2)))*56)
        	crash = false;
        }
        return crash;

	}*/
	this.hitBottom = function() {
		var rockBottom = myGameArea.canvas.height - this.height;
		if(this.y>rockBottom) {
			this.y = rockBottom;
			this.gravitySpeed = 0;
		}
	}
	
}

function updateGameArea() {
	var x = myGameArea.canvas.width;
	var y = myGameArea.canvas.height;
	/*for(i=0;i<myObstacle.length;i++) {
	    if(myGamePiece.crashWith(myObstacle[i])||myGamePiece.crashWith1(myNotobstacle[i])){
		    myGameArea.stop();
		    mybgmMusic.stop();
		    outmusic.play();
		    highscore = JSON.parse(localStorage.getItem("highscore"));
		    
		    temparr[0] = highscore.one;
		    temparr[1] = highscore.two;
		    temparr[2] = highscore.three;
		    temparr[3] = highscore.four;
		    temparr[4] = highscore.five;
		    temparr[5] = currentScore;
            temparr.sort(function(a,b){return b-a});
		    highscore.one = temparr[0];
		    highscore.two = temparr[1];
		    highscore.three = temparr[2];
		    highscore.four = temparr[3];
		    highscore.five = temparr[4];
		    localStorage.setItem("highscore",JSON.stringify(highscore));
		    return;
	    }
	}*/
	
	myGameArea.clear();
	myGameArea.frameNo +=1;
	if(myGameArea.frameNo==1||myGameArea.frameNo%100==0){
		
	  	myObstacle.push(new component(20,100,"yellow",200,-200));
	  	//myNotobstacle.push(new component(200,100,"assets/bluearc1.png",(myGameArea.canvas.width/2)-100,-100,"image"));
	}
	myGamePiece.angle += 1 * Math.PI / 180;
	
	myScore.update();
	myHighScore.update();
	myGamePiece.newPos();
	myGamePiece.update();
	
		
		
		for(i=0;i<myObstacle.length;i++) {
		    myObstacle[i].y += 1;
		   // myNotobstacle[i].y +=(myGamePiece.maxHeight-myGamePiece.y)*0.01;
	    }
	
	for(i=0;i<myObstacle.length;i++) {
		myObstacle[i].newPosobst();
		//myNotobstacle[i].newPosnotobst();
	} 

	everyInterval();
}

function everyInterval() {
	//if(myGamePiece.y<myObstacle[myObstacle.length-1].y) {
		highscore = JSON.parse(localStorage.getItem("highscore"));
		currentScore = Math.floor((myObstacle[0].y/10)+20);
		myScore.text = "SCORE:"+ currentScore;
		myHighScore.text = "HIGHSCORES:"+ highscore.one + " " + highscore.two + " " + highscore.three + " " + highscore.four + " " + highscore.five;
		//return true;
	//}
	//else
	//	return false;
}

function accelerate(n) {
    myGamePiece.gravity = n;
}

function sound(src) {
	this.sound = document.createElement("audio");
	this.sound.src = src;
	this.sound.setAttribute = ("preload","auto");
	this.sound.setAttribute = ("controls","none");
	this.sound.style.display = "none";
	document.body.appendChild(this.sound);
	this.play = function() {
		this.sound.play();
	}
	this.stop = function() {
		this.sound.pause();
	}
}

function moveup() {
    myGamePiece.speedY -= 1; 
}
/*
function movedown() {
    myGamePiece.speedY += 1; 
}
function moveleft() {
    myGamePiece.speedX -= 1; 
}

function moveright() {
    myGamePiece.speedX += 1; 
}

function playeffect() {
	jumpmusic.play();
}*/
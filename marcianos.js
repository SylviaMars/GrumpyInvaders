var cookie = document.cookie;

var MyMusic = new sound("Brother_Jack.mp3");
var purr = new sound ("Cat_Purr.mp3");
var meow = new sound ("meow.mp3");
MyMusic.play();

//Funció que s'executa a l'index: 

function welcome(){
    document.getElementById("name").style.display = "none";
    var name = document.getElementById("name1").value;
    document.getElementById("text").innerHTML = "Hi " + name + 
    "! Press the followiong button to start: ";
    document.getElementById("newGame").style.display = "inline-block";
}


var marsize = 45; //tamaño marciano
var navsize= 45; //tamaño nave
var psize = 10; //tamaño proyectil
var distam = navsize+10; //distancia entre marcianos
var linea = 3; //lineas marcianos
var lasti;
var lastj;
var mvel = 3;

var canvas = document.createElement("canvas");

canvas.height =window.innerHeight -20; 
canvas.width = window.innerWidth -15;

document.body.insertBefore(canvas, document.body.childNodes[1]);
document.body.style.background = "black";


//pintar marciano
var municion = [];
var municionmarciano = [];
var teclas = [];
var direccion = 0;

var marciano = new Array();

for (i=0;i<linea;i++){
    marciano[i]= new Array();
}

for (i=0;i<linea;i++){
    var j = 0;
    while(j==0 || marciano[i][j-1].posX<=window.innerWidth*0.9-120){
        marciano[i][j] = new Ships1 (window.innerWidth*0.1+distam*j,50+50*i,"img/grumpy.png",marsize,marsize, "image");
        j++;
    }
}

var nave = new Ships1(window.innerWidth/2, window.innerHeight-70, "img/bowl2.png", navsize+10, navsize+10, "image");


window.onkeydown = function (e) {teclas[e.keyCode] = true;}
window.onkeyup = function (e) {teclas[e.keyCode] = false;}


function Ships1(posX, posY, color, sizeX, sizeY, type) {
  this.type = type;
  if (type == "image") {
    this.image = new Image();
    this.image.src = color;
  }
  this.sizeX = sizeX;
  this.sizeY = sizeY; 
  this.posX = posX;
  this.posY = posY; 
  this.pintar = function() {
        var context = canvas.getContext("2d");
        if (type == "image") {
            context.drawImage(this.image, 
                this.posX, 
                this.posY,
                this.sizeX, this.sizeY);
        } else {
            context.fillStyle = color;
            context.fillRect(this.posX, this.posY, this.sizeX, this.sizeY);
        }
    }
    this.crash = function(balas){
        this.balas = balas;
        if ((balas.posX > this.posX) && (balas.posX < this.posX+this.sizeX) && (balas.posY > this.posY) && (balas.posY < this.posY+this.sizeY)){
            return true;
        }
        else if ((balas.posX+balas.sizeX > this.posX) && (balas.posX+balas.sizeX < this.posX+this.sizeX) && (balas.posY > this.posY) && (balas.posY < this.posY+this.sizeY)){
            return true
        }
        else if ((balas.posX > this.posX) && (balas.posX < this.posX+this.sizeX) && (balas.posY + balas.sizeY > this.posY) && (balas.posY + balas.sizeY < this.posY + this.sizeY)) {
            return true
        }
        else if ((balas.posX+balas.sizeX > this.posX) && (balas.posX+balas.sizeX < this.posX + this.sizeX) && (balas.posY + balas.sizeY > this.posY) && (balas.posY + balas.sizeY < this.posY+this.sizeY)){
            return true;
        }
        else {
            return false
        }
    }
}


function areaUpdate() {

    if (teclas[39]) {
        if(nave.posX < canvas.width-navsize){
            nave.posX = nave.posX+10;
        } else {
            nave.posX = canvas.width-navsize;
        }
    } else if (teclas[37]) {
        if(nave.posX > 0){
            nave.posX = nave.posX-10;
        } else {
            nave.posX = 0;
        }
    }

    if(teclas[32]){
        if(municion.length==0 || (municion[municion.length-1].posY < nave.posY-70)){
            municion[municion.length] = new Ships1 (nave.posX+navsize/2-2.5,nave.posY,"img/balls.png",psize+5,psize+5,"image");
        }
    }
    var context = canvas.getContext("2d");
    context.clearRect(0,0,canvas.width,canvas.height);
    nave.pintar();

    for (i=0; i <municion.length;i++){
        municion[i].posY = municion[i].posY - 3;
        municion[i].pintar();
    }

    if(direccion==0){
        lasti=0;
        lastj=[marciano[0].length-1];
        if(marciano.length>1){
            for(i=1;i<marciano.length;i++){
                if(marciano[i][marciano[i].length-1].posX>marciano[i-1][marciano[i-1].length-1].posX){
                    lasti = i;
                    lastj = [marciano[i].length-1];
                }
            }
        }
        if(marciano[lasti][lastj].posX < canvas.width - marsize-mvel){
            for(i=0; i < marciano.length; i++){
                for(j=0;j<marciano[i].length;j++){
                    marciano[i][j].posX = marciano[i][j].posX+mvel;
                }
            }
        } else {
            direccion=1;
        }
    }

    if(direccion==1){
        lasti=0;
        lastj=0;
        if (marciano.length>1){
            for(i=1;i<marciano.length;i++){
                if(marciano[i][0].posX < marciano[i-1][0].posX){
                lasti=i;
                lastj=0;
                }
            } 
        }
        if (marciano[lasti][lastj].posX > mvel){
            for (i=0;i<marciano.length;i++){
                for (j=0; j < marciano[i].length;j++){
                    marciano[i][j].posX = marciano[i][j].posX-mvel;
                }
            }
        }
        else {
            direccion=0;
        }
    }

    for(i=0;i< marciano.length;i++){
        for (j=0;j<marciano[i].length;j++){
            marciano[i][j].pintar();
            if (Math.floor((Math.random()*2000)+1)<=1){
                municionmarciano[municionmarciano.length]= new Ships1(marciano[i][j].
                    posX+marsize/2,marciano[i][j].posY+marsize,"img/ball.png",psize+5,psize+5,"image");

            }
        }
    }
    
    for (i=0;i<municionmarciano.length;i++){
        municionmarciano[i].posY = municionmarciano[i].posY+mvel;
        municionmarciano[i].pintar();
        if (municionmarciano[i].posY> canvas.height){
            municionmarciano.splice(i,1);
        }
    }
    //recorre la municion y la va pintando
    var z=0;
    while (z<municion.length){
        var col = false;
        var i = 0;
        while(!col && i<marciano.length){
            var j = 0;
            while (!col && j<marciano[i].length){
                if (marciano[i][j].crash(municion[z])){
                    municion.splice(z,1);
                    marciano[i].splice(j,1);
                    col = true;
                    z--;
                    if (marciano[i].length==0){
                        marciano.splice(i,1);
                        if (marciano.length==0){
                            clearInterval(inter);
                            clearInterval(crono);
                            context.clearRect(0,0,canvas.width,canvas.height);
                            context.font = "50px Pacifico";
                            context.fillStyle= "white";
                            context.fillText("Congrats!",canvas.width/2-110,canvas.height/2);
                            restart();
                            MyMusic.stop();
                            purr.play();
                        }
                    }
                    
                }
                j++
            }
            i++
        }
        z++
    }

    for (i=0;i<municionmarciano.length;i++){
        if(nave.crash(municionmarciano[i])){
            clearInterval(inter);
            clearInterval(crono);
            context.clearRect(0,0,canvas.width,canvas.height);
            context.font = "50px Pacifico";
            context.fillStyle= "white";
            context.fillText("Try to improve",canvas.width/2-135,canvas.height/2);
            restart();
            MyMusic.stop();
            meow.play();
            
        }
    }
}

function restart(){
    document.getElementById("restart").style.display= "block";

}
var inter = setInterval(areaUpdate, 10);


//Funció de temporitzador que te calcula es temps que resta de sa partida

var records = [];
var second = 29;

var crono = setInterval(function(){
    var context = canvas.getContext("2d");
    document.getElementById("crono").innerHTML =  "Time  0:" + second;   
	if(second <= 0){
        document.getElementById("crono").innerHTML = "Time's up!";
        clearInterval(inter);
        context.clearRect(0,0,canvas.width,canvas.height);
        context.font = "50px Pacifico";
        context.fillStyle= "white";
        context.fillText("Try to improve",canvas.width/2-135,canvas.height/2);
        restart();
        MyMusic.stop();
              
	}
    second --;

}, 1000);

function sound(src){
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload","auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    this.sound.autoplay = true;
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
}
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

let screenWidth = canvas.width; //550
let screenHeight = canvas.height; //450

let edge = 50;

console.log('canvas dimentions: ' + screenWidth + ' x ' + screenHeight);

var keyclick = {};
document.addEventListener("keydown", function(event){
    keyclick[event.keyCode]=true;
    console.log(keyclick);
    move(keyclick);
}, false);
document.addEventListener("keyup", function(event){
    delete keyclick[event.keyCode];
}, false);


class Square {
    constructor(x, y, width, height, speed, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.color = color;
    }
    
    moveVertically(){
        if(this.y > screenHeight-50 || this.y < 0){
            this.speed = -this.speed
        }
        this.y += this.speed;
    }
    
    moveHorizontally() {
        if(this.x > screenWidth-50 || this.x < 0){
            this.speed = -this.speed
        }
        this.x += this.speed;
    }
    
    moveDiagnally() {
        if( (this.y > screenHeight-50 || this.y < 0) || (this.x > screenWidth-50 || this.x < 0)){
            this.speed= -this.speed;
        }
        this.x += this.speed;
        this.y += this.speed;
    }
}

class Circle {
    constructor(x, y, radius, speedx, speedy, color){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speedx = speedx;
        this.speedy = speedy;
        this.color = color;
    }
    bounce(){
        if(this.x + this.speedx > canvas.width - this.radius || this.x + this.speedx < this.radius) {
            this.speedx = -this.speedx;
        }
        if (this.y + this.speedy > canvas.height - this.radius || this.y + this.speedy < this.radius) {
            this.speedy = -this.speedy;
        }
        this.x += this.speedx;
        this.y += this.speedy;
    }
}
function move(keyclick){
    if(37 in keyclick){player.x -= player.speedx;}
    if(38 in keyclick){player.y -= player.speedy;}
    if(39 in keyclick){player.x += player.speedx;}
    if(40 in keyclick){player.y += player.speedy;}
    
    if(player.x >= (canvas.width-32)){player.x=0;}
    if(player.y >= (canvas.height-32)){player.y=0;}
    if(player.x < 0){player.x=(canvas.width-32);}
    if(player.y < 0){player.y=(canvas.height-32);}
}

var ball = new Circle(20, 20, 10, 2, 2, "#46F703");
console.log(ball);
var drawBall = function(){
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
}
var updateBall = function() {
    ball.bounce();
}

//Player
var player = new Circle(20, 20, 10, 9, 9, "#751490");
var drawPlayer = function(){
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radius, 0, Math.PI*2);
    ctx.fillStyle = player.color;
    ctx.fill();
    ctx.closePath();
}

// rex is the last tree on this planet and has no branches left
var rex = new Square(
   ( (screenWidth/2)-50), ((screenHeight/2)-50), 20, 300, 0, "#101306"
);
console.log(rex);
var drawRex = function(){
    //ctx.clearRect(0, 0, screenWidth, screenHeight); // Rerenders the screen
    ctx.fillStyle = rex.color;
    ctx.fillRect(rex.x, rex.y, rex.width, rex.height);
}

// sprites will be multiple squares all over the place
var sprites = [
    new Square(5, 270, edge, edge, 2, "#FF5733"),
    new Square(120, 300, edge, edge, 1, "#900C3F"),
    new Square(350, 100, edge, edge, 3, "#FFC300"),
    new Square(200, 100, edge, edge, 4, "#71a87c"),
    new Square(280, 70, edge, edge, 3, "#A9C23F")
];

console.log(sprites);

var drawSprites = function () {
    //ctx.clearRect(0, 0, screenWidth, screenHeight);
    sprites.forEach(function(element) {
        ctx.fillStyle = element.color;
        ctx.fillRect(element.x, element.y, element.width, element.height);
    })
}

var updateSprites = function() {
    sprites[0].moveVertically();
    sprites[1].moveHorizontally();
    sprites[2].moveDiagnally(); 
    sprites[3].moveVertically();
}

//collision detection

function collisionDetection(){
        for(let i=0; i<sprites.length; i++){ 
            let s = sprites;
                var c = 0;
            function calculateCollision(){
                if(s[i].x < ball.x + ball.radius &&
                s[i].x + edge > ball.x &&
                s[i].y < ball.y + ball.radius &&
                s[i].y + edge > ball.y){
                    console.log('Collision');
                    ball.color = "#6f1490";
        } else{ball.color = "#46F703"}
            }
            calculateCollision();
    }
}

// Run the Game
var gameLoop = function() {
    ctx.clearRect(0, 0, screenWidth, screenHeight);
    drawRex();
    updateSprites();
    drawSprites();
    updateBall();
    drawBall();
    drawPlayer();
    collisionDetection();
    window.requestAnimationFrame(gameLoop);
}
gameLoop();
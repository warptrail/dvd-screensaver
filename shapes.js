var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

let screenWidth = canvas.width; //550
let screenHeight = canvas.height; //450

let edge = 50;

console.log('canvas dimentions: ' + screenWidth + ' x ' + screenHeight);

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



// rex is a single stationary square
var rex = new Square(
   ( (screenWidth/2)-50), ((screenHeight/2)-50), edge, edge, 0, "#03F7EE"
);
console.log(rex);
var drawRex = function(){
    //ctx.clearRect(0, 0, screenWidth, screenHeight); // Rerenders the screen
    ctx.fillStyle = rex.color;
    ctx.fillRect(rex.x, rex.y, rex.width, rex.height);
}

// sprites will be multiple squares moving up and down
var sprites = [
    new Square(5, 270, edge, edge, 2, "#FF5733"),
    new Square(120, 300, edge, edge, 1, "#900C3F"),
    new Square(350, 100, edge, edge, 3, "#FFC300"),
    new Square(200, 100, edge, edge, 10, "#71a87c")
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
        var s = sprites;
        if(s[i].x < ball.x + ball.radius &&
        s[i].x + edge > ball.x &&
        s[i].y < ball.y + ball.radius &&
        s[i].y + edge > ball.y)
        {
            console.log('Collision'); 
        }
    }
}

// Run the Game
var gameLoop = function() {
    ctx.clearRect(0, 0, screenWidth, screenHeight);
    //drawRex();
    updateSprites();
    drawSprites();
    updateBall();
    drawBall();
    collisionDetection();
    window.requestAnimationFrame(gameLoop);
}
gameLoop();
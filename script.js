
let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let imgfruta = document.getElementById("img-fruta");
let imgveneno = document.getElementById("img-veneno");
var velocidade = 100;

let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let venenos = 0;
let frutas = 0;
let direction = "right";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}
let veneno = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}
function criarBG() {
    context.fillStyle = "black";
    context.fillRect(0, 0, 16 * box, 16 * box);
}
function criarCobrinha() {
    for(i=1; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
        
    }
}
function cabecaCobrinha() {
        context.fillStyle = "yellow";
        context.fillRect(snake[0].x, snake[0].y, box, box);
   }
/* function drawFood(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
    
} */
function drawFood(){
    context.drawImage(imgfruta,food.x, food.y, box, box);
    
}

/* function drawVeneno(){
    context.fillStyle = "white";
    context.fillRect(veneno.x, veneno.y, box, box);
    
} */
function drawVeneno(){
    context.drawImage(imgveneno,veneno.x, veneno.y, box, box);
    
}

document.addEventListener('keydown',update);


function update(event){
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

function letreiro(){

 document.getElementById("frutas").innerHTML ="<img id='img-fruta'src='fruta.jpg' width=32 height=32>" + frutas ;
 document.getElementById("venenos").innerHTML = "<img id='img-fruta'src='veneno.png' width=32 height=32>"+ venenos;
}

function iniciarJogo(){

   if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
   if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
   if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
   if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

    for(i = 1;i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert("Game Over :(");
        }
    }
    criarBG();
    cabecaCobrinha()
    criarCobrinha();
    drawFood();
    drawVeneno();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if(snakeX != veneno.x || snakeY != veneno.y) {
   
    }
    else{
        snake.pop();  
        snake.pop();  
        frutas -=1;
        venenos +=1;
        veneno.x = Math.floor(Math.random() * 15 + 1) * box;
        veneno.y = Math.floor(Math.random() * 15 + 1) * box;
        if(snake.length == 0){
            clearInterval(jogo);
            alert("Game Over :(");
        }
    }


    if(snakeX != food.x || snakeY != food.y){
        snake.pop();  
  
    }
    else{
         food.x = Math.floor(Math.random() * 15 + 1) * box;
         food.y = Math.floor(Math.random() * 15 + 1) * box;
         frutas +=1;
         velocidade -=15;
      
}

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
    letreiro();

}
   // iniciarJogo();

    var jogo = setInterval(iniciarJogo,velocidade);



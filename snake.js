const cvs = document.getElementById('canvasSnake');
const ctx = cvs.getContext('2d');
var modal = document.getElementById("modalMuerte");

//create the measure Unit -- 32 pixels
const box = 32;

//create the speed of the snake and vars needed to change it
var speed = 150;
var changeOfSpeed = false;
let relativeSpeed = "x1";

// create time-delay to direction change
const wait = 150;

//create the score var
let score = 0;

//load images and audios
const Manzana = new Image();
Manzana.src = "./Utilidades/food.png";

const ground = new Image();
ground.src = "./Utilidades/ground.png";

var speedImg = new Image();
speedImg.src = "./Utilidades/speed-sprite.png";

const audioDead = new Audio();
audioDead.src = "./Utilidades/dead.mp3";
const audioEat = new Audio();
audioEat.src = "./Utilidades/eat.mp3";
const audioLeft = new Audio();
audioLeft.src = "./Utilidades/left.mp3";
const audioDown = new Audio();
audioDown.src = "./Utilidades/down.mp3";
const audioUp = new Audio();
audioUp.src = "./Utilidades/up.mp3";
const audioRight = new Audio();
audioRight.src = "./Utilidades/right.mp3";

//create the Snake ---- An array
let snake = [];
snake[0] = {
	x : 9 * box,
	y : 10 * box
}

//create the food
let manzana = {
	x : Math.floor(Math.random()*17+1) * box,
	y : Math.floor(Math.random()*15+3) * box
}

//draw everything to the canvas
function draw() {
	ctx.drawImage(ground, 0, 0);

	for (let i = 0; i < snake.length; i++){
		ctx.fillStyle = (i == 0)? "green" : "white";
		ctx.fillRect(snake[i].x, snake[i].y, box, box);

		ctx.strokeStyle = "red";
		ctx.strokeRect(snake[i].x, snake[i].y, box, box);
	}

	ctx.drawImage(Manzana, manzana.x, manzana.y);
	ctx.drawImage(speedImg, 3.5*box, 0.8*box, 2*box, box);

	//old head position
	let snakeX = snake[0].x;
	let snakeY = snake[0].y;

	//direction of movement
	if (d == 'LEFT')
		snakeX -= box;
	if (d == 'UP')
		snakeY -= box;
	if (d == 'RIGHT')
		snakeX += box;
	if (d == 'DOWN')
		snakeY += box;

	if (snakeX == manzana.x && snakeY == manzana.y){
		audioEat.play();
		score++;
		manzana = {
			x : Math.floor(Math.random()*17+1) * box,
			y : Math.floor(Math.random()*15+3) * box
		}
		//si se come la manzana, no eliminamos la cola
	} else{
	//remove the tail
	snake.pop();
	}

	//add a new head
	let newHead = {
		x : snakeX,
		y : snakeY
	}

	//llamamos a la funcion aumentoDeVelocidad
	aumentoDeVelocidad(snake);

	//game over
	if (snakeX < box || snakeX > 17*box || snakeY < 3*box || snakeY > 17*box || collision(newHead,snake)){
		audioDead.play();
		clearInterval(game);
		modal.style.display = "block";
	}

	snake.unshift(newHead);

	ctx.fillStyle = "white";
	ctx.font = "45px Changa one";
	ctx.fillText(score, 2*box, 1.6*box);

	ctx.fillStyle = "white";
	ctx.font = "45px Changa one";
	ctx.fillText(relativeSpeed, 5.5*box, 1.6*box);
}

//call the draw function every 100 ms
let game = setInterval(draw,speed);

//control the snake
let d;

document.addEventListener("keydown", direction);

function direction(event){
	if (event.keyCode == 37 && d != "RIGHT"){
		audioRight.play();
		setTimeout(function() {
			d="LEFT";
		  }, wait);
		
	} else if (event.keyCode == 38 && d != "DOWN"){
		audioDown.play();
		setTimeout(function() {
			d="UP";
		  }, wait);
	} else if (event.keyCode == 39 && d != "LEFT"){
		audioLeft.play();
		setTimeout(function() {
			d="RIGHT";
		  }, wait);
	} else if (event.keyCode == 40 && d != "UP"){
		audioUp.play();
		setTimeout(function() {
			d="DOWN";
		  }, wait);
	}
}

function collision(head, array){
	for (let i = 0; i < array.length; i++){
		if (head.x == array[i].x && head.y == array[i].y){
			return true;
		}
	}
	return false;
}

function aumentoDeVelocidad(array) {
	if(changeOfSpeed && array.length % 7 == 0) {
		let initialSpeed = 150;
		speed = speed - initialSpeed*0.25;
		relativeCalc = initialSpeed/speed;
		relativeSpeed = "x"+relativeCalc;
		changeOfSpeed = false;
		clearInterval(game);
		game = setInterval(draw, speed);
	} else if (array.length % 7 !=0) {
		changeOfSpeed = true;
	}
}

function reiniciar(){
	location.reload();
}

function cerrarModal(){
	modal.style.display = "none";
}
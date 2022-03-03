const gameBoardEl = document.querySelector("#game-board canvas")
const ctx = gameBoardEl.getContext("2d")
const moveCarRage = 10
let moveSpeed = 3
let createSpeed = 2000
const obstacleList = []
let score = 0
let createObstacleInterval
let moveObstacleInterval

const car = {
	src: "images/car.png",
	xPosition: 220,
	draw() {
		const carImage = new Image()
		carImage.src = this.src
		ctx.drawImage(carImage, this.xPosition, 550, 60, 120)
	},
	moveLeft() {
		if (this.xPosition > 50) this.xPosition -= moveCarRage
		clearCanvas()
		drawCanvas()
	},
	moveRight() {
		if (this.xPosition < 400) this.xPosition += moveCarRage
		clearCanvas()
		drawCanvas()
	},
}

class Obstacle {
	constructor() {
		this.height = 20
		this.width = 50 + Math.floor(Math.random() * 200)
		this.x = Math.floor(Math.random() * 400)
		this.y = 0
	}

	draw() {
		ctx.fillStyle = 'red'
		ctx.fillRect(this.x, this.y, this.width, this.height)
	}

	move() {
		if (this.y > 700) {
			score += this.width/10
			obstacleList.shift()
		}
		else if (this.y > 500){
			if (this.checkColision(this)) return stopGame()
		}
		this.y += moveSpeed
		clearCanvas()
		drawCanvas()
	}
	checkColision() {
		if(car.xPosition > this.x && car.xPosition < (this.width + this.x))
		return true
	}
}



function stopGame() {
	clearInterval(createObstacleInterval)
	clearInterval(moveObstacleInterval)
}

function clearCanvas() {
	ctx.clearRect(0, 0, 500, 700)
}

function drawCanvas() {
	for (const obstacle of obstacleList) {
		obstacle.draw()
	}
	car.draw()
}

window.onload = () => {
	document.getElementById("start-button").onclick = () => {
		if (obstacleList.length===0) startGame()
	}

	function startGame() {
		gameBoardEl.classList.add("road")
		car.draw()
		document.addEventListener("keydown", moveCar)
		createNewObstacle()
		createObstacleInterval = setInterval(createNewObstacle, createSpeed)
		moveObstacleInterval = setInterval(moveObstacles, 30)
	}

	function moveCar(event) {
		if (event.key === "ArrowRight") car.moveRight()
		if (event.key === "ArrowLeft") car.moveLeft()
	}

	function createNewObstacle() {
		const newObstacle = new Obstacle()
		obstacleList.push(newObstacle)
		moveSpeed++
		createSpeed -= 200
	}

	function moveObstacles() {
		for (const obstacle of obstacleList) {
			obstacle.move()
		}
	}
}

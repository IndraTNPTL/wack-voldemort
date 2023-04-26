// GAME VARIABLES
const landingPage = document.getElementById("landing-page");
const goToGameBtn = document.getElementById("go-to-game-cta");
const gamePage = document.getElementById("game-page");
const startBtn = document.getElementById("start-game");
const restartBtn = document.getElementById("restartBtn");
const allHoles = document.querySelectorAll(".hole");
const timer = document.getElementById("timerCountdown");
const showDialogBtn = document.getElementById("showDialog");
const resultDialog = document.getElementById("container-dialog-result");
const winMessage = document.getElementById("winMessage");
const looseMessage = document.getElementById("looseMessage");
const gameResult = true;

let timerSeconds = 90;
let score = document.getElementById("score");
let gameInterval;
let gameInProgress = false;

// AUDIO VARIABLES
const audioBeforeStart = document.getElementById("audioBeforeStart");
const audioAfterStart = document.getElementById("audioAfterStart");
const startAudioBtn = document.getElementById("startAudio");
const toggleAudio = document.getElementById("toggleAudio");

function startGame() {
	// "If statement" to prevent the game from being launch multiple times with rageclick
	if (gameInProgress) {
		return;
	}
	gameInProgress = true;

	// Calling the countdown function
	countdownDecrease();

	// Calling the peep function (choose the hole randomly + act on the score)
	gameInterval = peep();

	// End the running of the StartGame function after 1:30min
	setTimeout(() => {
		gameInterval.forEach((interval) => {
			clearInterval(interval);
		});
	}, 90000);
}

function countdownDecrease() {
	function updateTimer() {
		const minutes = Math.floor(timerSeconds / 60)
			.toString()
			.padStart(2, "0");
		const seconds = (timerSeconds % 60).toString().padStart(2, "0");
		timer.innerText = `${minutes}:${seconds}`;
	}

	updateTimer();

	const countdown = setInterval(() => {
		timerSeconds--;
		updateTimer();
		if (timerSeconds <= 0) {
			clearInterval(countdown);
			gameInProgress = false;
			if (parseInt(score.textContent) >= 50) {
				displayWinMessage();
			} else if (parseInt(score.textContent) < 50) {
				displayLooseMessage();
			}
		}
	}, 1000);
	return countdown;
}

// Choose hole randomly + scrore increment/decrement + return the intervalID of characters functions
function peep() {
	allHoles.forEach((hole) => {
		hole.addEventListener("click", () => {
			if (hole.classList.contains("voldemort")) {
				score.textContent = parseInt(score.textContent) + 1;
				hole.classList.remove("voldemort");
			} else if (hole.id === "dobby") {
				score.textContent = parseInt(score.textContent) - 2;
				hole.removeAttribute("id");
			}
		});
	});

	// At intervals = Choose a random hole -> Add class .voldemort -> Remove class .voldemort after a certain time
	function voldemortAppears() {
		const hole = allHoles[Math.floor(Math.random() * allHoles.length)];
		hole.classList.add("voldemort");

		setTimeout(() => {
			hole.classList.remove("voldemort");
		}, 1200);
	}

	// At intervals = Choose a random hole -> Add class .dobby -> Remove class .voldemort after a certain time
	function dobbyAppears() {
		const hole = allHoles[Math.floor(Math.random() * allHoles.length)];
		hole.id = "dobby";

		setTimeout(() => {
			hole.removeAttribute("id");
		}, 1400);
	}

	const volId = setInterval(voldemortAppears, 1000);
	const dobbyId = setInterval(dobbyAppears, 3000);
	return [volId, dobbyId];
}

function displayWinMessage() {
	winMessage.style.display = "block";
	looseMessage.style.display = "none";
	resultDialog.showModal();
}

function displayLooseMessage() {
	looseMessage.style.display = "block";
	winMessage.style.display = "none";
	resultDialog.showModal();
}

// EVENT LISTENERS

goToGameBtn.addEventListener("click", () => {
	gamePage.style.display = "block";
	landingPage.style.display = "none";
	// audioBeforeStart.play();
});

startBtn.addEventListener("click", () => {
	startGame();
	startBtn.style.display = "none";
});

restartBtn.addEventListener("click", () => {
	gamePage.style.display = "none";
	landingPage.style.display = "block";
	resultDialog.close();
});

showDialogBtn.addEventListener("click", () => {
	looseMessage.style.display = "block";
	winMessage.style.display = "none";
	resultDialog.showModal();
});

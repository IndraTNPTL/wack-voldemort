// GAME VARIABLES
const landingPage = document.getElementById("landing-page");
const goToRulesBtn = document.getElementById("go-to-rules-cta");
const rulePage = document.getElementById("rule-step");
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
const winScore = 55;

let timerSeconds = 60;
let score = document.getElementById("score");
let gameInterval = [];
let gameInProgress = false;

// AUDIO VARIABLES
const audioBeforeStart = document.getElementById("audioBeforeStart");
const audioAfterStart = document.getElementById("audioAfterStart");
const audioWin = document.getElementById("audioWin");
const stopAudioBtn = document.getElementById("stopAudio");

function reset() {
	timerSeconds = 60;
	score.textContent = "0";
	gameInProgress = false;

	allHoles.forEach((hole) => {
		hole.classList.remove("voldemort");
		hole.removeAttribute("id");
	});

	startBtn.style.display = "block";
	timer.style.color = "rgb(114, 98, 85)";
	score.style.color = "rgb(114, 98, 85)";

	if (gameInterval) {
		gameInterval.forEach((interval) => {
			clearInterval(interval);
		});
	}
}

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
	}, 60000); //CHANGE BEFORE ENDING CODE
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
			if (parseInt(score.textContent) >= 55) {
				audioAfterStart.pause();
				displayWinMessage();
				audioWin.play();
			} else if (parseInt(score.textContent) < 55) {
				audioAfterStart.pause();
				displayLooseMessage();
				audioBeforeStart.play();
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
				score.textContent = parseInt(score.textContent) - 3;
				hole.removeAttribute("id");
			}
			if (parseInt(score.textContent) >= winScore) {
				endGame();
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

	// At intervals = Choose a random hole -> Add id #dobby -> Remove class .voldemort after a certain time
	function dobbyAppears() {
		const hole = allHoles[Math.floor(Math.random() * allHoles.length)];
		hole.id = "dobby";

		setTimeout(() => {
			hole.removeAttribute("id");
		}, 1400);
	}

	const volId = setInterval(voldemortAppears, 700);
	const dobbyId = setInterval(dobbyAppears, 1500);
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

function endGame() {
	gameInterval.forEach((interval) => {
		clearInterval(interval);
	});
	gameInProgress = false;
	audioAfterStart.pause();
	displayWinMessage();
	audioWin.play();
}

// EVENT LISTENERS

goToRulesBtn.addEventListener("click", () => {
	rulePage.style.display = "block";
	rulePage.scrollTop = 0;
	landingPage.style.display = "none";
	audioBeforeStart.play();
});

goToGameBtn.addEventListener("click", () => {
	gamePage.style.display = "block";
	gamePage.scrollTop = 0;
	landingPage.style.display = "none";
	rulePage.style.display = "none";
});

startBtn.addEventListener("click", () => {
	startGame();
	startBtn.style.display = "none";
	timer.style.color = "#f0c75e";
	score.style.color = "#f0c75e";
	audioBeforeStart.pause();
	audioAfterStart.play();
	allHoles.forEach((hole) => {
		hole.style.border = "none";
	});
});

restartBtn.addEventListener("click", () => {
	landingPage.style.display = "block";
	landingPage.scrollTop = 0;
	gamePage.style.display = "none";
	rulePage.style.display = "none";
	resultDialog.close();
	audioBeforeStart.pause();
	audioAfterStart.pause();
	audioWin.pause();
	reset();
});

stopAudioBtn.addEventListener("click", () => {
	audioBeforeStart.pause();
	audioAfterStart.pause();
	audioWin.pause();
});

// showDialogBtn.addEventListener("click", () => {
// 	looseMessage.style.display = "block";
// 	winMessage.style.display = "none";
// 	resultDialog.showModal();
// });

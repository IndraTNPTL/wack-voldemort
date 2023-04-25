// GAME VARIABLES
let score = document.getElementById("score");
const startBtn = document.getElementById("start-game");
const allHoles = document.querySelectorAll(".hole");

let gameInterval;
let gameInProgress = false;

// AUDIO VARIABLES
// const audioBeforeStart = document.getElementById("audioBeforeStart");
// const audioAfterStart = document.getElementById("audioAfterStart");
// const startAudioBtn = document.getElementById("startAudio");
// const toggleAudio = document.getElementById("toggleAudio");

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
	const timer = document.getElementById("timerCountdown");
	let timerSeconds = 90;

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
			if (parseInt(score.textContent) >= 45) {
				displayWinMessage();
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
		}, 1000);
	}

	// At intervals = Choose a random hole -> Add class .dobby -> Remove class .voldemort after a certain time
	function dobbyAppears() {
		const hole = allHoles[Math.floor(Math.random() * allHoles.length)];
		hole.id = "dobby";

		setTimeout(() => {
			hole.removeAttribute("id");
		}, 1200);
	}

	const volId = setInterval(voldemortAppears, 1200);
	const dobbyId = setInterval(dobbyAppears, 2000);
	return [volId, dobbyId];
}

function displayWinMessage() {
	// Put here the possibility to display block my Win message
}

// EVENT LISTENERS
startBtn.addEventListener("click", startGame);

// let audioEnabled = true;
// startAudioBtn.addEventListener("click", () => {
// 	audioBeforeStart.play();
// });

// startBtn.addEventListener("click", () => {
// 	audioBeforeStart.pause();
// 	audioAfterStart.play();
// 	startGame();
// });

// toggleAudio.addEventListener("click", () => {
// 	if (audioEnabled) {
// 		audioBeforeStart.pause();
// 		audioAfterStart.pause();
// 		toggleAudio.textContent = "Enable Audio";
// 	} else {
// 		if (!audioEnabled) {
// 			audioAfterStart.play();
// 		} else {
// 			audioBeforeStart.play();
// 		}
// 		toggleAudio.textContent = "Disable Audio";
// 	}
// 	audioEnabled = !audioEnabled;
// });

const score = document.getElementById("score");
const startBtn = document.getElementById("start-game");

function startGame() {
	const gameInterval = peep();
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
			clearInterval(gameInterval);
		}
	}, 1000);
}

function peep() {
	const allHoles = document.querySelectorAll(".hole");

	allHoles.forEach((hole) => {
		hole.addEventListener("click", () => {
			if (hole.classList.contains("voldemort")) {
				score.textContent = parseInt(score.textContent) + 1;
			}
		});
	});

	// At intervals = Choose a random hole -> Add class .voldemort -> Remove class .voldemort after a certain time
	return setInterval(() => {
		const hole = allHoles[Math.floor(Math.random() * allHoles.length)];
		hole.classList.add("voldemort");

		setTimeout(() => {
			hole.classList.remove("voldemort");
		}, 1200);
	}, 2000);
}

// EVENT LISTENERS
startBtn.addEventListener("click", startGame);

// AU clic sur la case qui a la class voldemort, le score s'incremente de +1

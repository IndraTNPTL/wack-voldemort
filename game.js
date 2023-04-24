const score = document.getElementById("score");
const startBtn = document.getElementById("start-game");
const allHoles = document.querySelectorAll(".hole");

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

// Choose hole randomly
function peep() {
	allHoles.forEach((hole) => {
		hole.addEventListener("click", () => {
			if (hole.classList.contains("voldemort")) {
				score.textContent = parseInt(score.textContent) + 1;
			} else if (hole.id === "dobby") {
				score.textContent = parseInt(score.textContent) - 1;
			}
		});
	});
	setInterval(voldemortAppears, 2000);
	setInterval(dobbyAppears, 2500);
}

// EVENT LISTENERS
startBtn.addEventListener("click", startGame);

// AU clic sur la case qui a la class voldemort, le score s'incremente de +1

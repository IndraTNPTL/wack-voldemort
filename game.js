const score = document.getElementById("score");
const timer = document.getElementById("timer");
const startBtn = document.getElementById("start-game");

function startGame() {
	const gameInterval = peep();

	setTimeout(() => {
		clearInterval(gameInterval);
	}, 120000);
}

function peep() {
	const allHoles = document.querySelectorAll(".hole");

	// At intervals = Choose a random hole -> Add class .mole -> Remove class .mole after a certain time
	return setInterval(() => {
		const hole = allHoles[Math.floor(Math.random() * allHoles.length)];
		hole.classList.add("mole");

		setTimeout(() => {
			hole.classList.remove("mole");
		}, 1200);
	}, 2000);
}

// EVENT LISTENERS
startBtn.addEventListener("click", startGame);

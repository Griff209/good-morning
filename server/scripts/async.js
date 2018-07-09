const api = require('./history.js')
const trivia = Object.create(null);
const sadWords = ["kidnap", "kill", "attack", "war", "terror", `dea(d|th)`, "die", "assasin", "murder"]
const expressions = []; 
sadWords.forEach((word) => expressions.push(new RegExp(`\\b${word}.*\\b`)));

api.getHistory(() => {
	trivia.births = api.today.births;
	trivia.events = sadFilter(api.today.events);
	console.log(trivia.events)
});

function sadFilter(events) {
	return events.filter(testExpressions);
}

function testExpressions(event) {
	let text = event.text;
	let passed = true;
	for (let regex of expressions) {
		if (regex.test(text)) {
			passed = false;
			break;
		}
	} return passed;
}

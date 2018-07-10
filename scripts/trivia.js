const client = require('./client.js');

const options = {
  hostname: 'history.muffinlabs.com',
  port: 80,  
  path: '/date', 
  method: 'GET',
}

const trivia = {};

//example
//buildView((trivia) => console.log(trivia));

function buildView(callback) {
  try {
    client.request('JSON', options, () => getTrivia(client.response, callback));
  } catch(e) {
    console.error(e.message);
  }
}

function getTrivia(response, callback) {
  trivia.births = response.body.Births;
  trivia.events = response.body.Events.filter(testExpressions);
  callback(trivia);
}

const expressions = []; 
const sadWords = ["kidnap", "kill", "attack", "war", "terror", `dea(d|th)`, "die", "assassin", "murder"];
sadWords.forEach((word) => expressions.push(new RegExp(`\\b${word}.*\\b`)));

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
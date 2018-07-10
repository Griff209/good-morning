const client = require('./client.js');

const trivia = {};
const sadWords = [
  "kidnap", 
  "kill", 
  "attack", 
  "war", 
  "terror", 
  `dea(d|th)`, 
  "die", 
  "assassin", 
  "murder",
];
const options = {
  hostname: 'history.muffinlabs.com',
  port: 80,  
  path: '/date', 
  method: 'GET',
}

//demo
tryRequest((trivia) => console.log(trivia));

function tryRequest(callback) {
  try {
    client.request('JSON', options, () => parseTrivia(client.response, callback));
  } catch(e) {
    console.error(e.message);
  }
}

function parseTrivia(response, callback) {
  trivia.statusCode = response.statusCode; 
  trivia.births = response.body.Births;
  trivia.events = response.body.Events.filter(testExpressions);
  callback(trivia);
}

function setExpressions(words) {
  let expressions = []; 
  words.forEach((word) => expressions.push(new RegExp(`\\b${word}.*\\b`)));
  return expressions;
}

function testExpressions(event) {
  let expressions = setExpressions(sadWords);
	let text = event.text;
	let passed = true;
	for (let regex of expressions) {
		if (regex.test(text)) {
			passed = false;
			break;
		}
	} return passed;
}
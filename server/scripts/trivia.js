const fs = require('fs');
const client = require('../../library/client.js');
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

module.exports = save;

save();

function save(callback)  {
  try {
    client.request('JSON', options, () => parseTrivia(client.response, callback));
  } catch(e) {
    console.error(e.message);
  }
}

function parseTrivia(response, callback = () => console.log('trivia.save accepts an optional callback')) {
  trivia.statusCode = response.statusCode; 
  trivia.births = response.body.data.Births;
  trivia.events = response.body.data.Events;
  trivia.events_happy = trivia.events.filter(testSadExpressions);
  writeTrivia(trivia, callback);
}

function writeTrivia(trivia, callback) {
  let date = new Date();
  let exp = /\d{4}\-\d{2}\-\d{2}/;
  let ident = (date).toJSON().match(exp)[0].split('-').join('');
  let path = `data/${ident}_trivia.json`;
  fs.writeFile(path, JSON.stringify(trivia), (err) => {
    if (err) {
      throw err;
    } 
    console.log(`trivia saved at ${path}`);
    callback();
  });
}

function setExpressions(words) {
  let expressions = []; 
  words.forEach((word) => expressions.push(new RegExp(`\\b${word}.*\\b`)));
  return expressions;
}

function testSadExpressions(event) {
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
var rawDate, mmDD, days, commonDay, dateSuffs, fname, xmlhttp, file;

days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

dateSuffs = [ 0, "1st","2nd","3rd","4th","5th","6th","7th","8th","9th","10th","11th","12th","13th","14th","15th","16th","17th","18th","19th",
	     "20th","21st","22nd","23rd","24th","25th","26th","27th","28th","29th","30th","31st"];

rawDate = new Date();

mmDD = [rawDate.getMonth() + 1, rawDate.getDate()];

commonDay = days[rawDate.getDay()];
document.getElementById("greeting").innerHTML = `Happy ${commonDay}!!!`;

fName = mmDD.map(index => index < 10 ? `0${index}` : `${index}`).join("-");

function randElement(array) {
	let randIndex = Math.floor(Math.random() * (array.length - 1));
	let testTrivium = array[randIndex];
	return testTrivium;
}

function displayTrivia(trivia = [{}], heading) {
	let trivium = randElement(trivia);
	document.getElementById("triviaheader").innerHTML = heading;
	document.getElementById("trivia").innerHTML = trivium.year + ": " + trivium.text;
}

function triviaController(trivia, heading) {
	(function cycleTriv() {
		setInterval(function() {displayTrivia(trivia, heading)}, 12000);
	})();
}

function eventOrBirth(triv) {
	if (commonDay == "Monday" || commonDay == "Wednesday" || commonDay == "Friday") {
		triviaController(triv.data.Events, "");
	} else {
		triviaController(triv.data.Births, "Born ");
	}
}

xmlhttp = new XMLHttpRequest();
file = `/data/${fName}.json`;

xmlhttp.open("GET", file, true);
xmlhttp.send();

xmlhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		let triv = JSON.parse(this.response);
		eventOrBirth(triv);
	}
};

//arrays to map Date method return values to commonly used names 
const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const dateSuffs = [ 0, "1st","2nd","3rd","4th","5th","6th","7th","8th","9th","10th","11th","12th","13th","14th","15th","16th","17th","18th","19th","20th","21st","22nd","23rd",
	"24th","25th","26th","27th","28th","29th","30th","31st"];

//get the day of the week as a number, use that as an index to find our day of the week name from the days array
const monthName = months[mmDD[0]];
const commonDay = days[(new Date()).getDay()];

//load our greeting in the view with the name of the day of the week
document.getElementById("greeting").innerHTML = `Happy ${commonDay}!!!`;

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

const rawDate = new Date();
const mmDD = [rawDate.getMonth() + 1, rawDate.getDate()];

//arrays to map Date method return values to commonly used names 
const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const dateSuffs = [ 0, "1st","2nd","3rd","4th","5th","6th","7th","8th","9th","10th","11th","12th","13th","14th","15th","16th","17th","18th","19th","20th","21st","22nd","23rd",
	"24th","25th","26th","27th","28th","29th","30th","31st"];
//filter out negativity / sadness in the trivia

//get the day of the week as a number, use that as an index to find our day of the week name from the days array
const monthName = months[mmDD[0]];
const commonDay = days[rawDate.getDay()];


//document.getElementById("date").innerHTML = monthName + " " + dateCommon(rawDate);

myFunction(myObj);

//load our greeting in the view with the name of the day of the week
document.getElementById("greeting").innerHTML = `Happy ${commonDay}!!!`;

//select a random event from the file and display its contents in our view
function myFunction(json) {
	if (commonDay == "Monday" || commonDay == "Wednesday" || commonDay == "Friday") {
		triviaController(json.data.Events, "");
	} else {
		triviaController(json.data.Births, "Born ");
	}
}
function triviaController(trivia, heading) {
//collect our element of trivia which remember is an array, in a variable
	(function cycleTriv() {
		setInterval(function() {displayTrivia(trivia, heading)}, 12000);
	})();
//  var i = i || 1;
	//function repeatFunc(i) {
	//i ++;
	//if (i < 50) {
	//  displayTrivia(trivia, heading);
	//  console.log(i);
	//  return repeatFunc(i);
	//  }
}
function displayTrivia(trivia, heading) {
	//returns a random element of our dataset as an array
	trivium = randElement(trivia);
	//insert elements of our trivium in the HTML of our view
	document.getElementById("triviaheader").innerHTML = heading;
	document.getElementById("trivia").innerHTML = trivium.year + ": " + trivium.text;
}
function randElement(array) {
	/*generate random integer as index on our array
	length returns the number of elements in our array, but our array is zero-indexed so 
	we need to remove one from the length to get our upper limit for indexing*/
	let randIndex = Math.floor(Math.random() * (array.length - 1));
	//retrieve random element from array
	let testTrivium = array[randIndex];
	//filter element against our sadWords and get a new one if filter returns true
	if (positiveFilter(testTrivium)) {
		randElement(array);
	} else {
		return testTrivium;
	}
}
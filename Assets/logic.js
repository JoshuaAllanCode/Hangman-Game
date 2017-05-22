//Global Variables
//================================================================================
//Arrays and Variables
var wordOptions = ["coding", "software", "java", "jquery", "denver", "college", "class"];
var selectedWord = "";
var lettersinWord = [];
var numBlanks = 0;
var blanksAndSuccesses = [];
var wrongLetters = [];

// Game counters
var winCount = 0;
var lossCount = 0;
var guessesLeft = 9;

/// Functions (Reusable blocks of code that i will call upon when needed)
/// =====================================================================

function startGame () {
	selectedWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
	lettersinWord = selectedWord.split("");
	numBlanks = lettersinWord.length;

	// Reset
	guessesLeft = 9;
	wrongLetter = [];
	blanksAndSuccesses = [];

	//Populate blanks and successes with right number of blanks.
	for (var i=0; i<numBlanks; i++){
		blanksAndSuccesses.push("_");
	}

	// Change HTML to reflect round conditions
	document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");
	document.getElementById("numGuesses").innerHTML = guessesLeft;
	document.getElementById("winCounter").innerHTML = winCount;
	document.getElementById("lossCounter").innerHTML = lossCount;

	//Testing / Debugging
	console.log(selectedWord);
	console.log(lettersinWord);
	console.log(numBlanks);
	console.log(blanksAndSuccesses);
}

function checkLetters(letter) {
	//Check if letter exists in code at all
	var isLetterInWord = false;
	for (var i=0; i<numBlanks; i++){
		if(selectedWord[i] == letter) {
			isLetterInWord = true;
		}
	}

	// Check where in word letter exists, then populate out blanksAndSuccesses array
	if(isLetterInWord) {
		for (var i=0; i<numBlanks; i++) {
			if(selectedWord[i] == letter) {
				blanksAndSuccesses[i] = letter;
			}
		}
	}

	// Letter wasn't found
	else {
		wrongLetters.push(letter);
		guessesLeft--
	}
	
	// Testing and Debugging
	console.log(blanksAndSuccesses);

}

function roundComplete(){                    
	console.log("Win Count: " + winCount + " | Loss Count: " + lossCount + " | Guesses Left: " + guessesLeft);

	// Update the HTML to reflect the most recent count stats
	document.getElementById("numGuesses").innerHTML = guessesLeft;
	document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");
	document.getElementById("wrongGuesses").innerHTML = wrongLetters.join(" ");

	//Check if user won
	if (lettersinWord.toString() == blanksAndSuccesses.toString()) {
		winCount++;
		alert("You Won!");

		// Update the win counter in the HTML
		document.getElementById("winCounter").innerHTML = winCount;

		startGame();
	}

	//Check if user lost
	else if (guessesLeft == 0) {
		lossCount++;
		alert("You Lost!");

		//update the HTML
		document.getElementById("lossCounter").innerHTML = lossCount;

		startGame();
	}
}

//Main Process
//=================================================================================

//Intiates the code the first time
startGame();

//Register keyclicks

document.onkeyup = function(event) {
	var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
	checkLetters(letterGuessed);
	roundComplete();

	// Test, Debug
	console.log(letterGuessed);
}

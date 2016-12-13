// Array of possible hard words. There will in the future be easy and medium word options.
var hard = ["jazz", "joker", "xylophone", "queue", "jinxed", "buzzer", "puff", "zigzag", "beekeeping", "mummifying", "fulfilling", "buffer", "quiz", "sleeveless", "voodoo", "quaking", "suffering", "mugginess", "overjoyed", "jaywalking", "hobnobbing", "bubbliest", "cockiness", "giggliest"]


var guessedWord = "";
var word = "";
var guessedLetters = [];
var allGuessed = [];

// Used when the player clicks the button "New Game". It chooses a word from variable "hard". It creates a variable "guessedWord" that has the character "_" in place of every letter with a space between each (ex: if the word is "jazz", the "guessedWord" is "_ _ _ _"). It saves the chosen word as variable "word" where there is a space between each letter (ex: "jazz" ==> "j a z z"). It also resets the variables "guessedLetters" and "allGuessed" to blank arrays.
function newGame() {
	var start = [];
	var num = Math.random() * hard.length;
	word = hard[Math.floor(num)];
	for (var i = 0; i < word.length; i++) {
		start.push("_");
	}
	guessedWord = start.join(" ");
	document.getElementById("word").innerHTML = guessedWord;
	word = word.split("");
	word = word.join(" ");
	document.getElementById("letters").innerHTML = " ";
	guessedLetters = [];
	allGuessed = [];
}

// Checks if the input the player gives is a valid guess, meaning it is a single letter. if it is not, the function returns "invalid". If it is a valid guess and the player has already guessed it (i.e. the letter is in the "guessedLetters" array), the function returns "guessed". Otherwise, it returns the guess.
function checkGuess(guess) {
	var count = 0;
	if (guess.length === 1 && guess.search(/[(a-z)]/gi) === 0) {
		for (var i = 0; i < allGuessed.length; i++) {
			if (guess === allGuessed[i]) {
				count++;
			}
		}
		if (count > 0) {
			return "guessed";
		} else {
			return guess.toLowerCase();
		}
	}
	return "invalid";
}

// Used when the player types something in the input box and presses the "Guess" button. It uses "checkGuess(guess)" to see if the guess is valid, guessed, or not. If it is an invalid guess, it tells the player to guess a single letter. If it has been guessed, it tells the player to guess a different letter. And if it is valid and in the word, the function replaces the corresponding "_" characters in "guessedWord" with the letter.
function guess() {
	var indices = [];
	var guess = document.getElementById("input").value;
	letter = checkGuess(guess);
	if (letter === "invalid") {
		confirm("Please guess a single letter.");
	} else if (letter === "guessed") {
		confirm("You have already guessed that letter. Please guess again.");
	} else {
		allGuessed.push(letter);
		for (var i = 0; i < word.length; i++) {
			if (letter === word[i]) {
				indices.push(i);
			}
		}
		if (indices.length === 0) {
			document.getElementById("letters").innerHTML += letter + "  ";
			guessedLetters.push(letter);
		} else {
			for (var j = 0; j < indices.length; j++) {
				guessedWord = guessedWord.slice(0, indices[j]) + letter + guessedWord.slice(indices[j]+1);
				document.getElementById("word").innerHTML = guessedWord;
				allGuessed.push(letter);
			}
		}
	}
	if (guessedLetters.length >= 8) {
		document.getElementById("word").innerHTML = "YOU LOSE!";
	}
	if (guessedWord.search("_") === -1) {
		document.getElementById("word").innerHTML = "YOU WIN!"
	}
}



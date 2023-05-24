// Unordered list where guessed letters will appear
const guessedLettersUl = document.querySelector(".guessed-letters");
// Button with “Guess!” text
const guessButton = document.querySelector(".guess");
// Text input where player enters a letter to guess
const inputLetterBox = document.querySelector(".letter");
// Empty <p> where word in progress will appear
const inProgWord = document.querySelector(".word-in-progress");
// <p> where remaining guesses will appear
const remainingGuesses = document.querySelector(".remaining");
// <span> inside <p> that shows how many guesses are left
const numGuessesLeft = document.querySelector(".remaining span");
// Empty <p> where messages to players appear
const msgToUser = document.querySelector(".message");
// Button that prompts users to play again (hidden at first)
const playAgainButton = document.querySelector(".play-again");

// Starter word
const word = "magnolia";

// letters that the player has guessed
const guessedLetters = [];

// function that replaces the letters of the word with circles before letters are guessed
const hideLetters = function (word) {
  const placeholderLetters = []; // new blank array that circles will get added to
  for (const letter of word) {
    // for every letter in the word
    console.log(letter); // logs out each letter in the console
    placeholderLetters.push("●"); // adds circle to the end of the empty placeholderLetters array for each letter in the word ["●","●" ,"●" ,"●" ,"●" ,"●","●"]
  }
  inProgWord.innerText = placeholderLetters.join(""); // combine all of the objects in the array (all the circles) into one string and add it to the word in progress <p>
};
hideLetters(word); // call function so letters will be replaced with circles

// Event Listener for Guess Button - When button is clicked, store letter value in console  of the guess variable, and then change the input box back to blank.
guessButton.addEventListener("click", function (e) {
  e.preventDefault();
  msgToUser.innerText = "";
  const guess = inputLetterBox.value;
  // console.log(guess);
  const validGuess = inputValidation(guess);
  if (validGuess) {
    makeGuess(validGuess);
  }
  inputLetterBox.value = "";
});

// function expression that validates the player's input
const inputValidation = function (input) {
  const acceptedLetter = /[a-zA-Z]/;
  // if input is empty
  if (input.length === 0) {
    msgToUser.innerText = "Enter a letter to make a guess.";
    // if input is more than one letter
  } else if (input.length > 1) {
    msgToUser.innerText = "One letter at a time!";
    // if input is not a letter
  } else if (!input.match(acceptedLetter)) {
    msgToUser.innerText = `${input} is not a letter. Please enter a letter to make a guess. :)`;
  } else {
    return input;
  }
};

// function that checks if a letter was already guessed, let the player know.  If not, add to the guessed letters array.
const makeGuess = function (guess) {
  guess = guess.toUpperCase();
  if (guessedLetters.includes(guess)) {
    msgToUser.innerText = `You already guessed ${guess}. Try guessing another letter! :)`;
  } else {
    guessedLetters.push(guess);
    console.log(guessedLetters);
  }
};

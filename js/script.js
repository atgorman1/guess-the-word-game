// Unordered list where guessed letters will appear
const guessedLettersUl = document.querySelector(".guessed-letters");
// Button with “Guess!” text
const guessButton = document.querySelector(".guess");
// Text input where player enters a letter to guess
const inputLetterBox = document.querySelector(".letter");
// Empty <p> where word in progress will appear
const inProgWord = document.querySelector(".word-in-progress");
// <p> where remaining guesses will appear
const guessesLeft = document.querySelector(".remaining");
// <span> inside <p> that shows how many guesses are left
const numGuessesLeft = document.querySelector(".remaining span");
// Empty <p> where messages to players appear
const msgToUser = document.querySelector(".message");
// Button that prompts users to play again (hidden at first)
const playAgainButton = document.querySelector(".play-again");

// Number of guesses left
var remainingGuesses = 8;
// Starter word
let word = "cat";
// letters that the player has guessed
const guessedLetters = [];

// async function that pulls words from API and turns the words in the text file into objects in an array
const getWord = async function () {
  const res = await fetch(
    "https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"
  );
  const word = await res.text();
  // since this is a text file and not json, the words need to be converted into an array of objects
  // since the words are split up by a page break, you need to use the /n s the delimiter to break them into individual words
  const wordArray = word.split("\n");
  console.log(wordArray);
  selectRandomWord(wordArray);
};
getWord();

// function that selects a random word from the list of words from the API
const selectRandomWord = async function (words) {
  // Math.random produces a random number between 0 and 1 - multiply by the length of the word array to choose a random index
  // Math.floor rounds the number down since index starts with 0 and you want a whole number to match an index position
  const randomIndex = Math.floor(Math.random() * words.length);
  // randomWord - from the words index, pulling a random index to log out the word that matches that index
  const randomWord = words[randomIndex].trim();
  console.log(randomWord);
  word = randomWord;
  hideLetters(randomWord);
};

// function that replaces the letters of the word with circles before letters are guessed
const hideLetters = function (word) {
  // new blank array that circles will get added to
  const placeholderLetters = [];
  // for every letter in the word
  for (const letter of word) {
    // adds circle to the end of the empty placeholderLetters array for each letter in the word ["●","●" ,"●" ,"●" ,"●" ,"●","●"]
    placeholderLetters.push("●");
  }
  // combine all of the objects in the array (all the circles) into one string and add it to the word in progress <p>
  inProgWord.innerText = placeholderLetters.join("");
};
// call function so letters will be replaced with circles

// Event Listener for Guess Button - When button is clicked, store letter value in console  of the guess variable, and then change the input box back to blank.
guessButton.addEventListener("click", function (e) {
  e.preventDefault();
  // empty any previous messages to the user
  msgToUser.innerText = "";
  // define the value entered in the input box
  const guess = inputLetterBox.value;
  // log out the value in the console
  console.log(guess);
  // define a valid guess as one that has gone through the validation function that checks if it's one letter
  const validGuess = inputValidation(guess);
  // if the guess is valid
  if (validGuess) {
    // run the guess throug the makeguess function that checks if the letter has already been guessed and add unguessed letters to the array
    makeGuess(validGuess);
  }
  // empty the input box
  inputLetterBox.value = "";
});

// function that validates the player's input
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
  // change the guess to uppercase since JS is case sensitive
  guess = guess.toUpperCase();
  // if the letter is already in the guessed letter array
  if (guessedLetters.includes(guess)) {
    // alert user that they guessed the letter
    msgToUser.innerText = `You already guessed ${guess}. Try guessing another letter! :)`;
  } else {
    // if the letter has not been guessed, add it to the end of the array and log out the full array in the console
    guessedLetters.push(guess);
    console.log(guessedLetters);
    displayLetters();
    guessCount(guess);
    updateWordInProg(guessedLetters);
  }
};

// function that shows the guessed letters on screen
const displayLetters = function () {
  guessedLettersUl.innerHTML = "";
  for (const letter of guessedLetters) {
    const li = document.createElement("li");
    li.innerText = letter;
    guessedLettersUl.append(li);
  }
};

// function that updates the word in progress when te player guesses correctly
const updateWordInProg = function (guessedLetters) {
  // transfrom the word to uppercase and redine it
  const wordUpper = word.toUpperCase();
  // create an array made of the uppercase letters in the word being guessed
  const wordArray = wordUpper.split("");
  // check if the letters of the word include the guessed letters
  const revealWord = [];
  // create for...of loop to loop through all the letters in the word being guessed
  for (const letter of wordArray) {
    // in the function of the loop, add if statement to check if the guessed letter is included in the word being guessed
    // for evey letter of the word, it will check if the letter has been guessed
    if (guessedLetters.includes(letter)) {
      // if it has been guessed, aka is included in the guessed letters array, add it to the end of the revealword array
      revealWord.push(letter.toUpperCase());
    } else {
      // if the letter in the word is not in the guessed array, add a circle to the end of the revealword array
      revealWord.push("●");
    }
  }
  // Update the text of the in progress word from placeholder letters to the reveal word array
  inProgWord.innerText = revealWord.join("");
  win();
};

// function that counts the number of guesses remaining
const guessCount = function (guess) {
  const wordUpper = word.toUpperCase();
  if (wordUpper.includes(guess)) {
    msgToUser.innerText = `Nice job! ${guess} is correct!`;
  } else {
    msgToUser.innerText = "Nope! Please guess again.";
    remainingGuesses -= 1;
  }
  numGuessesLeft.innerText = remainingGuesses;
  if (remainingGuesses === 0) {
    msgToUser.innerHTML = `Game over - the correct word is: ${word.toUpperCase()}</br><br>Refresh your browser to guess a new word!`;
    guessButton.disabled = true;
  }
};

// function that checks if player won
const win = function () {
  if (inProgWord.innerText === word.toUpperCase()) {
    msgToUser.classList.add("win");
    msgToUser.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>.`;
  }
};

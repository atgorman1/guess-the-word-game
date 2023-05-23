// Unordered list where guessed letters will appear
const guessedLetters = document.querySelector(".guessed-letters");
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
const messagesToUser = document.querySelector(".message");
// Button that prompts users to play again (hidden at first)
const playAgainButton = document.querySelector(".play-again");

// Starter word
const word = "magnolia";

const hideLetters = function (word) {
  // function with the starter word getting passed to it
  const placeholderLetters = []; // new blank array that circles will get added to
  for (const letter of word) {
    // for every letter in the word
    console.log(letter); // logs out each letter in the console
    placeholderLetters.push("●"); // adds circle to the end of the empty placeholderLetters array for each letter in the word ["●","●" ,"●" ,"●" ,"●" ,"●","●"]
  }
  inProgWord.innerText = placeholderLetters.join(""); // combine all of the objects in the array (all the circles) into one string and add it to the word in progress <p>
};
hideLetters(word);

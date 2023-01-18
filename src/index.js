//pienin ja suurin mahdollinen luku
const min = 1;
const max = 100;
let randomNumber = Math.floor(Math.random() * max - min + 1) + min;
console.log('oikea vastaus:', randomNumber);

const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const time = document.querySelector('.time');

const guessSubmit = document.querySelector('.guessSubmit');
const guessField = document.querySelector('.guessField');

let guessCount = 1;
// arvausten enimmäismäärä
const maxGuessCount = 10;
let resetButton;

// oikeaan arvaukseen mennyt aika
let firstGuess, lastGuess, guessTime;

guessField.focus();

// millisekuntit sekunneiksi
const millisToSec = (millis) => {
    let sec = ((millis % 60000) / 1000).toFixed(0);
    return sec + ' sekuntia';
};

const checkGuess = () => {
    const userGuess = Number(guessField.value);
    if (guessCount === 1) {
        guesses.textContent = 'Previous guesses: ';
        firstGuess = Date.now();
      }
      guesses.textContent += `${userGuess} `;
    
      if (userGuess === randomNumber) {
        lastResult.textContent = 'Congratulations! You got it right!';
        lastResult.style.backgroundColor = 'green';
        // arvausten määrä
        lowOrHi.textContent = 'Number of guesses: ' + guessCount;
        // arvaukseen menneen ajan näyttäminen
        lastGuess = Date.now();
        guessTime = millisToSec(lastGuess - firstGuess);
        time.textContent = 'Time spent guessing: ' + guessTime;
        setGameOver();
      } else if (guessCount === maxGuessCount) {
        lastResult.textContent = '!!!GAME OVER!!!';
        lowOrHi.textContent = '';
        setGameOver();
      } else {
        lastResult.textContent = 'Wrong!';
        lastResult.style.backgroundColor = 'red';
        if (userGuess < randomNumber) {
          lowOrHi.textContent = 'Last guess was too low!';
        } else if (userGuess > randomNumber) {
          lowOrHi.textContent = 'Last guess was too high!';
        }
      }
    
      guessCount++;
      guessField.value = '';
      guessField.focus();
};

guessSubmit.addEventListener('click', checkGuess);

const setGameOver = () => {
    guessField.disabled = true;
    guessSubmit.disabled = true;
    resetButton = document.createElement('button');
    resetButton.textContent = 'Start new game';
    document.body.append(resetButton);
    resetButton.addEventListener('click', resetGame);
};

const resetGame = () => {
    guessCount = 1;

    const resetParas = document.querySelectorAll('.resultParas p');
    for (const resetPara of resetParas) {
      resetPara.textContent = '';
    }
  
    resetButton.parentNode.removeChild(resetButton);
  
    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = '';
    guessField.focus();
  
    lastResult.style.backgroundColor = 'white';
  
    randomNumber = Math.floor(Math.random() * 100) + 1;
};

class Bot {
  constructor() {
    let numberGuess = 50;
    let rounds = 0;
    for (let x = 0; x < 2; x++) {
      console.log(numberGuess);
      guessField.value = numberGuess;
      checkGuess();
      if (lowOrHi.textContent.includes('high')) {
        if (rounds < 3) {
          numberGuess =- 5;
        } else if (rounds > 3 && rounds < 6) {
          numberGuess =- 3;
        }      
      } else {
        if (rounds < 3) {
          numberGuess =+ 5;  
        } else if (rounds > 3 && rounds < 6) {
          numberGuess =+ 3;
        } 
      }
      rounds = x;
    }
  }
};

const bot = new Bot();
const max = 0;
const min = 100;
let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
let d = new Date().toISOString();
console.log(d);
const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');

const guessSubmit = document.querySelector('.guessSubmit');
const guessField = document.querySelector('.guessField');
let startTime = performance.now();
let guessCount = 1;
let resetButton;


/*
Paras strategia on binäärihaku.
Haku aloitetaan taulukon keskeltä. Jos alkiota ei löydy, jaetaan taulukko 
pienempään taulukkoon sen perusteella, onko etsittävä alkio pienempi vai suurempi kuin keskeltä löytynyt alkio.
Joka kerta, kun alkiota ei löydy, taulukko jaetaan pienempään ja etsintä aloitetaan uudestaan keskeltä.
*/

const binarySearch = (startPoint, endPoint) => {
  let start = startPoint;
  let end = endPoint;

  let guess = Math.floor((end - start) / 2);

  while (end > start) {
    console.log(start, end);
    if (guess == randomNumber) {
      console.log("löyty!");
      return guess;
    } else if (guess > randomNumber) {
      console.log("liian iso arvaus:", guess);
      end = guess;
      guess = Math.floor((end + start) / 2) - 1;
    } else if (guess < randomNumber) {
      console.log("liian pieni arvaus:", guess);
      guess = Math.ceil((end + start) / 2);
    } else { return "ei löytynyt"; }
  }
};

function checkGuess() {
    const userGuess = Number(guessField.value);
    if (guessCount === 1) {
      guesses.textContent = 'Previous guesses: ';
    }
    guesses.textContent += `${userGuess} `;

    if (userGuess === randomNumber) {
      lastResult.textContent = 'Congratulations! You got it right!';
      lastResult.style.backgroundColor = 'green';
      lowOrHi.textContent = '';
      setGameOver();
    } else if (guessCount === 10) {
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
  }
  function setGameOver() {
    let endTime = performance.now();
    alert(`Guessing took ${(endTime - startTime) / 1000} seconds and guess amount was ${(guessCount)}`);
    let startTime2 = performance.now();
    startTime = startTime2;
    guessField.disabled = true;
    guessSubmit.disabled = true;
    resetButton = document.createElement('button');
    resetButton.textContent = 'Start new game';
    document.body.append(resetButton);
    resetButton.addEventListener('click', resetGame);
  }
  guessSubmit.addEventListener('click', checkGuess);
  function resetGame() {
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
  }

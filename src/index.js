'use strict';

// Kun kolmea näppäintä painetaan, ajetaan alert()
const secret = () => {
  let keys = [];
  document.addEventListener('keydown', (event) => {
    if (event.key == 'ArrowUp') {
      keys[0] = 'ArrowUp';
      console.log(keys[0]);
    }
    if (event.key == 'ArrowDown') {
      keys[1] = 'ArrowDown';
      console.log(keys[1]);
    }
    if (event.ctrlKey) {
      keys[2] = 'Ctrl';
      console.log(keys[2]);
    }
    if (keys.includes('ArrowUp') && keys.includes('ArrowDown') && keys.includes('Ctrl')) {
      alert('salakoodi');
    }
  });
};

secret();

// tuplaklikkaus tulostaa hiiren koordinaatit
document.ondblclick = function (event) {
  let x = event.clientX;
  let y = event.clientY;

  let coords = "X: " + x + ", Y: " + y;

  console.log(coords);
};

// kosketus tulostaa viestin konsoliin
document.addEventListener('touchstart', function () {
  console.log('ruutua kosketettu');
});

// Kun setInterval:in aika loppuu, ajetaan timer
const timer = (idle) => {
    const para = 'Hurry up!';
    document.querySelector(".content").innerHTML = para;
};

setInterval(timer, 15000);

// hiiren liikuttaminen tai näppäimen painallus ajaa resetTimer-funtkion
const idleTime = () => {
  let time;
  window.onload = resetTimer;
  document.onmousemove = resetTimer;
  document.onkeypress = resetTimer;
  function message() {
    const para = 'Hurry up!';
    document.querySelector(".content").innerHTML = para;
  }
  function resetTimer() {
    clearTimeout(time);
    time = setTimeout(message, 15000);
  }
};

idleTime();
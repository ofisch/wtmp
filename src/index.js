'use strict';

import * as sodexoData from './modules/SodexoData.js';
import * as renderData from './modules/Render.js';

const data = sodexoData;
const render = renderData;

data.getMenuJson(data.courseMenu);

// tulostetaan ruokalajit sivulle
render.renderMenu(data.activeMenu);

// haetaan radionapit sivulta
let radioButtons = document.getElementsByName("sort");

/**
 * Palauttaa valitun radionapin arvon
 * @returns {string}
 */
const getRadioValue = () => {
  let selectedRadio;
  for (let i = 0; i < radioButtons.length; i++) {
    if (radioButtons[i].checked) {
      selectedRadio = radioButtons[i].value;
    }
  }
  return selectedRadio;
};

// EventListenerit napeille
const sortButton = document.querySelector('#sortbutton');
sortButton.addEventListener('click', () => {
    render.renderMenu(data.sortMenu(data.activeMenu, getRadioValue()));
});

const langButton = document.querySelector('#langbutton');
langButton.addEventListener('click', () => {
  if (data.lang == 'fi')
    data.changeLang('en');
  else
    data.changeLang('fi');
});

const randomButton = document.querySelector('#randombutton');
randomButton.addEventListener('click', () => {
  alert(data.getRandomDish(data.activeMenu));
});

const switchButton = document.querySelector('#switchbutton');
switchButton.addEventListener('click', () => {
  data.switchActiveMenu(data.menuFi);
  render.renderMenu(data.sortMenu(data.activeMenu));
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js').then(registration => {
      console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}
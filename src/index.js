'use strict';

import Sodexo from './modules/SodexoData.js';
import Fazer from './modules/FazerData.js';
import * as renderData from './modules/Render.js';

let lang = 'fi';
let menuContainers = [];
let activeMenus = [];

//data.getMenuJson(data.courseMenu);

const renderMenu = (menu, targetElem) => {
  const menuContainer = targetElem;
  menuContainer.innerHTML = '';
  const list = document.createElement('ul');
  for (const dish of menu) {
    const li = document.createElement('li');
    li.textContent = dish;
    list.append(li);
  }
  menuContainer.append(list);
};

const init = async () => {
  activeMenus = [await Sodexo.getDailyMenu('fi'), Fazer.coursesFi];
  console.log('aktiiviset: ', activeMenus);
  menuContainers = document.querySelector('.node-title').getElementsByTagName('p')[0];
  console.log(menuContainers);
  for (const menu of activeMenus) {
    renderMenu(menu, menuContainers);
    console.log('menu: ', menu);
  }
};
init();

const changeLang = async (language) => {
  activeMenus[0] = await Sodexo.getDailyMenu(language);
  console.log('haloo: ', await Sodexo.getDailyMenu(language));

  if (language === 'fi') {
    console.log(Fazer.coursesFi);
    activeMenus[1] = Fazer.coursesFi;
  } else if (language === 'en') {
    activeMenus[1] = Fazer.coursesEn;
    console.log('onks valoo: ', Fazer.coursesEn);
  }
  lang = language;

  for (const [index, menu] of activeMenus.entries()) {
    renderMenu(menu, menuContainers);
  }
};

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
    renderMenu(data.sortMenu(data.activeMenu, getRadioValue()));
});

const langButton = document.querySelector('#langbutton');
langButton.addEventListener('click', () => {
  if (lang == 'fi')
    changeLang('en');
  else
    changeLang('fi');
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

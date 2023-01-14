'use strict';

import Menu from './assets/menu.json';

const courseMenu = Menu.courses;

const coursesFi = [];
const coursesEn = [];

let activeMenu = coursesFi;
let lang = 'fi';

/**
 * Hakee ruokalajien otsikot Json-tiedostosta ja tallentaa listoihin
 * @param {*} menu 
 */
const getMenuJson = (menu) => {
for (let i in menu) {
  coursesFi[i-1] = menu[i].title_fi;
  coursesEn[i-1] = menu[i].title_en;
}
};

getMenuJson(courseMenu);

/**
 * Tulostaa ruokalajit sivulle
 * @param {Array} menu - lista ruokalajeista
 */
const renderMenu = (menu) => {
  const menuBox = document.querySelector('#textbox');
  menuBox.innerHTML = "";
  const list = document.createElement('ul');
  for (let dish of menu) {
    const li = document.createElement('li');
    li.textContent = dish;
    list.append(li);
  }
  menuBox.append(list);
};

// tulostetaan ruokalajit sivulle
renderMenu(activeMenu);

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

/**
 * Järjestää ruokalajit aakkosjärjestykseen
 * @param {Array} menu - lista ruokalajeista
 * @param {string} order - 'asc' tai 'desc'
 * @returns järjestetyn ruokalaji-listan
 */
const sortMenu = (menu, order = 'asc') => {
  let sortedArray;
  if (order == "asc") {
      sortedArray = menu.sort((a, b) => a.localeCompare(b));
      return sortedArray;
  } else {
      sortedArray = menu.sort((a, b) => -1 * a.localeCompare(b));
      return sortedArray;
  }
};

/**
 * Vaihtaa käyttöliittymän kielen
 * @param {string} language - 'fi' tai 'en'
 */
const changeLang = (language) => {
  if (language == 'fi'){
    activeMenu = coursesFi;
  } else if (language == 'en') {
    activeMenu = coursesEn;
  }
  lang = language;
  renderMenu(activeMenu);
};

/**
 * Hakee satunnaisen ruokalajin 
 * @param {*} menu 
 * @returns satunnaisen ruokalajin
 */
const getRandomDish = (menu) => {
  const randomIndex = Math.floor(Math.random() * menu.length);
  return menu[randomIndex];
};


// EventListenerit napeille

const sortButton = document.querySelector('#sortbutton');
sortButton.addEventListener('click', () => {
    renderMenu(sortMenu(activeMenu, getRadioValue()));
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
  alert(getRandomDish(activeMenu));
});

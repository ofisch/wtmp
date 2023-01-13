'use strict';

import Menu from './assets/menu.json';
//console.log('menu.json', Menu);

let lang = 'fi';

const courseMenu = Menu.courses;



/**
 * Renders menu content to html page
 * @param {Array} menu - array of dishes
 */

const renderMenu = (menu) => {
  const menuBox = document.querySelector('#textbox');
  menuBox.innerHTML = "";
  const list = document.createElement('ul');
  let dishes = [];
  for (let x in menu) {
    if (lang == 'fi') {
      dishes[x] = menu[x].title_fi;
    } else {
      dishes[x] = menu[x].title_en;
    }
    const li = document.createElement('li');
    li.textContent = dishes[x];
    list.appendChild(li);
  }
  menuBox.append(list);
};

// tulostetaan ruokalajit sivulle
renderMenu(courseMenu);

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
 * Sorts menu alphabetically
 * @param {Array} menu - Array of dishes
 * @param {string} order - 'asc' or 'desc'
 * @returns sorted menu array
 */

const sortMenu = (menu, order = 'asc') => {
  let sortedArray;
  let menuItems = [];
  for (let x in menu) {
    if (lang == 'fi') {
      menuItems[x] = menu[x].title_fi;
    } else {
      menuItems[x] = menu[x].title_en;
    }
  }

  if (order == "asc") {
    sortedArray = menuItems.sort((a, b) => a.localeCompare(b));
    console.log(sortedArray);
    return sortedArray;
  } else {
    sortedArray = menuItems.sort((a, b) => -1 * a.localeCompare(b));
    console.log(sortedArray);
    return sortedArray;
  }
};

/**
 * Change UI language
 * @param {string} language - 'fi' or 'en'
 */
const changeLang = (language) => {
  if (language == 'fi') {
    //activeMenu = coursesFi;
  } else if (language == 'en') {
    //activeMenu = coursesEn;
  }
  lang = language;
  renderMenu(courseMenu);

};

const getRandomDish = (menu) => {
  const randomIndex = Math.floor(Math.random() * menu.length);
  return menu[randomIndex];
};

const sortButton = document.querySelector('#sortbutton');
sortButton.addEventListener('click', () => {
    renderMenu(sortMenu(courseMenu, getRadioValue()));
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

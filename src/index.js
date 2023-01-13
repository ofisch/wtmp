'use strict';

const coursesEn = ["Hamburger, cream sauce and poiled potates",
"Goan style fish curry and whole grain rice",
"Vegan Chili sin carne and whole grain rice",
"Broccoli puree soup, side salad with two napas",
"Lunch baguette with BBQ-turkey filling",
"Cheese / Chicken / Vege / Halloum burger and french fries"];

const coursesFi = ["Jauhelihapihvi, ruskeaa kermakastiketta ja keitettyä perunaa",
"Goalaista kalacurrya ja täysjyväriisiä",
"vegaani Chili sin carne ja täysjyväriisi",
"Parsakeittoa,lisäkesalaatti kahdella napaksella",
"Lunch baguette with BBQ-turkey filling",
"Juusto / Kana / Kasvis / Halloumi burgeri ja ranskalaiset"];

let lang = 'fi';
let activeMenu = coursesFi;

/**
 * Renders menu content to html page
 * @param {Array} activeMenu - array of dishes
 */

const renderMenu = (activeMenu) => {
  const menuBox = document.querySelector('#textbox');
  menuBox.innerHTML = "";
  const list = document.createElement('ul');
  for (const dish of activeMenu) {
    const li = document.createElement('li');
    li.textContent = dish;
    list.appendChild(li);
  }

  menuBox.append(list);
};
renderMenu(coursesFi);

let radioButtons = document.getElementsByName("sort");

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

const sortMenu = (menu, order='asc') => {
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
 * Change UI language
 * @param {string} language - 'fi' or 'en'
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

const getRandomDish = (menu) => {
  const randomIndex = Math.floor(Math.random()*menu.length);
  return menu[randomIndex];
};

const sortButton = document.querySelector('#sortbutton');
sortButton.addEventListener('click', () => {
  renderMenu(sortMenu(coursesFi, getRadioValue()));
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

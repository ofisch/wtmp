'use strict';

import Sodexo from './modules/sodexo-data';
import Fazer from './modules/fazer-data';


let lang = 'fi';
let menuContainers = [];
let activeMenus = [];

/**
 * Tulostetaan ruokalistan sisältö sivulle
 * @param {Array} menu - ruokalistat array-tyyppisenä
 */
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

/**
 * Käyttöliittymän kielen vaihto
 * @param {string} language
*/
const changeLanguage = async (language) => {
  activeMenus[0] = await Sodexo.getDailyMenu(language);
  if (language === 'fi') {
    activeMenus[1] = Fazer.coursesFi;
  } else if (language === 'en') {
    activeMenus[1] = Fazer.coursesEn;
  }
  lang = language;
  for (const menu of activeMenus.entries()) {
    renderMenu(menu, menuContainers);
  }
};

/**
 * Kielinappi
*/
const langButton = document.querySelector('#lang-button');
langButton.addEventListener('click', () => {
  if (lang === 'fi') {
    changeLanguage('en');
  } else {
    changeLanguage('fi');
  }
});

/**
 * Init sivulle tultaessa
 */
const init = async () => {
  activeMenus = [await Sodexo.getDailyMenu('en'), Fazer.coursesEn];
  menuContainers = document.querySelector('.node-title').getElementsByTagName('p')[0];
  for (const menu of activeMenus.entries()) {
    renderMenu(menu, menuContainers);
  }
};
init();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js').then(registration => {
      console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}

'use strict';

import Menu from '../assets/menu.json';

import * as renderData from './Render.js';
import * as fazerData from './FazerData';

const render = renderData;

const courseMenu = Menu.courses;
const menuFi = fazerData.menuDayFi;
const menuEn = fazerData.menuDayEn;

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
        coursesFi[i - 1] = menu[i].title_fi;
        coursesEn[i - 1] = menu[i].title_en;
    }
};

/**
 * Vaihtaa aktiivisen ruokalistan
 * @param {*} menu 
 */
const switchActiveMenu = (menu) => {
    activeMenu = menu;
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
 * Hakee satunnaisen ruokalajin 
 * @param {*} menu 
 * @returns satunnaisen ruokalajin
 */
const getRandomDish = (menu) => {
    const randomIndex = Math.floor(Math.random() * menu.length);
    return menu[randomIndex];
};

/**
 * Vaihtaa käyttöliittymän kielen
 * @param {string} language - 'fi' tai 'en'
 */
const changeLang = (language) => {
    if (language == 'fi') {
        activeMenu = coursesFi;
    } else if (language == 'en') {
        activeMenu = coursesEn;
    }
    lang = language;
    render.renderMenu(activeMenu);
};

export {
    courseMenu,
    coursesFi,
    coursesEn,
    activeMenu,
    lang,
    getMenuJson,
    sortMenu,
    getRandomDish,
    changeLang,
    switchActiveMenu,
    menuFi,
    menuEn,
};
'use strict';

import {doFetch, getWeekdayIndex} from './network';

const weeklyUrl = 'https://www.sodexo.fi/ruokalistat/output/weekly_json/152';

/**
 * Haetaan ruokalistat Sodexon apista
 *
 * @param {string} lang - ruokalistan kieli - 'fi' tai 'en'
 * @returns ruokalistan array-tyyppisenä
 */
const getDailyMenu = async (lang) => {
  try {
    const weeklyMenu = await doFetch(weeklyUrl);
    const menu = weeklyMenu.mealdates[0];
    console.log('väärä päivä! (debug) -> ', getWeekdayIndex());
        const coursesEn = Object.values(menu.courses).map((course) => course.title_en);
    const coursesFi = Object.values(menu.courses).map((course) => course.title_fi);
    return lang === 'en' ? coursesEn : coursesFi;
  } catch (error) {
    throw new Error('getDailyMenu error' + error);
  }
};

const Sodexo = {getDailyMenu};

export default Sodexo;

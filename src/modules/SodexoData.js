'use strict';

import { doFetch, getWeekdayIndex } from "./network";

const weeklyUrl = 'https://www.sodexo.fi/ruokalistat/output/weekly_json/152';

const getDailyMenu = async (lang) => {
  try {
    const weeklyMenu = await doFetch(weeklyUrl);
    const menu = weeklyMenu.mealdates[getWeekdayIndex()];

    const coursesFi = Object.values(menu.courses).map((course) => course.title_fi);
    const coursesEn = Object.values(menu.courses).map((course) => course.title_en);
    return lang === 'fi' ? coursesFi : coursesEn;
  } catch (error) {
    throw new Error('getDailyMenu error: ' + error);
  }
};

const Sodexo = {getDailyMenu};

export default Sodexo;

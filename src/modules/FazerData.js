'use strict';

import MenuFi from '../assets/menu-fin.json';
import MenuEn from '../assets/menu-en.json';

const menuDayFi = MenuFi.MenusForDays[0].SetMenus[0].Components;
const menuDayEn = MenuEn.MenusForDays[0].SetMenus[0].Components;

export {
    menuDayFi,
    menuDayEn,
};
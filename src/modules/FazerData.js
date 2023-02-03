'use strict';

import MenuFi from '../assets/menu-fin.json';
import MenuEn from '../assets/menu-en.json';

const coursesFi = MenuFi.MenusForDays[0].SetMenus.map((menuItem) => {
  return menuItem.Components.join(', ');
});

const coursesEn = MenuEn.MenusForDays[0].SetMenus.map((menuItem) => {
  return menuItem.Components.join(', ');
});

const Fazer = {coursesFi, coursesEn};
export default Fazer;

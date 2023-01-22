'use strict';

import Menu from './menu.json';



const dishes = [
  { name: 'Lingonberry jam', price: 4.00 },
  { name: 'Mushroom and bean casserole', price: 5.50 },
  { name: 'Chili-flavoured wheat', price: 3.00 },
  { name: 'Vegetarian soup', price: 4.80 },
  { name: 'Pureed root vegetable soup with smoked cheese', price: 8.00 }
];

/**
 *
 * @param {*} dish - ruokalajin nimi
 * @returns - 'true' tai 'false' sen mukaan, onko ruokalajin nimi regexpin mukaisesti validi
 */
const validate = (dish) => {
  //const pattern = /(^[A-Z]^.{4,64}$.*)/;
  const pattern = /^((?=\S*?[A-Z])(?=\S*?[a-z]).{3,64})\S$/;

  if (pattern.test(dish))
    return true;
  else
    return false;
};

/**
 *
 * @param {*} menu - ruokalista
 * @returns - hinnan mukaan nousevasti järjestetyn ruokalistan
 */
const sortByPrice = (menu) => {
  let sortedArray = menu.sort((a, b) => (a.price > b.price) ? 1 : -1);
  return sortedArray;
};

/**
 *
 * @param {*} menu - ruokalista
 * @param {*} max - suurin hinta
 * @returns - suurinta hintaa pienemmät tai yhtä suuret ruokalajit
 */
const displayUnder = (menu, max) => {
  let dishes = sortByPrice(menu);
  let dishesUnder = [];

  for (let dish of dishes) {
    if (dish.price <= max) {
      dishesUnder.push(dish);
    }
  }
  return dishesUnder;
};

/**
 *
 * @param {*} menu - ruokalista
 * @returns - listan, jossa hintoja nostettu 15 prosenttia
 */
const raisePrices = (menu) => {
  let dishes = sortByPrice(menu);
  let menuPrices = [];

  for (let dish of dishes) {
    menuPrices.push(dish.price);
  }

  let modifiedArr = menuPrices.map(function(element) {
    return element + (element/100)*15;
  });

  for (let x = 0; x < dishes.length; x++) {
    dishes[x].price = modifiedArr[x];
  }
  return dishes;
};

/**
 *
 * @param {*} menu - ruokalista
 * @returns - ruokalajien hintojen summan
 */
const sumOfDishes = (menu) => {
  let dishes = sortByPrice(menu);
  let menuPrices = [];

  for (let dish of dishes) {
    menuPrices.push(dish.price);
  }

  const initialValue = 0;
  const sumWithInitial = menuPrices.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initialValue
  );
  return sumWithInitial;
};

console.log(validate(dishes[1].name));
console.log(sortByPrice(dishes));
console.log(displayUnder(dishes, 5));
console.log(raisePrices(dishes));
console.log(sumOfDishes(dishes));

// yhden päivän ruokalista
const lunchMenu = Menu.MenusForDays[0].SetMenus[0].Components;

/**
 * 
 * @param {*} menu - yhden päivän ruokalista
 * @returns - ruokalajit, jotka sisältävät Veg-määreen
 */
const getVeganDishes = (menu) => {
  let veganDishes = [];

  for (let i = 0; i < lunchMenu.length; i++) {
    let specialDiet = lunchMenu[i].split('(');
    if (specialDiet[1].includes('Veg')) {
      veganDishes.push(lunchMenu[i]);
    }
  }
  return veganDishes;
};

console.log(getVeganDishes(lunchMenu));
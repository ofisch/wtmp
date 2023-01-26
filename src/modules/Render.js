'use strict';

/**
 * Tulostaa ruokalajit sivulle
 * @param {Array} menu - lista ruokalajeista
 */
const renderMenu = (menu) => {
    const menuBox = document.querySelector('.node-title').getElementsByTagName('p')[0];
    console.log('boxi', menuBox);
    //const menuBox = nodeContent.getElementsByClassName('node-title').getElementsByTagName('p')[0];
    menuBox.innerHTML = '';
    const list = document.createElement('ul');
    for (let dish of menu) {
        const li = document.createElement('li');
        li.textContent = dish;
        list.append(li);
    }
    menuBox.append(list);
};

export {
    renderMenu,
};
import { dropdown } from '../../dropdown/_dropdown';

const dropdownRoom = document.querySelector('#room-guest .item-dropdown__selection');
dropdown(dropdownRoom);
const choseRoom = dropdownRoom.nextElementSibling;
let adult = choseRoom.querySelector('[data-dropdown="adults"]').textContent = '2';
let children = choseRoom.querySelector('[data-dropdown="children"]').textContent = '1';
choseRoom.querySelector('[data-dropdown="adults"]').previousElementSibling.classList.remove('dropdown-button_inactive');
choseRoom.querySelector('[data-dropdown="children"]').previousElementSibling.classList.remove('dropdown-button_inactive');
dropdownRoom.textContent = `3 гостя`;
import { dropdown } from './_dropdown';

const dropdownSelect = document.querySelector('#guestdrop .item-dropdown__selection');
const dropdownSelectOpen = document.querySelector('#guestopen .item-dropdown__selection');
const dropdownChoose = document.querySelector('#guestchoose .item-dropdown__selection');
const dropdownRoomDefault = document.querySelector('#roomchoice-1 .item-dropdown__selection');
const dropdownRoomOpen = document.querySelector('#roomchoice-2 .item-dropdown__selection');

const dropdownContainer = dropdownSelect.parentNode;

dropdown(dropdownSelect);
dropdown(dropdownSelectOpen);
dropdown(dropdownChoose);
dropdown(dropdownRoomDefault);
dropdown(dropdownRoomOpen);

dropdownSelectOpen.nextElementSibling.classList.add('item-dropdown__menu_active');
dropdownSelectOpen.parentNode.classList.add('item-dropdown_opened');

dropdownChoose.nextElementSibling.classList.add('item-dropdown__menu_active');
dropdownChoose.parentNode.classList.add('item-dropdown_opened');
const chosen = dropdownChoose.nextElementSibling;
chosen.querySelector('[data-dropdown="adults"]').textContent = '2';
chosen.querySelector('[data-dropdown="children"]').textContent = '1';
chosen.querySelector('[data-dropdown="adults"]').previousElementSibling.classList.remove('dropdown-button_inactive');
chosen.querySelector('[data-dropdown="children"]').previousElementSibling.classList.remove('dropdown-button_inactive');
dropdownChoose.textContent = '3 гостя';
dropdownChoose.nextElementSibling.querySelector('.dropdown-btn__clear').classList.add('dropdown-btn__clear_active');


dropdownRoomOpen.nextElementSibling.classList.add('item-dropdown__menu_active');
dropdownRoomOpen.parentNode.classList.add('item-dropdown_opened');
const rooms = document.querySelectorAll('.roomchoice');
rooms.forEach((item) => {
  item.querySelectorAll('[data-dropdown="bedroom"]').forEach((el) => {
    el.textContent = '2';
    el.previousElementSibling.classList.remove('dropdown-button_inactive');
  });
  item.querySelectorAll('[data-dropdown="bed"]').forEach((el) => {
    el.textContent = '2';
    el.previousElementSibling.classList.remove('dropdown-button_inactive');
  });
})
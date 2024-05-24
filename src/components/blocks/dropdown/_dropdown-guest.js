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

dropdownRoomOpen.nextElementSibling.classList.add('item-dropdown__menu_active');
dropdownRoomOpen.parentNode.classList.add('item-dropdown_opened');
const rooms = document.querySelectorAll('.roomchoice');
console.log(rooms)
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
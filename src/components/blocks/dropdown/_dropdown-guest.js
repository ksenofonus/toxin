import { dropdown } from './_dropdown';

const dropdownSelect = document.querySelector('#guestdrop .item-dropdown__selection');
const dropdownSelectOpen = document.querySelector('#guestopen .item-dropdown__selection');
const dropdownChoose = document.querySelector('#guestchoose .item-dropdown__selection');
const dropdownRoom = document.querySelector('#roomchoice .item-dropdown__selection');

const dropdownContainer = dropdownSelect.parentNode;

dropdown(dropdownSelect);
dropdown(dropdownSelectOpen);
dropdown(dropdownChoose);
dropdown(dropdownRoom);


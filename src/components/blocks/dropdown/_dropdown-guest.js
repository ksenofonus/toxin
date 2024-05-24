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


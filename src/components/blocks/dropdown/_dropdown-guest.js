import { dropdown } from './_dropdown';

const dropdownSelect = document.querySelector('#guestdrop .item-dropdown__selection');
const dropdownSelectOpen = document.querySelector('#guestopen .item-dropdown__selection');
const dropdownContainer = dropdownSelect.parentNode;
const clear = dropdownContainer.querySelector('.dropdown-btn__clear');
const apply = dropdownContainer.querySelector('.dropdown-btn__apply');
dropdown(dropdownSelect, clear, apply);
// dropdown(dropdownSelectOpen, clear, apply);


import { dropdown } from './_dropdown';
import { sumTotal } from './_dropdown';

const dropdownSelect = document.getElementById('guestdrop');
const dropdownContainer = dropdownSelect.parentNode;
const itemQuantity = dropdownContainer.querySelectorAll('.item-quantity')
const clear = dropdownContainer.querySelector('.dropdown-btn__clear');
const apply = dropdownContainer.querySelector('.dropdown-btn__apply');
dropdown(dropdownSelect, clear, apply);


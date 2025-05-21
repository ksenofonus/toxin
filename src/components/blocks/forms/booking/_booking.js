import 'Blocks/dropdown/_dropdown-guest';
import { setDatepicker, selectDates } from 'Blocks/datepicker/_datepicker';

const startDate = document.getElementById('start-booking-date');
const endDate = document.getElementById('end-booking-date');
const datepicker = setDatepicker(startDate, endDate);




//nymber with spaces
const digits = document.querySelectorAll('.digit');
digits.forEach((item) => {
  item.textContent = Number(item.textContent).toLocaleString('ru-RU');
})

const amountOfDays = document.querySelector('.days');
selectDates(datepicker, endDate, amountOfDays);

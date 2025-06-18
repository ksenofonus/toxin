import 'Blocks/dropdown/_dropdown-guest';
import setDatepicker from 'Blocks/datepicker/_datepicker';

const startDate = document.getElementById('start-booking-date');
const endDate = document.getElementById('end-booking-date');
const amountOfDays = document.querySelector('.days');
setDatepicker(startDate, endDate, amountOfDays);

// number with spaces
const digits = document.querySelectorAll('.digit');
digits.forEach((item) => {
  const digit = item;
  digit.textContent = Number(item.textContent).toLocaleString('ru-RU');
});

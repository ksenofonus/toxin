import 'Blocks/dropdown/_dropdown-guest';
import setDatepicker from 'Blocks/datepicker/_datepicker';

const container = document.querySelector('.booking-datepicker');
const amountOfDays = document.querySelector('.days');
setDatepicker(container, amountOfDays);
// number with spaces
const digits = document.querySelectorAll('.digit');
digits.forEach((item) => {
  const digit = item;
  digit.textContent = Number(item.textContent).toLocaleString('ru-RU');
});

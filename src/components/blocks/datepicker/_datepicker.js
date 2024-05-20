import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';

const datepicker = document.querySelectorAll('.datepicker');
datepicker.forEach((item) => new AirDatepicker(item));

const filterDatepicker = document.querySelector('.filter-datepicker');
new AirDatepicker(filterDatepicker, {
  range: true,
  multipleDatesSeparator: ' - ',
  dateFormat: 'dd MMM'
  }
  );
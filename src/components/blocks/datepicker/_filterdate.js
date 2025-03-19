import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import { apply, clear } from './_datepicker_buttons';
import '../forms/masked-text/_mask';

export const filterDatepicker = document.querySelector('.filter-datepicker');
export const filterPicker = new AirDatepicker(filterDatepicker, {
  range: true,
  multipleDatesSeparator: ' - ',
  dateFormat: 'dd MMM',
});
if (filterDatepicker) {
  filterDatepicker.addEventListener('click', () => filterPicker.show());
}

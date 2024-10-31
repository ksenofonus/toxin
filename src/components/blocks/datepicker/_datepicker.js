import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import { apply, clear } from './_datepicker_buttons';

// const datepicker = document.querySelectorAll('.datepicker');
// datepicker.forEach((item) => new AirDatepicker(item, {
//   range: true
// }));

const filterDatepicker = document.querySelector('.filter-datepicker');
new AirDatepicker(filterDatepicker, {
  range: true,
  multipleDatesSeparator: ' - ',
  dateFormat: 'dd MMM',
});
//datepicker fields
const startDate = document.getElementById('start-date');
const endDate = document.getElementById('end-date');


const datepicker = new AirDatepicker(startDate, {
  range: true,
  buttons: [clear, apply],
  onSelect: ({ date }) => {
    endDate.value = datepicker.$el.value;
    if (date.length !== 0) {
      datepicker.$el.value = datepicker.formatDate(date[0], 'dd.MM.yyyy');
    }
    if (date.length > 1) {
      endDate.value = datepicker.formatDate(date[1], 'dd.MM.yyyy');
    }
  },
});

endDate.addEventListener('click', () => datepicker.show());

document.body.addEventListener('click', (e) => {
  const target = e.target;
  const isDatepicker =
    target === datepicker.$datepicker ||
    datepicker.$datepicker.contains(target);
  const isStartInput =
    target === datepicker.$el || datepicker.$el.contains(target);
  const isEndInput = target === endDate || endDate.contains(target);
  const isOpen = datepicker.$datepicker.classList.contains('-active-');
  if (!isDatepicker && !isStartInput && !isEndInput && isOpen) {
    datepicker.hide();
  }
});

const manual = () => {
  startDate.addEventListener('keydown', (e) => {
    const val = datepicker.formatDate(startDate.value, 'dd.MM.yyyy');
    if (e.code === 'Enter') {
      datepicker.selectDate(val)
      console.log(val);
    }
  })
//   endDate.addEventListener('keydown', (e) => {
// const val = datepicker.formatDate(endDate.value, 'dd.MM.yyyy');
//   })
}
manual();
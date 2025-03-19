import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import { apply, clear } from './_datepicker_buttons';
import '../forms/masked-text/_mask';

// datepicker fields
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
endDate.addEventListener('focus', () => datepicker.show());

document.body.addEventListener('click', (e) => {
  const { target } = e;
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

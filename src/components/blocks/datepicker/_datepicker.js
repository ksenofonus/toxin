import AirDatepicker from 'air-datepicker';
import daysBetween from 'Blocks/forms/booking/_daysBetween';
import calculateSum from 'Blocks/forms/booking/_calculateSum';
import 'air-datepicker/air-datepicker.css';
import { apply, clear } from './_datepicker_buttons';
import '../forms/masked-text/_mask';

export default function setDatepicker(cont, day) {
  const startfield = cont.firstChild;
  const endfield = cont.lastChild;
  const start = startfield.querySelector('input');
  const end = endfield.querySelector('input');
  let datepicker;
  if (startfield === endfield) {
    datepicker = new AirDatepicker(start, {
      container: cont,
      range: true,
      multipleDatesSeparator: ' - ',
      dateFormat: 'dd MMM',
      buttons: [clear, apply],
      classes: '-custom-position-',
    });
  } else {
    datepicker = new AirDatepicker(start, {
      container: cont,
      range: true,
      dateFormat: 'dd.MM.yyyy',
      buttons: [clear, apply],
      classes: '-custom-position-',
      navTitles: {
        days: 'MMMM yyyy',
      },
      onSelect: ({ date }) => {
        let selected = datepicker.selectedDates;
        let amountOfDays = 1;
        if (date.length !== 0) {
          datepicker.$el.value = datepicker.formatDate(date[0], 'dd.MM.yyyy');
        }
        if (date.length === 1) {
          const today = date[0];
          const tommorow = new Date(today);
          tommorow.setDate(tommorow.getDate() + 1);
          end.value = datepicker.formatDate(tommorow, 'dd.MM.yyyy');
          selected = [today, tommorow];
        }
        if (date.length > 1) {
          end.value = datepicker.formatDate(date[1], 'dd.MM.yyyy');
        }
        if (selected) {
          amountOfDays = daysBetween(selected);
        } else {
          amountOfDays = 4;
        }
        if (day) {
          const dayField = document.querySelector('.days');
          dayField.textContent = amountOfDays;
          calculateSum(day);
        }
      },
    });
    end.addEventListener('click', () => datepicker.show());
    end.addEventListener('focus', () => datepicker.show());
  }
  if (cont.classList.contains('invisible-datepicker')) {
    datepicker.show();
    datepicker.$datepicker.classList.add('invisible');
  }
  document.body.addEventListener('click', (e) => {
    const { target } = e;
    const isDatepicker =
      target === datepicker.$datepicker ||
      datepicker.$datepicker.contains(target);
    const isStartInput =
      target === datepicker.$el || datepicker.$el.contains(target);
    let isEndInput;
    if (end) {
      isEndInput = target === end || end.contains(target);
    }
    const isOpen = datepicker.$datepicker.classList.contains('-active-');
    if (!isDatepicker && !isStartInput && !isEndInput && isOpen) {
      datepicker.hide();
    }
  });
  return datepicker;
}

const datepicker = document.querySelectorAll('.datepicker-container');
datepicker.forEach((dp) => {
  if (!dp.classList.contains('booking-datepicker')) {
    setDatepicker(dp);
  }
});

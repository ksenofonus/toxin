import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import { apply, clear } from './_datepicker_buttons';
import '../forms/masked-text/_mask';

function daysBetween(startDate, endDate) {
  if (!endDate) {
    endDate = startDate
  }
  const diffTime = Math.abs(Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()) - Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()));
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

export function setDatepicker(startID, endID) {
  const start = document.getElementById(startID);
  const end = document.getElementById(endID);
  const datepicker = new AirDatepicker(start, {
    range: true,
    buttons: [clear, apply],
    onSelect: ({ date }) => {
      end.value = datepicker.$el.value;
      if (date.length !== 0) {
        datepicker.$el.value = datepicker.formatDate(date[0], 'dd.MM.yyyy');
      }
      if (date.length > 1) {
        end.value = datepicker.formatDate(date[1], 'dd.MM.yyyy');
      }
      const dates = datepicker.selectedDates;
      const count = daysBetween(dates[0], dates[1]);
      console.log(count);
      return count;
    },
  });

  end.addEventListener('click', () => datepicker.show());
  end.addEventListener('focus', () => datepicker.show());

  document.body.addEventListener('click', (e) => {
    const { target } = e;
    const isDatepicker =
      target === datepicker.$datepicker ||
      datepicker.$datepicker.contains(target);
    const isStartInput =
      target === datepicker.$el || datepicker.$el.contains(target);
    const isEndInput = target === end || end.contains(target);
    const isOpen = datepicker.$datepicker.classList.contains('-active-');
    if (!isDatepicker && !isStartInput && !isEndInput && isOpen) {
      datepicker.hide();
    }
  });
  daysCounter(datepicker);
}






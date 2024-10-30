import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';

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
//buttons
const apply = {
  content: 'Применить',
  className: 'apply-button',
  onClick: (dp) => {
    dp.hide();
  },
};
const clear = {
  content: 'Очистить',
  className: 'clear-button',
  onClick: (dp) => {
    dp.clear();
    const ranged =  dp.$datepicker.querySelectorAll('.-in-range-');
    ranged.forEach(element => {
      element.classList.remove('-in-range-')
    });
  },
};

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

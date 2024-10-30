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
//button
const apply = {
  content: 'Применить',
  className: 'apply-button',
  onclick: (dp) => {},
};

const datepicker = new AirDatepicker(startDate, {
  range: true,
  buttons: ['clear', apply],
  onSelect: ({ date }) => {
    console.log(date[0], date[1]);
    datepicker.$el.value = endDate.value = datepicker.formatDate(
      date[0],
      'dd.MM.yyyy',
    );
    if (date.length > 1) {
      endDate.value = datepicker.formatDate(date[1], 'dd.MM.yyyy');
    }
  },
});

endDate.addEventListener('click', () => datepicker.show())

document.body.addEventListener('click', (e) => {
  const target = e.target;
  const isDatepicker =
    target === datepicker.$datepicker || datepicker.$datepicker.contains(target);
  const isStartInput =
    target === datepicker.$el || datepicker.$el.contains(target);
  let isEndInput = target === endDate || endDate.contains(target)
  if (!isDatepicker && !isStartInput && !isEndInput) {
    datepicker.hide();
  }
})



// let end = new AirDatepicker(endDate, {
//   range: true,
//   position: 'bottom right',
//   onSelect({ date }) {
//     // start.update({
//     //   viewDate: end.viewDate,
//     //   selectedDates: [date],
//     // }),
//     //   {
//     //     silent: true,
//     //   };
//   },
//   buttons: ['clear'],
// });

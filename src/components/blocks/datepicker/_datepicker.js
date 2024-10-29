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
let startDate = document.getElementById('start-date');
let endDate = document.getElementById('end-date');
//button
let apply = {
  content: 'Применить',
  className: 'apply-button',
  onclick: (dp) => {},
};



let start = new AirDatepicker(startDate, {
  range: true,
  onSelect({ date }) {
    console.log(date)
    end.update({
      minDate: date[0],
      maxDate: date[1],
      selectedDates: [date]
    })
    end.selectDate(date[1])
    startDate.value = start.formatDate(date[0], 'dd.MM.yyyy');
  },
  buttons: ['clear', apply],
});


let end = new AirDatepicker(endDate, {
  range: true,
  position: 'bottom right',
  onSelect({ date }) {
    start.update({
      minDate: date[0],
      maxDate: date[1]
    });
  },
  buttons: ['clear'],
});

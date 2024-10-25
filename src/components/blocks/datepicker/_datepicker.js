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
  dateFormat: 'dd MMM'
  }
  );

let datepickerStart = document.getElementById('start-date');
let datepickerEnd = document.getElementById('end-date');

let apply = {
  content: 'Применить',
  className: 'apply-button',
  onclick: (dp) => {
    
  }
}

let start = new AirDatepicker(datepickerStart, {
  range: true,
  onSelect({ date }) {
    end.update({
      minDate: date,
    });
  },
  buttons: ['clear', apply],
  
});

let end = new AirDatepicker(datepickerEnd, {
  onSelect({ date }) {
    start.update({
      maxDate: date,
    });
  },
  buttons: ['clear']
});
start.show();
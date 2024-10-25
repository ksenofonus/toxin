import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';

const datepicker = document.querySelectorAll('.datepicker');
datepicker.forEach((item) => new AirDatepicker(item, {
  range: true
}));

const filterDatepicker = document.querySelector('.filter-datepicker');
new AirDatepicker(filterDatepicker, {
  range: true,
  multipleDatesSeparator: ' - ',
  dateFormat: 'dd MMM'
  }
  );

let datepickerStart, datepickerEnd;
let apply = {
  content: 'Применить',
  className: 'apply-button',
  onclick: (dp) => {
    
  }
}

datepickerStart = new AirDatepicker('#start-date', {
  onSelect({ date }) {
    datepickerEnd.update({
      minDate: date,
    });
  },
  buttons: ['clear', apply],
});

datepickerEnd = new AirDatepicker('#end-date', {
  onSelect({ date }) {
    datepickerStart.update({
      maxDate: date,
    });
  },
  buttons: ['clear']
});
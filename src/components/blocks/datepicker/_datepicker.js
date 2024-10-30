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
    end.update({
      selectedDates: [date]
    })
    
  },
  buttons: ['clear', apply],
});


let end = new AirDatepicker(endDate, {
  range: true,
  position: 'bottom right',
  onSelect({ date }) {
    start.unselectDate();
    
    
  },
  buttons: ['clear'],
});

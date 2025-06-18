import 'Blocks/dropdown/_dropdown-guest';
import setDatepicker from 'Blocks/datepicker/_datepicker';

const startDate = document.getElementById('start-search-date');
const endDate = document.getElementById('end-search-date');
setDatepicker(startDate, endDate);

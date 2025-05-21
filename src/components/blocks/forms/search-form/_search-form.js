import '../../dropdown/_dropdown-guest';
import { setDatepicker, selectDates } from 'Blocks/datepicker/_datepicker';

const startDate = document.getElementById('start-search-date');
const endDate = document.getElementById('end-search-date');
const datepicker = setDatepicker(startDate, endDate);

selectDates(datepicker, endDate)

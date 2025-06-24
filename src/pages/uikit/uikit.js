import './uikit.scss';
import 'Blocks/buttons/like/_like';
import 'Blocks/range-slider/_range-slider';
import 'Blocks/pagination/_paginat';
import 'Blocks/dropdown/_dropdown-guest';
import 'Blocks/datepicker/_filterdate';
import 'Blocks/forms/masked-text/_mask';
import 'Blocks/buttons/checkbox/expandable/_expandable';
import 'Blocks/forms/search-form/_search-form';
import 'Blocks/forms/booking/_booking';
import { starClickEvent } from 'Blocks/buttons/rating/_rating';
import 'Blocks/datepicker/_datepicker';
import 'Blocks/room/_room';

const rating = document.querySelectorAll('.rating-container');
rating.forEach((item) => {
  starClickEvent(item);
});

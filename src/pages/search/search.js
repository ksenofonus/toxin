import './search.scss';
import '../../components/blocks/datepicker/_filterdate';
import '../../components/blocks/dropdown/_dropdown-guest';
import '../../components/blocks/range-slider/_range-slider';
import '../../components/blocks/buttons/checkbox/expandable/_expandable';
import template from '../../components/blocks/room/_room.pug';
import { list } from './_roomslist';

const roomsContainer = document.querySelector('.room-wrapper');
for (let key in list) {
  roomsContainer.insertAdjacentHTML('afterbegin', template(list[key]));
}


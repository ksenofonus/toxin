import './search.scss';
import '../../components/blocks/datepicker/_filterdate';
import '../../components/blocks/dropdown/_dropdown-guest';
import '../../components/blocks/range-slider/_range-slider';
import '../../components/blocks/buttons/checkbox/expandable/_expandable';
import template from '../../components/blocks/room/_room.pug';
import Data from '../../assets/json/rooms.json';
const rooms = Data.reduce((acc, currentdata, index) => {
  acc[index] = currentdata;
  return acc;
}, {});
const roomsContainer = document.querySelector('.room-wrapper');
for (let key in rooms) {
  roomsContainer.insertAdjacentHTML('beforeend', template(rooms[key]));
}


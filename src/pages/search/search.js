import './search.scss';
import '../../components/blocks/datepicker/_filterdate';
import '../../components/blocks/dropdown/_dropdown-guest';
import '../../components/blocks/range-slider/_range-slider';
import '../../components/blocks/buttons/checkbox/expandable/_expandable';
import template from '../../components/blocks/room/_room.pug';
import Data from '../../assets/json/_rooms.json';

const roomsContainer = document.querySelector('.room-container');
roomsContainer.innerHTML = template(Data);
console.log(Data)
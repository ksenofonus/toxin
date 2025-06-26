import './uikit.scss';
import 'Blocks/buttons/like/_like';
import 'Blocks/range-slider/_range-slider';
import simpleTemplating from 'Blocks/pagination/_paginat';
import 'Blocks/dropdown/_dropdown-guest';
import 'Blocks/forms/masked-text/_mask';
import 'Blocks/buttons/checkbox/expandable/_expandable';
import 'Blocks/forms/search-form/_search-form';
import 'Blocks/forms/booking/_booking';
import 'Blocks/datepicker/_datepicker';
import cardsSlider from 'Blocks/room/_room';
import Data from 'Assets/json/rooms.json';

const roomContainer = document.querySelector('.room-template');
const templateData = [Data[0], Data[1]];
const room = simpleTemplating(templateData);
roomContainer.append(room);
const cards = room.querySelectorAll('.room__page');
cardsSlider(cards);

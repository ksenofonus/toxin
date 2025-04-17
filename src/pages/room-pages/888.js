
import { getRoom } from 'Components/layout/roompage/_roompage';
import Data from 'Assets/json/rooms.json';
import 'Components/layout/roompage/_roompage.scss';

const number = 888;
const room = getRoom(Data, number);
console.log(room);

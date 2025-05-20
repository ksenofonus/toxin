import './_roompage.scss';
import { addChart } from 'Blocks/chart/_chart';
import Data from 'Assets/json/rooms.json';
import 'Blocks/buttons/like/_like';
import { setDatepicker } from 'Blocks/datepicker/_datepicker';

function getRoom(data, number) {
  let room = {};
  for (let item of data) {
    if (item.number === number) {
      room = item;
    }
  }
  return room;
}

export function setChart(number) {
  const room = getRoom(Data, number);
  const data = Object.values(room.impressions);
  const labels = Object.keys(room.impressions);
  addChart(data, labels);
}

setDatepicker('start-booking-date', 'end-booking-date');



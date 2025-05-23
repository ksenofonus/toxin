import './_roompage.scss';
import addChart from 'Blocks/chart/_chart';
import Data from 'Assets/json/rooms.json';
import 'Blocks/buttons/like/_like';
import 'Blocks/forms/booking/_booking';

function getRoom(data, number) {
  const room = data.find((el) => el.number === number);
  return room;
}

export default function setChart(number) {
  const room = getRoom(Data, number);
  const data = Object.values(room.impressions);
  const labels = Object.keys(room.impressions);
  addChart(data, labels);
}

import './_roompage.scss';
import Chart from 'chart.js/auto';

export function getRoom(data, number) {
  let room = {};
  for (let item of data) {
    if (item.number === number) {
      room = item;
    }
  }
  return room;
}






import { getRoom } from 'Components/layout/roompage/_roompage';
import Data from 'Assets/json/rooms.json';
import 'Components/layout/roompage/_roompage.scss';
import Chart from 'chart.js/auto';

const number = 888;
const room = getRoom(Data, number);
console.log(room);

const data = [
  { magnificently: 130, good: 65, satisfactorily: 65, disappointed: 0},
];
const doughnut = document.getElementById('myChart');
const legend = document.getElementById('legend');
const ctx = doughnut.getContext('2d');
const gradient = ctx.createLinearGradient(20, 0, 220, 0);
new Chart(doughnut, {
  type: 'doughnut',
  data: {
    datasets: [
      {
        data: [130, 65, 65, 0],
        // backgroundColor: [],
      },
    ],
    labels: ['Великолепно', 'Хорошо', 'Удовлитворительно', 'Разочарован'],
  },
  options: {
    rotation: 180,
    plugins: {
      legend: {
        position: 'right',
        display: true,
        labels: {
          color: 'rgb(255, 99, 132)',
        },
      },
    },
  },
});
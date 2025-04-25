
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
    labels: ['Великолепно', 'Хорошо', 'Удовлетворительно', 'Разочарован'],
  },
  options: {
    rotation: 180,
    aspectRatio: 2.6,
    radius: 60,
    cutout: 52,
    layout: {
      padding: {
        left: 0,
        right: 60
      }
    },
    plugins: {
      legend: {
        position: 'right',
        display: true,
        align: 'end',
        labels: {
          boxWidth: 10,
          boxHeight: 10,
          padding: 12,
          usePointStyle: true,
          pointStyle: 'circle',
          font: {
            size: 14,
            family: 'Montserrat, Arial, sans-serif',
          },
        },
      },
    },
  },
});
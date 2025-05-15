
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

const ctx = doughnut.getContext('2d');
const gradientPerfect = ctx.createLinearGradient(0, 0, 0, 120);
gradientPerfect.addColorStop(0, "#FFE39C");
gradientPerfect.addColorStop(1, '#FFBA9C');
const gradientGood = ctx.createLinearGradient(0, 0, 0, 120);
gradientGood.addColorStop(0, '#6fcf97');
gradientGood.addColorStop(1, '#66d2ea');
const gradientSatisfate = ctx.createLinearGradient(0, 0, 0, 120);
gradientSatisfate.addColorStop(0, '#bc9cff');
gradientSatisfate.addColorStop(1, '#8ba4f9');
const gradientDissapoint = ctx.createLinearGradient(0, 0, 0, 120);
gradientDissapoint.addColorStop(0, '#909090');
gradientDissapoint.addColorStop(1, '#3D4975');

const getOrCreateLegendList = (chart, id) => {
  const legendContainer = document.getElementById(id);
  let listContainer = legendContainer.querySelector('ul');

  if (!listContainer) {
    listContainer = document.createElement('ul');
    listContainer.style.display = 'flex';
    listContainer.style.flexDirection = 'column';
    listContainer.style.margin = 0;
    listContainer.style.padding = 0;

    legendContainer.appendChild(listContainer);
  }

  return listContainer;
};
const htmlLegendPlugin = {
  id: 'htmlLegend',
  afterUpdate(chart, args, options) {
    const ul = getOrCreateLegendList(chart, options.containerID);

    // Remove old legend items
    while (ul.firstChild) {
      ul.firstChild.remove();
    }

    // Reuse the built-in legendItems generator
    const items = chart.options.plugins.legend.labels.generateLabels(chart);
    const labelClass = ['perfect', 'good', 'satisfact', 'disappoint'];

    items.forEach((item, index) => {
      const li = document.createElement('li');
      li.style.cursor = 'pointer';
      li.style.display = 'flex';
      li.style.alignItems = 'center';
      li.onclick = () => {
        const { type } = chart.config;
        if (type === 'pie' || type === 'doughnut') {
          // Pie and doughnut charts only have a single dataset and visibility is per item
          chart.toggleDataVisibility(item.index);
        } else {
          chart.setDatasetVisibility(
            item.datasetIndex,
            !chart.isDatasetVisible(item.datasetIndex)
          );
        }
        chart.update();
      };

      // Color box
      const boxSpan = document.createElement('span');
      boxSpan.classList.add(labelClass[index]);
      boxSpan.style.display = 'inline-block';
      boxSpan.style.flexShrink = 0;
      boxSpan.style.height = '10px';
      boxSpan.style.marginRight = '10px';
      boxSpan.style.width = '10px';
      boxSpan.style.borderRadius = '100%';

      // Text
      const textContainer = document.createElement('p');
      textContainer.style.color = item.fontColor;
      textContainer.style.margin = 0;
      textContainer.style.padding = 0;
      textContainer.style.textDecoration = item.hidden ? 'line-through' : '';

      const text = document.createTextNode(item.text);
      textContainer.appendChild(text);

      li.appendChild(boxSpan);
      li.appendChild(textContainer);
      ul.appendChild(li);
    });
  },
};
new Chart(doughnut, {
  type: 'doughnut',
  data: {
    datasets: [
      {
        data: [130, 65, 65, 0],
        backgroundColor: [
          gradientPerfect,
          gradientSatisfate,
          gradientGood,
          gradientDissapoint,
        ],
      },
    ],
    labels: ['Великолепно', 'Удовлетворительно', 'Хорошо', 'Разочарован'],
  },
  options: {
    rotation: 180,
    cutout: '90%',
    plugins: {
      htmlLegend: {
        containerID: 'legend',
      },
      legend: {
        display: false,
      },
    },
  },
  plugins: [htmlLegendPlugin],
});
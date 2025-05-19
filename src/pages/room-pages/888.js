
import { getRoom } from 'Components/layout/roompage/_roompage';
import { plugins, Tooltip } from 'chart.js';
import Data from 'Assets/json/rooms.json';
import 'Components/layout/roompage/_roompage.scss';
import Chart from 'chart.js/auto';

const number = 888;
const room = getRoom(Data, number);
const data = Object.values(room.impressions);
const labels = Object.keys(room.impressions);

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

const colors = ['#FFBA9C', '#bc9cff', '#6fcf97', '#3D4975'];
const fontColors = labels.reduce((acc, current, index) =>{
  acc[current] = colors[index];
  return acc;
}, {});

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
      li.style.textTransform = 'capitalize';
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
Tooltip.positioners.myCustomPositioner = function (elements, eventPosition) {
  // A reference to the tooltip model
  const tooltip = this;

  /* ... */

  return {
    x: 60,
    y: 60,
    // You may also include xAlign and yAlign to override those tooltip options.
  };
};

const getOrCreateTooltip = (chart) => {
  let tooltipEl = chart.canvas.parentNode.querySelector('div');

  if (!tooltipEl) {
    tooltipEl = document.createElement('div');
    tooltipEl.style.background = 'rgba(250, 250, 250, 0)';
    tooltipEl.style.color = '#bc9cff';
    tooltipEl.style.pointerEvents = 'none';
    tooltipEl.style.position = 'absolute';
    tooltipEl.style.transform = 'translate(-50%, -50%)';
    tooltipEl.style.transition = 'all 1s ease';

    const tooltipBody = document.createElement('div');
    tooltipBody.className = 'tooltip';

    tooltipEl.appendChild(tooltipBody);
    chart.canvas.parentNode.appendChild(tooltipEl);
  }

  return tooltipEl;
};

const externalTooltipHandler = (context) => {
  // Tooltip Element
  const { chart, tooltip } = context;
  const tooltipEl = getOrCreateTooltip(chart);
  // Set Text
  if (tooltip.body) {
    const titleLines = tooltip.title || [];
    const tooltipHead = document.createElement('span');
    const tooltipAfter = document.createElement('span');
    tooltipHead.textContent = `${tooltip.body[0].lines}`;
    tooltipAfter.textContent = 'голосов';

    const tableRoot = tooltipEl.querySelector('.tooltip');

    // Remove old children
    while (tableRoot.firstChild) {
      tableRoot.firstChild.remove();
    }

    // Add new children
    tableRoot.appendChild(tooltipHead);
    tableRoot.appendChild(tooltipAfter);
  }
  const tooltipColor = fontColors[tooltip.title];
  tooltipEl.style.left = '50%';
  tooltipEl.style.top = '50%';
  tooltipEl.style.color = tooltipColor;
};

new Chart(doughnut, {
  type: 'doughnut',
  data: {
    datasets: [
      {
        data: data,
        backgroundColor: [
          gradientPerfect,
          gradientSatisfate,
          gradientGood,
          gradientDissapoint,
        ],
      },
    ],
    labels: labels,
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
      tooltip: {
        enabled: false,
        external: externalTooltipHandler,
        position: 'myCustomPositioner',
      },
    },
  },
  plugins: [htmlLegendPlugin],
});

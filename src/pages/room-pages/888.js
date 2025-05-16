
import { getRoom } from 'Components/layout/roompage/_roompage';
import { plugins, Tooltip } from 'chart.js';
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
    tooltipEl.style.background = 'rgba(0, 0, 0, 0.7)';
    tooltipEl.style.borderRadius = '3px';
    tooltipEl.style.color = 'white';
    tooltipEl.style.opacity = 1;
    tooltipEl.style.pointerEvents = 'none';
    tooltipEl.style.position = 'absolute';
    tooltipEl.style.transform = 'translate(-50%, 0)';
    tooltipEl.style.transition = 'all .1s ease';

    const table = document.createElement('table');
    table.style.margin = '0px';

    tooltipEl.appendChild(table);
    chart.canvas.parentNode.appendChild(tooltipEl);
  }

  return tooltipEl;
};

const externalTooltipHandler = (context) => {
  // Tooltip Element
  const { chart, tooltip } = context;
  const tooltipEl = getOrCreateTooltip(chart);

  // Hide if no tooltip
  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = 0;
    return;
  }

  // Set Text
  if (tooltip.body) {
    const titleLines = tooltip.title || [];
    const bodyLines = tooltip.body.map((b) => b.lines);

    const tableHead = document.createElement('thead');

    titleLines.forEach((title) => {
      const tr = document.createElement('tr');
      tr.style.borderWidth = 0;

      const th = document.createElement('th');
      th.style.borderWidth = 0;
      const text = document.createTextNode(title);

      th.appendChild(text);
      tr.appendChild(th);
      tableHead.appendChild(tr);
    });

    const tableBody = document.createElement('tbody');
    bodyLines.forEach((body, i) => {
      const colors = tooltip.labelColors[i];

      const span = document.createElement('span');
      span.style.background = colors.backgroundColor;
      span.style.borderColor = colors.borderColor;
      span.style.borderWidth = '2px';
      span.style.marginRight = '10px';
      span.style.height = '10px';
      span.style.width = '10px';
      span.style.display = 'inline-block';

      const tr = document.createElement('tr');
      tr.style.backgroundColor = 'inherit';
      tr.style.borderWidth = 0;

      const td = document.createElement('td');
      td.style.borderWidth = 0;

      const text = document.createTextNode(body);

      td.appendChild(span);
      td.appendChild(text);
      tr.appendChild(td);
      tableBody.appendChild(tr);
    });

    const tableRoot = tooltipEl.querySelector('table');

    // Remove old children
    while (tableRoot.firstChild) {
      tableRoot.firstChild.remove();
    }

    // Add new children
    tableRoot.appendChild(tableHead);
    tableRoot.appendChild(tableBody);
  }

  const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

  // Display, position, and set styles for font
  tooltipEl.style.opacity = 1;
  tooltipEl.style.left = positionX + tooltip.caretX + 'px';
  tooltipEl.style.top = positionY + tooltip.caretY + 'px';
  tooltipEl.style.font = tooltip.options.bodyFont.string;
  tooltipEl.style.padding =
    tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
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
      tooltip: {
        enabled: false,
        intersect: false,
        external: externalTooltipHandler,
        position: 'myCustomPositioner',
        callbacks: {
          title: function (tooltipItem) {
            // console.log(tooltipItem);
            return tooltipItem[0].parsed;
          },
          afterTitle: function () {
            return 'голосов';
          },
        },
      },
    },
  },
  plugins: [htmlLegendPlugin],
});

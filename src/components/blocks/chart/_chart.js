import Chart from 'chart.js/auto';
import { htmlLegendPlugin } from './_legend';
import { externalTooltipHandler } from './_tooltip';
import { getColors } from './_getColors';
import { plugins, Tooltip } from 'chart.js';


export function addChart(data, labels) {
  const doughnut = document.getElementById('myChart');
  
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
  new Chart(doughnut, {
    type: 'doughnut',
    data: {
      datasets: [
        {
          data: data,
          backgroundColor: getColors(doughnut),
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
}
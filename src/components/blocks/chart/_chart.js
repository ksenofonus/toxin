import Chart from 'chart.js/auto';
import { plugins, Tooltip } from 'chart.js';
import { htmlLegendPlugin } from './_legend';
import externalTooltipHandler from './_tooltip';
import { getColors } from './_getColors';

export default function addChart(data, labels) {
  const doughnut = document.getElementById('myChart');
  Tooltip.positioners.myCustomPositioner = function positioner() {
    const tooltip = this;
    return {
      x: 60,
      y: 60,
    };
  };
  const chart = new Chart(doughnut, {
    type: 'doughnut',
    data: {
      datasets: [
        {
          data,
          backgroundColor: getColors(doughnut),
        },
      ],
      labels,
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

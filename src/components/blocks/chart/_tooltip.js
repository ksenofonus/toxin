import { getFontColors } from "./_getColors";
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

export const externalTooltipHandler = (context) => {
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
  
  const fontColors = getFontColors(chart);
  const tooltipColor = fontColors[tooltip.title];
  tooltipEl.style.left = '50%';
  tooltipEl.style.top = '50%';
  tooltipEl.style.color = tooltipColor;
};


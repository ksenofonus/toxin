export function getColors(chart) {
  const ctx = chart.getContext('2d');
  //gradient for arcs
  const gradientPerfect = ctx.createLinearGradient(0, 0, 0, 120);
  gradientPerfect.addColorStop(0, '#FFE39C');
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
  const gradientColors = [
    gradientPerfect,
    gradientSatisfate,
    gradientGood,
    gradientDissapoint,
  ];
  return gradientColors;
}

export function getFontColors(chart) {
  const colors = ['#ffba9a', '#bc9cff', '#6fcf97', '#3d4975'];
  const labels = [];
  for (let i of chart.legend.legendItems) {
    labels.push(i.text);
  }
  const fontColors = labels.reduce((acc, current, index) => {
    acc[current] = colors[index];
    return acc;
  }, {});
  return fontColors;
}

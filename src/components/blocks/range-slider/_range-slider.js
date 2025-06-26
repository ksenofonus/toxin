import 'Assets/lib/noUiSlider-15.7.2/_nouislider.scss';
import * as noUiSlider from 'Assets/lib/noUiSlider-15.7.2/_nouislider';
import * as wNumb from 'Assets/lib/_wNumb';

const sliderFormat = document.querySelector('.range-slider_slider');

noUiSlider.create(sliderFormat, {
  start: [5000, 10000],
  connect: true,
  step: 50,
  range: {
    min: [200],
    max: [15500],
  },
  format: wNumb({
    decimals: 0,
    thousand: ' ',
    suffix: '&#8381',
  }),
});

const minPrice = document.querySelector('.min-price');
const maxPrice = document.querySelector('.max-price');

const price = [minPrice, maxPrice];

sliderFormat.noUiSlider.on('update', (values, handle) => {
  price[handle].innerHTML = values[handle];
});

minPrice.addEventListener('change', () => {
  sliderFormat.noUiSlider.set(this.value);
});
maxPrice.addEventListener('change', () => {
  sliderFormat.noUiSlider.set(this.value);
});

export default noUiSlider.create;

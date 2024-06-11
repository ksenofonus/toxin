import '../../../assets/lib/noUiSlider-15.7.2/_nouislider.scss';
import * as noUiSlider from '../../../assets/lib/noUiSlider-15.7.2/_nouislider';
import * as wNumb from '../../../assets/lib/_wNumb';

const sliderFormat = document.querySelector('.range-slider_slider');

noUiSlider.create(sliderFormat, {
    start: [5000, 10000],
    connect: true,
    step: 50,
    range: {
        'min': [300],
        'max': [15500]
    },
    format: wNumb({
        decimals: 0,
        thousand: ' ',
        suffix: '&#8381'
    })
});

const minPrice = document.querySelector('.min-price');
const maxPrice = document.querySelector('.max-price');

const price = [
    minPrice,
    maxPrice
];


sliderFormat.noUiSlider.on('update', function (values, handle) {
    price[handle].innerHTML = values[handle];
});

minPrice.addEventListener('change', function () {
    sliderFormat.noUiSlider.set(this.value);
});
maxPrice.addEventListener('change', function () {
    sliderFormat.noUiSlider.set(this.value);
});

export default noUiSlider.create;


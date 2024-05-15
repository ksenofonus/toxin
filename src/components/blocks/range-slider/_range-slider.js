import '../../../assets/lib/noUiSlider-15.7.2/_nouislider.scss';
import * as noUiSlider from '../../../assets/lib/noUiSlider-15.7.2/_nouislider';

const slider = document.querySelector('.range-slider_slider');

noUiSlider.create(slider, {
    start: [5000, 10000],
    connect: true,
    step: 100,
    range: {
        'min': [0],
        'max': [15000]
    }
});

export default create;


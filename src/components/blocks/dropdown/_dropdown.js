import $ from 'jquery';
import '../../../assets/lib/dropdown/_item-quantity-dropdown.min.css';
import iqDropdown from '../../../assets/lib/dropdown/_item-quantity-dropdown.min';

$('.iqdropdown').iqDropdown({
  maxItems: Infinity,
  minItems: 0,
  selectionText: 'item',
  textPlural: 'items',
  controls: {
    position: 'right',
    displayCls: 'iqdropdown-content',
    controlsCls: 'iqdropdown-item-controls',
    counterCls: 'counter',
  },
  items: {},
  onChange: () => {},
  beforeDecrement: () => true,
  beforeIncrement: () => true,
})
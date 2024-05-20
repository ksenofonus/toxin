import $ from 'jquery';
import '../../../assets/lib/dropdown/_item-quantity-dropdown.min.scss';
import iqDropdown from '../../../assets/lib/dropdown/_item-quantity-dropdown.min';

$('.iqdropdown').iqDropdown({
      // max total items
      maxItems: Infinity,
      // min total items
      minItems: 0,
      // text to show on the dropdown override data-selection-text attribute
      selectionText: 'item',
      // text to show for multiple items
      textPlural: 'items',
      // optionally can use setSelectionText function to override selectionText
      controls: {
        position: 'right',
        displayCls: 'iqdropdown-item-display',
        controlsCls: 'iqdropdown-item-controls',
        counterCls: 'counter'
      }
    }
  )
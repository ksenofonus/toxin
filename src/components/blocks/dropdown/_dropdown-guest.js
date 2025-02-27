
import dropdownToggle from './js/_dpopdownToggle';
import counter from './js/_dropdownCounter';

function dropdown() {
  const dropdowns = document.querySelectorAll('.dropdown__item');
  dropdowns.forEach((item) => {
    item.addEventListener('click', (event) => {
      const current = event.currentTarget;
      dropdownToggle(current);
    });
    const menu = item.nextElementSibling;
    counter(menu);
  });
}
dropdown();


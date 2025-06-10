import dropdownToggle from './js/_dpopdownToggle';
import counter from './js/_dropdownCounter';
import apply from './js/_apply';

function dropdown() {
  const dropdowns = document.querySelectorAll('.dropdown__item');
  dropdowns.forEach((item) => {
    item.addEventListener('click', (event) => {
      const current = event.currentTarget;
      dropdownToggle(current);
      document.body.addEventListener('click', (e) => {
        const { target } = e;
        const isDropdown = target === item || item.contains(target);
        const isMenu =
          target === item.nextElementSibling ||
          item.nextElementSibling.contains(target);
        if (!isDropdown && !isMenu) {
          item.parentElement.classList.remove('dropdown_active');
        }
      });
    });
    const menu = item.nextElementSibling;
    counter(menu);
    if (menu.querySelector('.dropdown__btn__apply')) apply(menu);
  });
}
dropdown();

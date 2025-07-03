const burger = document.querySelector('.burger');
const menu = document.querySelector('.header-menu');

function burgerToggle() {
  burger.addEventListener('click', () => {
    burger.classList.toggle('burger_open');
    menu.classList.toggle('header-menu_open');
    document.body.classList.toggle('no-scroll');
  });
}
burgerToggle();

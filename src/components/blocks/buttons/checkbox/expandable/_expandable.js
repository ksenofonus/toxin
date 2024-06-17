const expName = document.querySelectorAll('.exp-checkbox__header');

expName.forEach((item) => {
  item.addEventListener('click', () => {
    item.parentElement.classList.toggle('exp-checkbox_active');
  })
})
const expName = document.querySelectorAll('.exp-checkbox__header');
// const expContainer = ;


expName.forEach((item) => {
  item.addEventListener('click', () => {
    item.nextElementSibling.classList.toggle('exp-checkbox__container_active')
  })
})
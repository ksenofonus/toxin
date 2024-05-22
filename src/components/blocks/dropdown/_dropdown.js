// const dropdownContainer = document.querySelectorAll('.item-dropdown');
const dropdownSelect = document.querySelectorAll('.item-dropdown_selection');
// const dropdownMenu = document.querySelectorAll('.item-dropdown_menu');
const body = document.querySelector('.container');
// const decreaseButton = document.querySelectorAll('.decrease');
// const itemQuantity = document.querySelectorAll('.item-quantity');

dropdownSelect.forEach((item) => {
  item.addEventListener('click', (event) => {
    const dropdownContainer = item.parentNode;
    const dropdownMenu = item.nextElementSibling;
    const increaseButton = dropdownMenu.querySelectorAll('.increase');
    const decreaseButton = dropdownMenu.querySelectorAll('.decrease');
    const itemQuantity = dropdownMenu.querySelectorAll('.item-quantity');
    const limitGuest = 20;
    console.log(event.target.textContent)
    //показать меню / show menu
    dropdownMenu.classList.toggle('item-dropdown_menu__closed');
    dropdownContainer.classList.toggle('item-dropdown__opened');
    //кнопка плюс
    increaseButton.forEach((item, index) => {
      item.addEventListener('click', (event) => {
        event.preventDefault();
        let itemVal = parseInt(itemQuantity[index].textContent);
        itemVal < limitGuest ? itemQuantity[index].textContent = itemVal + 1 : itemVal = limitGuest;
        if (itemVal >= 0) {
          decreaseButton[index].classList.remove('dropdown-button__inactive');
        }
        if (itemVal >= limitGuest - 1) {
          item.classList.add('dropdown-button__inactive');
        }
        console.log(itemQuantity[index].textContent)
      })
    })
    //кнопка минус
    decreaseButton.forEach((item, index) => {
      item.addEventListener('click', (event) => {
        event.preventDefault();
        let itemVal = parseInt(itemQuantity[index].textContent);
        itemVal > 0 ? itemQuantity[index].textContent = itemVal - 1 : itemVal = 0;
        if (itemVal <= limitGuest) {
          increaseButton[index].classList.remove('dropdown-button__inactive');
        }
        if (itemVal <= 1) {
          item.classList.add('dropdown-button__inactive');
        }
      })
    })
  })
})

const setActiveButton = (x, index) => {
  if (x === 0) {
    decreaseButton[index].classList.add('dropdown-button__inactive');
  } else if (x > 0 && x < 20) {
    decreaseButton.classList.remove('dropdown-button__inactive');
    increaseButton.classList.remove('dropdown-button__inactive');
  } else if (x === 20) {
    increaseButton.classList.add('dropdown-button__inactive');
  }
}
//установить текст / set selection text
const setSelectionTextGuest = (item, index) => {
  item.textContent = sumTotal()
}


// сумма элементов
const sumTotal = (item, items) => {
  if (item.classList.contains('.guest')) {
    console.log(parSeInt(items[0].textContent) + parSeInt(items[1].textContent));
  }
}
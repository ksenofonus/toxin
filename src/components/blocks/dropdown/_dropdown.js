const dropdownContainer = document.querySelectorAll('.item-dropdown');
const dropdownSelect = document.querySelectorAll('.item-dropdown_selection');
const dropdownMenu = document.querySelectorAll('.item-dropdown_menu');
const increaseButton = document.querySelectorAll('.increase');
const decreaseButton = document.querySelectorAll('.decrease');
const itemQuantity = document.querySelectorAll('.item-quantity');
const selectionText = document.querySelectorAll('.selectionText');

//показать меню / show menu
dropdownSelect.forEach((item, index) => {
  item.addEventListener('click', () => {
    dropdownMenu[index].classList.toggle('item-dropdown_menu__closed');
    dropdownContainer[index].classList.toggle('item-dropdown__opened');
  })
})
//кнопка плюс / increase button
increaseButton.forEach((item, index) => {
  item.addEventListener('click', (event) => {
    event.preventDefault();
    itemQuantity[index].textContent < 20 ? itemQuantity[index].textContent = parseInt(itemQuantity[index].textContent) + 1 : itemQuantity[index].textContent = 20;
  
  })
})
//кнопка минус / decrease button
decreaseButton.forEach((item, index) => {
  item.addEventListener('click', (event) => {
    event.preventDefault();
    itemQuantity[index].textContent > 0 ? itemQuantity[index].textContent -= 1 : itemQuantity[index].textContent=0;
    
  })
})

//установить текст / set selection text
const setSelectionText = (index) => {
  selectionText[index]
  let totalItem = 0;
  const name = {
    singular: "гость",
    some: "гостя",
    plural: "гостей",
  }
}


// сумма элементов
const sumTotal = (index) => {
  
}
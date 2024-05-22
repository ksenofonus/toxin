const dropdownContainer = document.querySelectorAll('.item-dropdown');
const dropdownSelect = document.querySelectorAll('.item-dropdown_selection');
const dropdownMenu = document.querySelectorAll('.item-dropdown_menu');
const increaseButton = document.querySelectorAll('.increase');
const decreaseButton = document.querySelectorAll('.decrease');
const itemQuantity = document.querySelectorAll('.item-quantity');

//показать меню / show menu
dropdownSelect.forEach((item, index) => {
  item.addEventListener('click', () => {
    item.nextElementSibling.classList.toggle('item-dropdown_menu__closed');
    item.parentNode.classList.toggle('item-dropdown__opened');
  })
})
//кнопка плюс / increase button
increaseButton.forEach((item, index) => {
  item.addEventListener('click', (event) => {
    event.preventDefault();
    let itemVal = parseInt(itemQuantity[index].textContent);
    itemVal < 20 ? itemQuantity[index].textContent = itemVal + 1 : itemVal = 20;
    
  })
})
//кнопка минус / decrease button
decreaseButton.forEach((item, index) => {
  item.addEventListener('click', (event) => {
    event.preventDefault();
    let itemVal = parseInt(itemQuantity[index].textContent);
    itemVal > 0 ? itemQuantity[index].textContent = itemVal - 1 : itemVal = 0;
  })
})

//установить текст / set selection text
const setSelectionTextGuest = (item, index) => {
  item.textContent = sumTotal()
}


// сумма элементов
const sumTotal = (items, index) => {
  return 1;
}
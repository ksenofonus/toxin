import declination from './_decl';
const dropdownSelect = document.querySelectorAll('.item-dropdown_selection');

dropdownSelect.forEach((item) => {
  item.addEventListener('click', (event) => {
    const dropdownContainer = item.parentNode;
    const dropdownMenu = item.nextElementSibling;
    const increaseButton = dropdownMenu.querySelectorAll('.increase');
    const decreaseButton = dropdownMenu.querySelectorAll('.decrease');
    const itemQuantity = dropdownMenu.querySelectorAll('.item-quantity');
    let selectText = item;
    const limitGuest = 20;
    //показать/закрыть меню / show/close menu
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
        selectText.textContent = sumTotal(dropdownContainer, itemQuantity)
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
        selectText.textContent = sumTotal(dropdownContainer, itemQuantity)
      })
    })
  })
})

document.querySelector('.container').addEventListener('click', (event) => {
  event.stopPropagation()
  let target = event.target;
  dropdownSelect.forEach((item) => {
    if (target != item) {
      item.nextElementSibling.classList.add('item-dropdown_menu__closed');
      item.parentNode.classList.remove('item-dropdown__opened')
      console.log(item.parentNode)
    } else {
      console.log('yes', target)
    }
  })

})

// сумма элементов
const sumTotal = (container, items, select) => {
  if(container.classList.contains('guest')) {
    let adult = Number(Array.from(items).find((elem) => elem.id === 'adults').textContent);
    let children = Number(Array.from(items).find((elem) => elem.id === 'children').textContent);
    let infant = Number(Array.from(items).find((elem) => elem.id === 'infant').textContent);
    let sum = adult + children;
    const guests = ['гость', 'гостя', 'гостей'];
    const infants = ['младенец', 'младенца', 'младенцев'];
    let text = '';
    if (sum === 0) {
      text = 'Сколько гостей';
    } else if (infant === 0) {
      text = `${sum} ${declination(sum, guests)}`
    } else {
      text = `${sum} ${declination(sum, guests)}, ${infant} ${declination(infant, infants)}`
    }
    return text;
  }
  else {
    console.log(false)
  }
}


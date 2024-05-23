import declination from './_decl';
const dropdownSelect = document.querySelectorAll('.item-dropdown__selection');
const menu = document.querySelectorAll('.item-dropdown__menu');

dropdownSelect.forEach((item) => {
  item.addEventListener('click', (event) => {
    const dropdownContainer = item.parentNode;
    const dropdownMenu = item.nextElementSibling;
    const increaseButton = dropdownMenu.querySelectorAll('.increase');
    const decreaseButton = dropdownMenu.querySelectorAll('.decrease');
    const itemQuantity = dropdownMenu.querySelectorAll('.item-quantity');
    const clear = dropdownMenu.querySelector('.dropdown-btn__clear');
    const apply = dropdownMenu.querySelector('.dropdown-btn__apply');
    let selectText = item;
    const limitGuest = 20;
    //показать/закрыть меню / show/close menu
    dropdownMenu.classList.toggle('item-dropdown__menu_active');
    dropdownContainer.classList.toggle('item-dropdown_opened');
    //кнопка плюс
    increaseButton.forEach((item, index) => {
      item.addEventListener('click', (event) => {
        event.preventDefault();
        let itemVal = parseInt(itemQuantity[index].textContent);
        itemVal < limitGuest ? itemQuantity[index].textContent = itemVal + 1 : itemVal = limitGuest;
        if (itemVal >= 0) {
          decreaseButton[index].classList.remove('dropdown-button_inactive');
        }
        if (itemVal >= limitGuest - 1) {
          item.classList.add('dropdown-button_inactive');
        }
        if (sumTotal(dropdownContainer, itemQuantity).total !== 0) {
          clear.classList.add('dropdown-btn__clear_active');
        }
        selectText.textContent = sumTotal(dropdownContainer, itemQuantity).text
      })
    })
    //кнопка минус
    decreaseButton.forEach((item, index) => {
      item.addEventListener('click', (event) => {
        event.preventDefault();
        let itemVal = parseInt(itemQuantity[index].textContent);
        itemVal > 0 ? itemQuantity[index].textContent = itemVal - 1 : itemVal = 0;
        if (itemVal <= limitGuest) {
          increaseButton[index].classList.remove('dropdown-button_inactive');
        }
        if (itemVal <= 1) {
          item.classList.add('dropdown-button_inactive');
        }
        if (sumTotal(dropdownContainer, itemQuantity).total === 0) {
          clear.classList.remove('dropdown-btn__clear_active');
        }
        selectText.textContent = sumTotal(dropdownContainer, itemQuantity).text
      })
    })
  })
})



// сумма элементов
const sumTotal = (container, items, select) => {
  if(container.classList.contains('guest')) {
    let adult = Number(Array.from(items).find((elem) => elem.id === 'adults').textContent);
    let children = Number(Array.from(items).find((elem) => elem.id === 'children').textContent);
    let infant = Number(Array.from(items).find((elem) => elem.id === 'infant').textContent);
    let sum = adult + children;
    let total = adult + children + infant;
    const guests = ['гость', 'гостя', 'гостей'];
    const infants = ['младенец', 'младенца', 'младенцев'];
    let text = '';
    if (sum === 0 && infant === 0) {
      text = 'Сколько гостей';
    } else if (sum !== 0 && infant === 0) {
      text = `${sum} ${declination(sum, guests)}`
    } else if (sum === 0 && infant !== 0) {
      text = `${infant} ${declination(infant, infants)}`
    } else {
      text = `${sum} ${declination(sum, guests)}, ${infant} ${declination(infant, infants)}`
    }
    return ({adult: adult,
             children: children,
             infant: infant,
             total: total,
             text: text});
  }
  else {
    console.log(false)
  }
}


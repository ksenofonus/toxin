import declination from './_decl';
// const dropdownSelect = document.querySelectorAll('.item-dropdown__selection');
// const menu = document.querySelectorAll('.item-dropdown__menu');

function dropdown(select) {
  const dropdownContainer = select.parentNode;
  const dropdownMenu = select.nextElementSibling;
  const increaseButton = dropdownMenu.querySelectorAll('.increase');
  const decreaseButton = dropdownMenu.querySelectorAll('.decrease');
  const itemQuantity = dropdownMenu.querySelectorAll('.item-quantity');
  const clear = dropdownContainer.querySelector('.dropdown-btn__clear');
  const apply = dropdownContainer.querySelector('.dropdown-btn__apply');
  let selectText = select;
  const limitGuest = 20;
  const closeDrop = () => {
    dropdownMenu.classList.toggle('item-dropdown__menu_active');
    dropdownContainer.classList.toggle('item-dropdown_opened');
  }
  //показать/закрыть меню / show/close menu
  select.addEventListener('click', (event) => {
    closeDrop();
    //кнопка плюс
  })
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
      if (clear) {
        if(sumTotal(dropdownContainer, itemQuantity).total !== 0) {
          clear.classList.add('dropdown-btn__clear_active');
        } else {
          clear.classList.remove('dropdown-btn__clear_active');
        }
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
      if (clear) {
          if(sumTotal(dropdownContainer, itemQuantity).total !== 0) {
            clear.classList.add('dropdown-btn__clear_active');
          } else {
            clear.classList.remove('dropdown-btn__clear_active');
          }
      }
      selectText.textContent = sumTotal(dropdownContainer, itemQuantity).text
    })
  })
  if (clear) {
    clear.addEventListener('click', (e) => {
      e.preventDefault();
      selectText.textContent = 'Сколько гостей';
      itemQuantity.forEach((item) => item.textContent = 0)
    })
  }
  if (apply) {
    apply.addEventListener('click', (e) => {
      e.preventDefault();
      closeDrop();
    })
  }
  // закрыть меню при клике вне блока
  document.querySelector('.container').addEventListener('click', (event) => {
    const target = event.target;
    let isMenu = target === dropdownMenu || dropdownMenu.contains(target);
    const menuIsOpen = dropdownMenu.classList.contains('item-dropdown__menu_active');
    const isContainer = select.contains(target);
    if (!isMenu && menuIsOpen && !isContainer) {
      dropdownMenu.classList.remove('item-dropdown__menu_active');
      dropdownContainer.classList.remove('item-dropdown_opened');
    }
  }, true)
}


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

export { dropdown };
export { sumTotal };
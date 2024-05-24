import declination from './_decl';

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
  select.addEventListener('click', () => {
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
      selectText.textContent = sumTotal(dropdownContainer, itemQuantity).defaultText;
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
  const guests = ['гость', 'гостя', 'гостей'];
  const infants = ['младенец', 'младенца', 'младенцев'];
  const bedrooms = ['спальня', 'спальни', 'спален'];
  const beds = ['кровать', 'кровати', 'кроватей'];
  const bathroom = ['ванная...', 'ванные...', 'ванных...'];
  let text = '';
  if(container.classList.contains('guest')) {
    const defaultText = 'Сколько гостей';
    let adult = Number((container.querySelector('[data-dropdown="adults"]')).textContent);
    let children = Number((container.querySelector('[data-dropdown="children"]')).textContent);
    let infant = Number((container.querySelector('[data-dropdown="infant"]')).textContent);
    let sum = +adult + +children;
    let total = adult + children + infant;
    if (sum === 0 && infant === 0) {
      text = defaultText;
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
             defaultText: defaultText,
             text: text});
  }
  else if (container.classList.contains('roomchoice')) {
    const defaultText = '2 спальни, 2 кровати...';
    let room = Number(container.querySelector('[data-dropdown="bedroom"]').textContent);
    let bed = Number(container.querySelector('[data-dropdown="bed"]').textContent);
    let bath = Number(container.querySelector('[data-dropdown="bath"]').textContent);
    if (room === 0 && bed === 0 && bath === 0) {
      text = defaultText;
    } else if (room === 0 && bed === 0 && bath !== 0){
      text = `${bath} ${declination(bath, bathroom)}`;
    } else if (room === 0 && bed !== 0 && bath === 0) {
      text = `${bed} ${declination(bed, beds)}`;
    } else if (room !== 0 && bed === 0 && bath === 0) {
      text = `${room} ${declination(room, bedrooms)}`;
    } else if (room === 0 && bed !== 0 && bath !== 0){
      text = `${bed} ${declination(bed, beds)}, ${bath} ${declination(bath, bathroom)}`;
    } else if (room !== 0 && bed === 0 && bath !== 0){
      text = `${room} ${declination(room, bedrooms)}, ${bath} ${declination(bath, bathroom)}`;
    } 
     else {
      text = `${room} ${declination(room, bedrooms)}, ${bed} ${declination(bed, beds)}...`;
    }
    return ({bedroom: room,
             bed: bed,
             bath: bath,
             defaultText: defaultText,
             text: text
    })
}}

export { dropdown };
export { sumTotal };
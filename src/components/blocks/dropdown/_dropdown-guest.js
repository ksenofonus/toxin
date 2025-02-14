// import sumTotal from './_dropdown';

const dropdowns = document.querySelectorAll('.dropdown__item');
function dropdownToggle(item) {
  item.parentElement.classList.toggle('dropdown_active');
}

function increase() {

}

function counter(item) {
  
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
        if(sumTotal(dropdownContainer).total !== 0) {
          clear.classList.add('dropdown-btn__clear_active');
        } else {
          clear.classList.remove('dropdown-btn__clear_active');
        }
      }
      selectText.textContent = sumTotal(dropdownContainer).text
    })
  })
}

function sumTotal(item) {
  const guests = ['гость', 'гостя', 'гостей'];
  const infants = ['младенец', 'младенца', 'младенцев'];
  const bedrooms = ['спальня', 'спальни', 'спален'];
  const beds = ['кровать', 'кровати', 'кроватей'];
  const bathroom = ['ванная...', 'ванные...', 'ванных...'];
  let text = '';
  if (container.classList.contains('guest')) {
    const defaultText = 'Сколько гостей';
    let adult = Number(
      container.querySelector('[data-dropdown="adults"]').textContent,
    );
    let children = Number(
      container.querySelector('[data-dropdown="children"]').textContent,
    );
    let infant = Number(
      container.querySelector('[data-dropdown="infant"]').textContent,
    );
    let sum = adult + children;
    let total = adult + children + infant;
    if (sum === 0 && infant === 0) {
      text = defaultText;
    } else if (sum !== 0 && infant === 0) {
      text = `${sum} ${declination(sum, guests)}`;
    } else if (sum === 0 && infant !== 0) {
      text = `${infant} ${declination(infant, infants)}`;
    } else {
      text = `${sum} ${declination(sum, guests)}, ${infant} ${declination(infant, infants)}`;
    }

    return {
      adult: adult,
      children: children,
      infant: infant,
      total: total,
      defaultText: defaultText,
      text: text,
    };
  } else if (container.classList.contains('roomchoice')) {
    const defaultText = '2 спальни, 2 кровати...';
    let room = Number(
      container.querySelector('[data-dropdown="bedroom"]').textContent,
    );
    let bed = Number(
      container.querySelector('[data-dropdown="bed"]').textContent,
    );
    let bath = Number(
      container.querySelector('[data-dropdown="bath"]').textContent,
    );
    if (room === 0 && bed === 0 && bath === 0) {
      text = defaultText;
    } else if (room === 0 && bed === 0 && bath !== 0) {
      text = `${bath} ${declination(bath, bathroom)}`;
    } else if (room === 0 && bed !== 0 && bath === 0) {
      text = `${bed} ${declination(bed, beds)}`;
    } else if (room !== 0 && bed === 0 && bath === 0) {
      text = `${room} ${declination(room, bedrooms)}`;
    } else if (room === 0 && bed !== 0 && bath !== 0) {
      text = `${bed} ${declination(bed, beds)}, ${bath} ${declination(bath, bathroom)}`;
    } else if (room !== 0 && bed === 0 && bath !== 0) {
      text = `${room} ${declination(room, bedrooms)}, ${bath} ${declination(bath, bathroom)}`;
    } else {
      text = `${room} ${declination(room, bedrooms)}, ${bed} ${declination(bed, beds)}...`;
    }
    return {
      bedroom: room,
      bed: bed,
      bath: bath,
      defaultText: defaultText,
      text: text,
    };
  }
}
dropdowns.forEach((item) => {
  item.addEventListener('click', (event) =>{
    const current = event.currentTarget;
    const currentMenu = current.nextSibling;
    const options = currentMenu.querySelectorAll('.dropdown__option');
    options.forEach((option, index) => {
      this.name = option.getAttribute('data-name');
    })
    console.log(this)
    dropdownToggle(current);
    
  })
});

// const dropdownSelect = document.querySelector(
//   '#guestdrop .item-dropdown__selection'
// );
// const dropdownSelectOpen = document.querySelector(
//   '#guestopen .item-dropdown__selection'
// );
// const dropdownChoose = document.querySelector(
//   '#guestchoose .item-dropdown__selection'
// );
// const dropdownRoomDefault = document.querySelector(
//   '#roomchoice-1 .item-dropdown__selection'
// );
// const dropdownRoomOpen = document.querySelector(
//   '#roomchoice-2 .item-dropdown__selection'
// );

// const drop = document.querySelectorAll('.dropdown');
// drop.forEach((item) => {
//   item.addEventListener('click', (event) => {
//     event.stopPropagation();
//     console.log(event.target);
//   });
// });

// const dropdownContainer = dropdownSelect.parentNode;

// dropdown(dropdownSelect);
// dropdown(dropdownSelectOpen);
// dropdown(dropdownChoose);
// dropdown(dropdownRoomDefault);
// dropdown(dropdownRoomOpen);

// dropdownSelectOpen.nextElementSibling.classList.add(
//   'item-dropdown__menu_active',
// );
// dropdownSelectOpen.parentNode.classList.add('item-dropdown_opened');

// dropdownChoose.nextElementSibling.classList.add('item-dropdown__menu_active');
// dropdownChoose.parentNode.classList.add('item-dropdown_opened');
// const chosen = dropdownChoose.nextElementSibling;
// chosen.querySelector('[data-dropdown="adults"]').textContent = '2';
// chosen.querySelector('[data-dropdown="children"]').textContent = '1';
// chosen
//   .querySelector('[data-dropdown="adults"]')
//   .previousElementSibling.classList.remove('dropdown-button_inactive');
// chosen
//   .querySelector('[data-dropdown="children"]')
//   .previousElementSibling.classList.remove('dropdown-button_inactive');
// dropdownChoose.textContent = '3 гостя';
// dropdownChoose.nextElementSibling
//   .querySelector('.dropdown-btn__clear')
//   .classList.add('dropdown-btn__clear_active');

// dropdownRoomOpen.nextElementSibling.classList.add('item-dropdown__menu_active');
// dropdownRoomOpen.parentNode.classList.add('item-dropdown_opened');
// const rooms = document.querySelectorAll('.roomchoice');
// rooms.forEach((item) => {
//   item.querySelectorAll('[data-dropdown="bedroom"]').forEach((el) => {
//     el.textContent = '2';
//     el.previousElementSibling.classList.remove('dropdown-button_inactive');
//   });
//   item.querySelectorAll('[data-dropdown="bed"]').forEach((el) => {
//     el.textContent = '2';
//     el.previousElementSibling.classList.remove('dropdown-button_inactive');
//   });
// });

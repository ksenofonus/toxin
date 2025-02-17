// import sumTotal from './_dropdown';

function dropdownToggle(item) {
  item.parentElement.classList.toggle('dropdown_active');
}



function counter(menu) {
  const options = menu.querySelectorAll('.dropdown__option');
  options.forEach(option => {
    const amount = option.querySelector('.amount');
    let sum = Number(amount.textContent);
    function count(button) {
      let limit;
      if (button.classList.contains('increase')) {
        limit = 10;
        sum += 1;
        decrease.classList.remove('amount-button_inactive');
        decrease.removeAttribute('disabled');
      } else {
        limit = 0;
        sum -= 1;
        increase.classList.remove('amount-button_inactive');
        increase.removeAttribute('disabled');
      }
      if (sum === limit) {
        button.classList.add('amount-button_inactive');
        button.disabled = true;
      }
      amount.textContent = sum;
    }
    const increase = option.querySelector('.increase');
    const decrease = option.querySelector('.decrease');
    increase.addEventListener('click', () => {
      count(increase);
    })
    decrease.addEventListener('click', () => {
      count(decrease);
    })
  })
}

function totalRoom(item) {
  const bedrooms = ['спальня', 'спальни', 'спален'];
  const beds = ['кровать', 'кровати', 'кроватей'];
  const bathroom = ['ванная', 'ванные', 'ванных'];
  let text = '';
  const defaultText = '2 спальни, 2 кровати';
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
    
    return {
      bedroom: room,
      bed: bed,
      bath: bath,
      defaultText: defaultText,
      text: text,
    };
  }
}

function dropdown() {
  const dropdowns = document.querySelectorAll('.dropdown__item');
  dropdowns.forEach((item) => {
    item.addEventListener('click', (event) => {
      const current = event.currentTarget;
      dropdownToggle(current);
    });
    const menu = item.nextElementSibling;
    counter(menu);
  });
}
dropdown();


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

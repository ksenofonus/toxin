// import sumTotal from './_dropdown';

function dropdownToggle(item) {
  item.parentElement.classList.toggle('dropdown_active');
}
function declination(num, [one, two, plural]) {
  if (num % 10 === 1 && num !== 11) {
    return one;
  }
  if (num % 10 > 1 && num % 10 < 5) {
    return two;
  }
  return plural;
}
function setPlacehoolder(menu) {
  const options = menu.querySelectorAll('.dropdown__option');
  const placeholder = menu.previousSibling.querySelector('span');
  const optionAmount = Array.from(options).map((option) => Number(option.querySelector('.amount').textContent));
  let amount = optionAmount;
  let nouns = [['спальня', 'спальни', 'спален'], ['кровать', 'кровати', 'кроватей'], ['ванная', 'ванные', 'ванных']];
  if (menu.parentNode.classList.contains('guest')){
    nouns = [['гость', 'гостя', 'гостей'], ['младенец', 'младенца', 'младенцев']];
    amount = [optionAmount[0] + optionAmount[1], optionAmount[2]];
  }
  const optionText = amount.reduce((acc, current, index) => {
    if (current !== 0) {
      acc.push(`${current} ${declination(current, nouns[index])}`);
    }
    return acc;
  }, []);
  console.log(optionText)
  placeholder.textContent = optionText.join(', ');
}

function counter(menu) {
  const options = menu.querySelectorAll('.dropdown__option');
  options.forEach(option => {
    function count(button) {
      let limit;
      if (button.classList.contains('increase')) {
        limit = 15;
        sum += 1;
        decrease.classList.remove('amount-button_inactive');
        decrease.removeAttribute('disabled');
      } else {
        limit = 1;
        sum -= 1;
        increase.classList.remove('amount-button_inactive');
        increase.removeAttribute('disabled');
      }
      if (sum === limit) {
        button.classList.add('amount-button_inactive');
        button.disabled = true;
      }
      amount.textContent = sum;
      setPlacehoolder(menu);
    }
    const amount = option.querySelector('.amount');
    let sum = Number(amount.textContent);
    const increase = option.querySelector('.increase');
    const decrease = option.querySelector('.decrease');
    increase.addEventListener('click', () => count(increase));
    decrease.addEventListener('click', () => count(decrease));
  })

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


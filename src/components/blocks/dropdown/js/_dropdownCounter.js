import setPlacehoolder from "./_setPlaceholder";
export default function counter(menu) {
  const options = menu.querySelectorAll('.dropdown__option');
  options.forEach((option) => {
    function count(button) {
      let limit;
      if (button.classList.contains('increase')) {
        limit = 15;
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
      setPlacehoolder(menu);
    }
    const amount = option.querySelector('.amount');
    let sum = Number(amount.textContent);
    const increase = option.querySelector('.increase');
    const decrease = option.querySelector('.decrease');
    increase.addEventListener('click', () => count(increase));
    decrease.addEventListener('click', () => count(decrease));
  });
}
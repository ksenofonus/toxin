import setPlaceholder from "./_setPlaceholder";

export default function counter(menu) {
  const options = menu.querySelectorAll('.dropdown__option');
  options.forEach((option) => {
    function count(button) {
      let optionAmount = option.querySelector('.amount');
      let sum = Number(optionAmount.textContent);
      let limit;
      if (button.classList.contains('increase')) {
        limit = 15;
        sum += 1
      } else {
        limit = 0;
        sum -= 1;
      }
      if (sum === limit) {
        button.classList.add('amount-button_inactive');
        button.setAttribute('disabled', true);
      }
      optionAmount.textContent = sum;
      setPlaceholder(menu, options);
    }
    const increase = option.querySelector('.increase');
    const decrease = option.querySelector('.decrease');
    increase.addEventListener('click', () => {
      count(increase);
      decrease.classList.remove('amount-button_inactive');
      decrease.removeAttribute('disabled');
    });
    decrease.addEventListener('click', () => {
      count(decrease);
      increase.classList.remove('amount-button_inactive');
      increase.removeAttribute('disabled');
    });
  });
}
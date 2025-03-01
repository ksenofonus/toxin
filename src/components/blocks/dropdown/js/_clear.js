export default function clear(options) {
  options.forEach((option) => {
    option.querySelector('.amount').textContent = 0;
    const decrease = option.querySelector('.decrease');
    decrease.classList.add('amount-button_inactive');
    decrease.setAttribute('disabled', true);
  })
}

import 'Blocks/dropdown/_dropdown-guest';
import { setDatepicker } from 'Blocks/datepicker/_datepicker';

const startDate = document.getElementById('start-booking-date');
const endDate = document.getElementById('end-booking-date');
const amountOfDays = document.querySelector('.days');
const datepicker = setDatepicker(startDate, endDate, amountOfDays);

//nymber with spaces
const digits = document.querySelectorAll('.digit');
digits.forEach((item) => {
  item.textContent = Number(item.textContent).toLocaleString('ru-RU');
})

export function calculateSum() {
  const pricePerDay = document.querySelector('.day-price').textContent.replace(/\s+/g, '');
  const sumWrapper = document.querySelector('.day-sum');
  const discount = document
    .querySelector('.discont .digit')
    .textContent.replace(/\s+/g, '');
  const sumDiscount = document.querySelector('.discont-sum');
  const services = document.querySelector('.service-sum');
  const total = document.querySelector('.total .digit');
  const sum = Number(pricePerDay) * Number(amountOfDays.textContent);
  const totalSum =
    sum +
    Number(sumDiscount.textContent) +
    Number(services.textContent) -
    Number(discount);
  sumWrapper.textContent = sum.toLocaleString('ru-RU');
  total.textContent = totalSum.toLocaleString('ru-RU');
}
calculateSum();
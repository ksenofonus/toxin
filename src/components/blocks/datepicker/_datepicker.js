import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import { apply, clear } from './_datepicker_buttons';
import '../forms/masked-text/_mask';

function daysBetween(array) {
  const startDate = array[0];
  const endDate = array[1];
  const diffTime = Math.abs(
    Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()) -
      Date.UTC(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate()
      )
  );
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}
function calculateSum(amountOfDays) {
  const pricePerDay = document
    .querySelector('.day-price')
    .textContent.replace(/\s+/g, '');
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
export default function setDatepicker(start, end, day) {
  const endField = end;
  const dayField = day;
  const datepicker = new AirDatepicker(start, {
    range: true,
    buttons: [clear, apply],
    onSelect: ({ date }) => {
      let selected = datepicker.selectedDates;
      let amountOfDays = 1;
      if (date.length !== 0) {
        datepicker.$el.value = datepicker.formatDate(date[0], 'dd.MM.yyyy');
      }
      if (date.length === 1) {
        const today = date[0];
        const tommorow = new Date(today);
        tommorow.setDate(tommorow.getDate() + 1);
        endField.value = datepicker.formatDate(tommorow, 'dd.MM.yyyy');
        selected = [today, tommorow];
      }
      if (date.length > 1) {
        endField.value = datepicker.formatDate(date[1], 'dd.MM.yyyy');
      }
      amountOfDays = daysBetween(selected);
      if (day) {
        dayField.textContent = amountOfDays;
        calculateSum(day);
      }
    },
  });

  end.addEventListener('click', () => datepicker.show());
  end.addEventListener('focus', () => datepicker.show());

  document.body.addEventListener('click', (e) => {
    const { target } = e;
    const isDatepicker =
      target === datepicker.$datepicker ||
      datepicker.$datepicker.contains(target);
    const isStartInput =
      target === datepicker.$el || datepicker.$el.contains(target);
    const isEndInput = target === end || end.contains(target);
    const isOpen = datepicker.$datepicker.classList.contains('-active-');
    if (!isDatepicker && !isStartInput && !isEndInput && isOpen) {
      datepicker.hide();
    }
  });
  return datepicker;
}

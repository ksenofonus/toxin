import declination from './_decl';
import clear from './_clear';

export default function setPlaceholder(menu, options) {
  const placeholder = menu.previousSibling.querySelector('span');
  const clearBtn = menu.querySelector('.dropdown__btn__clear');
  let defaultPlaceholder = '';
  const optionAmount = Array.from(options).map((option) =>
    Number(option.querySelector('.amount').textContent)
  );
  let amount = optionAmount;
  let nouns = [
    ['спальня', 'спальни', 'спален'],
    ['кровать', 'кровати', 'кроватей'],
    ['ванная', 'ванные', 'ванных'],
  ];
  if (menu.parentNode.classList.contains('guest')) {
    defaultPlaceholder = 'Сколько гостей';
    nouns = [
      ['гость', 'гостя', 'гостей'],
      ['младенец', 'младенца', 'младенцев'],
    ];
    amount = [optionAmount[0] + optionAmount[1], optionAmount[2]];
  }
  const optionText = amount.reduce((acc, current, index) => {
    if (current !== 0) {
      acc.push(`${current} ${declination(current, nouns[index])}`);
    }
    return acc;
  }, []);
  const sum = amount.reduce((acc, current) => acc + current, 0);
  if (clearBtn) {
    if (sum > 0) {
      clearBtn.classList.add('dropdown__btn__clear_active');
    } else {
      clearBtn.classList.remove('dropdown__btn__clear_active');
    }
    clearBtn.addEventListener('click', () => {
      clear(options);
      placeholder.textContent = defaultPlaceholder;
      clearBtn.classList.remove('dropdown__btn__clear_active');
    });
  }
  if (sum !== 0) {
    placeholder.textContent = optionText.join(', ');
  } else {
    placeholder.textContent = defaultPlaceholder;
  }
}

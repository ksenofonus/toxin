import declination from './_decl';
export default function setPlacehoolder(menu) {
  const options = menu.querySelectorAll('.dropdown__option');
  const placeholder = menu.previousSibling.querySelector('span');
  const optionAmount = Array.from(options).map((option) =>
    Number(option.querySelector('.amount').textContent),
  );
  let amount = optionAmount;
  let nouns = [
    ['спальня', 'спальни', 'спален'],
    ['кровать', 'кровати', 'кроватей'],
    ['ванная', 'ванные', 'ванных'],
  ];
  if (menu.parentNode.classList.contains('guest')) {
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
  console.log(optionText);
  placeholder.textContent = optionText.join(', ');
}

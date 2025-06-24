function starSelect(item, current, start) {
  item.classList.remove('rating-star_checked');
  if (start + 1 <= current) {
    item.classList.add('rating-star_checked');
  }
}

function starMouseEvent(container) {
  const startValue = container.querySelectorAll('.rating-star_checked').length;
  const stars = container.querySelectorAll('.rating-star');
  container.addEventListener('mouseover', (e) => {
    const targetStar = e.target;
    const currentValue = targetStar.getAttribute('data-value');
    stars.forEach((star, i) => {
      starSelect(star, currentValue, i);
    });
  });
  container.addEventListener('mouseout', () => {
    stars.forEach((star, i) => {
      starSelect(star, startValue, i);
    });
  });
}

function starClickEvent(container) {
  starMouseEvent(container);
  const stars = container.querySelectorAll('.rating-star');
  container.addEventListener('click', (e) => {
    starMouseEvent(container);
    const targetStar = e.target;
    const currentValue = targetStar.getAttribute('data-value');
    stars.forEach((star, i) => {
      starSelect(star, currentValue, i);
    });
  });
}
export { starMouseEvent, starClickEvent };

const rating = document.querySelectorAll('.rating-container');
rating.forEach((item) => {
  starClickEvent(item);
});
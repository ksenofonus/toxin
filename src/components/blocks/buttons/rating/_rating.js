function starSelect(val, container) {
  const stars = container.querySelectorAll('.rating-star');
  stars.forEach((star) => {
    const value = star.getAttribute('data-value');
    if (value <= val) {
      star.classList.add('rating-star_checked');
    } else {
      star.classList.remove('rating-star_checked');
    }
  });
}

function starMouseEvent(container) {
  const startValue = container.querySelectorAll('.rating-star_checked').length;
  container.addEventListener('mouseover', (e) => {
    const targetStar = e.target;
    const currentValue = targetStar.getAttribute('data-value');
    starSelect(currentValue, container);
  });
  container.addEventListener('mouseout', () => {
    starSelect(startValue, container);
  });
}

function starClickEvent(container) {
  starMouseEvent(container);
  container.addEventListener('click', (e) => {
    const targetStar = e.target;
    const currentValue = targetStar.getAttribute('data-value');
    starSelect(currentValue, container);
  });
}
export { starMouseEvent, starClickEvent };

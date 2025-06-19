const cards = document.querySelectorAll('.room__page');
cards.forEach((card) => {
  const rightArrow = card.querySelector('.room__slider-arrow_right');
  const leftArrow = card.querySelector('.room__slider-arrow_left');
  const slider = card.querySelector('.room__slider');
  const sliderCount = slider.querySelectorAll('img').length;
  const stepSize = card.offsetWidth;
  let position = 0;
  let index = 0;
  const endPosition = -(stepSize * (sliderCount - 1));
  const carousel = card.querySelector('.carousel');
  const carouselItems = carousel.querySelectorAll('.carousel__item');
  card.addEventListener('click', (e) => {
    const button = e.target;
    if (button.contains(rightArrow) || button.contains(leftArrow)) {
      e.preventDefault();
      if (button.contains(rightArrow)) {
        position -= stepSize;
        index += 1;
        if (position < endPosition) {
          position = 0;
          index = 0;
        }
      }
      if (button.contains(leftArrow)) {
        position += stepSize;
        index -= 1;
        if (position > 0) {
          position = endPosition;
          index = sliderCount;
        }
      }
      slider.style.left = `${position}px`;
      carouselItems.forEach((item) =>
        item.classList.remove('carousel__item_active')
      );
      carouselItems[index].classList.add('carousel__item_active');
    }
  });
});

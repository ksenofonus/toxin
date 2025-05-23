export default function likeToggle() {
  const like = document.querySelectorAll('.like');
  like.forEach((element) => {
    element.addEventListener('click', (e) => {
      const likeCount = element.querySelector('.like__count');
      const sum = Number(likeCount.textContent);
      element.classList.toggle('like_press');
      if (element.classList.contains('like_press')) {
        likeCount.textContent = sum + 1;
      } else {
        likeCount.textContent = sum - 1;
      }
    });
  });
}
likeToggle();

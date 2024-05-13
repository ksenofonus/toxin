const like = document.querySelectorAll('.like');
export const likeToggle = () => {
  like.forEach((element) => {
    element.addEventListener('click', () => {
      let likeCount = element.querySelector('.like__count');
      element.classList.toggle('like_press');
      element.classList.contains('like_press') ? likeCount.textContent = +likeCount.textContent + 1 : likeCount.textContent = +likeCount.textContent - 1;
    })
  })
}


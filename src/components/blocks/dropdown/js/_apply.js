import dropdownToggle from "./_dpopdownToggle";
export default function apply(menu) {
  const applyButton = menu.querySelector('.dropdown__btn__apply');
  applyButton.addEventListener('click', () => {
    dropdownToggle(menu);
  });
};

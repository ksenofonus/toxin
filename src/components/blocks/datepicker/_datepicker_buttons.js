const apply = {
  content: 'Применить',
  className: 'apply-button',
  onClick: (dp) => {
    dp.hide();
  },
};
const clear = {
  content: 'Очистить',
  className: 'clear-button',
  onClick: (dp) => {
    dp.clear();
    const ranged = dp.$datepicker.querySelectorAll('.-in-range-');
    const end =
      dp.$el.parentNode.nextElementSibling.querySelector('.datepicker');
    ranged.forEach((element) => {
      element.classList.remove('-in-range-');
    });
    end.value = '';
  },
};

export { apply, clear };

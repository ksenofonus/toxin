import $ from 'jquery';
import 'Assets/lib/pagination/_pagination.scss';
import * as paginationjs from 'Assets/lib/pagination/_pagination';
import Data from 'Assets/json/rooms.json';
import template from 'Blocks/room/_room.pug';

function simpleTemplating(data) {
  const container = document.createElement('ul');
  container.className = 'room-wrapper';
  data.forEach((element) => {
    container.insertAdjacentHTML('beforeend', template(element));
  });
  return container;
}

$('#pagination-container').pagination({
  dataSource: Data,
  autoHidePrevious: true,
  autoHideNext: true,
  pageSize: 12,
  showNavigator: true,
  formatNavigator:
    '<%= rangeStart %> &ndash; <%= rangeEnd %> из 100+ вариантов аренды',
  pageRange: 1,
  nextText: '',
  prevText: '',
  className: 'toxin-theme',
  ulClassName: 'toxin-theme_list',
  pageClassName: 'toxin-theme_pages',
  activeClassName: 'toxin-theme_pages__active',
  disableClassName: 'toxin-theme_pages__disable',
  nextClassName: 'toxin-theme_pages__next',
  prevClassName: 'toxin-theme_pages__prev',
  callback(data, pagination) {
    const html = simpleTemplating(data);
    $('#data-container').html(html);
  },
});

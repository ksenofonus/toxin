import $ from 'jquery';
import 'Assets/lib/pagination/_pagination.scss';
import * as paginationjs from 'Assets/lib/pagination/_pagination';
import Data from '../../../assets/json/rooms.json';
import template from '../../blocks/room/_room.pug';
// const rooms = Data.reduce((acc, currentdata, index) => {
//   acc[index] = currentdata;
//   return acc;
// }, {});

function simpleTemplating(data) {
  const container = document.createElement('ul');
  container.className = 'room-wrapper';
  for (let item of data) {
    container.insertAdjacentHTML('beforeend', template(item));
  }
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
  callback(Data, pagination) {
    const html = simpleTemplating(Data);
    $('#data-container').html(html);
  },
});

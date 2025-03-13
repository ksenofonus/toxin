import $ from 'jquery';
import 'Assets/lib/pagination/_pagination.scss';
import * as paginationjs from 'Assets/lib/pagination/_pagination';

function simpleTemplating(data) {
  let html = '<ul>';
  $.each(data, function template(index, item) {
    html += `<li>${item}</li>`;
  });
  html += '</ul>';
  return html;
}

$('#pagination-container').pagination({
  dataSource(done) {
    const result = [];
    for (let i = 1; i < 170; i += 1) {
      result.push(i);
    }
    done(result);
  },
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

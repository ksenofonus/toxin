import $ from 'jquery';
import '../../../assets/lib/pagination/_pagination.scss';
import * as pagination from '../../../assets/lib/pagination/_pagination.js';

function simpleTemplating(data) {
  let html = '<ul>';
    $.each(data, function(index, item){
        html += '<li>'+ item +'</li>';
    });
    html += '</ul>';
    return html;
}

$("#pagination-container").pagination({
  dataSource: function(done){
    let result = [];
    for(var i = 1; i < 170; i++){
        result.push(i);
    }
    done(result);
  },
  autoHidePrevious: true,
  autoHideNext: true,
  pageSize: 12,
  showNavigator: true,
  formatNavigator: '<%= rangeStart %> - <%= rangeEnd %> из 100+ вариантов аренды',
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
  callback: function(data, pagination) {
    var html = simpleTemplating(data);
    $("#data-container").html(html);
  },
});
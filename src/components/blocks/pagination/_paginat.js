import '../../../assets/lib/pagination/_pagination.scss';
import * as pagination from '../../../assets/lib/pagination/_pagination.js';
import $ from 'jquery';


$("#pagination-container").pagination({
  dataSource: [1, 2, 3, 4, 5, 6, 7, 8],
  autoHidePrevious: true,
  autoHideNext: true,
  pageSize: 3,
  callback: function(data, pagination) {
    var html = simpleTemplating(data);
    $("#data-container").html(html);
  },
});

export function simpleTemplating(data) {
    const html = new DocumentFragment();
    $.each(data, function(index, item){
        item.removeAttribute('hidden');
        html.append(item);
    });
    return html;
}

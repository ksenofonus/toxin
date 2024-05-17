import '../../../assets/lib/pagination/_pagination';
import * as pagination from '../../../assets/lib/pagination/_pagination';
import $ from 'jquery';

export function simpleTemplating(data) {
  var html = '<ul>';
  $.each(data, function(index, item){
      html += '<li>'+ item +'</li>';
  });
  html += '</ul>';
  return html;
}

$('#pagination-container').pagination({
  dataSource: function(done){
    var result = [];
    for(var i = 1; i < 16; i++){
        result.push(i);
    }
    done(result);
  },
  callback: function(data, pagination) {
      var html = simpleTemplating(data);
      $('#data-container').html(html);
  }
})


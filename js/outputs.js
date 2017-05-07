'use strict';

function _error(xhr) {
  $('.error').show();
  var response = xhr.responseText;
  console.log(response.error);
  $('.error h4').text(response.error || 'Internal server error.');
}


$(document).ready(function() {
  // namespace variables
  var queries = [];
  var query = null;

  // jQuery nodes
  var $serviceResults = $('.service--results'),
      $template = $('.result--template'),
      $output = $('.output'),
      $query = $('#inputEmail');

  $output.hide();

  $.get('js/data/queries.json').then(function(data){
    queries = data.queries;
  }, _error);

  /**
   * Event handler for reset button
   */
  $('.reset-button').click(function() {
    location.reload();
  });

  $('.input--question-generator').click(function(){
	$('.error').hide();
	$output.hide();
	
	query = queries[Math.floor(Math.random() * queries.length)];
    $query.val(query.query);

    $.ajax('/answer', { 
    	data : query.query,
    	contentType : 'text/plain',
    	type : 'POST'
    }).then(function(response) {
      console.log(response);
        
      // service results - solr + ranker
      $serviceResults.empty();
      response.rankedResults.map(createResultNode.bind(null, $template, true))
      .forEach(function(e){
        $serviceResults.append(e);
      });

      $output.show();
    }, _error);
      
    $.ajax({
      url: 'https://lawerassistance.eu-gb.mybluemix.net/smartAnswer',
      type: 'GET' 
    }).done(function(data){
        console.log(data);
    });

    function createResultNode($template, showRanking, result, index) {
      var node = $template.last().clone().show();

      node.find('.results--item-text').prepend(result.title);
      node.find('.results--item-details').text(result.body);

      var $moreInfo = node.find('.results--more-info');
      node.find('.results--see-more').click(function() {
        if ($moreInfo.css('display') === 'none')
          $moreInfo.fadeIn('slow');
        else
          $moreInfo.fadeOut(500);
      });
      return node;
    }
  });
});


// Shorthand for $( document ).ready()
$(function() {
  $('#convertButton').click(function(){
    var sourceCode = $('#sourceCode').val();
    var lang = $('#lang').val();
    $.post('http://localhost:5000/', {sourceCode:sourceCode, lang:lang}).done(function (result) {
      $('#result').html(result);
    });
  });
});

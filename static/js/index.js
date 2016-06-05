// Shorthand for $( document ).ready()
$(function() {
  $('#convertButton').click(function(){
    var sourceCode = $('#sourceCode').val();
    var sourceFile = $('#sourceFile').val();
    if(!sourceCode && !sourceFile){
      //Handle errors
      return;
    }
    if(sourceFile){
      /*document.getElementById('sourceForm').submit(function(event){
        //disable the default form submission
        event.preventDefault();

        //grab all form data
        var formData = new FormData($(this)[0]);

        $.ajax({
          url: 'http://localhost:5000/',
          type: 'POST',
          data: formData,
          async: false,
          cache: false,
          contentType: false,
          processData: false,
          success: function (result) {
            $('#result').html(result);
          }
        });
        return false;
      });*/

      $("#sourceForm").submit();
    }
    if(sourceCode){
      var lang = $('#lang').val();
      $.post('/convert', {sourceCode:sourceCode, lang:lang}).done(function (result) {
        $('#result').html(result);
      });
    }
  });
});

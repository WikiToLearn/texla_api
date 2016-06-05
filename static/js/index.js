// Shorthand for $( document ).ready()
$(function() {
  new Clipboard('#copyButton');

  function successHandler(result){
    $('#spinner').empty();
    $('#result').html(result);
  }

  function beforeSendHandler(){
    $('#spinner').html("<i class='fa fa-spinner fa-spin'></i>");
  }

  $(':file').change(function(){
    $('#inputsError').empty();
    $('#sourceFileError').empty();
    var file = this.files[0];
    var type = file.type;
    if(type !== 'text/x-tex'){
      $('#sourceFileError').html("<i class='fa fa-exclamation'></i>&nbsp;Please, insert a .tex file.");
      document.getElementById('sourceForm').reset();
    }
  });

  $('#convertButton').click(function(){
    $('#inputsError').empty();
    var sourceCode = $('#sourceCode').val();
    var sourceFile = $('#sourceFile').val();
    var lang = $('#lang').val();
    if(!sourceCode && !sourceFile){
      $('#inputsError').html("<i class='fa fa-exclamation'></i>&nbsp;Please, insert a source text or a file.");
      return;
    }else if(sourceCode && sourceFile){
      $('#inputsError').html("<i class='fa fa-frown-o' aria-hidden='true'></i>&nbsp;Sorry! Cannot convert source text and file together!");
      return;
    }else if(sourceCode){
      $.post('/convert', {sourceCode:sourceCode, lang:lang}).done(function (result) {
        $('#result').html(result);
      });
    }else if(sourceFile){
      var formData = new FormData($('#sourceForm')[0]);
      formData.append('lang', lang);
      $.ajax({
        url: '/convert',  //Server script to process data
        type: 'POST',
        xhr: function() {  // Custom XMLHttpRequest
          var myXhr = $.ajaxSettings.xhr();
          return myXhr;
        },
        //Ajax events
        beforeSend: beforeSendHandler,
        success: successHandler,
        //error: errorHandler,
        // Form data
        data: formData,
        //Options to tell jQuery not to process data or worry about content-type.
        cache: false,
        contentType: false,
        processData: false
      });
    }
  });
});

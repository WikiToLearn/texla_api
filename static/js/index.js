// Shorthand for $( document ).ready()
$(function() {
  new Clipboard('#copyButton');
  $('[data-toggle="tooltip"]').tooltip();
  $('.fileinput').fileinput()

  function successHandler(results){
    $('#spinner').empty();
    $('#result').html(results.wikitext);
  }

  function beforeSendHandler(){
    $('#spinner').html("<i class='fa fa-spinner fa-spin'></i>");
  }

  $('#sourceFile').change(function(){
    var allowedFiles = [".tex"];
    var regex = new RegExp("([a-zA-Z0-9\s_\\.\-:])+(" + allowedFiles.join('|') + ")$");
    $('#inputsError').empty();
    $('#sourceFileError').empty();
    var file = this.files[0];
    if(file){
      var type = file.type;
      var name = file.name;
      if(type !== 'text/x-tex' && type !== 'application/x-tex' && !regex.test(name.toLowerCase())){
        $('#sourceFileError').html("<i class='fa fa-exclamation'></i>&nbsp;Please, insert a .tex file.");
      }
    }
  });

  $('#copyButton').click(function(){
    $('#copyButton').tooltip('show');
    setTimeout(function(){
        $('#copyButton').tooltip('hide');
    }, 1000);
  });

  $('#resetButton').click(function(){
    document.getElementById('sourceForm').reset();
  });

  $('#convertButton').click(function(){
    $('#inputsError').empty();
    var sourceCode = $('#sourceCode').val();
    var sourceFile = document.getElementById('sourceFile').files.length;
    var lang = $('#lang').val();
    if(!sourceCode && sourceFile === 0){
      $('#inputsError').html("<i class='fa fa-exclamation'></i>&nbsp;Please, insert a source text or a file.");
      return;
    }else if(sourceCode && sourceFile > 0){
      $('#inputsError').html("<i class='fa fa-frown-o' aria-hidden='true'></i>&nbsp;Sorry! Cannot convert source text and file together!");
      return;
    }else if(sourceCode){
      $.post('/convert', {sourceCode:sourceCode, lang:lang}).done(function (result) {
        $('#result').html(result.wikitext);
      });
    }else if(sourceFile > 0){
      var formData = new FormData($('#sourceForm')[0]);
      //formData.delete('sourceCode');
      formData.append('lang', lang);
      $.ajax({
        url: '/convert',
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

// Shorthand for $( document ).ready()
$(function() {

  function progressHandlingFunction(e){
    if(e.lengthComputable){
      $('progress').attr({value:e.loaded,max:e.total});
    }
  }

  $(':file').change(function(){
    var file = this.files[0];
    //var name = file.name;
    var type = file.type;
    if(type !== 'text/x-tex'){
      alert("Sorry, extension file not valid!");
      document.getElementById('sourceForm').reset();
    }
  });

  $('#convertButton').click(function(){
    var sourceCode = $('#sourceCode').val();
    var sourceFile = $('#sourceFile').val();
    var lang = $('#lang').val();
    if(!sourceCode && !sourceFile){
      alert("Please, insert a source text or a source file!");
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
          if(myXhr.upload){ // Check if upload property exists
            myXhr.upload.addEventListener('progress',progressHandlingFunction, false); // For handling the progress of the upload
          }
          return myXhr;
        },
        //Ajax events
        //beforeSend: beforeSendHandler,
        success: alert("success"),
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

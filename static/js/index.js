$(document).ready(function(){
  console.warn("ready");
  $('#convertButton').click(function(){
    console.warn(hdhdhd);
    var sourceCode = $('#sourceCode').val();
    $.POST("/",{sourceCode : sourceCode},function(result){
      $('#result').html(result);
    });
  });
});

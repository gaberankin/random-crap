$(document).ready(function() {
  $("#test, #test2").doge({
    enterOn: 'click',
    imagePath: 'js',
    begin: function() {
      return $(this).attr('disabled', 'disabled');
    },
    callback: function() {
      return $(this).removeAttr('disabled');
    }
  });
});

$(document).ready(function() {
  $("#test, #test2").doge({
    enterOn: 'timer',
    delayTime: 2000,
    imagePath: 'js',
    begin: function() {
      return $(this).attr('disabled', 'disabled');
    },
    complete: function() {
      return $(this).removeAttr('disabled');
    }
  });
});

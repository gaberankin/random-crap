(function($) {
  var revString;
  revString = function(str) {
    var len, retVal, x, _i, _ref;
    len = str.length;
    retVal = '';
    for (x = _i = _ref = len - 1; _ref <= 0 ? _i <= 0 : _i >= 0; x = _ref <= 0 ? ++_i : --_i) {
      retVal += str.charAt(x);
    }
    return retVal;
  };
  return $.fn.backwards = function(options) {
    return this.filter(':input').keyup(function(e) {
      var $me, $parent;
      $me = $(this);
      $parent = $me.parent('.backwards-wrap');
      $('.backwards-text', $parent).text(revString($me.val()));
    }).css({
      'color': 'transparent'
    }).each(function() {
      var $me, $parent, $text;
      $me = $(this);
      $me.wrap('<div style="position:relative; display:inline-block;" class="backwards-wrap"></div>');
      $parent = $me.parent('.backwards-wrap');
      $text = $('<div class="backwards-text"></div>').appendTo($parent).css({
        padding: $me.css('padding'),
        zIndex: 2,
        position: 'absolute',
        maxWidth: $me.outerWidth(),
        height: $me.outerHeight(),
        overflow: 'hidden'
      }).click(function() {
        return $me.get(0).focus();
      });
      $me.css({
        position: 'absolute',
        zIndex: 1
      });
      $parent.css({
        width: $me.outerWidth(),
        height: $me.outerHeight()
      });
    });
  };
})(jQuery);

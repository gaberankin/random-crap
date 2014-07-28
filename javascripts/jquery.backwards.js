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
      var $me, $parent, $text, left, top;
      $me = $(this);
      left = (($me.outerWidth() - $me.width()) / 2) + parseInt($me.css('margin-left'));
      top = (($me.outerHeight() - $me.height()) / 2) + parseInt($me.css('margin-top'));
      $me.wrap('<div style="position:relative; display:inline-block;" class="backwards-wrap"></div>');
      $parent = $me.parent('.backwards-wrap');
      $text = $('<div class="backwards-text"></div>').appendTo($parent).css({
        top: top,
        left: left,
        zIndex: 2,
        position: 'absolute',
        maxWidth: $me.width(),
        height: $me.height(),
        overflow: 'hidden',
        whiteSpace: 'nowrap'
      }).click(function() {
        $me.get(0).focus();
      });
      if ($me.css('font')) {
        $text.css('font', $me.css('font'));
      } else {
        if ($me.css('font-family')) {
          $text.css('font-family', $me.css('font-family'));
        }
        if ($me.css('font-size')) {
          $text.css('font-size', $me.css('font-size'));
        }
      }
      if ($me.css('font-weight')) {
        $text.css('font-weight', $me.css('font-weight'));
      }
      if ($me.css('font-style')) {
        $text.css('font-style', $me.css('font-style'));
      }
      $me.css({
        position: 'absolute',
        zIndex: 1
      });
      $parent.css({
        width: $me.outerWidth()
      });
    });
  };
})(jQuery);
